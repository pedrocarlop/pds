import { readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const removableDirectories = new Set(["dist", ".turbo"]);
const removableFiles = new Set([".DS_Store"]);
const protectedDirectories = new Set([".git", "node_modules"]);

const removed = [];

async function removePath(target) {
  await rm(target, { force: true, recursive: true });
  removed.push(path.relative(root, target) || ".");
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const target = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (protectedDirectories.has(entry.name)) {
        continue;
      }

      if (removableDirectories.has(entry.name)) {
        await removePath(target);
        continue;
      }

      await walk(target);
      continue;
    }

    if (entry.isFile() && removableFiles.has(entry.name)) {
      await removePath(target);
      continue;
    }
  }
}

await walk(root);

if (removed.length === 0) {
  console.log("Workspace clean: no ignored build/cache artifacts found.");
} else {
  console.log("Removed ignored workspace artifacts:");
  for (const item of removed.sort()) {
    console.log(`- ${item}`);
  }
}
