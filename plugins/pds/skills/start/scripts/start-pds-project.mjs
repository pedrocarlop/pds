#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { installPdsProjectContext } from "./pds-project-context.mjs";

const SAFE_EXISTING_ENTRIES = new Set([".git", ".gitignore", ".DS_Store"]);
const VALID_MODES = new Set(["auto", "new", "adopt", "context"]);
const ROOT_ENTRYPOINT_CANDIDATES = [
  "src/main.tsx",
  "src/main.jsx",
  "src/index.tsx",
  "src/index.jsx",
  "app/layout.tsx",
  "src/app/layout.tsx",
  "pages/_app.tsx",
  "src/pages/_app.tsx"
];

export function runStartPdsProject(args = process.argv.slice(2)) {
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    return;
  }

  const targetDir = path.resolve(options.target ?? process.cwd());
  const mode = resolveStartMode(targetDir, options.mode);

  if (mode === "new") {
    createNewPdsApp(targetDir, options);
    return;
  }

  if (mode === "adopt") {
    adoptExistingPdsApp(targetDir, options);
    return;
  }

  installContextOnly(targetDir);
}

export function parseArgs(args) {
  const options = {
    mode: "auto"
  };

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

    if (arg === "--mode") {
      options.mode = requireValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--pds-repo") {
      options.pdsRepo = requireValue(args, index, arg);
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!VALID_MODES.has(options.mode)) {
    throw new Error("--mode must be one of: auto, new, adopt, context");
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
  start-pds-project.mjs [--target <path>] [--mode auto|new|adopt|context]
  start-pds-project.mjs --target <empty-folder> --mode new
  start-pds-project.mjs --target <react-app> --mode adopt
  start-pds-project.mjs --target <project> --mode context

Creates a new Vite React TypeScript app when the target is empty, adopts PDS
into an existing React app, or refreshes project-local PDS guidance only. New
apps install PDS from npm by default. Pass --pds-repo for local package tarball
development.`);
}

export function resolveStartMode(targetDir, requestedMode = "auto") {
  if (requestedMode !== "auto") {
    return requestedMode;
  }

  if (!existsSync(targetDir)) {
    return "new";
  }

  if (!statSync(targetDir).isDirectory()) {
    throw new Error(`Target exists but is not a directory: ${targetDir}`);
  }

  if (isTargetEmptyForNewApp(targetDir)) {
    return "new";
  }

  if (isReactProject(targetDir)) {
    return "adopt";
  }

  throw new Error(
    `Target is not empty and is not a React app: ${targetDir}
Run with --mode context to install or refresh only the PDS guidance bundle.`
  );
}

export function isTargetEmptyForNewApp(targetDir) {
  if (!existsSync(targetDir)) {
    return true;
  }

  return readdirSync(targetDir).every((entry) => SAFE_EXISTING_ENTRIES.has(entry));
}

function createNewPdsApp(targetDir, options) {
  ensureCommand("pnpm", ["--version"]);
  ensureEmptyTargetDirectory(targetDir);

  const packageSource = resolvePackageSource(options, targetDir);

  console.log(`Target app: ${targetDir}`);
  console.log(packageSourceMessage(packageSource));

  const pdsRepo = packageSource.type === "local" ? packageSource.repo : null;

  if (!pdsRepo) {
    ensureRegistryPdsPackages();
  }

  prepareLocalPackageSource(pdsRepo);

  const packDir = pdsRepo ? mkdtempSync(path.join(tmpdir(), "pds-packages-")) : null;
  const appDir = mkdtempSync(path.join(tmpdir(), "pds-vite-"));

  try {
    if (pdsRepo) {
      packPdsPackages(pdsRepo, packDir);
    }

    createViteApp(appDir);
    writeStarterFiles(appDir, targetDir);
    installPdsProjectContext(appDir, { adapterMode: "replace" });

    if (pdsRepo) {
      installLocalPdsPackages(appDir, packDir);
    } else {
      installRegistryPdsPackages(appDir);
    }

    run("pnpm", ["build"], { cwd: appDir });
    copyDirectoryContents(appDir, targetDir, {
      exclude: new Set(["node_modules"])
    });
    run("pnpm", ["install", "--frozen-lockfile"], { cwd: targetDir });
    run("pnpm", ["build"], { cwd: targetDir });
  } finally {
    if (packDir) {
      rmSync(packDir, { force: true, recursive: true });
    }

    rmSync(appDir, { force: true, recursive: true });
  }

  console.log("");
  console.log("PDS React app created successfully.");
  console.log("Project-local PDS guidance was installed in docs/pds/context.");
  console.log(`Run it with: cd ${shellQuote(targetDir)} && pnpm dev`);
}

function adoptExistingPdsApp(targetDir, options) {
  ensureExistingDirectory(targetDir);

  if (!isReactProject(targetDir)) {
    throw new Error(
      `PDS adoption requires an existing React package.json. Use --mode context for non-React projects: ${targetDir}`
    );
  }

  const packageSource = resolvePackageSource(options, targetDir);
  const packageManager = detectPackageManager(targetDir);
  const pdsRepo = packageSource.type === "local" ? packageSource.repo : null;

  if (pdsRepo && packageManager.name !== "pnpm") {
    throw new Error(
      "Local PDS tarball adoption currently requires a pnpm project. Use npm registry packages or run --mode context."
    );
  }

  ensureCommand(packageManager.command, ["--version"]);

  if (!pdsRepo) {
    ensureRegistryPdsPackages();
  }

  prepareLocalPackageSource(pdsRepo);

  const packDir = pdsRepo ? mkdtempSync(path.join(tmpdir(), "pds-packages-")) : null;

  try {
    if (pdsRepo) {
      packPdsPackages(pdsRepo, packDir);
      installLocalPdsPackages(targetDir, packDir);
    } else {
      installRegistryPdsPackage(targetDir, packageManager);
    }
  } finally {
    if (packDir) {
      rmSync(packDir, { force: true, recursive: true });
    }
  }

  const contextResult = installPdsProjectContext(targetDir, {
    adapterMode: "merge"
  });
  const importResult = addPdsStylesImport(targetDir);

  console.log("");
  console.log("PDS installed in existing React app.");
  console.log(packageSourceMessage(packageSource));
  console.log(`Project-local PDS guidance: ${contextResult.contextPath}`);
  console.log(styleImportMessage(importResult, targetDir));
}

function installContextOnly(targetDir) {
  const result = installPdsProjectContext(targetDir, {
    adapterMode: "merge"
  });

  console.log(`PDS project guidance installed in ${result.projectDir}`);
  console.log(`Context: ${result.contextPath}`);

  if (result.adapters.length > 0) {
    console.log("Adapters updated:");
    for (const filePath of result.adapters) {
      console.log(`- ${path.relative(result.projectDir, filePath)}`);
    }
  } else {
    console.log("Adapters already up to date.");
  }
}

function packageSourceMessage(packageSource) {
  if (packageSource.type === "local") {
    return `PDS packages: local tarballs from ${packageSource.repo}${
      packageSource.explicit ? "" : " (auto-detected)"
    }`;
  }

  return "PDS packages: @pds/react@latest from npm";
}

function prepareLocalPackageSource(pdsRepo) {
  if (!pdsRepo) {
    return;
  }

  if (!existsSync(path.join(pdsRepo, "node_modules"))) {
    run("pnpm", ["install", "--frozen-lockfile"], { cwd: pdsRepo });
  }

  run("pnpm", ["build"], { cwd: pdsRepo });
}

function resolvePdsRepo(explicitPath) {
  const candidates = [explicitPath].filter(Boolean);

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);

    if (isPdsRepo(resolved)) {
      return resolved;
    }
  }

  throw new Error(
    "Could not find the PDS repo. Pass --pds-repo <path> with a valid PDS checkout."
  );
}

function resolvePackageSource(options, targetDir) {
  if (options.pdsRepo) {
    return {
      explicit: true,
      repo: resolvePdsRepo(options.pdsRepo),
      type: "local"
    };
  }

  const envRepo = process.env.PDS_REPO;

  if (envRepo && isPdsRepo(path.resolve(envRepo))) {
    return {
      explicit: false,
      repo: path.resolve(envRepo),
      type: "local"
    };
  }

  const detectedRepo =
    findNearestPdsRepo(process.cwd()) ?? findNearestPdsRepo(targetDir);

  if (detectedRepo) {
    return {
      explicit: false,
      repo: detectedRepo,
      type: "local"
    };
  }

  return { type: "registry" };
}

function findNearestPdsRepo(startDir) {
  let current = path.resolve(startDir);

  while (true) {
    if (isPdsRepo(current)) {
      return current;
    }

    const parent = path.dirname(current);

    if (parent === current) {
      return null;
    }

    current = parent;
  }
}

function isPdsRepo(candidate) {
  const packagePath = path.join(candidate, "package.json");
  const tokenPackagePath = path.join(candidate, "packages/tokens/package.json");
  const reactPackagePath = path.join(candidate, "packages/react/package.json");

  if (
    !existsSync(packagePath) ||
    !existsSync(tokenPackagePath) ||
    !existsSync(reactPackagePath)
  ) {
    return false;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    const tokenPackageJson = JSON.parse(readFileSync(tokenPackagePath, "utf8"));
    const reactPackageJson = JSON.parse(readFileSync(reactPackagePath, "utf8"));

    return (
      packageJson.name === "@pds/workspace" &&
      tokenPackageJson.name === "@pds/tokens" &&
      reactPackageJson.name === "@pds/react"
    );
  } catch {
    return false;
  }
}

function ensureCommand(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });

  if (result.status !== 0) {
    throw new Error(`Required command not available: ${command}`);
  }
}

function ensureRegistryPdsPackages() {
  const result = spawnSync("pnpm", ["view", "@pds/react@latest", "version"], {
    encoding: "utf8",
    stdio: "pipe"
  });

  if (result.status === 0) {
    return;
  }

  const details = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim();

  throw new Error(`@pds/react@latest is not available from the configured npm registry.
Publish @pds/tokens and @pds/react first, or pass --pds-repo <path> with a local PDS checkout.
No app files were written to the target folder.${details ? `\n\nRegistry output:\n${details}` : ""}`);
}

function ensureExistingDirectory(targetDir) {
  if (!existsSync(targetDir) || !statSync(targetDir).isDirectory()) {
    throw new Error(`Target must be an existing directory: ${targetDir}`);
  }
}

function ensureEmptyTargetDirectory(targetDir) {
  if (existsSync(targetDir) && !statSync(targetDir).isDirectory()) {
    throw new Error(`Target exists but is not a directory: ${targetDir}`);
  }

  mkdirSync(targetDir, { recursive: true });

  const unsafeEntries = readdirSync(targetDir).filter(
    (entry) => !SAFE_EXISTING_ENTRIES.has(entry)
  );

  if (unsafeEntries.length > 0) {
    throw new Error(
      `Target folder must be empty. Found: ${unsafeEntries.join(", ")}`
    );
  }
}

function isReactProject(targetDir) {
  const packagePath = path.join(targetDir, "package.json");

  if (!existsSync(packagePath)) {
    return false;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    const dependencyGroups = [
      packageJson.dependencies,
      packageJson.devDependencies,
      packageJson.peerDependencies
    ];

    return dependencyGroups.some((group) => Boolean(group?.react));
  } catch {
    return false;
  }
}

function packPdsPackages(pdsRepo, packDir) {
  run(
    "pnpm",
    ["--dir", path.join(pdsRepo, "packages/tokens"), "pack", "--pack-destination", packDir],
    { cwd: pdsRepo }
  );
  run(
    "pnpm",
    ["--dir", path.join(pdsRepo, "packages/react"), "pack", "--pack-destination", packDir],
    { cwd: pdsRepo }
  );
}

function createViteApp(viteDir) {
  run("pnpm", ["create", "vite@latest", ".", "--template", "react-ts"], {
    cwd: viteDir
  });
}

function copyDirectoryContents(sourceDir, targetDir, options = {}) {
  const exclude = options.exclude ?? new Set();

  for (const entry of readdirSync(sourceDir)) {
    if (exclude.has(entry)) {
      continue;
    }

    cpSync(path.join(sourceDir, entry), path.join(targetDir, entry), {
      force: true,
      recursive: true
    });
  }
}

function writeStarterFiles(appDir, targetDir) {
  const srcDir = path.join(appDir, "src");
  const publicDir = path.join(appDir, "public");

  writeFileSync(
    path.join(appDir, "vite.config.ts"),
    `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()]
});
`,
    "utf8"
  );

  writeFileSync(
    path.join(srcDir, "main.tsx"),
    `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@pds/react/styles.css";
