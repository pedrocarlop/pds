# Agent Guide

Root adapter for Codex-compatible tools. Keep detailed workflow guidance in
[docs/agent](docs/agent/README.md), not here.

## Start Here

1. Use [docs/agent/router.md](docs/agent/router.md) to choose the minimum route.
2. Read [DESIGN.md](DESIGN.md) before visual decisions.
3. Read [docs/agent/workflow.md](docs/agent/workflow.md) before editing files.
4. Read [docs/agent/living-system.md](docs/agent/living-system.md) for PDS
   growth, self-improvement, or Codex/Claude alignment changes.
5. Follow only the component, pattern, recipe, package, or skill docs needed for
   the task.

## Repository Rules

- Keep this repo token-first. Add or change tokens before hard-coding visual
  values.
- Keep package boundaries explicit: `packages/tokens` owns CSS custom
  properties, and `packages/react` owns PDS React components and styles.
- Do not create websites, docs apps, demos, or new components unless the task
  asks for them.
- Do not commit generated `dist/` output unless publishing policy changes.
- Do not delete `node_modules`; use `pnpm clean:workspace` for ignored
  build/cache artifacts when cleanup is needed.

## Checks

- Run `pnpm check` before handing work back.
- Run `pnpm clean:workspace` after checks when ignored build/cache artifacts
  should be cleared.

Update the narrowest owning doc under `docs/agent` instead of expanding this
adapter.
