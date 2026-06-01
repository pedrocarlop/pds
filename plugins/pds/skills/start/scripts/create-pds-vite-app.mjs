#!/usr/bin/env node
import { runStartPdsProject } from "./start-pds-project.mjs";

try {
  runStartPdsProject(["--mode", "new", ...process.argv.slice(2)]);
} catch (error) {
  console.error("");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
