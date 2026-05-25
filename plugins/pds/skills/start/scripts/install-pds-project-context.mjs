#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";

import { installPdsProjectContext } from "./pds-project-context.mjs";

try {
  main();
} catch (error) {
  console.error("");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const targetDir = path.resolve(options.target ?? process.cwd());
  const result = installPdsProjectContext(targetDir, {
    adapterMode: options.forceAdapters ? "replace" : "merge"
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

    if (arg === "--force-adapters") {
      options.forceAdapters = true;
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
  const scriptPath = path.relative(
    process.cwd(),
    fileURLToPath(import.meta.url)
  );

  console.log(`Usage:
  node ${scriptPath} [--target <project-path>]
  node ${scriptPath} --target <project-path> --force-adapters

Installs or refreshes project-local PDS guidance in an existing app. The script
copies the generated PDS plugin context into docs/pds/context and creates or
merges AGENTS.md, CLAUDE.md, and DESIGN.md adapter sections.`);
}
