#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const IGNORE_DIRS = new Set([
  ".cache",
  ".git",
  ".next",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out"
]);

const REVIEW_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".jsx",
  ".mjs",
  ".scss",
  ".ts",
  ".tsx"
]);

const MAX_FILE_BYTES = 500_000;
const MAX_EXAMPLES = 12;
const RAW_COLOR_PATTERN = /%23[0-9a-f]{3,8}\b|#[0-9a-f]{3,8}\b|(?:rgb|hsl)a?\(/i;
const RAW_BREAKPOINT_PATTERN = /@media[^{]*\b(?:min|max)-width\s*:\s*[1-9]\d*px/i;

main();

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const targetPath = path.resolve(options.target ?? process.cwd());
  ensureExists(targetPath);

  const files = collectReviewFiles(targetPath);
  const contextRoot = statSync(targetPath).isDirectory()
    ? targetPath
    : path.dirname(targetPath);

  const findings = {
    deepImports: [],
    hardcodedColors: [],
    hardcodedBreakpoints: [],
    inlineVisualStyles: [],
    rawControls: [],
    styleImports: [],
    untokenizedMotion: [],
    untokenizedSpace: []
  };

  for (const file of files) {
    scanFile(file, findings);
  }

  printReport({ contextRoot, files, findings, targetPath });
}

function parseArgs(args) {
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--target") {
      options.target = requireValue(args, index, arg);
      index += 1;
      continue;
    }

    if (!options.target) {
      options.target = arg;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function requireValue(args, index, flag) {
  const value = args[index + 1];

  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }

  return value;
}

function printHelp() {
  console.log(`Usage:
  review-pds.mjs [path]
  review-pds.mjs --target <path>

Prints automated PDS review hints for a file or directory.`);
}

function ensureExists(targetPath) {
  if (!existsSync(targetPath)) {
    throw new Error(`Target does not exist: ${targetPath}`);
  }
}

function collectReviewFiles(targetPath) {
  if (statSync(targetPath).isFile()) {
    return REVIEW_EXTENSIONS.has(path.extname(targetPath)) ? [targetPath] : [];
  }

  const result = [];
  const queue = [targetPath];

  while (queue.length > 0) {
    const currentDir = queue.shift();

    for (const entry of safeReadDir(currentDir)) {
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name)) {
          queue.push(absolutePath);
        }
        continue;
      }

      if (
        entry.isFile() &&
        REVIEW_EXTENSIONS.has(path.extname(entry.name)) &&
        canReadText(absolutePath)
      ) {
        result.push(absolutePath);
      }
    }
  }

  return result.sort();
}

