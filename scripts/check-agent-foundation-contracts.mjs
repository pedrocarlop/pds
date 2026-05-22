import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

const tokenBackedFoundations = [
  {
    cssFile: "colour.css",
    docFile: "colour.md",
    requiredSections: [
      "## Core Rules",
      "## Surface Rules",
      "## Overlays And States",
      "## Semantic Colour",
      "## Transparency And Effects",
      "## Brand Palette"
    ],
    requiredTokens: [
      "--pds-color-foreground",
      "--pds-color-accent",
      "--pds-color-base-widget-background",
      "--pds-color-state-focus-ring"
    ]
  },
  {
    cssFile: "typography.css",
    docFile: "typography.md",
    requiredSections: [
      "## Families",
      "## Weights",
      "## Role Scale",
      "## Recipe",
      "## Rules"
    ],
    requiredTokens: [
      "--pds-font-sans",
      "--pds-fw-regular",
      "--pds-body1",
      "--pds-lh-body1"
    ]
  },
  {
    cssFile: "spacing.css",
    docFile: "spacing.md",
    requiredSections: [
      "## Component Spacing Rules",
      "## Full Spacing Scale",
      "## Radius Tokens",
      "## Divider Philosophy",
      "## Spacing Philosophy"
    ],
    requiredTokens: [
      "--pds-space-sp-400",
      "--pds-radius-primary",
      "--pds-radius-divider",
      "--pds-radius-full"
    ]
  },
  {
    cssFile: "layout.css",
    docFile: "layout-types.md",
    requiredSections: [
      "## Layout Tokens",
      "## Breakpoint Rules",
      "## Layout Dimension Rules"
    ],
    requiredTokens: [
      "--pds-layout-breakpoint-compact",
      "--pds-layout-breakpoint-narrow",
      "--pds-layout-content-max",
      "--pds-layout-focus-max"
    ]
  },
  {
    cssFile: "elevation.css",
    docFile: "elevation.md",
    requiredSections: [
      "## Core Rules",
      "## Tokens",
      "## Usage",
      "## Focus",
      "## Do Not"
    ],
    requiredTokens: [
      "--pds-shadow-surface",
      "--pds-shadow-focus",
      "--pds-color-state-focus-ring"
    ]
  },
  {
    cssFile: "motion.css",
    docFile: "motion.md",
    requiredSections: [
      "## Core Rules",
      "## Patterns",
      "## Duration",
      "## Easing",
      "## Agent Requirement",
      "## CSS Recipe",
      "## Rules"
    ],
    requiredTokens: [
      "--pds-motion-duration-fast",
      "--pds-motion-duration-standard",
      "--pds-ease-smooth-swoop",
      "--pds-ease-balanced"
    ]
  }
];

const requiredFoundationDocs = [
  {
    docFile: "README.md",
    requiredFragments: [
      "## Index",
      "## Authoring Rules",
      "tokens.md",
      "elevation.md"
    ]
  },
  {
    docFile: "tokens.md",
    requiredFragments: [
      "## Source",
      "## Ownership",
      "## Naming",
      "## Current Outputs",
      "## Update Rule",
      "elevation.md",
      "@pds/tokens/elevation.css"
    ]
  },
  {
    docFile: "content-resilience.md",
    requiredFragments: [
      "DESIGN.md",
      "typography.md",
      "spacing.md",
      "## Boundless By Default",
      "## Overflow Mechanisms",
      "## Component Spec Requirement",
      "## Rules"
    ]
  }
];

const docsReadme = await readRootFile("docs/README.md");
const foundationsIndex = await readRootFile("docs/foundations/README.md");
const tokensReadme = await readRootFile("packages/tokens/README.md");
const tokenStyles = await readRootFile("packages/tokens/src/styles.css");

for (const foundation of tokenBackedFoundations) {
  await checkTokenBackedFoundation(foundation);
}

for (const doc of requiredFoundationDocs) {
  await checkRequiredFoundationDoc(doc);
}

if (failures.length > 0) {
  console.error("Agent foundation contract check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Agent foundation contract check passed.");
}

async function checkTokenBackedFoundation(foundation) {
  const cssPath = `packages/tokens/src/${foundation.cssFile}`;
  const docPath = `docs/foundations/${foundation.docFile}`;
  const scopedImport = `@pds/tokens/${foundation.cssFile}`;

  await expectFile(cssPath);
  await expectFile(docPath);

  const docSource = await readRootFile(docPath);
  const cssSource = await readRootFile(cssPath);

  expectIncludes(docPath, docSource, [
    "DESIGN.md",
    cssPath,
    ...foundation.requiredSections,
    ...foundation.requiredTokens
  ]);

  expectTokenSourceHasVariables(cssPath, cssSource);
  expectIncludes("docs/README.md", docsReadme, [
    `foundations/${foundation.docFile}`
  ]);
  expectIncludes("docs/foundations/README.md", foundationsIndex, [
    foundation.docFile
  ]);
  expectIncludes("docs/foundations/tokens.md", await readRootFile("docs/foundations/tokens.md"), [
    foundation.docFile,
    scopedImport
  ]);
  expectIncludes("packages/tokens/README.md", tokensReadme, [
    `src/${foundation.cssFile}`,
    `docs/foundations/${foundation.docFile}`,
    scopedImport
  ]);
  expectIncludes("packages/tokens/src/styles.css", tokenStyles, [
    `@import "./${foundation.cssFile}";`
  ]);
}

async function checkRequiredFoundationDoc(doc) {
  const docPath = `docs/foundations/${doc.docFile}`;

  await expectFile(docPath);
  expectIncludes(docPath, await readRootFile(docPath), doc.requiredFragments);

  if (doc.docFile !== "README.md") {
    expectIncludes("docs/foundations/README.md", foundationsIndex, [doc.docFile]);
  }
}

async function expectFile(filePath) {
  try {
    await access(path.join(root, filePath));
  } catch {
    report(filePath, "required foundation evidence is missing");
  }
}

function expectIncludes(filePath, source, fragments) {
  for (const fragment of fragments) {
    if (!source.includes(fragment)) {
      report(filePath, `must include "${fragment}"`);
    }
  }
}

function expectTokenSourceHasVariables(filePath, source) {
  if (!/--pds-[a-z0-9-]+:\s*[^;]+;/.test(source)) {
    report(filePath, "must define at least one --pds-* CSS custom property");
  }
}

async function readRootFile(filePath) {
  return readFile(path.join(root, filePath), "utf8");
}

function report(filePath, message) {
  failures.push(`${filePath}: ${message}`);
}