import "./index.css";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
    "utf8"
  );

  writeFileSync(
    path.join(srcDir, "App.tsx"),
    `import {
  Badge,
  Button,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceHeader,
  SurfaceTitle
} from "@pds/react/starter";

const readinessItems = [
  "PDS styles load from the package root",
  "Starter components import from the public @pds/react/starter API",
  "Layout CSS uses PDS tokens"
];

export function App() {
  return (
    <main className="app-shell">
      <Surface className="starter-panel" level="elevated">
        <SurfaceHeader>
          <div>
            <SurfaceTitle>Design workspace</SurfaceTitle>
            <SurfaceDescription>
              A PDS-backed React surface ready for product exploration.
            </SurfaceDescription>
          </div>
          <SurfaceAction>
            <Badge tone="accent">Ready</Badge>
          </SurfaceAction>
        </SurfaceHeader>
        <SurfaceContent>
          <ul className="readiness-list">
            {readinessItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="app-actions">
            <Button type="button">Start designing</Button>
            <Button intent="secondary" type="button">
              Review tokens
            </Button>
          </div>
        </SurfaceContent>
      </Surface>
    </main>
  );
}
`,
    "utf8"
  );

  writeFileSync(
    path.join(srcDir, "index.css"),
    `:root {
  color: var(--pds-color-foreground);
  background: var(--pds-color-base-grouped-background);
  font-family: var(--pds-font-sans);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  color: var(--pds-color-foreground);
  background: var(--pds-color-base-grouped-background);
}

button,
input,
textarea,
select {
  font: inherit;
}

#root {
  min-height: 100vh;
}

.app-shell {
  display: grid;
  width: min(var(--pds-layout-content-max), calc(100vw - var(--pds-space-sp-800)));
  min-height: 100vh;
  margin: 0 auto;
  align-content: center;
  padding: var(--pds-space-sp-800) 0;
}

.starter-panel {
  width: 100%;
}

.readiness-list {
  display: grid;
  gap: var(--pds-space-sp-200);
  margin: 0;
  padding-left: var(--pds-space-sp-500);
  color: var(--pds-color-grey-tone-50);
}

.readiness-list li::marker {
  color: var(--pds-color-accent);
}

.app-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--pds-space-sp-200);
  margin-top: var(--pds-space-sp-500);
}

/* Keep in sync with --pds-layout-breakpoint-narrow. */
@media (max-width: 760px) {
  .app-shell {
    width: min(100% - var(--pds-space-sp-400), var(--pds-layout-content-max));
    align-content: start;
    padding: var(--pds-space-sp-500) 0;
  }
}
`,
    "utf8"
  );

  updatePackageJson(appDir, targetDir);
  rmSync(path.join(srcDir, "App.css"), { force: true });
  rmSync(path.join(srcDir, "assets"), { force: true, recursive: true });
  rmSync(path.join(publicDir, "vite.svg"), { force: true });
}

