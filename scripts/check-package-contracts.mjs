import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

const rootPackage = await readJson("package.json");

expectScript("package.json", rootPackage, "packages:check", "node scripts/check-package-contracts.mjs");
expectScriptIncludes("package.json", rootPackage, "check", ["pnpm packages:check"]);

await checkPackagesIndex();
await checkCliPackage();
await checkReactPackage();
await checkTokensPackage();

if (failures.length > 0) {
  console.error("Package contract check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Package contract check passed.");
}

async function checkPackagesIndex() {
  const source = await readRootFile("packages/README.md");

  expectIncludes("packages/README.md", source, [
    "[`@pds/tokens`](tokens/README.md)",
    "[`@pds/react`](react/README.md)",
    "[`@pds/cli`](cli/README.md)",
    "Dependency Direction"
  ]);
}

async function checkCliPackage() {
  const packagePath = "packages/cli/package.json";
  const packageJson = await readJson(packagePath);
  const readme = await readRootFile("packages/cli/README.md");

  expectEqual(packagePath, packageJson.name, "@pds/cli", "package name");
  expectEqual(packagePath, packageJson.type, "module", "package type");
  expectPublicPackageMetadata(packagePath, packageJson, "packages/cli");
  expectEqual(packagePath, packageJson.bin, { pds: "./src/index.js" }, "bin map");
  expectEqual(packagePath, packageJson.files, ["src"], "published files");
  expectScript(packagePath, packageJson, "build", "node --check src/index.js");
  expectScript(packagePath, packageJson, "typecheck", "node --check src/index.js");
  expectScript(packagePath, packageJson, "test", "vitest run");
  expectScript(packagePath, packageJson, "prepack", "pnpm build");

  expectIncludes("packages/cli/README.md", readme, [
    "npx @pds/cli@latest install",
    "--tool codex",
    "--tool claude",
    "--dry-run",
    "codex plugin add pds@pds",
    "Codex",
    "Claude",
    "plugins/pds/README.md"
  ]);
}

async function checkReactPackage() {
  const packagePath = "packages/react/package.json";
  const packageJson = await readJson(packagePath);
  const readme = await readRootFile("packages/react/README.md");
  const styles = await readRootFile("packages/react/src/styles.css");
  const index = await readRootFile("packages/react/src/index.ts");

  expectEqual(packagePath, packageJson.name, "@pds/react", "package name");
  expectEqual(packagePath, packageJson.type, "module", "package type");
  expectPublicPackageMetadata(packagePath, packageJson, "packages/react");
  expectEqual(packagePath, packageJson.files, ["dist"], "published files");
  expectEqual(packagePath, packageJson.sideEffects, ["**/*.css"], "side effects");
  expectEqual(
    packagePath,
    packageJson.exports,
    {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js"
      },
      "./starter": {
        types: "./dist/starter.d.ts",
        import: "./dist/starter.js"
      },
      "./styles.css": "./dist/styles.css"
    },
    "export map"
  );
  expectIncludes(packagePath, JSON.stringify(packageJson), [
    "\"@pds/tokens\":\"workspace:^\"",
    "\"react\":\"^18.3.0 || ^19.0.0\"",
    "\"react-dom\":\"^18.3.0 || ^19.0.0\""
  ]);
  expectIncludes("packages/react/src/index.ts", index, ['export * from "./components";']);
  expectIncludes("packages/react/src/starter.ts", await readRootFile("packages/react/src/starter.ts"), [
    'from "./components/badge";',
    'from "./components/button";',
    'from "./components/surface";'
  ]);
  expectEqual(
    "packages/react/src/styles.css",
    styles,
    '@import "@pds/tokens/styles.css";\n@import "./components.css";\n',
    "stylesheet imports"
  );
  expectIncludes("packages/react/README.md", readme, [
    "@pds/react/styles.css",
    "@pds/tokens",
    "docs/agent/components",
    "packages/tokens/README.md"
  ]);
}

