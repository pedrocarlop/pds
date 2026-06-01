import { strict as assert } from "node:assert";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { installPdsProjectContext } from "../plugins/pds/skills/start/scripts/pds-project-context.mjs";
import {
  addPdsStylesImport,
  findSafeRootEntrypoint,
  insertPdsStylesImport,
  resolveStartMode
} from "../plugins/pds/skills/start/scripts/start-pds-project.mjs";

const tempDirs = [];

try {
  await testModeResolution();
  await testContextInstallerIdempotency();
  await testStyleImportInsertion();
  await testAmbiguousEntrypoints();
  console.log("PDS start workflow check passed.");
} finally {
  await Promise.all(
    tempDirs.map((directory) => rm(directory, { force: true, recursive: true }))
  );
}

async function testModeResolution() {
  const emptyDir = makeTempDir();
  writeFileSync(path.join(emptyDir, ".gitignore"), "node_modules\n", "utf8");
  assert.equal(resolveStartMode(emptyDir), "new");

  const reactDir = makeTempDir();
  writeFileSync(
    path.join(reactDir, "package.json"),
    `${JSON.stringify({ dependencies: { react: "^19.0.0" } }, null, 2)}\n`,
    "utf8"
  );
  assert.equal(resolveStartMode(reactDir), "adopt");

  const nonReactDir = makeTempDir();
  writeFileSync(
    path.join(nonReactDir, "package.json"),
    `${JSON.stringify({ dependencies: { vite: "latest" } }, null, 2)}\n`,
    "utf8"
  );
  assert.throws(() => resolveStartMode(nonReactDir), /--mode context/);
  assert.equal(resolveStartMode(nonReactDir, "context"), "context");
}

async function testContextInstallerIdempotency() {
  const projectDir = makeTempDir();
  const first = installPdsProjectContext(projectDir, { adapterMode: "merge" });
  const second = installPdsProjectContext(projectDir, { adapterMode: "merge" });

  assert.ok(first.contextPath.endsWith("docs/pds/context"));
  assert.ok(first.adapters.length > 0);
  assert.equal(second.adapters.length, 0);
}

async function testStyleImportInsertion() {
  const projectDir = makeTempDir();
  await mkdir(path.join(projectDir, "src"), { recursive: true });
  writeFileSync(
    path.join(projectDir, "src/main.tsx"),
    `import { StrictMode } from "react";
import "./index.css";

console.log(StrictMode);
`,
    "utf8"
  );

  const direct = insertPdsStylesImport('import "./index.css";\n');
  assert.equal(direct, 'import "@pds/react/styles.css";\nimport "./index.css";\n');

  const result = addPdsStylesImport(projectDir);
  assert.equal(result.status, "updated");

  const source = readFileSync(path.join(projectDir, "src/main.tsx"), "utf8");
  assert.ok(
    source.indexOf('import "@pds/react/styles.css";') <
      source.indexOf('import "./index.css";')
  );
  assert.equal(addPdsStylesImport(projectDir).status, "already");
}

async function testAmbiguousEntrypoints() {
  const projectDir = makeTempDir();
  await mkdir(path.join(projectDir, "src"), { recursive: true });
  writeFileSync(path.join(projectDir, "src/main.tsx"), "", "utf8");
  writeFileSync(path.join(projectDir, "src/index.tsx"), "", "utf8");

  assert.equal(findSafeRootEntrypoint(projectDir).status, "ambiguous");
}

function makeTempDir() {
  const directory = mkdtempSync(path.join(tmpdir(), "pds-start-check-"));
  tempDirs.push(directory);
  return directory;
}
