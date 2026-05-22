/* global document, getComputedStyle, HTMLElement, window */

import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
const distDir = path.join(root, "examples/react/dist/ladle");
const metaPath = path.join(distDir, "meta.json");
const failureDir = path.join("/tmp", "pds-preview-browser-failures");
const maxStories = parseMaxStories();
const verifiedStoryFiles = new Set([
  "src/stories/component-previews.stories.tsx",
  "src/stories/agent-scenarios.stories.tsx"
]);
const viewports = [
  {
    height: 900,
    name: "desktop",
    width: 1280
  },
  {
    height: 900,
    name: "zoom-200-proxy",
    width: 640
  }
];

const failures = [];

if (!existsSync(metaPath)) {
  console.error(
    "Ladle build output is missing. Run `pnpm examples:visual:build` before `pnpm examples:visual:check`."
  );
  process.exit(1);
}

const meta = JSON.parse(readFileSync(metaPath, "utf8"));
const storyEntries = Object.entries(meta.stories ?? {})
  .filter(([, story]) => verifiedStoryFiles.has(story.filePath))
  .sort(([left], [right]) => left.localeCompare(right));
const selectedStories =
  maxStories === null ? storyEntries : storyEntries.slice(0, maxStories);

if (selectedStories.length === 0) {
  console.error("No verified PDS preview stories found in Ladle meta.json.");
  process.exit(1);
}

for (const storyFile of verifiedStoryFiles) {
  const hasStory = storyEntries.some(([, story]) => story.filePath === storyFile);

  if (!hasStory) {
    console.error(`No verified stories found for ${storyFile}.`);
    process.exit(1);
  }
}

await rm(failureDir, { force: true, recursive: true });

const server = await startStaticServer(distDir);
const baseUrl = `http://127.0.0.1:${server.port}`;

let browser;

try {
  browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: {
        height: viewport.height,
        width: viewport.width
      }
    });

    for (const [storyId, story] of selectedStories) {
      await checkStory({ baseUrl, context, story, storyId, viewport });
    }

    await context.close();
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Executable doesn't exist")) {
    failures.push(
      "Playwright Chromium is not installed. Run `pnpm exec playwright install chromium`."
    );
  } else {
    failures.push(message);
  }
} finally {
  if (browser) {
    await browser.close();
  }

  await server.close();
}

