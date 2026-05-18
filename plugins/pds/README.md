# PDS Plugin

This plugin helps designers and AI coding agents use PDS in React web projects.
It can teach the workflow, audit an existing app, implement a product screen
from a brief or Figma handoff, review generated UI against PDS, learn from
design feedback, or bootstrap an empty folder into a Vite React TypeScript app.

## Skills

Canonical skill workflows live in
[docs/agent/skills](../../docs/agent/skills/README.md). The `SKILL.md` files in
this plugin are discovery adapters for Codex and Claude.

- `/pds:help`: onboarding guide for choosing the right PDS workflow, inspecting
  a project, understanding what the plugin checks, and troubleshooting common
  adoption issues.
- `/pds:audit`: read-only project audit for PDS adoption. Detects the web
  stack, package/style integration, likely app entrypoints, token usage, and
  migration risks.
- `/pds:implement-screen`: creates or modifies a React web screen from a
  product brief, screenshot, or Figma handoff using PDS recipes, patterns,
  tokens, and public React components.
- `/pds:review-pds`: review pass for generated or changed UI. Checks PDS
  imports, stylesheet wiring, token usage, component fit, accessibility, content
  resilience, and state coverage.
- `/pds:self-improve`: internal feedback loop for user design critique. Inspects
  why a PDS output or review missed the mark, fixes the artifact when needed,
  and updates the smallest durable guidance owner. Component feedback should
  self-improve the matching component context doc.
- `/pds:start`: bootstraps a new Vite React TypeScript app wired to PDS.

## What `/pds:start` Creates

- Vite React TypeScript app files.
- Local installs for packed `@pds/tokens` and `pds` tarballs.
- A root import for `pds/styles.css`.
- A first PDS screen built from public `pds` component imports.
- Token-based root CSS for background, foreground, typography, and layout.

## Requirements

- Node compatible with the PDS workspace engines.
- `pnpm >= 9`.
- A local checkout of the PDS repo.
- An empty target folder, or a folder that only contains `.git`,
  `.gitignore`, or `.DS_Store`.

If the plugin cannot find the PDS repo automatically, set `PDS_REPO_PATH` or
pass the repo path as the first argument:

```sh
/pds:start /path/to/PDS
```

## Install In Codex

Use this setup when you want `/pds:*` commands to work from Codex in any
project.

1. Keep the PDS repository folder somewhere permanent on your computer. The
   plugin skills point back to docs in this repository, so do not copy only the
   `plugins/pds` folder.
2. Open Codex.
3. Open the PDS repository folder in Codex.
4. Ask Codex:

```text
Install the PDS plugin from this repository for my Codex app. Use
.agents/plugins/marketplace.json, enable pds@pds-local, and tell me when I need
to restart Codex.
```

5. Restart Codex so it reloads local plugin marketplaces.
6. Open any React project in Codex and type:

```text
/pds:help
```

If Codex does not recognize `/pds:help`, open the PDS repository in Codex again
and repeat step 4.

The repo-local marketplace entry lives at `.agents/plugins/marketplace.json`.
It points at `./plugins/pds`, relative to the PDS repository root.

## Codex Usage

After enabling the plugin in Codex, use `@pds` or invoke the relevant skill from
the target project or empty folder.

Examples:

```sh
/pds:help
/pds:audit
/pds:implement-screen Build the approval review screen from this brief
/pds:review-pds src/App.tsx
/pds:self-improve The component feedback is that this Button treatment hides the primary action
/pds:start
```

## Install In Claude

Use this setup when you want to run the plugin in Claude Code.

1. Keep the PDS repository folder somewhere permanent on your computer.
2. Open Terminal.
3. Go to the PDS repository folder:

```sh
cd /path/to/PDS
```

4. Start Claude with the local plugin:

```sh
claude --plugin-dir ./plugins/pds
```

5. Type:

```text
/pds:help
```

If Claude cannot find the plugin, check that the Terminal is inside the PDS
repository folder and that `plugins/pds` exists.

## Claude Usage

Run a namespaced skill from the target project:

```sh
/pds:help
/pds:audit
/pds:implement-screen Build the approval review screen from this brief
/pds:review-pds src/App.tsx
/pds:self-improve The component feedback is that this Button treatment hides the primary action
/pds:start
```

Claude plugin skills are namespaced by plugin, so the command is
`/pds:start` rather than a global `/start`.
