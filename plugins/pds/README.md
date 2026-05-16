# PDS Plugin

This plugin helps designers and AI coding agents use PDS in React web projects.
It can teach the workflow, audit an existing app, implement a product screen
from a brief or Figma handoff, review generated UI against PDS, or bootstrap an
empty folder into a Vite React TypeScript app.

## Skills

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

## Codex Usage

The repo-local marketplace entry lives at `.agents/plugins/marketplace.json` and
points at `./plugins/pds`. After enabling the plugin in Codex, use `@pds` and
invoke the relevant skill from the target project or empty folder.

Examples:

```sh
/pds:help
/pds:audit
/pds:implement-screen Build the approval review screen from this brief
/pds:review-pds src/App.tsx
/pds:start
```

## Claude Usage

For local testing from this repo:

```sh
claude --plugin-dir ./plugins/pds
```

Then run a namespaced skill from the target project:

```sh
/pds:help
/pds:audit
/pds:implement-screen Build the approval review screen from this brief
/pds:review-pds src/App.tsx
/pds:start
```

Claude plugin skills are namespaced by plugin, so the command is
`/pds:start` rather than a global `/start`.
