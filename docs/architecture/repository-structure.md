# Repository Structure

This workspace follows a small monorepo shape used by mature design systems:
foundations first, implementation packages second, documentation alongside the
source, and generated outputs kept out of source control.

## Top Level

- `DESIGN.md`: machine-readable tokens plus human-readable visual rationale.
- `AGENTS.md`: instructions for LLM coding agents.
- `docs/`: human and agent guidance.
- `packages/`: publishable packages.
- `apps/`: reserved for future docs, examples, or playgrounds.
- `turbo.json`: package task graph.
- `pnpm-workspace.yaml`: workspace package discovery.

## Packages

### `packages/tokens`

Owns PDS design token implementation. This package should remain framework
agnostic. React, docs, and future packages consume it instead of duplicating
values.

Current source:

- `src/styles.css`: CSS custom properties with the `--pds-` prefix.

Future source can add DTCG JSON, token build scripts, and platform exports when
the token system needs it.

### `packages/react`

Owns React primitives and package CSS. It depends on `@pds/tokens` and should not
define raw visual constants that belong in the token package.

Component folders own their TSX entry point. Barrels exist only to keep public
exports stable.

## Documentation

- `docs/foundations`: design rules by foundation.
- `docs/ai`: guidance for coding agents and LLM consumers.
- `docs/architecture`: how the system is organized.
- `docs/decisions`: why structural decisions were made.

Docs should be short, navigable, and written as source material for both humans
and LLMs.

## Scaling Rules

- Add a package only when it has a separate publishing or ownership boundary.
- Add an app only when there is a real workflow to run locally.
- Add docs before abstractions when the missing piece is shared understanding.
- Keep generated files in `dist/` and out of version control.
- Prefer stable import paths over deep imports from implementation files.
