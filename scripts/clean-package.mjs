import { rm } from "node:fs/promises";
import path from "node:path";

const packageRoot = process.cwd();
const outputDirectory = path.join(packageRoot, "dist");

await rm(outputDirectory, { force: true, recursive: true });
