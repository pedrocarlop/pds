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

const SOURCE_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".jsx",
  ".mjs",
  ".scss",
  ".ts",
  ".tsx"
]);

const CSS_EXTENSIONS = new Set([".css", ".scss"]);
const MAX_FILE_BYTES = 500_000;
const RAW_COLOR_PATTERN = /%23[0-9a-f]{3,8}\b|#[0-9a-f]{3,8}\b|(?:rgb|hsl)a?\(/i;
const RAW_BREAKPOINT_PATTERN = /@media[^{]*\b(?:min|max)-width\s*:\s*[1-9]\d*px/i;

main();

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const targetDir = path.resolve(options.target ?? process.cwd());
  ensureDirectory(targetDir);

  const files = walk(targetDir);
  const sourceFiles = files.filter((file) =>
    SOURCE_EXTENSIONS.has(path.extname(file))
  );
  const cssFiles = files.filter((file) => CSS_EXTENSIONS.has(path.extname(file)));
  const packageJson = readJson(path.join(targetDir, "package.json"));
  const dependencies = packageJson
    ? {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      }
    : {};

  const pdsStyleImports = collectMatches(
    sourceFiles,
    /(?:import\s+)?["']@pds\/react\/styles\.css["']/,
    12
  );
  const pdsImports = collectMatches(
    sourceFiles,
    /from\s+["']@pds\/react(?:\/starter)?["']|import\s+\{[^}]*\}\s+from\s+["']@pds\/react(?:\/starter)?["']/,
    12
  );
  const deepPdsImports = collectMatches(
    sourceFiles,
    /from\s+["'][^"']*(?:@pds\/react\/src|pds\/src|@pds\/tokens\/src|packages\/(?:react|tokens)\/src)[^"']*["']/,
    12
  );
  const tokenReferences = collectMatches(
    [...sourceFiles, ...cssFiles],
    /var\(--pds-|--pds-/,
    12
  );
  const hardcodedColors = collectMatches(
    sourceFiles,
    RAW_COLOR_PATTERN,
    12
  );
  const hardcodedBreakpoints = collectMatches(
    cssFiles,
    RAW_BREAKPOINT_PATTERN,
    12,
    isDocumentedBreakpoint
  );
  const packageManager = detectPackageManager(targetDir, packageJson);
  const framework = detectFramework(dependencies, files, targetDir);
  const entrypoints = findExisting(targetDir, [
    "src/main.tsx",
    "src/main.jsx",
    "src/index.tsx",
    "src/index.jsx",
    "src/App.tsx",
    "src/App.jsx",
    "app/layout.tsx",
    "pages/_app.tsx",
    "pages/_app.jsx"
  ]);
  const styleEntrypoints = uniqueFiles([
    ...findExisting(targetDir, [
      "src/index.css",
      "src/App.css",
      "src/app.css",
      "app/globals.css",
      "styles/globals.css"
    ]),
    ...findImportedStyles(sourceFiles)
  ]);
  const pdsProjectGuidance = inspectPdsProjectGuidance(targetDir);

  printReport({
    cssFiles,
    deepPdsImports,
    dependencies,
    entrypoints,
    files,
    framework,
    hardcodedColors,
    hardcodedBreakpoints,
    packageJson,
    packageManager,
    pdsProjectGuidance,
    pdsImports,
    pdsStyleImports,
    sourceFiles,
    styleEntrypoints,
    targetDir,
    tokenReferences
  });
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
  audit-web-project.mjs [project-path]
  audit-web-project.mjs --target <project-path>

Prints a read-only PDS adoption audit for a web project.`);
}

function ensureDirectory(targetDir) {
  if (!existsSync(targetDir) || !statSync(targetDir).isDirectory()) {
    throw new Error(`Target is not a directory: ${targetDir}`);
  }
}

function walk(rootDir) {
  const result = [];
  const queue = [rootDir];

  while (queue.length > 0) {
    const currentDir = queue.shift();

    for (const entry of safeReadDir(currentDir)) {
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (!shouldIgnoreDirectory(rootDir, absolutePath, entry.name)) {
          queue.push(absolutePath);
        }
        continue;
      }

      if (entry.isFile()) {
        result.push(absolutePath);
      }
    }
  }

  return result.sort();
}

function shouldIgnoreDirectory(rootDir, absolutePath, entryName) {
  if (IGNORE_DIRS.has(entryName)) {
    return true;
  }

  const relativePath = toPosix(path.relative(rootDir, absolutePath));
  return relativePath === "docs/pds/context";
}

function safeReadDir(directory) {
  try {
    return readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
}

function readJson(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function collectMatches(files, regex, limit, shouldSkip = () => false) {
  const matches = [];
  const seen = new Set();

  for (const file of files) {
    if (seen.has(file) || !canReadText(file)) {
      continue;
    }

    seen.add(file);
    const lines = readFileSync(file, "utf8").split(/\r?\n/);

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      regex.lastIndex = 0;

      if (regex.test(line) && !shouldSkip(lines, index)) {
        matches.push({
          file,
          line: index + 1,
          text: line.trim()
        });

        if (matches.length >= limit) {
          return matches;
        }
      }
    }
  }

  return matches;
}

function isDocumentedBreakpoint(lines, index) {
  return [lines[index - 2], lines[index - 1], lines[index]]
    .filter(Boolean)
    .some((line) => line.includes("--pds-layout-breakpoint-"));
}

function canReadText(file) {
  try {
    return statSync(file).size <= MAX_FILE_BYTES;
  } catch {
    return false;
  }
}

function detectPackageManager(targetDir, packageJson) {
  if (findUp(targetDir, "pnpm-lock.yaml")) {
    return "pnpm";
  }

  if (findUp(targetDir, "yarn.lock")) {
    return "yarn";
  }

  if (findUp(targetDir, "bun.lockb")) {
    return "bun";
  }

  if (findUp(targetDir, "package-lock.json")) {
    return "npm";
  }

  return packageJson?.packageManager ?? "unknown";
}

function findUp(startDir, fileName) {
  let currentDir = startDir;

  while (true) {
    const candidate = path.join(currentDir, fileName);

    if (existsSync(candidate)) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

function detectFramework(dependencies, files, targetDir) {
  if (dependencies.next || existsSync(path.join(targetDir, "next.config.js"))) {
    return "Next.js";
  }

  if (
    dependencies.vite ||
    dependencies["@vitejs/plugin-react"] ||
    files.some((file) => path.basename(file).startsWith("vite.config."))
  ) {
    return dependencies.react ? "Vite React" : "Vite";
  }

  if (dependencies["@remix-run/react"]) {
    return "Remix";
  }

  if (dependencies.astro) {
    return "Astro";
  }

  if (dependencies.react) {
    return "React";
  }

  return "unknown";
}

function findExisting(targetDir, candidates) {
  return candidates
    .map((candidate) => path.join(targetDir, candidate))
    .filter((candidate) => existsSync(candidate));
}

function findImportedStyles(sourceFiles) {
  const importedStyles = [];

  for (const sourceFile of sourceFiles) {
    if (!canReadText(sourceFile)) {
      continue;
    }

    const source = readFileSync(sourceFile, "utf8");
    const importPattern = /import\s+["']([^"']+\.(?:css|scss))["']/g;
    let match;

    while ((match = importPattern.exec(source)) !== null) {
      const specifier = match[1];

      if (!specifier.startsWith(".")) {
        continue;
      }

      const candidate = path.resolve(path.dirname(sourceFile), specifier);

      if (existsSync(candidate)) {
        importedStyles.push(candidate);
      }
    }
  }

  return importedStyles;
}

function uniqueFiles(files) {
  return Array.from(new Set(files)).sort();
}

function inspectPdsProjectGuidance(targetDir) {
  const requiredFiles = [
    "AGENTS.md",
    "CLAUDE.md",
    "DESIGN.md",
    "docs/pds/context/docs/agent/router.md",
    "docs/pds/context/docs/agent/workflow.md",
    "docs/pds/context/docs/agent/skills/implement-screen.md",
    "docs/pds/context/docs/agent/skills/create-component.md",
    "docs/pds/context/docs/agent/skills/self-improve.md",
    "docs/pds/context/docs/agent/readiness-audit.md",
    "docs/pds/context/docs/agent/evaluation-scenarios.md"
  ];
  const missingFiles = requiredFiles.filter(
    (filePath) => !existsSync(path.join(targetDir, filePath))
  );

  return {
    missingFiles,
    requiredFiles
  };
}

function printReport(context) {
  const rel = (file) => path.relative(context.targetDir, file) || ".";
  const hasReact = Boolean(context.dependencies.react);
  const hasPdsPackage = Boolean(context.dependencies["@pds/react"]);
  const hasPdsTokens = Boolean(context.dependencies["@pds/tokens"]);
  const hasStyleImport = context.pdsStyleImports.length > 0;
  const hasPdsProjectGuidance =
    context.pdsProjectGuidance.missingFiles.length === 0;

  console.log("# PDS Web Project Audit");
  console.log("");
  console.log(`Target: ${context.targetDir}`);
  console.log("");
  console.log("## Detected Stack");
  console.log(`- Package name: ${context.packageJson?.name ?? "unknown"}`);
  console.log(`- Package manager: ${context.packageManager}`);
  console.log(`- Framework: ${context.framework}`);
  console.log(`- React dependency: ${context.dependencies.react ?? "not found"}`);
  console.log(`- Source files scanned: ${context.sourceFiles.length}`);
  console.log("");
  console.log("## PDS Integration Signals");
  console.log(`- \`@pds/react\` dependency: ${formatStatus(hasPdsPackage)}`);
  console.log(`- \`@pds/tokens\` dependency: ${formatStatus(hasPdsTokens)}`);
  console.log(`- \`@pds/react/styles.css\` imports: ${context.pdsStyleImports.length}`);
  console.log(`- public \`@pds/react\` component imports: ${context.pdsImports.length}`);
  console.log(`- PDS token references: ${context.tokenReferences.length}`);
  console.log(`- deep PDS import risks: ${context.deepPdsImports.length}`);
  console.log(`- project-local PDS guidance: ${formatStatus(hasPdsProjectGuidance)}`);
  console.log("");
  console.log("## Likely Integration Files");
  printFileList("Entrypoints", context.entrypoints, rel);
  printFileList("Style roots", context.styleEntrypoints, rel);
  console.log("");
  console.log("## Adoption Recommendation");

  if (!hasReact) {
    console.log(
      "- Current plugin focus is React web. Treat this as an adapter or future-framework project before using PDS React components."
    );
  } else if (!hasPdsProjectGuidance) {
    console.log(
      "- Install project-local PDS guidance so agents can resolve PDS routes before creating screens, components, reviews, or self-improvement patches."
    );
  } else if (!hasPdsPackage) {
    console.log(
      "- Install PDS first, then import `@pds/react/styles.css` once in the app root before migrating screens."
    );
  } else if (!hasStyleImport) {
    console.log(
      "- PDS is installed but styles are not wired. Add the root stylesheet import before changing component surfaces."
    );
  } else {
    console.log(
      "- PDS appears wired. Start with one bounded screen or flow and migrate local primitives to public `@pds/react` imports."
    );
  }

  if (context.deepPdsImports.length > 0) {
    console.log("- Remove deep PDS imports and use package-level public imports.");
  }

  if (context.hardcodedColors.length > 0) {
    console.log(
      "- Review hard-coded colors in app CSS, inline SVGs, and data URI assets; replace visual-system values with PDS tokens where they define UI chrome."
    );
  }

  if (context.hardcodedBreakpoints.length > 0) {
    console.log(
      "- Review hard-coded breakpoint values and align them with PDS layout type tokens."
    );
  }

  console.log("");
  console.log("## Sample Evidence");
  printMatches("PDS style imports", context.pdsStyleImports, rel);
  printMatches("PDS component imports", context.pdsImports, rel);
  printMatches("Deep import risks", context.deepPdsImports, rel);
  printMatches("Hard-coded color hints", context.hardcodedColors, rel);
  printMatches("Hard-coded breakpoint hints", context.hardcodedBreakpoints, rel);
  printMissingGuidance(context.pdsProjectGuidance.missingFiles);
  console.log("");
  console.log("## Verification To Plan");
  console.log("- Run the app's typecheck/build command after integration.");
  console.log("- Verify the migrated screen at narrow viewport and 200% browser zoom.");
  console.log("- Check long labels, generated/user content, loading, empty, error, and success states.");
}

function printMissingGuidance(missingFiles) {
  console.log("### Missing project-local PDS guidance files");

  if (missingFiles.length === 0) {
    console.log("- none found");
    return;
  }

  for (const filePath of missingFiles.slice(0, 12)) {
    console.log(`- ${filePath}`);
  }
}

function formatStatus(value) {
  return value ? "found" : "not found";
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function printFileList(label, files, rel) {
  console.log(`### ${label}`);

  if (files.length === 0) {
    console.log("- none found");
    return;
  }

  for (const file of files.slice(0, 8)) {
    console.log(`- ${rel(file)}`);
  }
}

function printMatches(label, matches, rel) {
  console.log(`### ${label}`);

  if (matches.length === 0) {
    console.log("- none found");
    return;
  }

  for (const match of matches) {
    console.log(`- ${rel(match.file)}:${match.line} ${match.text}`);
  }
}
