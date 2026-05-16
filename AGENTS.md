# Agent Guide

Use this file as the navigation layer for AI coding agents working in PDS. Start
here, then follow only the links needed for the package or design area you are
changing.

## Read Order After This File

1. [DESIGN.md](DESIGN.md) for the portable visual contract.
2. [docs/ai/llm-guidelines.md](docs/ai/llm-guidelines.md) for agent-specific editing rules.
3. [docs/start-here.md](docs/start-here.md) for repository orientation.
4. [docs/foundations/tokens.md](docs/foundations/tokens.md) for token ownership.
5. [docs/foundations/colour.md](docs/foundations/colour.md), [docs/foundations/typography.md](docs/foundations/typography.md), [docs/foundations/spacing.md](docs/foundations/spacing.md), and [docs/foundations/motion.md](docs/foundations/motion.md) for token usage.
6. [docs/foundations/content-resilience.md](docs/foundations/content-resilience.md) for translation, zoom, and overflow behavior.
7. [docs/patterns](docs/patterns) when changing or implementing a documented product flow.
8. [docs/architecture/repository-structure.md](docs/architecture/repository-structure.md) before moving files or adding packages.
9. [packages/react/docs/components](packages/react/docs/components) before editing documented React components, component CSS, examples, tests, or public APIs.

## Task Routes

- Visual tokens or usage guidance: read `DESIGN.md`, then the matching foundation doc and `packages/tokens/src`.
- Product flow patterns: read `DESIGN.md`, then the matching file in `docs/patterns`, then the involved component context docs.
- React component source, CSS, examples, tests, or public APIs: read `packages/react/README.md`, then the matching file in `packages/react/docs/components`.
- Package boundaries, new packages, or moved files: read `docs/architecture/repository-structure.md` and `packages/README.md`.
- Repository cleanup: preserve generated output policy, do not delete `node_modules`, and use `pnpm clean:workspace` for ignored build/cache artifacts.

## Source Graph

- [DESIGN.md](DESIGN.md) routes visual decisions to the detailed foundation docs.
- [docs](docs) routes repo knowledge to humans and LLMs.
- [docs/patterns](docs/patterns) routes repeatable product flows to foundation and component guidance.
- [packages/README.md](packages/README.md) routes package ownership.
- [scripts](scripts) contains repeatable repository maintenance scripts.
- [packages/tokens](packages/tokens) implements the CSS variables referenced by design guidance.
- [packages/react](packages/react) implements the `pds` React package.
- [packages/react/docs/components](packages/react/docs/components) explains implementation-specific component contracts for agents.

## Working Rules

- Keep this repo token-first. Add or change tokens before hard-coding visual values.
- Keep package boundaries boring and explicit.
- `packages/tokens` owns CSS custom properties and token outputs.
- `packages/react` owns PDS React components and their package stylesheet.
- Component context markdown in `packages/react/docs/components` owns per-component guidance for slots, data attributes, accessibility, styling, and composition.
- `docs/` explains repo and token guidance for humans and LLMs.
- Do not create websites, docs apps, demos, or new components unless the task asks for them.
- Do not commit generated `dist/` output unless publishing policy changes.

## Change Checklist

- Update `DESIGN.md` when the visual contract changes.
- Update foundation docs when usage guidance changes.
- Update pattern docs when a documented flow changes.
- Update component context docs when React component behavior, slots, styling hooks, or public APIs change.
- Update package READMEs when ownership or imports change.
- Update package manifests when a package boundary changes.
- Run `pnpm check` before handing work back.
- Run `pnpm clean:workspace` after checks when ignored build/cache artifacts should be cleared.
