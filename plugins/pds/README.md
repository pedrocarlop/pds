# PDS Plugin

PDS plugin for Codex and Claude. It ships generated [context](context) plus thin
`SKILL.md` adapters that route to the canonical workflows in
[docs/agent/skills](../../docs/agent/skills/README.md).

## Skills

| Command | Use |
| --- | --- |
| `/pds:help` | Choose a workflow or troubleshoot setup. |
| `/pds:audit` | Audit an existing app for PDS adoption. |
| `/pds:implement-screen` | Build or modify a React screen with PDS. |
| `/pds:create-component` | Add a reusable `@pds/react` component. |
| `/pds:review-pds` | Review UI against PDS rules. |
| `/pds:self-improve` | Turn design feedback into durable PDS fixes. |
| `/pds:start` | Bootstrap an empty folder into a PDS Vite app. |

## What `/pds:start` Creates

Vite React TypeScript files, `@pds/react@latest`, a root
`@pds/react/styles.css` import, a token-based first screen, and project-local
PDS guidance in `docs/pds/context` with `AGENTS.md`, `CLAUDE.md`, and
`DESIGN.md` adapters.

For an existing app, refresh the same project-local guidance without replacing
project instructions:

```sh
node <plugin-root>/skills/start/scripts/install-pds-project-context.mjs --target <project-path>
```

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

## Install

```sh
npx @pds/cli@latest install --tool codex
npx @pds/cli@latest install --tool claude
```

Use `--dry-run` to preview files before writing them. Restart Codex or Claude,
then run:

```text
/pds:help
```

Codex copy-paste prompt:

```text
Run `npx @pds/cli@latest install --tool codex`, restart Codex, then use
`/pds:help`.
```

## Usage

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
