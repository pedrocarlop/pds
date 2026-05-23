/* global document */

import {
  createReadStream,
  existsSync,
  readdirSync,
  readFileSync,
  statSync
} from "node:fs";
import { mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = process.cwd();
const distDir = path.join(root, "examples/react/dist/ladle");
const metaPath = path.join(distDir, "meta.json");
const componentsDir = path.join(root, "packages/react/src/components");
const outputDir = path.join(root, "docs/agent/components/images");
const componentStoryFile = "src/stories/component-previews.stories.tsx";
const shouldSkipBuild = process.argv.includes("--no-build");

if (!shouldSkipBuild) {
  await runCommand("pnpm", ["examples:visual:build"]);
}

if (!existsSync(metaPath)) {
  console.error(
    "Ladle build output is missing. Run `pnpm examples:visual:build` before capturing component images."
  );
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

const meta = JSON.parse(readFileSync(metaPath, "utf8"));
const componentIds = collectComponentIds();
const missingStories = [];
const captured = [];
const server = await startStaticServer(distDir);
const baseUrl = `http://127.0.0.1:${server.port}`;
let browser;

try {
  browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    deviceScaleFactor: 1,
    viewport: {
      height: 900,
      width: 1280
    }
  });

  for (const id of componentIds) {
    const storyId = `components--${id}`;
    const story = meta.stories?.[storyId];

    if (!story || story.filePath !== componentStoryFile) {
      missingStories.push(id);
      continue;
    }

    const page = await context.newPage();

    try {
      await captureComponentImage({ baseUrl, id, page, storyId });
      captured.push(id);
    } finally {
      await page.close();
    }
  }

  await context.close();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Executable doesn't exist")) {
    console.error(
      "Playwright Chromium is not installed. Run `pnpm exec playwright install chromium`."
    );
  } else {
    console.error(message);
  }

  process.exitCode = 1;
} finally {
  if (browser) {
    await browser.close();
  }

  await server.close();
}

if (missingStories.length > 0) {
  console.error("Missing component preview stories:");
  for (const id of missingStories) {
    console.error(`- ${id}`);
  }
  process.exitCode = 1;
} else if (process.exitCode !== 1) {
  console.log(`Captured ${captured.length} component documentation images.`);
}

async function captureComponentImage({ baseUrl, id, page, storyId }) {
  const targetPath = path.join(outputDir, `${id}.png`);

  page.setDefaultTimeout(10_000);
  await page.goto(`${baseUrl}/?story=${storyId}&mode=preview`, {
    waitUntil: "domcontentloaded"
  });
  await page.waitForSelector(".visual-lab-shell", { timeout: 10_000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
      }

      .visual-lab-shell {
        min-height: auto !important;
      }
    `
  });
  await page.locator(".visual-lab-shell").screenshot({
    animations: "disabled",
    path: targetPath
  });
}

function collectComponentIds() {
  return readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(".tsx"))
    .filter((fileName) => !fileName.endsWith(".test.tsx"))
    .map((fileName) => fileName.replace(/\.tsx$/, ""))
    .sort();
}

async function runCommand(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      shell: false,
      stdio: "inherit"
    });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
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
