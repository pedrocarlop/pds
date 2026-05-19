# PDS Plugin

This plugin helps designers and AI coding agents use PDS in React web projects.
It can teach the workflow, audit an existing app, implement a product screen
from a brief or Figma handoff, create reusable PDS React components, review
generated UI against PDS, learn from design feedback, or bootstrap an empty
folder into a Vite React TypeScript app.

## Skills

Canonical skill workflows live in
[docs/agent/skills](../../docs/agent/skills/README.md). The installed plugin
ships a generated context copy under [context](context), and the `SKILL.md`
files are discovery adapters for Codex and Claude.

- `/pds:help`: onboarding guide for choosing the right PDS workflow, inspecting
  a project, understanding what the plugin checks, and troubleshooting common
  adoption issues.
- `/pds:audit`: read-only project audit for PDS adoption. Detects the web
  stack, package/style integration, likely app entrypoints, token usage, and
  migration risks.
- `/pds:implement-screen`: creates or modifies a React web screen from a
  product brief, screenshot, or Figma handoff using PDS recipes, patterns,
  tokens, and public React components.
- `/pds:create-component`: creates a reusable PDS React component from a brief
  or pasted unstyled React code, then adds the component contract, source,
  token-based CSS, tests, public exports, and Ladle preview.
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
- Registry install for `@pds/react@latest`.
- A root import for `@pds/react/styles.css`.
- A first PDS screen built from public `@pds/react` component imports.
- Token-based root CSS for background, foreground, typography, and layout.

## Requirements

- Node compatible with the PDS workspace engines.
- `pnpm >= 9`.
- An empty target folder, or a folder that only contains `.git`,
  `.gitignore`, or `.DS_Store`.

If `@pds/react@latest` is not available from the configured registry, the
starter stops before writing app files. For local package tarball development
before publishing, pass a PDS checkout:

```sh
/pds:start --pds-repo /path/to/PDS
```

## Install In Codex

Use this setup when you want `/pds:*` commands to work from Codex in any
project.

Run the installer from any folder:

```sh
npx @pds/cli@latest install --tool codex
```

Restart Codex so it reloads plugins, then open any React project and type:

```text
/pds:help
```

Codex copy-paste prompt:

```text
Run `npx @pds/cli@latest install --tool codex`, restart Codex, then use
`/pds:help`.
```

## Codex Usage

After enabling the plugin in Codex, use `@pds` or invoke the relevant skill from
the target project or empty folder.

Examples:

```sh
/pds:help
/pds:audit
/pds:implement-screen Build the approval review screen from this brief
/pds:create-component Create a banner component
/pds:review-pds src/App.tsx
/pds:self-improve The component feedback is that this Button treatment hides the primary action
/pds:start
```

## Install In Claude

Run the installer from any folder:

```sh
npx @pds/cli@latest install --tool claude
```

Restart Claude, then type:

```text
/pds:help
```

## Claude Usage

Run a namespaced skill from the target project:

```sh
/pds:help
/pds:audit
/pds:implement-screen Build the approval review screen from this brief
/pds:create-component Create a banner component
/pds:review-pds src/App.tsx
/pds:self-improve The component feedback is that this Button treatment hides the primary action
/pds:start
```

Claude plugin skills are namespaced by plugin, so the command is
`/pds:start` rather than a global `/start`.
