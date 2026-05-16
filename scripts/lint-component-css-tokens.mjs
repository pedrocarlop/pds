import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const target = path.join(root, "packages/react/src/components.css");
const source = await readFile(target, "utf8");
const relativeTarget = path.relative(root, target);
const lines = source.split(/\r?\n/);
const failures = [];

const rawColorPattern = /#[0-9a-f]{3,8}\b|(?:rgb|rgba|hsl|hsla)\(/i;
const rawDurationPattern = /\b\d*\.?\d+(?:ms|s)\b/i;
const rawEasingPattern = /\b(?:cubic-bezier|steps|ease(?:-in|-out|-in-out)?|linear)\s*(?:\(|$)/i;
const rawPxPattern = /(?:^|[\s,(])-?\d*\.?\d+px\b/i;
const declarationPattern = /^\s*([a-z-]+)\s*:\s*(.+?)\s*;?\s*$/i;
const spacingProperties = new Set([
  "gap",
  "row-gap",
  "column-gap",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "inset",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "top",
  "right",
  "bottom",
  "left"
]);

let selector = "";
let pendingSelector = "";
let reducedMotionDepth = 0;

function report(lineNumber, message) {
  failures.push(`${relativeTarget}:${lineNumber}: ${message}`);
}

function allowsRawSpacing(property, value) {
  if (!rawPxPattern.test(value)) {
    return true;
  }

  if (selector.includes(".pds-visually-hidden")) {
    return true;
  }

  if (
    selector.includes(".pds-switch") &&
    property === "padding" &&
    value.trim() === "3px"
  ) {
    return true;
  }

  return false;
}

function updateSelector(line) {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("@")) {
    return;
  }

  if (trimmed.endsWith("{")) {
    pendingSelector += ` ${trimmed.slice(0, -1).trim()}`;
    selector = pendingSelector.trim();
    pendingSelector = "";
    return;
  }

  if (!selector && !trimmed.includes(":")) {
    pendingSelector += ` ${trimmed}`;
  }
}

function updateReducedMotionDepth(line) {
  if (line.includes("@media (prefers-reduced-motion: reduce)")) {
    reducedMotionDepth = 1;
    return;
  }

  if (reducedMotionDepth === 0) {
    return;
  }

  for (const character of line) {
    if (character === "{") {
      reducedMotionDepth += 1;
    } else if (character === "}") {
      reducedMotionDepth -= 1;
    }
  }
}

for (const [index, line] of lines.entries()) {
  const lineNumber = index + 1;
  const trimmed = line.trim();

  updateSelector(line);

  if (rawColorPattern.test(line)) {
    report(lineNumber, "use PDS color tokens instead of raw color values");
  }

  const declaration = declarationPattern.exec(line);

  if (declaration) {
    const [, property, value] = declaration;

    if (property === "border-radius" && rawPxPattern.test(value)) {
      report(lineNumber, "use PDS radius tokens instead of raw radius values");
    }

    if (spacingProperties.has(property) && !allowsRawSpacing(property, value)) {
      report(lineNumber, "use PDS spacing tokens instead of raw spacing values");
    }

    if (
      property.startsWith("transition") &&
      (rawDurationPattern.test(value) || rawEasingPattern.test(value)) &&
      reducedMotionDepth === 0
    ) {
      report(lineNumber, "use PDS motion duration and easing tokens");
    }

    if (
      property.startsWith("animation") &&
      (rawDurationPattern.test(value) || rawEasingPattern.test(value)) &&
      reducedMotionDepth === 0
    ) {
      report(lineNumber, "use PDS motion duration and easing tokens");
    }
  } else if (
    reducedMotionDepth === 0 &&
    (rawDurationPattern.test(line) || rawEasingPattern.test(line)) &&
    /transition|animation/i.test(selector)
  ) {
    report(lineNumber, "use PDS motion duration and easing tokens");
  }

  if (trimmed === "}") {
    selector = "";
  }

  updateReducedMotionDepth(line);
}

if (failures.length > 0) {
  console.error("Component CSS token lint failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Component CSS token lint passed.");
}
