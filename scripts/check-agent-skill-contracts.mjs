import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

const skillContracts = {
  audit: [
    "## Command",
    "## Minimum Read Path",
    "## Workflow",
    "## Report Shape"
  ],
  "create-component": [
    "## Command",
    "## Inputs",
    "## Minimum Read Path",
    "## Pre-build Preview",
    "## Workflow",
    "## Defaults",
    "## Completion Message"
  ],
  help: [
    "## Command",
    "## Minimum Read Path",
    "## Skill Picker",
    "## Teaching Flow",
    "## Common Checks",
    "## Output Shape"
  ],
  "implement-screen": [
    "## Command",
    "## Inputs",
    "## Minimum Read Path",
    "## Structure Selection",
    "## Pre-build Preview",
    "## Workflow",
    "## Defaults",
    "## Completion Message"
  ],
  "review-pds": [
    "## Command",
    "## Minimum Read Path",
    "## Workflow",
    "## Review Checklist",
    "## Output Shape"
  ],
  "self-improve": [
    "## Command",
    "## Minimum Read Path",
    "## Workflow",
    "## Response Shape"
  ],
  start: [
    "## Command",
    "## Minimum Read Path",
    "## Behavior",
    "## Invocation",
    "## Completion Message"
  ]
};

const skillIds = Object.keys(skillContracts).sort();
const skillsIndex = await readRootFile("docs/agent/skills/README.md");
const pluginReadme = await readRootFile("plugins/pds/README.md");

for (const skillId of skillIds) {
  await checkSkill(skillId);
}

await checkNoUnexpectedSkills();

if (failures.length > 0) {
  console.error("Agent skill contract check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Agent skill contract check passed (${skillIds.length} skills).`);
}

async function checkSkill(skillId) {
  const canonicalPath = `docs/agent/skills/${skillId}.md`;
  const adapterPath = `plugins/pds/skills/${skillId}/SKILL.md`;
  const command = `/pds:${skillId}`;

  await expectFile(canonicalPath);
  await expectFile(adapterPath);

  const canonical = await readRootFile(canonicalPath);
  const adapter = await readRootFile(adapterPath);
  const adapterFrontmatter = parseFrontmatter(adapter);

  expectIncludes(canonicalPath, canonical, [
    `Command: \`${command}\``,
    "[router.md](../router.md)",
    ...skillContracts[skillId]
  ]);

  expectIncludes("docs/agent/skills/README.md", skillsIndex, [
    `${skillId}.md`,
    command
  ]);
  expectIncludes("plugins/pds/README.md", pluginReadme, [
    command
  ]);
  expectIncludes(adapterPath, adapter, [
    `name: ${skillId}`,
    `../../context/docs/agent/skills/${skillId}.md`
  ]);

  if (!adapterFrontmatter) {
    report(adapterPath, "missing YAML frontmatter");
    return;
  }

  if (adapterFrontmatter.get("name") !== skillId) {
    report(adapterPath, `frontmatter name must be "${skillId}"`);
  }

  const description = adapterFrontmatter.get("description");

  if (!description || description.length < 40) {
    report(adapterPath, "frontmatter description must explain when to use the skill");
  }
}

async function checkNoUnexpectedSkills() {
  const canonicalIds = await collectSkillIds("docs/agent/skills", (fileName) =>
    fileName === "README.md"
  );
  const adapterIds = await collectAdapterIds();

  for (const skillId of canonicalIds) {
    if (!skillIds.includes(skillId)) {
      report(
        `docs/agent/skills/${skillId}.md`,
        "skill exists without a contract entry in check-agent-skill-contracts.mjs"
      );
    }
  }

  for (const skillId of adapterIds) {
    if (!skillIds.includes(skillId)) {
      report(
        `plugins/pds/skills/${skillId}`,
        "adapter exists without a contract entry in check-agent-skill-contracts.mjs"
      );
    }
  }
}

async function collectSkillIds(directory, ignore) {
  const entries = await readdir(path.join(root, directory), {
    withFileTypes: true
  });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(".md"))
    .filter((fileName) => !ignore(fileName))
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .sort();
}

async function collectAdapterIds() {
  const entries = await readdir(path.join(root, "plugins/pds/skills"), {
    withFileTypes: true
  });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

async function expectFile(filePath) {
  try {
    await access(path.join(root, filePath));
  } catch {
    report(filePath, "required skill contract evidence is missing");
  }
}

function expectIncludes(filePath, source, fragments) {
  for (const fragment of fragments) {
    if (!source.includes(fragment)) {
      report(filePath, `must include "${fragment}"`);
    }
  }
}

function parseFrontmatter(source) {
  if (!source.startsWith("---\n")) {
    return null;
  }

  const endIndex = source.indexOf("\n---", 4);

  if (endIndex === -1) {
    return null;
  }

  const fields = new Map();
  const frontmatter = source.slice(4, endIndex).trim();

  for (const line of frontmatter.split(/\r?\n/)) {
    const match = /^([a-zA-Z0-9-]+):\s*(.+?)\s*$/.exec(line);

    if (match) {
      fields.set(match[1], match[2]);
    }
  }

  return fields;
}

async function readRootFile(filePath) {
  return readFile(path.join(root, filePath), "utf8");
}

function report(filePath, message) {
  failures.push(`${filePath}: ${message}`);
}

