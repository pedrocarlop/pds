# PDS

PDS is a small design system workspace for agent-facing product surfaces.

This repo is intentionally structured as it grows: tokens, React components,
human guidance, and agent-readable guidance live in separate places so package
ownership stays clear.

## Start Here

- [DESIGN.md](DESIGN.md) is the portable visual contract and links to the detailed guidelines.
- [AGENTS.md](AGENTS.md) is the repository map for coding agents.
- [docs/README.md](docs/README.md) indexes human and LLM documentation.
- [docs/start-here.md](docs/start-here.md) explains the repo structure for humans.
- [docs/foundations](docs/foundations) contains source guidance for tokens and visual decisions.
- [packages/README.md](packages/README.md) explains package boundaries.
- [packages/tokens](packages/tokens) owns CSS custom properties.
- [packages/react](packages/react) owns the first `pds` React components.

## Install

```sh
pnpm install
```

## Develop

```sh
pnpm check
```

Clean ignored build/cache artifacts without deleting installed dependencies:

```sh
pnpm clean:workspace
```

## Package Boundaries

- `@pds/tokens`: design tokens and CSS variables.
- `pds`: React components for agent-facing product surfaces.

Import `pds/styles.css` once in a consuming app to load PDS tokens and component
styles.

No website, documentation app, Storybook, or visual regression suite is required
for this phase.

## Documentation Contract

[DESIGN.md](DESIGN.md) should stay small and portable. Detailed rules live in
[docs](docs), and implementation source lives in [packages](packages). When one
changes, update the linked guidance instead of letting a standalone file drift
away from the repo.
