import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const componentsDir = path.join(root, "packages/react/src/components");
const componentDocsDir = path.join(root, "docs/agent/components");
const componentImagesDir = path.join(componentDocsDir, "images");
const componentIndexPath = path.join(componentDocsDir, "README.md");
const failures = [];

const requiredSections = [
  "## Purpose",
  "## When To Use",
  "## When Not To Use",
  "## Anatomy / Slots",
  "## Public API",
  "## Data Attributes",
  "## Accessibility Contract",
  "## Content Resilience Rules",
  "## Styling Contract",
  "## Token Usage",
  "## State Contract",
  "## State Behavior",
  "## Composition Examples",
  "## Known Limitations",
  "## Do / Don't For Agents",
  "## Related Sources"
];

const componentIds = await collectComponentIds();
const docIds = await collectComponentDocIds();
const componentIndex = await readFile(componentIndexPath, "utf8");

for (const id of componentIds) {
  const docPath = path.join(componentDocsDir, `${id}.md`);

  if (!docIds.includes(id)) {
    report(`${relative(docPath)}: missing component contract`);
    continue;
  }

  const source = await readFile(docPath, "utf8");
  const relativeSourcePath = `packages/react/src/components/${id}.tsx`;
  const relativeImagePath = `images/${id}.png`;
  const imagePattern = new RegExp(
    `!\\[[^\\]]+\\]\\(${escapeRegExp(relativeImagePath)}\\)`
  );
  const imageIndex = source.search(imagePattern);
  const whenToUseIndex = source.indexOf("## When To Use");

  for (const section of requiredSections) {
    if (!source.includes(section)) {
      report(`${relative(docPath)}: missing required section "${section}"`);
    }
  }

  if (!source.includes(relativeSourcePath)) {
    report(
      `${relative(docPath)}: must link to component source ${relativeSourcePath}`
    );
  }

  if (imageIndex === -1) {
    report(`${relative(docPath)}: must include component image ${relativeImagePath}`);
  } else if (whenToUseIndex !== -1 && imageIndex > whenToUseIndex) {
    report(
      `${relative(docPath)}: component image must appear before "## When To Use"`
    );
  }

  await checkComponentImage(id);

  if (!componentIndex.includes(`${id}.md`)) {
    report(`${relative(componentIndexPath)}: missing link to ${id}.md`);
  }
}

for (const id of docIds) {
  if (!componentIds.includes(id)) {
    report(
      `${relative(
        path.join(componentDocsDir, `${id}.md`)
      )}: contract has no matching component source`
    );
  }
}

if (failures.length > 0) {
  console.error("Agent component contract check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Agent component contract check passed (${componentIds.length} components).`
  );
}

async function collectComponentIds() {
  const entries = await readdir(componentsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(".tsx"))
    .filter((fileName) => !fileName.endsWith(".test.tsx"))
    .map((fileName) => fileName.replace(/\.tsx$/, ""))
    .sort();
}

async function collectComponentDocIds() {
  const entries = await readdir(componentDocsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(".md"))
    .filter((fileName) => !["README.md", "_template.md"].includes(fileName))
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .sort();
}

function report(message) {
  failures.push(message);
}

async function checkComponentImage(id) {
  const imagePath = path.join(componentImagesDir, `${id}.png`);

  try {
    const imageStats = await stat(imagePath);

    if (!imageStats.isFile()) {
      report(`${relative(imagePath)}: component image must be a file`);
    } else if (imageStats.size < 1_000) {
      report(`${relative(imagePath)}: component image is unexpectedly small`);
    }
  } catch {
    report(`${relative(imagePath)}: missing component image`);
  }
}

function relative(absolutePath) {
  return path.relative(root, absolutePath);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
