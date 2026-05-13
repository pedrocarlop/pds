# PDS

PDS is a small design system workspace for agent-facing product surfaces.

This repo is intentionally structured before it grows: tokens, a reserved React
package shell, human guidance, and agent-readable guidance live in separate
places so future components can be added without blurring ownership.

## Start Here

- [DESIGN.md](DESIGN.md) is the portable visual contract and links to the detailed guidelines.
- [AGENTS.md](AGENTS.md) is the repository map for coding agents.
- [docs/README.md](docs/README.md) indexes human and LLM documentation.
- [docs/start-here.md](docs/start-here.md) explains the repo structure for humans.
- [docs/foundations](docs/foundations) contains source guidance for tokens and visual decisions.
- [packages/README.md](packages/README.md) explains package boundaries.
- [packages/tokens](packages/tokens) owns CSS custom properties.
- [packages/react](packages/react) reserves the future `pds` React package.

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
- `pds`: reserved future React package; it exports no UI yet.

No website, documentation app, or React component surface is required for this
phase.

## Documentation Contract

[DESIGN.md](DESIGN.md) should stay small and portable. Detailed rules live in
[docs](docs), and implementation source lives in [packages](packages). When one
changes, update the linked guidance instead of letting a standalone file drift
away from the repo.
