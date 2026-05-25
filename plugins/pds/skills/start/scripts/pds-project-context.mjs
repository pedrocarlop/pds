import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const pluginRoot = path.resolve(scriptDir, "../../..");
const defaultContextRoot = path.join(pluginRoot, "context");
const projectContextRelativePath = "docs/pds/context";
const projectReadmeRelativePath = "docs/pds/README.md";
const markerStart = "<!-- pds-guidance:start -->";
const markerEnd = "<!-- pds-guidance:end -->";

const requiredContextFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  "DESIGN.md",
  "README.md",
  "docs/agent/README.md",
  "docs/agent/router.md",
  "docs/agent/workflow.md",
  "docs/agent/living-system.md",
  "docs/agent/readiness-audit.md",
  "docs/agent/evaluation-scenarios.md",
  "docs/agent/skills/README.md",
  "docs/agent/skills/audit.md",
  "docs/agent/skills/create-component.md",
  "docs/agent/skills/help.md",
  "docs/agent/skills/implement-screen.md",
  "docs/agent/skills/review-pds.md",
  "docs/agent/skills/self-improve.md",
  "docs/agent/skills/start.md",
  "docs/agent/components/README.md",
  "docs/agent/patterns/README.md",
  "docs/agent/screen-structures/README.md",
  "docs/foundations/README.md",
  "docs/recipes/add-to-existing-react-app.md",
  "docs/recipes/start-new-react-app.md",
  "docs/reference/README.md",
  "packages/react/README.md",
  "packages/tokens/README.md"
];

export function installPdsProjectContext(targetDir, options = {}) {
  const projectDir = path.resolve(targetDir);
  const contextRoot = path.resolve(options.contextRoot ?? defaultContextRoot);
  const adapterMode = options.adapterMode ?? "merge";

  ensureDirectory(projectDir);
  ensureContext(contextRoot);

  const projectContextDir = path.join(projectDir, projectContextRelativePath);
  rmSync(projectContextDir, { force: true, recursive: true });
  mkdirSync(path.dirname(projectContextDir), { recursive: true });
  cpSync(contextRoot, projectContextDir, {
    force: true,
    recursive: true
  });

  const writtenFiles = [
    writeFile(
      path.join(projectDir, projectReadmeRelativePath),
      projectReadme()
    ),
    writeOrMergeAdapter(
      path.join(projectDir, "AGENTS.md"),
      agentsAdapter(),
      agentsSection(),
      adapterMode
    ),
    writeOrMergeAdapter(
      path.join(projectDir, "CLAUDE.md"),
      claudeAdapter(),
      claudeSection(),
      adapterMode
    ),
    writeOrMergeAdapter(
      path.join(projectDir, "DESIGN.md"),
      designAdapter(),
      designSection(),
      adapterMode
    )
  ];

  return {
    adapters: writtenFiles.filter(Boolean),
    contextPath: projectContextDir,
    projectDir,
    requiredContextFiles: [...requiredContextFiles]
  };
}

function ensureDirectory(directory) {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  if (!statSync(directory).isDirectory()) {
    throw new Error(`Target exists but is not a directory: ${directory}`);
  }
}

function ensureContext(contextRoot) {
  if (!existsSync(contextRoot) || !statSync(contextRoot).isDirectory()) {
    throw new Error(`PDS plugin context is missing: ${contextRoot}`);
  }

  const missingFiles = requiredContextFiles.filter(
    (filePath) => !existsSync(path.join(contextRoot, filePath))
  );

  if (missingFiles.length > 0) {
    throw new Error(
      `PDS plugin context is incomplete. Missing: ${missingFiles.join(", ")}`
    );
  }
}

function writeFile(filePath, content) {
  mkdirSync(path.dirname(filePath), { recursive: true });

  if (existsSync(filePath) && readFileSync(filePath, "utf8") === content) {
    return null;
  }

  writeFileSync(filePath, content, "utf8");
  return filePath;
}

