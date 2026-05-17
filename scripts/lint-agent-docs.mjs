import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];
const ignoredDirectories = new Set([
  ".git",
  ".turbo",
  "dist",
  "node_modules"
]);
const stalePathPatterns = [
  "docs/ai",
  "docs/patterns",
  "llm-guidelines",
  "packages/react/docs/components",
  "docs/components"
];

function report(filePath, message, lineNumber) {
  const location = lineNumber ? `${filePath}:${lineNumber}` : filePath;
  failures.push(`${location}: ${message}`);
}

function relativeToRoot(absolutePath) {
  return path.relative(root, absolutePath);
}

function lineNumberFor(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function collectMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const targets = [];

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      targets.push(...(await collectMarkdownFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      targets.push(absolutePath);
    }
  }

  return targets;
}

function parseFrontmatter(source) {
  if (!source.startsWith("---\n")) {
    return null;
  }

  const endIndex = source.indexOf("\n---", 4);

  if (endIndex === -1) {
    return null;
  }

  const frontmatter = source.slice(4, endIndex).trim();
  const fields = new Map();

  for (const line of frontmatter.split(/\r?\n/)) {
    const match = /^([a-zA-Z0-9-]+):\s*(.+?)\s*$/.exec(line);

    if (match) {
      fields.set(match[1], match[2]);
    }
  }

  return fields;
}

function isExternalLink(target) {
  return (
    target.startsWith("#") ||
    target.startsWith("mailto:") ||
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.includes("://")
  );
}

async function lintMarkdownLinks(markdownFiles) {
  const linkPattern = /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

  for (const markdownFile of markdownFiles) {
    const source = await readFile(markdownFile, "utf8");
    const relativeFile = relativeToRoot(markdownFile);
    const withoutCodeFences = source.replace(/```[\s\S]*?```/g, "");

    for (const stalePath of stalePathPatterns) {
      const index = source.indexOf(stalePath);

      if (index !== -1) {
        report(
          relativeFile,
          `stale agent documentation path "${stalePath}"`,
          lineNumberFor(source, index)
        );
      }
    }

    for (const match of withoutCodeFences.matchAll(linkPattern)) {
      const [rawLink, rawTarget] = match;
      const target = rawTarget.replace(/^<|>$/g, "").split("#")[0];

      if (!target || isExternalLink(target)) {
        continue;
      }

      const absoluteTarget = path.resolve(path.dirname(markdownFile), target);

      if (!(await exists(absoluteTarget))) {
        report(
          relativeFile,
          `broken local link "${rawLink}"`,
          lineNumberFor(source, match.index ?? 0)
        );
      }
    }
  }
}

async function lintRootAdapters() {
  const agentsPath = path.join(root, "AGENTS.md");
  const claudePath = path.join(root, "CLAUDE.md");
  const agentsSource = await readFile(agentsPath, "utf8");
  const claudeSource = await readFile(claudePath, "utf8");

  if (!agentsSource.includes("docs/agent/README.md")) {
    report("AGENTS.md", "must link to docs/agent/README.md");
  }

  if (!claudeSource.includes("@AGENTS.md")) {
    report("CLAUDE.md", "must import @AGENTS.md");
  }
}

async function lintSkillAdapters() {
  const skillsRoot = path.join(root, "plugins/pds/skills");
  const skillEntries = await readdir(skillsRoot, { withFileTypes: true });

  for (const entry of skillEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const skillName = entry.name;
    const skillPath = path.join(skillsRoot, skillName, "SKILL.md");
    const canonicalPath = path.join(root, "docs/agent/skills", `${skillName}.md`);
    const relativeSkillPath = relativeToRoot(skillPath);
    const source = await readFile(skillPath, "utf8");
    const lineCount = source.split(/\r?\n/).length;
    const frontmatter = parseFrontmatter(source);
    const relativeCanonicalReference = `../../../../docs/agent/skills/${skillName}.md`;

    if (lineCount > 500) {
      report(relativeSkillPath, "SKILL.md must stay under 500 lines");
    }

    if (!frontmatter) {
      report(relativeSkillPath, "missing YAML frontmatter");
    } else {
      if (!frontmatter.has("name")) {
        report(relativeSkillPath, "frontmatter must include name");
      }

      if (!frontmatter.has("description")) {
        report(relativeSkillPath, "frontmatter must include description");
      }
    }

    if (!source.includes(relativeCanonicalReference)) {
      report(
        relativeSkillPath,
        `must point to ${relativeCanonicalReference}`
      );
    }

    if (!(await exists(canonicalPath))) {
      report(relativeSkillPath, `missing canonical workflow ${relativeToRoot(canonicalPath)}`);
    }
  }
}

async function lintCanonicalAgentDirs() {
  const requiredPaths = [
    "docs/agent/README.md",
    "docs/agent/workflow.md",
    "docs/agent/components/README.md",
    "docs/agent/patterns/README.md",
    "docs/agent/skills/README.md"
  ];

  for (const requiredPath of requiredPaths) {
    if (!(await exists(path.join(root, requiredPath)))) {
      report(requiredPath, "required agent documentation file is missing");
    }
  }

  for (const movedDirectory of [
    "docs/ai",
    "docs/patterns",
    "packages/react/docs/components"
  ]) {
    const absolutePath = path.join(root, movedDirectory);

    if (await exists(absolutePath)) {
      const directoryStat = await stat(absolutePath);

      if (directoryStat.isDirectory()) {
        report(movedDirectory, "old agent documentation directory should not exist");
      }
    }
  }
}

const markdownFiles = await collectMarkdownFiles(root);

await lintCanonicalAgentDirs();
await lintRootAdapters();
await lintSkillAdapters();
await lintMarkdownLinks(markdownFiles);

if (failures.length > 0) {
  console.error("Agent documentation lint failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Agent documentation lint passed.");
}
