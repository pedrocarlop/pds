import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];
let checkCount = 0;

const requiredFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "DESIGN.md",
  "SECURITY.md",
  ".github/workflows/check.yml",
  "docs/agent/README.md",
  "docs/agent/router.md",
  "docs/agent/workflow.md",
  "docs/agent/living-system.md",
  "docs/agent/readiness-audit.md",
  "docs/agent/evaluation-scenarios.md",
  "docs/agent/pds-quality-gates.md",
  "docs/agent/pds-screen-quality-gates.md",
  "docs/agent/components/README.md",
  "docs/agent/patterns/README.md",
  "docs/agent/screen-structures/README.md",
  "docs/agent/skills/README.md",
  "docs/agent/skills/self-improve.md",
  "docs/reference/README.md",
  "docs/reference/react-components.md",
  "docs/reference/supported-surface-matrix.md",
  "docs/release-policy.md",
  "docs/foundations/README.md",
  "docs/foundations/content-resilience.md",
  "docs/foundations/elevation.md",
  "docs/foundations/tokens.md",
  "examples/react/src/stories/agent-scenarios.stories.tsx",
  "packages/cli/README.md",
  "packages/react/src/styles.css",
  "packages/tokens/src/styles.css",
  "plugins/pds/README.md",
  "plugins/pds/context/AGENTS.md",
  "plugins/pds/context/CLAUDE.md",
  "scripts/check-package-contracts.mjs",
  "scripts/check-agent-component-contracts.mjs",
  "scripts/check-agent-foundation-contracts.mjs",
  "scripts/check-agent-guidance-contracts.mjs",
  "scripts/check-agent-evaluation-scenarios.mjs",
  "scripts/check-agent-readiness.mjs",
  "scripts/check-agent-skill-contracts.mjs",
  "scripts/capture-component-doc-images.mjs",
  "scripts/generate-react-api-reference.mjs",
  "scripts/generate-supported-surface-matrix.mjs",
  "scripts/check-react-component-previews.mjs",
  "scripts/check-react-preview-browser.mjs",
  "scripts/lint-component-css-tokens.mjs",
  "scripts/sync-plugin-context.mjs"
];

const requiredCheckFragments = [
  "pnpm lint",
  "pnpm docs:lint",
  "pnpm packages:check",
  "pnpm css:lint",
  "pnpm typecheck",
  "pnpm test",
  "pnpm examples:previews:check",
  "pnpm examples:build",
  "pnpm examples:visual:build",
  "pnpm examples:visual:check",
  "pnpm design:lint"
];

const requiredDocsLintFragments = [
  "node scripts/lint-agent-docs.mjs",
  "node scripts/check-agent-skill-contracts.mjs",
  "node scripts/check-agent-component-contracts.mjs",
  "node scripts/check-agent-guidance-contracts.mjs",
  "node scripts/check-agent-foundation-contracts.mjs",
  "node scripts/check-agent-evaluation-scenarios.mjs",
  "pnpm docs:reference:check",
  "node scripts/check-agent-readiness.mjs",
  "pnpm plugin:context:check"
];

const packageJson = JSON.parse(await readRootFile("package.json"));

await expectRequiredFiles();
expectScriptIncludes("check", requiredCheckFragments);
expectScriptIncludes("docs:lint", requiredDocsLintFragments);
expectScriptIncludes("lint", [
  "eslint scripts plugins/pds/skills/*/scripts",
  "turbo run lint"
]);
expectScriptEquals("css:lint", "node scripts/lint-component-css-tokens.mjs");
expectScriptEquals("docs:component-images", "node scripts/capture-component-doc-images.mjs");
expectScriptEquals(
  "docs:reference:check",
  "node scripts/generate-react-api-reference.mjs --check && node scripts/generate-supported-surface-matrix.mjs --check"
);
expectScriptEquals(
  "docs:reference:sync",
  "node scripts/generate-react-api-reference.mjs --write && node scripts/generate-supported-surface-matrix.mjs --write"
);
expectScriptEquals("packages:check", "node scripts/check-package-contracts.mjs");
expectScriptEquals("examples:previews:check", "node scripts/check-react-component-previews.mjs");
expectScriptEquals("examples:visual:check", "node scripts/check-react-preview-browser.mjs");
expectScriptEquals("plugin:context:check", "node scripts/sync-plugin-context.mjs --check");

