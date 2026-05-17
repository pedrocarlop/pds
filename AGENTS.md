# Agent Guide

This is the Codex-compatible root adapter for PDS. The canonical agent
documentation lives in [docs/agent](docs/agent/README.md) so humans can review
agent behavior in one place.

## Start Here

1. Read [docs/agent/README.md](docs/agent/README.md) for task routing.
2. Read [DESIGN.md](DESIGN.md) before making visual decisions.
3. Read [docs/agent/workflow.md](docs/agent/workflow.md) before editing files.
4. Follow only the component, pattern, recipe, package, or skill docs needed for
   the task.

## Repository Rules

- Keep this repo token-first. Add or change tokens before hard-coding visual
  values.
- Keep package boundaries explicit: `packages/tokens` owns CSS custom
  properties, and `packages/react` owns PDS React components and styles.
- Do not create websites, docs apps, demos, or new components unless the task
  asks for them.
- Do not commit generated `dist/` output unless publishing policy changes.
- Preserve generated output policy, do not delete `node_modules`, and use
  `pnpm clean:workspace` for ignored build/cache artifacts when cleanup is
  needed.

## Checks

- Run `pnpm check` before handing work back.
- Run `pnpm clean:workspace` after checks when ignored build/cache artifacts
  should be cleared.

Do not duplicate the detailed agent workflow here. Update `docs/agent` instead.
