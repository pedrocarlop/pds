import { readFile } from "node:fs/promises";

const scenarioFile = "docs/agent/evaluation-scenarios.md";
const source = await readFile(scenarioFile, "utf8");
const failures = [];
let checkCount = 0;

const requiredGlobalFragments = [
  "# Agent Evaluation Scenarios",
  "Codex",
  "Claude",
  "200% zoom",
  "self-improvement trigger",
  "package contract coverage",
  "browser preview checks",
  "## Scoring Rubric",
  "## Pass Conditions",
  "## Result Record Template",
  "Route Fidelity",
  "Package API Correctness",
  "Task Fitness",
  "Token And Visual Fidelity",
  "Resilience And Accessibility",
  "Verification Evidence",
  "Self-Improvement Handling",
  "Smallest Durable Owner",
  "examples/react/src/stories/agent-scenarios.stories.tsx",
  "pnpm examples:visual:check",
  "pnpm check"
];

const requiredScenarios = [
  "start-new-pds-app",
  "implement-review-queue-screen",
  "avoid-generic-product-screen",
  "create-reusable-component",
  "review-and-self-improve",
  "audit-existing-react-app",
  "package-boundary-change"
];

const requiredFields = [
  "- Route:",
  "- Prompt:",
  "- Required Evidence:",
  "- Quality Signals:",
  "- Failure Signals:",
  "- Pass Conditions:",
  "- Verification:"
];

for (const fragment of requiredGlobalFragments) {
  expectIncludes(source, fragment, scenarioFile);
}

for (const scenarioId of requiredScenarios) {
  const block = scenarioBlock(scenarioId);

  if (!block) {
    report(scenarioFile, `missing scenario "${scenarioId}"`);
    continue;
  }

  checkCount += 1;

  for (const field of requiredFields) {
    expectIncludes(block, field, `${scenarioFile}#${scenarioId}`);
  }
}

expectIncludes(source, "[router.md](router.md)", scenarioFile);
expectIncludes(source, "[living-system.md](living-system.md)", scenarioFile);
expectIncludes(source, "[readiness-audit.md](readiness-audit.md)", scenarioFile);

if (failures.length > 0) {
  console.error("Agent evaluation scenario check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Agent evaluation scenario check passed (${checkCount} checks).`);
}

function scenarioBlock(scenarioId) {
  const heading = `## Scenario: ${scenarioId}`;
  const startIndex = source.indexOf(heading);

  if (startIndex === -1) {
    return null;
  }

  const nextHeadingIndex = source.indexOf("\n## Scenario:", startIndex + heading.length);

  if (nextHeadingIndex === -1) {
    return source.slice(startIndex);
  }

  return source.slice(startIndex, nextHeadingIndex);
}

function expectIncludes(text, fragment, location) {
  if (text.includes(fragment)) {
    checkCount += 1;
  } else {
    report(location, `must include "${fragment}"`);
  }
}

function report(location, message) {
  failures.push(`${location}: ${message}`);
}
