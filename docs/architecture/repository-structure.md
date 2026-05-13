# Repository Structure

This workspace follows a small monorepo shape used by mature design systems:
foundations first, implementation packages second, documentation alongside the
source, and generated outputs kept out of source control.

## Top Level

- `DESIGN.md`: machine-readable tokens plus human-readable visual rationale.
- `AGENTS.md`: instructions for LLM coding agents.
- `docs/`: human and agent guidance.
- `packages/`: publishable packages.
- `turbo.json`: package task graph.
- `pnpm-workspace.yaml`: workspace package discovery.

## Packages

### `packages/tokens`

Owns PDS design token implementation. This package should remain framework
agnostic. Docs and future packages consume it instead of duplicating values.

Current source:

- `src/colour.css`, `src/typography.css`, `src/spacing.css`, `src/elevation.css`, and `src/motion.css`: foundation CSS custom properties with the `--pds-` prefix.
- `src/styles.css`: aggregate stylesheet that imports the foundation CSS files for the stable default package export.

Future source can add DTCG JSON, token build scripts, and platform exports when
the token system needs it.

### `packages/react`

Reserves the future `pds` React package name. It currently exports no UI,
depends on no runtime package, and exists so the public package boundary is clear
before components are explicitly designed.

## Documentation

- `docs/README.md`: index of documentation sources.
- `docs/foundations`: design rules by foundation, including motion and resilient content behavior.
- `docs/ai`: guidance for coding agents and LLM consumers.
- `docs/architecture`: how the system is organized.

Docs should be short, navigable, and written as source material for both humans
and LLMs.

`DESIGN.md` is intentionally top-level because design tools and coding agents can
discover it quickly. It should stay connected to docs and package source through
links rather than becoming the only place where design rules are written.

## Scaling Rules

- Add a package only when it has a separate publishing or ownership boundary.
- Add docs before abstractions when the missing piece is shared understanding.
- Keep generated files in `dist/` and out of version control.
- Prefer stable import paths over deep imports from implementation files.