await expectIncludes("docs/agent/README.md", [
  "readiness-audit.md",
  "living-system.md",
  "evaluation-scenarios.md"
]);
await expectIncludes("docs/agent/router.md", [
  "readiness-audit.md",
  "living-system.md",
  "evaluation-scenarios.md"
]);
await expectIncludes("docs/agent/workflow.md", [
  "package contract coverage",
  "skill contract coverage",
  "foundation contract coverage",
  "generated reference docs",
  "agent evaluation scenario coverage",
  "readiness audit",
  "pnpm check"
]);
await expectIncludes("docs/agent/living-system.md", [
  "readiness-audit.md",
  "evaluation-scenarios.md",
  "Agent Reliability Bar",
  "Adapter Contract",
  "package contract coverage",
  "skill contract coverage",
  "agent evaluation scenario coverage"
]);
await expectIncludes("docs/agent/evaluation-scenarios.md", [
  "## Scenario: start-new-pds-app",
  "## Scenario: implement-review-queue-screen",
  "## Scenario: create-reusable-component",
  "## Scenario: review-and-self-improve",
  "## Scenario: audit-existing-react-app",
  "## Scenario: package-boundary-change",
  "Codex",
  "Claude",
  "200% zoom",
  "## Scoring Rubric",
  "## Pass Conditions",
  "## Result Record Template",
  "Route Fidelity",
  "Package API Correctness",
  "Self-Improvement Handling",
  "examples/react/src/stories/agent-scenarios.stories.tsx",
  "pnpm examples:visual:check",
  "package contract coverage",
  "pnpm check"
]);
await expectIncludes("docs/agent/skills/self-improve.md", [
  "living-system.md",
  "pnpm check"
]);
await expectIncludes("docs/agent/readiness-audit.md", [
  "## Requirement Evidence",
  "## Automated Readiness Floor",
  "## Not Completion Proof",
  "scripts/check-package-contracts.mjs",
  "scripts/check-agent-skill-contracts.mjs",
  "scripts/check-agent-foundation-contracts.mjs",
  "scripts/check-agent-guidance-contracts.mjs",
  "scripts/check-agent-evaluation-scenarios.mjs",
  "scripts/check-agent-readiness.mjs",
  "scripts/capture-component-doc-images.mjs",
  "scripts/generate-react-api-reference.mjs",
  "scripts/generate-supported-surface-matrix.mjs",
  "pnpm docs:reference:check",
  "pnpm examples:visual:check",
  "pnpm check"
]);
await expectIncludes("examples/react/README.md", [
  "Ladle Scenario Previews",
  "src/stories/agent-scenarios.stories.tsx",
  "200% zoom proxy"
]);
await expectIncludes("examples/react/src/stories/agent-scenarios.stories.tsx", [
  "Agent workspace scenario",
  "Review queue scenario",
  "Run details scenario",
  "Settings scenario",
  "Approval signing scenario",
  "Operations review queue",
  "TableContainer",
  "InlineAlert",
  "PageHeader",
  "Tabs"
]);
await expectIncludes("docs/README.md", [
  "agent/readiness-audit.md",
  "agent/evaluation-scenarios.md",
  "agent/living-system.md",
  "reference/supported-surface-matrix.md",
  "release-policy.md",
  "agent/skills",
  "packages",
  "foundations/README.md",
  "foundations/elevation.md"
]);
await expectIncludes("docs/reference/README.md", [
  "react-components.md",
  "supported-surface-matrix.md",
  "pnpm docs:reference:sync"
]);
await expectIncludes("docs/reference/react-components.md", [
  "Generated by scripts/generate-react-api-reference.mjs",
  "DialogContentProps",
  "SelectTriggerProps",
  "ToastProps"
]);
await expectIncludes("docs/reference/supported-surface-matrix.md", [
  "Generated by scripts/generate-supported-surface-matrix.mjs",
  "Hardened starter",
  "Dialog",
  "BottomSheet",
  "Menu",
  "Select",
  "Popover",
  "Toast",
  "Tabs",
  "A11y / focus coverage"
]);
await expectIncludes("CHANGELOG.md", ["## Unreleased", "## 0.1.0"]);
await expectIncludes("CONTRIBUTING.md", ["pnpm check", "pnpm docs:reference:sync"]);
await expectIncludes("SECURITY.md", [
  "Reporting A Vulnerability",
  "Supported Versions"
]);
await expectIncludes("docs/release-policy.md", [
  "Release Checklist",
  "Stable API Bar",
  "Deferred Design-Tool Output"
]);
await expectIncludes(".github/workflows/check.yml", [
  "pnpm install --frozen-lockfile",
  "pnpm exec playwright install --with-deps chromium",
  "pnpm check"
]);
await expectIncludes("docs/start-here.md", [
  "docs/agent/living-system.md",
  "docs/agent/evaluation-scenarios.md",
  "elevation",
  "readiness audit"
]);
await expectIncludes("plugins/pds/README.md", [
  "Codex",
  "Claude",
  "context"
]);
await expectIncludes("packages/README.md", [
  "tokens/README.md",
  "react/README.md",
  "cli/README.md"
]);
await expectIncludes("scripts/sync-plugin-context.mjs", [
  'addFile("AGENTS.md")',
  'addFile("CLAUDE.md")',
  'addDirectory("docs/agent")',
  'addDirectory("docs/reference")',
  "skippedContextPaths"
]);
await expectIncludes("scripts/check-react-preview-browser.mjs", [
  'name: "desktop"',
  'name: "zoom-200-proxy"',
  '"src/stories/component-previews.stories.tsx"',
  '"src/stories/agent-scenarios.stories.tsx"',
  "verifiedStoryFiles"
]);

