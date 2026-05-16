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
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAFE_EXISTING_ENTRIES = new Set([".git", ".gitignore", ".DS_Store"]);

main();

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const targetDir = path.resolve(options.target ?? process.cwd());
  const pdsRepo = resolvePdsRepo(options.pdsRepo);

  ensureCommand("pnpm", ["--version"]);
  ensureTargetDirectory(targetDir);

  console.log(`Target app: ${targetDir}`);
  console.log(`PDS repo: ${pdsRepo}`);

  if (!existsSync(path.join(pdsRepo, "node_modules"))) {
    run("pnpm", ["install", "--frozen-lockfile"], { cwd: pdsRepo });
  }

  run("pnpm", ["build"], { cwd: pdsRepo });

  const packDir = mkdtempSync(path.join(tmpdir(), "pds-packages-"));
  const viteDir = mkdtempSync(path.join(tmpdir(), "pds-vite-"));

  try {
    packPdsPackages(pdsRepo, packDir);
    createViteApp(viteDir);
    copyDirectoryContents(viteDir, targetDir);
    writeStarterFiles(targetDir);
    installPdsPackages(targetDir, packDir);
    run("pnpm", ["build"], { cwd: targetDir });
  } finally {
    rmSync(packDir, { force: true, recursive: true });
    rmSync(viteDir, { force: true, recursive: true });
  }

  console.log("");
  console.log("PDS React app created successfully.");
  console.log(`Run it with: cd ${shellQuote(targetDir)} && pnpm dev`);
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

    if (arg === "--pds-repo") {
      options.pdsRepo = requireValue(args, index, arg);
      index += 1;
      continue;
    }

    if (!options.pdsRepo) {
      options.pdsRepo = arg;
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
  create-pds-vite-app.mjs [pds-repo-path]
  create-pds-vite-app.mjs --pds-repo <path> [--target <path>]

Creates a Vite React TypeScript app in the target folder and installs PDS from
local package tarballs.`);
}

function resolvePdsRepo(explicitPath) {
  const candidates = [
    explicitPath,
    process.env.PDS_REPO_PATH,
    path.resolve(__dirname, "../../../../.."),
    process.cwd()
  ].filter(Boolean);

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);

    if (isPdsRepo(resolved)) {
      return resolved;
    }
  }

  throw new Error(
    "Could not find the PDS repo. Pass --pds-repo <path> or set PDS_REPO_PATH."
  );
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
      reactPackageJson.name === "pds"
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

function ensureTargetDirectory(targetDir) {
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

function copyDirectoryContents(sourceDir, targetDir) {
  for (const entry of readdirSync(sourceDir)) {
    cpSync(path.join(sourceDir, entry), path.join(targetDir, entry), {
      force: true,
      recursive: true
    });
  }
}

function writeStarterFiles(targetDir) {
  const srcDir = path.join(targetDir, "src");
  const publicDir = path.join(targetDir, "public");

  writeFileSync(
    path.join(srcDir, "main.tsx"),
    `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "pds/styles.css";
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
} from "pds";

const readinessItems = [
  "PDS styles load from the package root",
  "Components import from the public pds API",
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
  width: min(960px, calc(100vw - var(--pds-space-sp-800)));
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

@media (max-width: 760px) {
  .app-shell {
    width: min(100% - var(--pds-space-sp-400), 960px);
    align-content: start;
    padding: var(--pds-space-sp-500) 0;
  }
}
`,
    "utf8"
  );

  updatePackageJson(targetDir);
  rmSync(path.join(srcDir, "App.css"), { force: true });
  rmSync(path.join(srcDir, "assets"), { force: true, recursive: true });
  rmSync(path.join(publicDir, "vite.svg"), { force: true });
}

function updatePackageJson(targetDir) {
  const packagePath = path.join(targetDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  const generatedName = path.basename(targetDir).toLowerCase();
  const safeName = generatedName
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  packageJson.name = safeName || "pds-app";
  writeFileSync(`${packagePath}`, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

function installPdsPackages(targetDir, packDir) {
  const packs = readdirSync(packDir).filter((entry) => entry.endsWith(".tgz"));
  const tokensPack = packs.find((entry) => entry.startsWith("pds-tokens-"));
  const reactPack = packs.find(
    (entry) => entry.startsWith("pds-") && !entry.startsWith("pds-tokens-")
  );

  if (!tokensPack || !reactPack) {
    throw new Error(`Missing packed PDS tarballs in ${packDir}`);
  }

  const targetPackDir = path.join(targetDir, ".pds-packages");

  mkdirSync(targetPackDir, { recursive: true });
  cpSync(path.join(packDir, tokensPack), path.join(targetPackDir, tokensPack));
  cpSync(path.join(packDir, reactPack), path.join(targetPackDir, reactPack));
  writePdsPackageDependencies(targetDir, tokensPack, reactPack);

  run("pnpm", ["install"], { cwd: targetDir });
}

function writePdsPackageDependencies(targetDir, tokensPack, reactPack) {
  const packagePath = path.join(targetDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  const tokensSpec = `file:${toPosix(path.join(".pds-packages", tokensPack))}`;
  const reactSpec = `file:${toPosix(path.join(".pds-packages", reactPack))}`;

  packageJson.dependencies = {
    ...(packageJson.dependencies ?? {}),
    "@pds/tokens": tokensSpec,
    pds: reactSpec
  };
  packageJson.pnpm = {
    ...(packageJson.pnpm ?? {}),
    overrides: {
      ...(packageJson.pnpm?.overrides ?? {}),
      "@pds/tokens": tokensSpec
    }
  };

  writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
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
