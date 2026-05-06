# LLM Guidelines

PDS is designed to be usable by coding agents through markdown source files.

## Read Order

1. `DESIGN.md`
2. `AGENTS.md`
3. `docs/foundations/colour.md`
4. `docs/foundations/spacing.md`
5. `docs/architecture/repository-structure.md`

## How To Use PDS In Generated Code

- Import React primitives from `pds`.
- Import styles from `pds/styles.css`.
- Use CSS variables from `@pds/tokens` through the stylesheet.
- Choose tokens by role, not by visual preference.
- Keep generated UI operational, dense, and inspectable.

## Visual Decision Rules

- Use semantic token names as the first clue.
- Prefer surfaces, spacing, and radius over borders.
- Use accent color sparingly for intent and active state.
- Preserve readable contrast on dark surfaces.
- Use status colors only for status.
- Use performance colors only for metric direction.

## Repo Change Rules

- Do not add components unless explicitly asked.
- Do not add a docs website unless explicitly asked.
- Do not introduce a new package before documenting its ownership boundary.
- Do not deep-import from another package source directory.
- Do not duplicate token values across packages.

## When Unsure

Make the smallest structural change that preserves package boundaries. Update
docs before guessing at a new abstraction.