function safeReadDir(directory) {
  try {
    return readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
}

function canReadText(file) {
  try {
    return statSync(file).size <= MAX_FILE_BYTES;
  } catch {
    return false;
  }
}

function scanFile(file, findings) {
  const extension = path.extname(file);
  const isCss = extension === ".css" || extension === ".scss";
  const isJsx = extension === ".tsx" || extension === ".jsx";
  const lines = readFileSync(file, "utf8").split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1;
    const line = lines[index];

    pushIfMatch(
      findings.styleImports,
      file,
      lineNumber,
      line,
      /(?:import\s+)?["']@pds\/react\/styles\.css["']/
    );
    pushIfMatch(
      findings.deepImports,
      file,
      lineNumber,
      line,
      /from\s+["'][^"']*(?:@pds\/react\/src|pds\/src|@pds\/tokens\/src|packages\/(?:react|tokens)\/src)[^"']*["']/
    );

    pushIfMatch(
      findings.hardcodedColors,
      file,
      lineNumber,
      line,
      RAW_COLOR_PATTERN
    );

    if (isCss) {
      if (
        findings.hardcodedBreakpoints.length < MAX_EXAMPLES &&
        RAW_BREAKPOINT_PATTERN.test(line) &&
        !isDocumentedBreakpoint(lines, index)
      ) {
        findings.hardcodedBreakpoints.push({ file, line: lineNumber, text: line.trim() });
      }
      pushIfMatch(
        findings.untokenizedSpace,
        file,
        lineNumber,
        line,
        /\b(?:margin|padding|gap|inset|border-radius|font-size|line-height|letter-spacing)\s*:\s*(?![^;]*var\(--pds-)[^;]*\b[1-9]\d*(?:\.\d+)?px\b/i
      );
      pushIfMatch(
        findings.untokenizedMotion,
        file,
        lineNumber,
        line,
        /\b(?:transition|animation(?:-duration)?)\s*:\s*(?![^;]*var\(--pds-)[^;]*(?:\d+(?:\.\d+)?m?s)\b/i
      );
    }

    if (isJsx) {
      pushIfMatch(
        findings.inlineVisualStyles,
        file,
        lineNumber,
        line,
        /style=\{\{[^}]*\b(?:color|background|padding|margin|gap|borderRadius|fontSize|lineHeight)\b/
      );
      pushIfMatch(
        findings.rawControls,
        file,
        lineNumber,
        line,
        /<(button|input|textarea|select)\b/
      );
    }
  }
}

function pushIfMatch(collection, file, line, text, regex) {
  if (collection.length >= MAX_EXAMPLES) {
    return;
  }

  regex.lastIndex = 0;

  if (regex.test(text)) {
    collection.push({ file, line, text: text.trim() });
  }
}

function isDocumentedBreakpoint(lines, index) {
  return [lines[index - 2], lines[index - 1], lines[index]]
    .filter(Boolean)
    .some((line) => line.includes("--pds-layout-breakpoint-"));
}

function printReport({ contextRoot, files, findings, targetPath }) {
  const rel = (file) => path.relative(contextRoot, file) || path.basename(file);
  const styleImportFiles = new Set(findings.styleImports.map((match) => match.file));

  console.log("# Automated PDS Review Hints");
  console.log("");
  console.log(`Target: ${targetPath}`);
  console.log(`Files scanned: ${files.length}`);
  console.log("");
  console.log("## Summary");
  console.log(`- PDS stylesheet import locations: ${styleImportFiles.size}`);
  console.log(`- Deep PDS import hints: ${findings.deepImports.length}`);
  console.log(`- Hard-coded color hints: ${findings.hardcodedColors.length}`);
  console.log(`- Hard-coded breakpoint hints: ${findings.hardcodedBreakpoints.length}`);
  console.log(`- Untokenized spacing/size hints: ${findings.untokenizedSpace.length}`);
  console.log(`- Untokenized motion hints: ${findings.untokenizedMotion.length}`);
  console.log(`- Inline visual style hints: ${findings.inlineVisualStyles.length}`);
  console.log(`- Raw form/control element hints: ${findings.rawControls.length}`);
  console.log("");

  printSection(
    "PDS stylesheet imports",
    findings.styleImports,
    rel,
    "Import `@pds/react/styles.css` once from the app root."
  );
  printSection(
    "Deep PDS import hints",
    findings.deepImports,
    rel,
    "Use public package imports from `@pds/react`."
  );
  printSection(
    "Hard-coded color hints",
    findings.hardcodedColors,
    rel,
    "Use PDS color tokens for UI chrome, state, inline SVGs, and data URI assets."
  );
  printSection(
    "Hard-coded breakpoint hints",
    findings.hardcodedBreakpoints,
    rel,
    "Use PDS layout type guidance and mirror only documented breakpoint tokens."
  );
  printSection(
    "Untokenized spacing/size hints",
    findings.untokenizedSpace,
    rel,
    "Use PDS spacing, radius, and typography tokens where these values define the visual system."
  );
  printSection(
    "Untokenized motion hints",
    findings.untokenizedMotion,
    rel,
    "Use PDS motion duration and easing tokens."
  );
  printSection(
    "Inline visual style hints",
    findings.inlineVisualStyles,
    rel,
    "Move visual styling to CSS and tokens unless the value is truly dynamic."
  );
  printSection(
    "Raw form/control element hints",
    findings.rawControls,
    rel,
    "Check whether an existing PDS component should be used."
  );
  console.log("");
  console.log(
    "Treat these as automated hints. Confirm each item against the PDS docs and the product context before reporting it as a finding."
  );
}

function printSection(title, matches, rel, guidance) {
  console.log(`## ${title}`);
  console.log(guidance);

  if (matches.length === 0) {
    console.log("- none found");
    console.log("");
    return;
  }

  for (const match of matches) {
    console.log(`- ${rel(match.file)}:${match.line} ${match.text}`);
  }

  console.log("");
}