async function checkTokensPackage() {
  const packagePath = "packages/tokens/package.json";
  const packageJson = await readJson(packagePath);
  const readme = await readRootFile("packages/tokens/README.md");
  const index = await readRootFile("packages/tokens/src/index.ts");
  const styles = await readRootFile("packages/tokens/src/styles.css");
  const cssFiles = await collectTokenCssFiles(styles);
  const scopedCssFiles = cssFiles.filter((fileName) => fileName !== "styles.css");
  const expectedExports = {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/index.js"
    }
  };

  for (const fileName of cssFiles) {
    expectedExports[`./${fileName}`] = `./dist/${fileName}`;
  }

  expectEqual(packagePath, packageJson.name, "@pds/tokens", "package name");
  expectEqual(packagePath, packageJson.type, "module", "package type");
  expectPublicPackageMetadata(packagePath, packageJson, "packages/tokens");
  expectEqual(packagePath, packageJson.files, ["dist"], "published files");
  expectEqual(packagePath, packageJson.sideEffects, ["**/*.css"], "side effects");
  expectEqual(packagePath, packageJson.exports, expectedExports, "export map");

  for (const fileName of scopedCssFiles) {
    expectIncludes("packages/tokens/src/styles.css", styles, [`@import "./${fileName}";`]);
    expectIncludes("packages/tokens/README.md", readme, [
      `src/${fileName}`,
      `@pds/tokens/${fileName}`,
      `docs/foundations/${foundationDocForCss(fileName)}`
    ]);
    expectIncludes("packages/tokens/src/index.ts", index, [
      `"${fileName}"`
    ]);
  }

  expectIncludes("packages/tokens/src/index.ts", index, [
    "tokenPackageName",
    "tokenPrefix",
    "tokenStyleSheet",
    "tokenStyleSheets",
    "tokenScopedStyleSheets"
  ]);
}

async function collectTokenCssFiles(styles) {
  const entries = await readdir(path.join(root, "packages/tokens/src"), {
    withFileTypes: true
  });
  const fileNames = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(".css"))
    .sort();
  const importedFiles = Array.from(styles.matchAll(/@import "\.\/([^"]+)";/g))
    .map((match) => match[1])
    .filter((fileName) => fileNames.includes(fileName));
  const remainingFiles = fileNames
    .filter((fileName) => fileName !== "styles.css")
    .filter((fileName) => !importedFiles.includes(fileName));

  return ["styles.css", ...importedFiles, ...remainingFiles];
}

function foundationDocForCss(fileName) {
  const name = fileName.replace(/\.css$/, "");

  if (name === "layout") {
    return "layout-types.md";
  }

  return `${name}.md`;
}

function expectPublicPackageMetadata(packagePath, packageJson, directory) {
  expectEqual(
    packagePath,
    packageJson.repository,
    {
      type: "git",
      url: "git+https://github.com/pedrocarlop/pds.git",
      directory
    },
    "repository metadata"
  );
  expectEqual(
    packagePath,
    packageJson.homepage,
    "https://github.com/pedrocarlop/pds#readme",
    "homepage"
  );
  expectEqual(
    packagePath,
    packageJson.bugs,
    {
      url: "https://github.com/pedrocarlop/pds/issues"
    },
    "bugs metadata"
  );
  expectEqual(
    packagePath,
    packageJson.publishConfig,
    {
      access: "public"
    },
    "publish config"
  );
}

function expectScript(filePath, packageJson, scriptName, expected) {
  expectEqual(
    filePath,
    packageJson.scripts?.[scriptName],
    expected,
    `script "${scriptName}"`
  );
}

function expectScriptIncludes(filePath, packageJson, scriptName, fragments) {
  const script = packageJson.scripts?.[scriptName] ?? "";

  for (const fragment of fragments) {
    if (!script.includes(fragment)) {
      report(filePath, `script "${scriptName}" must include "${fragment}"`);
    }
  }
}

function expectIncludes(filePath, source, fragments) {
  for (const fragment of fragments) {
    if (!source.includes(fragment)) {
      report(filePath, `must include "${fragment}"`);
    }
  }
}

function expectEqual(filePath, actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    report(
      filePath,
      `${label} must be ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }
}

async function readJson(filePath) {
  return JSON.parse(await readRootFile(filePath));
}

async function readRootFile(filePath) {
  return readFile(path.join(root, filePath), "utf8");
}

function report(filePath, message) {
  failures.push(`${filePath}: ${message}`);
}