function updatePackageJson(appDir, targetDir) {
  const packagePath = path.join(appDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  const generatedName = path.basename(targetDir).toLowerCase();
  const safeName = generatedName
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  packageJson.name = safeName || "pds-app";
  writeFileSync(`${packagePath}`, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

function installRegistryPdsPackages(targetDir) {
  writePdsPackageDependencies(targetDir, {
    "@pds/react": "latest"
  });

  run("pnpm", ["install"], { cwd: targetDir });
}

function installRegistryPdsPackage(targetDir, packageManager) {
  run(packageManager.command, packageManager.add("@pds/react@latest"), {
    cwd: targetDir
  });
}

function installLocalPdsPackages(targetDir, packDir) {
  const packs = readdirSync(packDir).filter((entry) => entry.endsWith(".tgz"));
  const tokensPack = packs.find((entry) => entry.startsWith("pds-tokens-"));
  const reactPack = packs.find((entry) => entry.startsWith("pds-react-"));

  if (!tokensPack || !reactPack) {
    throw new Error(`Missing packed PDS tarballs in ${packDir}`);
  }

  const targetPackDir = path.join(targetDir, ".pds-packages");

  mkdirSync(targetPackDir, { recursive: true });
  cpSync(path.join(packDir, tokensPack), path.join(targetPackDir, tokensPack));
  cpSync(path.join(packDir, reactPack), path.join(targetPackDir, reactPack));
  const tokensSpec = `file:${toPosix(path.join(".pds-packages", tokensPack))}`;
  const reactSpec = `file:${toPosix(path.join(".pds-packages", reactPack))}`;

  writePdsPackageDependencies(
    targetDir,
    {
      "@pds/react": reactSpec,
      "@pds/tokens": tokensSpec
    },
    {
      "@pds/tokens": tokensSpec
    }
  );

  run("pnpm", ["install"], { cwd: targetDir });
}

function writePdsPackageDependencies(targetDir, dependencies, overrides = {}) {
  const packagePath = path.join(targetDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));

  packageJson.dependencies = {
    ...(packageJson.dependencies ?? {}),
    ...dependencies
  };

  if (Object.keys(overrides).length > 0) {
    packageJson.pnpm = {
      ...(packageJson.pnpm ?? {}),
      overrides: {
        ...(packageJson.pnpm?.overrides ?? {}),
        ...overrides
      }
    };
  }

  writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

export function detectPackageManager(targetDir) {
  if (existsSync(path.join(targetDir, "pnpm-lock.yaml"))) {
    return {
      add: (specifier) => ["add", specifier],
      command: "pnpm",
      name: "pnpm"
    };
  }

  if (
    existsSync(path.join(targetDir, "package-lock.json")) ||
    existsSync(path.join(targetDir, "npm-shrinkwrap.json"))
  ) {
    return {
      add: (specifier) => ["install", specifier],
      command: "npm",
      name: "npm"
    };
  }

  if (existsSync(path.join(targetDir, "yarn.lock"))) {
    return {
      add: (specifier) => ["add", specifier],
      command: "yarn",
      name: "yarn"
    };
  }

  if (
    existsSync(path.join(targetDir, "bun.lock")) ||
    existsSync(path.join(targetDir, "bun.lockb"))
  ) {
    return {
      add: (specifier) => ["add", specifier],
      command: "bun",
      name: "bun"
    };
  }

  return {
    add: (specifier) => ["add", specifier],
    command: "pnpm",
    name: "pnpm"
  };
}

export function findSafeRootEntrypoint(projectDir) {
  const matches = ROOT_ENTRYPOINT_CANDIDATES
    .map((relativePath) => ({
      absolutePath: path.join(projectDir, relativePath),
      relativePath
    }))
    .filter((candidate) => existsSync(candidate.absolutePath));

  if (matches.length !== 1) {
    return {
      matches,
      status: matches.length === 0 ? "missing" : "ambiguous"
    };
  }

  return {
    filePath: matches[0].absolutePath,
    matches,
    relativePath: matches[0].relativePath,
    status: "found"
  };
}

export function addPdsStylesImport(projectDir) {
  const entrypoint = findSafeRootEntrypoint(projectDir);

  if (entrypoint.status !== "found") {
    return entrypoint;
  }

  const source = readFileSync(entrypoint.filePath, "utf8");
  const nextSource = insertPdsStylesImport(source);

  if (nextSource === source) {
    return {
      ...entrypoint,
      status: "already"
    };
  }

  writeFileSync(entrypoint.filePath, nextSource, "utf8");

  return {
    ...entrypoint,
    status: "updated"
  };
}

export function insertPdsStylesImport(source) {
  if (source.includes("@pds/react/styles.css")) {
    return source;
  }

  const importLine = 'import "@pds/react/styles.css";';
  const localCssImport = /^import\s+["']\.{1,2}\/[^"']+\.css["'];?\s*$/m;
  const localCssMatch = localCssImport.exec(source);

  if (localCssMatch?.index !== undefined) {
    return `${source.slice(0, localCssMatch.index)}${importLine}\n${source.slice(
      localCssMatch.index
    )}`;
  }

  const lines = source.split("\n");
  let insertIndex = 0;

  while (insertIndex < lines.length && lines[insertIndex].trim() === "") {
    insertIndex += 1;
  }

  while (
    insertIndex < lines.length &&
    /^["']use [^"']+["'];?$/.test(lines[insertIndex].trim())
  ) {
    insertIndex += 1;
  }

  lines.splice(insertIndex, 0, importLine);
  return lines.join("\n");
}

function styleImportMessage(result, projectDir) {
  if (result.status === "updated") {
    return `Stylesheet import added to ${path.relative(projectDir, result.filePath)}.`;
  }

  if (result.status === "already") {
    return `Stylesheet import already present in ${path.relative(projectDir, result.filePath)}.`;
  }

  if (result.status === "missing") {
    return "Stylesheet import skipped: no supported React root entrypoint was detected.";
  }

  return `Stylesheet import skipped: multiple root entrypoints matched (${result.matches
    .map((match) => match.relativePath)
    .join(", ")}).`;
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function run(command, args, options) {
  console.log(`> ${command} ${args.map(shellQuote).join(" ")}`);

  const result = spawnSync(command, args, {
    stdio: "inherit",
    ...options
  });

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function shellQuote(value) {
  if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(value)) {
    return value;
  }

  return `'${value.replaceAll("'", "'\\''")}'`;
}

function isMain() {
  return (
    process.argv[1] &&
    import.meta.url === pathToFileURL(fileURLToPath(import.meta.url)).href &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  );
}

if (isMain()) {
  try {
    runStartPdsProject();
  } catch (error) {
    console.error("");
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
