import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const packageRoot = process.cwd();
const sourceRoot = path.join(packageRoot, "src");
const outputRoot = path.join(packageRoot, "dist");

async function copyCssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await copyCssFiles(source);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".css")) {
      continue;
    }

    const output = path.join(outputRoot, path.relative(sourceRoot, source));
    await mkdir(path.dirname(output), { recursive: true });
    await cp(source, output);
  }
}

await copyCssFiles(sourceRoot);