if (failures.length > 0) {
  console.error("React preview browser check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `React preview browser check passed (${selectedStories.length} stories x ${viewports.length} viewports).`
);

async function checkStory({ baseUrl, context, story, storyId, viewport }) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  try {
    const url = `${baseUrl}/?story=${storyId}&mode=preview`;

    page.setDefaultTimeout(5_000);
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".visual-lab-shell", { timeout: 10_000 });
    await page.evaluate(() => document.fonts?.ready);

    const screenshot = await page.screenshot({ fullPage: false });
    const result = await page.evaluate(runBrowserAssertions, {
      storyName: story.name,
      viewportName: viewport.name
    });

    if (screenshot.byteLength < 10_000) {
      failures.push(
        `${storyId} (${viewport.name}): screenshot is unexpectedly small, which may indicate a blank page.`
      );
      await writeFailureScreenshot({ screenshot, storyId, viewport });
    }

    if (consoleErrors.length > 0) {
      failures.push(
        `${storyId} (${viewport.name}): console errors: ${consoleErrors.join(" | ")}`
      );
      await writeFailureScreenshot({ screenshot, storyId, viewport });
    }

    if (pageErrors.length > 0) {
      failures.push(
        `${storyId} (${viewport.name}): page errors: ${pageErrors.join(" | ")}`
      );
      await writeFailureScreenshot({ screenshot, storyId, viewport });
    }

    for (const failure of result.failures) {
      failures.push(`${storyId} (${viewport.name}): ${failure}`);
      await writeFailureScreenshot({ screenshot, storyId, viewport });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${storyId} (${viewport.name}): ${message}`);
  } finally {
    await page.close();
  }
}

function runBrowserAssertions({ storyName, viewportName }) {
  function collectClippedControls() {
    return Array.from(
      document.querySelectorAll(
        [
          "button",
          "input",
          "select",
          "textarea",
          "a",
          "[data-slot]",
          ".visual-lab-field",
          ".visual-lab-note"
        ].join(",")
      )
    )
      .filter(isVisibleElement)
      .filter((element) => element instanceof HTMLElement)
      .filter((element) => {
        if (
          element.matches(
            '[data-slot="select-content"], [data-slot="menu-content"], [data-slot="action-menu-content"], [data-slot="travel-widget"]'
          )
        ) {
          return false;
        }

        if (element.closest(".visual-lab-table-wrap, .pds-table-container")) {
          return false;
        }

        const text = element.textContent?.trim() ?? "";

        if (text.length === 0) {
          return false;
        }

        const style = getComputedStyle(element);

        if (style.overflowX === "visible" && style.overflowY === "visible") {
          return false;
        }

        return (
          element.scrollWidth > element.clientWidth + 2 ||
          element.scrollHeight > element.clientHeight + 2
        );
      })
      .slice(0, 5)
      .map(describeElement);
  }

  function collectZeroSizedControls() {
    return Array.from(
      document.querySelectorAll(
        ["button", "input", "select", "textarea", "a", "[data-slot]"].join(",")
      )
    )
      .filter(isVisibleElement)
      .filter((element) => {
        const rect = element.getBoundingClientRect();

        return rect.width < 1 || rect.height < 1;
      })
      .slice(0, 5)
      .map(describeElement);
  }

  function isVisibleElement(element) {
    if (!(element instanceof HTMLElement)) {
      return false;
    }

    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      Number(style.opacity) !== 0 &&
      rect.width > 0 &&
      rect.height > 0
    );
  }

  function describeElement(element) {
    const slot = element.getAttribute("data-slot");
    const label =
      element.getAttribute("aria-label") ||
      element.textContent?.trim().replace(/\s+/g, " ").slice(0, 48) ||
      element.tagName.toLowerCase();

    return slot
      ? `${element.tagName.toLowerCase()}[data-slot="${slot}"] ${label}`
      : `${element.tagName.toLowerCase()} ${label}`;
  }

  function collectTravelWidgetActionOverlaps() {
    return Array.from(
      document.querySelectorAll(
        '.pds-travel-widget[data-variant="small"]:has(.pds-travel-widget-action)'
      )
    )
      .filter((widget) => widget instanceof HTMLElement)
      .filter((widget) => {
        const action = widget.querySelector(".pds-travel-widget-action");
        const bodySlots = Array.from(
          widget.querySelectorAll(
            [
              ".pds-travel-widget-title",
              ".pds-travel-widget-details",
              ".pds-travel-widget-description",
              ".pds-travel-widget-content"
            ].join(",")
          )
        );

        if (!(action instanceof HTMLElement)) {
          return false;
        }

        return bodySlots.some(
          (slot) =>
            slot instanceof HTMLElement &&
            isVisibleElement(slot) &&
            rectanglesOverlap(
              action.getBoundingClientRect(),
              slot.getBoundingClientRect()
            )
        );
      })
      .slice(0, 5)
      .map(describeElement);
  }

  function rectanglesOverlap(first, second) {
    return !(
      first.right <= second.left ||
      first.left >= second.right ||
      first.bottom <= second.top ||
      first.top >= second.bottom
    );
  }

  function normalizeText(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  const failures = [];
  const shell = document.querySelector(".visual-lab-shell");
  const bodyText = document.body.innerText ?? "";
  const documentElement = document.documentElement;

  if (!shell) {
    failures.push("missing .visual-lab-shell");
    return { failures };
  }

  const shellRect = shell.getBoundingClientRect();

  if (shellRect.width < 1 || shellRect.height < 1) {
    failures.push("story shell has no visible size");
  }

  if (!bodyText.includes("PDS Visual Lab")) {
    failures.push("story frame identity text did not render");
  }

  if (storyName && !normalizeText(bodyText).includes(normalizeText(storyName))) {
    failures.push(`story name "${storyName}" did not render`);
  }

  if (
    /internal server error|failed to fetch dynamically imported module|vite error|uncaught error/i.test(
      bodyText
    )
  ) {
    failures.push("framework/runtime error text is visible");
  }

  const horizontalOverflow =
    documentElement.scrollWidth - documentElement.clientWidth;

  if (horizontalOverflow > 2) {
    failures.push(
      `document has horizontal overflow (${Math.ceil(horizontalOverflow)}px)`
    );
  }

  const clippedControls = collectClippedControls();

  if (clippedControls.length > 0) {
    failures.push(
      `visible controls or slots have clipped content: ${clippedControls.join(", ")}`
    );
  }

  const travelWidgetActionOverlaps = collectTravelWidgetActionOverlaps();

  if (travelWidgetActionOverlaps.length > 0) {
    failures.push(
      `small TravelWidget action overlaps body content: ${travelWidgetActionOverlaps.join(", ")}`
    );
  }

  const zeroSizedControls = collectZeroSizedControls();

  if (zeroSizedControls.length > 0) {
    failures.push(
      `visible controls or slots have no size: ${zeroSizedControls.join(", ")}`
    );
  }

  if (viewportName === "zoom-200-proxy" && window.innerWidth > 700) {
    failures.push("zoom proxy viewport did not apply");
  }

  return { failures };
}

async function writeFailureScreenshot({ screenshot, storyId, viewport }) {
  await mkdir(failureDir, { recursive: true });
  await writeFile(
    path.join(failureDir, `${storyId}-${viewport.name}.png`),
    screenshot
  );
}

async function startStaticServer(rootDir) {
  const server = createServer((request, response) => {
    const requestedPath = new URL(request.url ?? "/", "http://127.0.0.1");
    const filePath = resolveStaticPath(rootDir, requestedPath.pathname);

    if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
      serveFile(response, path.join(rootDir, "index.html"));
      return;
    }

    serveFile(response, filePath);
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();

  return {
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
    port: address.port
  };
}

function resolveStaticPath(rootDir, rawPathname) {
  const decodedPath = decodeURIComponent(rawPathname);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const candidate = path.join(rootDir, normalizedPath);
  const relativePath = path.relative(rootDir, candidate);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return candidate;
}

function serveFile(response, filePath) {
  response.writeHead(200, {
    "Content-Type": contentTypeFor(filePath)
  });
  createReadStream(filePath).pipe(response);
}

function contentTypeFor(filePath) {
  switch (path.extname(filePath)) {
    case ".css":
      return "text/css";
    case ".html":
      return "text/html";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".webmanifest":
      return "application/manifest+json";
    default:
      return "application/octet-stream";
  }
}

function parseMaxStories() {
  const flag = process.argv.find((arg) => arg.startsWith("--max-stories="));

  if (!flag) {
    return null;
  }

  const value = Number(flag.split("=")[1]);

  if (!Number.isInteger(value) || value < 1) {
    throw new Error("--max-stories must be a positive integer.");
  }

  return value;
}