await expectComponentPreviewParity();

if (failures.length > 0) {
  console.error("Agent readiness audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Agent readiness audit passed (${checkCount} checks).`);
}

async function expectRequiredFiles() {
  for (const filePath of requiredFiles) {
    if (await exists(filePath)) {
      checkCount += 1;
    } else {
      report(filePath, "required readiness evidence is missing");
    }
  }
}

function expectScriptIncludes(scriptName, fragments) {
  const script = packageJson.scripts?.[scriptName];

  if (!script) {
    report("package.json", `missing script "${scriptName}"`);
    return;
  }

  checkCount += 1;

  for (const fragment of fragments) {
    if (script.includes(fragment)) {
      checkCount += 1;
    } else {
      report("package.json", `script "${scriptName}" must include "${fragment}"`);
    }
  }
}

function expectScriptEquals(scriptName, expected) {
  const script = packageJson.scripts?.[scriptName];

  if (script === expected) {
    checkCount += 1;
  } else {
    report(
      "package.json",
      `script "${scriptName}" must be "${expected}"`
    );
  }
}

async function expectIncludes(filePath, fragments) {
  const source = await readRootFile(filePath);

  for (const fragment of fragments) {
    if (source.includes(fragment)) {
      checkCount += 1;
    } else {
      report(filePath, `must include "${fragment}"`);
    }
  }
}

async function expectComponentPreviewParity() {
  const componentIds = await collectIds(
    "packages/react/src/components",
    ".tsx",
    (fileName) => fileName.endsWith(".test.tsx")
  );
  const previewIds = await collectIds(
    "examples/react/src/component-previews",
    ".preview.tsx"
  );
  const imageIds = await collectIds("docs/agent/components/images", ".png");

  const missingPreviews = componentIds.filter((id) => !previewIds.includes(id));
  const extraPreviews = previewIds.filter((id) => !componentIds.includes(id));
  const missingImages = componentIds.filter((id) => !imageIds.includes(id));
  const extraImages = imageIds.filter((id) => !componentIds.includes(id));

  if (componentIds.length === 0) {
    report("packages/react/src/components", "must contain public component sources");
  } else {
    checkCount += 1;
  }

  if (missingPreviews.length > 0) {
    report(
      "examples/react/src/component-previews",
      `missing previews for ${missingPreviews.join(", ")}`
    );
  } else {
    checkCount += 1;
  }

  if (extraPreviews.length > 0) {
    report(
      "examples/react/src/component-previews",
      `previews without component sources: ${extraPreviews.join(", ")}`
    );
  } else {
    checkCount += 1;
  }

  if (missingImages.length > 0) {
    report(
      "docs/agent/components/images",
      `missing documentation images for ${missingImages.join(", ")}`
    );
  } else {
    checkCount += 1;
  }

  if (extraImages.length > 0) {
    report(
      "docs/agent/components/images",
      `documentation images without component sources: ${extraImages.join(", ")}`
    );
  } else {
    checkCount += 1;
  }
}

async function collectIds(directory, suffix, ignore = () => false) {
  let entries;

  try {
    entries = await readdir(path.join(root, directory), {
      withFileTypes: true
    });
  } catch {
    report(directory, "required readiness directory is missing");
    return [];
  }

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(suffix))
    .filter((fileName) => !ignore(fileName))
    .map((fileName) => fileName.slice(0, -suffix.length))
    .sort();
}

async function exists(filePath) {
  try {
    await access(path.join(root, filePath));
    return true;
  } catch {
    return false;
  }
}

async function readRootFile(filePath) {
  return readFile(path.join(root, filePath), "utf8");
}

function report(filePath, message) {
  failures.push(`${filePath}: ${message}`);
}
