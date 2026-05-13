# Agent Guide

Use this file as the navigation layer for AI coding agents working in PDS.

## Read Order

1. [DESIGN.md](DESIGN.md) for the portable visual contract.
2. [docs/ai/llm-guidelines.md](docs/ai/llm-guidelines.md) for agent-specific editing rules.
3. [docs/start-here.md](docs/start-here.md) for repository orientation.
4. [docs/foundations/tokens.md](docs/foundations/tokens.md) for token ownership.
5. [docs/foundations/colour.md](docs/foundations/colour.md), [docs/foundations/typography.md](docs/foundations/typography.md), [docs/foundations/spacing.md](docs/foundations/spacing.md), and [docs/foundations/motion.md](docs/foundations/motion.md) for token usage.
6. [docs/foundations/content-resilience.md](docs/foundations/content-resilience.md) for translation, zoom, and overflow behavior.
7. [docs/architecture/repository-structure.md](docs/architecture/repository-structure.md) before moving files or adding packages.

## Source Graph

- [DESIGN.md](DESIGN.md) routes visual decisions to the detailed foundation docs.
- [docs](docs) routes repo knowledge to humans and LLMs.
- [packages/README.md](packages/README.md) routes package ownership.
- [packages/tokens](packages/tokens) implements the CSS variables referenced by design guidance.
- [packages/react](packages/react) implements the `pds` React package.

## Working Rules

- Keep this repo token-first. Add or change tokens before hard-coding visual values.
- Keep package boundaries boring and explicit.
- `packages/tokens` owns CSS custom properties and token outputs.
- `packages/react` owns PDS React components and their package stylesheet.
- `docs/` explains repo and token guidance for humans and LLMs.
- Do not create websites, docs apps, demos, or new components unless the task asks for them.
- Do not commit generated `dist/` output unless publishing policy changes.

## Change Checklist

- Update `DESIGN.md` when the visual contract changes.
- Update foundation docs when usage guidance changes.
- Update package READMEs when ownership or imports change.
- Update package manifests when a package boundary changes.
- Run `pnpm check` before handing work back.