function writeOrMergeAdapter(filePath, fullContent, sectionContent, adapterMode) {
  if (adapterMode === "replace" || !existsSync(filePath)) {
    return writeFile(filePath, fullContent);
  }

  const source = readFileSync(filePath, "utf8");
  const sectionStart = source.indexOf(markerStart);
  const sectionEnd = source.indexOf(markerEnd);
  let nextSource;

  if (sectionStart !== -1 && sectionEnd !== -1 && sectionEnd > sectionStart) {
    nextSource = `${source.slice(0, sectionStart).trimEnd()}\n\n${sectionContent}\n${source
      .slice(sectionEnd + markerEnd.length)
      .trimStart()}`;
  } else {
    nextSource = `${source.trimEnd()}\n\n${sectionContent}\n`;
  }

  if (nextSource === source) {
    return null;
  }

  writeFileSync(filePath, nextSource, "utf8");
  return filePath;
}

function projectReadme() {
  return `# PDS Project Guidance

This directory is generated from the installed PDS plugin context.

- Use [context/docs/agent/router.md](context/docs/agent/router.md) to choose
  the smallest PDS route before creating pages, flows, or components.
- Use [context/DESIGN.md](context/DESIGN.md) before visual decisions.
- Use [context/docs/agent/skills/implement-screen.md](context/docs/agent/skills/implement-screen.md)
  for page and flow work.
- Use [context/docs/agent/skills/create-component.md](context/docs/agent/skills/create-component.md)
  before adding reusable PDS React components.
- Use [context/docs/agent/skills/self-improve.md](context/docs/agent/skills/self-improve.md)
  when design feedback reveals a reusable PDS guidance gap.

Do not edit files under \`context\` by hand. Refresh them from the PDS plugin
with \`node <plugin-root>/skills/start/scripts/install-pds-project-context.mjs --target <project-path>\`.
`;
}

function agentsAdapter() {
  return `# Project Agent Guide

This project uses PDS for React product UI. Keep project-specific instructions
in this file, and keep generated PDS reference material under
\`${projectContextRelativePath}\`.

${sharedGuidanceSection()}
`;
}

function agentsSection() {
  return sharedGuidanceSection();
}

function claudeAdapter() {
  return `@AGENTS.md

${sharedGuidanceSection()}
`;
}

function claudeSection() {
  return sharedGuidanceSection();
}

function designAdapter() {
  return `---
version: alpha
name: PDS project adapter
description: Routes project design and UI work to the local PDS guidance bundle.
---

${sharedGuidanceSection()}
`;
}

function designSection() {
  return sharedGuidanceSection();
}

function sharedGuidanceSection() {
  return `${markerStart}
## PDS Guidance

Before creating or changing UI, read:

1. [PDS router](${projectContextRelativePath}/docs/agent/router.md) to choose the minimum route.
2. [PDS design adapter](${projectContextRelativePath}/DESIGN.md) before visual decisions.
3. [PDS workflow](${projectContextRelativePath}/docs/agent/workflow.md) before editing files.

Use the local PDS skill routes even when the plugin command is not invoked:

- Pages, screens, and flows: [implement-screen](${projectContextRelativePath}/docs/agent/skills/implement-screen.md).
- Reusable PDS React components: [create-component](${projectContextRelativePath}/docs/agent/skills/create-component.md).
- UI reviews: [review-pds](${projectContextRelativePath}/docs/agent/skills/review-pds.md).
- Design feedback and rule gaps: [self-improve](${projectContextRelativePath}/docs/agent/skills/self-improve.md).
- Existing app adoption: [audit](${projectContextRelativePath}/docs/agent/skills/audit.md) and [add-to-existing React app](${projectContextRelativePath}/docs/recipes/add-to-existing-react-app.md).

The generated PDS context includes component contracts, foundations, patterns,
screen structures, recipes, package READMEs, reference docs, readiness evidence,
and evaluation scenarios. Treat \`${projectContextRelativePath}\` as vendored
reference material and refresh it through the PDS installer instead of editing
it by hand.
${markerEnd}`;
}
