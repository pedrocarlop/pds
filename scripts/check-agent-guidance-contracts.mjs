import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

const guidanceContracts = [
  {
    directory: "docs/agent/patterns",
    ignoredFiles: new Set(["README.md", "_template.md"]),
    indexPath: "docs/agent/patterns/README.md",
    label: "pattern",
    requiredLinks: [
      "[DESIGN.md](../../../DESIGN.md)",
      "[Content resilience](../../foundations/content-resilience.md)"
    ],
    requiredSections: [
      "## Overview",
      "## States",
      "## Layout Anatomy",
      "## Flow Variants",
      "## Component Composition",
      "## Accessibility",
      "## Content Resilience",
      "## Client Responsibilities",
      "## Verification",
      "## Do's And Don'ts",
      "## Related Sources"
    ]
  },
  {
    directory: "docs/agent/screen-structures",
    ignoredFiles: new Set(["README.md"]),
    indexPath: "docs/agent/screen-structures/README.md",
    label: "screen structure",
    requiredLinks: [
      "[DESIGN.md](../../../DESIGN.md)",
      "[Layout types](../../foundations/layout-types.md)",
      "[Content resilience](../../foundations/content-resilience.md)",
      "[PDS patterns](../patterns/README.md)",
      "[PDS React components](../components/README.md)"
    ],
    requiredSections: [
      "## Overview",
      "## Use When",
      "## Do Not Use When",
      "## Structure",
      "## Rules",
      "## PDS Component Mapping",
      "## App CSS Responsibilities",
      "## State Placement",
      "## Example",
      "## Quality Gates",
      "## Related Sources"
    ]
  }
];

for (const contract of guidanceContracts) {
  await checkGuidanceContract(contract);
}

if (failures.length > 0) {
  console.error("Agent guidance contract check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Agent guidance contract check passed.");
}

async function checkGuidanceContract(contract) {
  const docs = await collectDocFiles(contract.directory, contract.ignoredFiles);
  const index = await readRootFile(contract.indexPath);

  if (docs.length === 0) {
    report(contract.directory, `must contain at least one ${contract.label} doc`);
  }

  for (const docPath of docs) {
    const source = await readRootFile(docPath);
    const fileName = path.basename(docPath);

    if (!index.includes(fileName)) {
      report(contract.indexPath, `missing link to ${fileName}`);
    }

    for (const section of contract.requiredSections) {
      if (!source.includes(section)) {
        report(docPath, `missing required section "${section}"`);
      }
    }

    for (const link of contract.requiredLinks) {
      if (!source.includes(link)) {
        report(docPath, `missing required related source ${link}`);
      }
    }
  }
}

async function collectDocFiles(directory, ignoredFiles) {
  const entries = await readdir(path.join(root, directory), {
    withFileTypes: true
  });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(".md"))
    .filter((fileName) => !ignoredFiles.has(fileName))
    .map((fileName) => `${directory}/${fileName}`)
    .sort();
}

async function readRootFile(filePath) {
  return readFile(path.join(root, filePath), "utf8");
}

function report(filePath, message) {
  failures.push(`${filePath}: ${message}`);
}

