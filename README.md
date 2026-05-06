# PDS

PDS is a small design system workspace for agent-facing product surfaces.

This repo is intentionally structured before it grows: tokens, React bindings,
human guidance, and agent-readable guidance live in separate places so future
components, docs, and automation can be added without blurring ownership.

## Start Here

- `DESIGN.md` is the portable visual contract for LLMs and design tools.
- `AGENTS.md` is the repository map for coding agents.
- `docs/start-here.md` explains the repo structure for humans.
- `docs/foundations/` contains source guidance for tokens and visual decisions.
- `packages/tokens` owns CSS custom properties.
- `packages/react` owns React exports and component styles.

## Install

```sh
pnpm install
```

## Develop

```sh
pnpm check
```

## Package Boundaries

- `@pds/tokens`: design tokens and CSS variables.
- `pds`: React package that consumes `@pds/tokens`.

No website or documentation app is required for this first phase.
