# Agent Guide

Use this file as the navigation layer for AI coding agents working in PDS.

## Read Order

1. `DESIGN.md` for the portable visual contract.
2. `docs/start-here.md` for repository orientation.
3. `docs/foundations/colour.md` and `docs/foundations/spacing.md` for token usage.
4. `docs/architecture/repository-structure.md` before moving files or adding packages.

## Working Rules

- Keep this repo token-first. Add or change tokens before hard-coding visual values.
- Keep package boundaries boring and explicit.
- `packages/tokens` owns CSS custom properties and token outputs.
- `packages/react` consumes tokens and exports React primitives.
- `docs/` explains decisions for humans and LLMs.
- Do not create websites, docs apps, demos, or new components unless the task asks for them.
- Do not commit generated `dist/` output unless publishing policy changes.

## Change Checklist

- Update `DESIGN.md` when the visual contract changes.
- Update foundation docs when usage guidance changes.
- Update package manifests when a package boundary changes.
- Run `pnpm check` before handing work back.
