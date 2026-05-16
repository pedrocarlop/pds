# LLM Guidelines

PDS is designed to be usable by coding agents through markdown source files.
Use these rules after the repository-level routing in
[AGENTS.md](../../AGENTS.md).

## Read Order

1. [AGENTS.md](../../AGENTS.md)
2. [DESIGN.md](../../DESIGN.md)
3. [docs/start-here.md](../start-here.md)
4. [docs/foundations/tokens.md](../foundations/tokens.md)
5. [docs/foundations/colour.md](../foundations/colour.md)
6. [docs/foundations/typography.md](../foundations/typography.md)
7. [docs/foundations/spacing.md](../foundations/spacing.md)
8. [docs/foundations/motion.md](../foundations/motion.md)
9. [docs/foundations/content-resilience.md](../foundations/content-resilience.md)
10. [docs/recipes](../recipes)
11. [docs/patterns](../patterns)
12. [docs/architecture/repository-structure.md](../architecture/repository-structure.md)

## Task Routing

- For visual decisions, use `DESIGN.md` first, then the matching foundation doc,
  then token source in `packages/tokens/src`.
- For React component edits, use `packages/react/README.md` for package scope and
  the matching file in `packages/react/docs/components` for component contracts.
- For React app setup or PDS adoption, use the matching file in `docs/recipes`.
- For documented product flows, use the matching file in `docs/patterns`, then
  the involved component context docs.
- For verification, use `pnpm check`; it covers publishable packages, the private
  React example consumer, and `DESIGN.md` lint.
- For package or file moves, use `docs/architecture/repository-structure.md`
  before changing the tree.
- For cleanup, use `pnpm clean:workspace`; it removes ignored build/cache files
  and `.DS_Store` files while preserving installed dependencies.

## DESIGN.md Relationship

[DESIGN.md](../../DESIGN.md) is the compact contract for tools that understand
design markdown. It should route agents into the rest of this repo, not replace
the foundation docs. When front matter tokens are not detailed enough, use the
linked docs and the token package source before making a visual decision.

## How To Use PDS In Generated Code

- Import tokens from `@pds/tokens`.
- Import `pds/styles.css` when using React components from `pds`.
- Import `@pds/tokens/styles.css` directly only for token-only consumers.
- Use scoped imports such as `@pds/tokens/colour.css` or `@pds/tokens/motion.css` only when a consumer deliberately needs one foundation.
- Import React components from `pds`; do not deep-import from package source directories.
- Choose tokens by role, not by visual preference.
- Keep generated UI operational, dense, and inspectable.

## Visual Decision Rules

- Use semantic token names as the first clue.
- Prefer surfaces, spacing, and radius over borders.
- Use accent color sparingly for intent and active state.
- Preserve readable contrast on dark surfaces.
- Use tokenized motion for state, hierarchy, and spatial continuity; respect `prefers-reduced-motion`.
- Use status colors only for status.
- Use performance colors only for metric direction.
- Use pattern docs when they narrow component guidance for a repeated product
  flow.
- Keep layouts resilient to translation, user-generated content, accessibility text settings, and 200% browser zoom.
- Do not truncate primary actions, required form labels, error messages, or state feedback.

## Repo Change Rules

- Do not add components unless explicitly asked.
- Do not add a docs website unless explicitly asked.
- Do not introduce a new package before documenting its ownership boundary.
- Do not deep-import from another package source directory.
- Do not duplicate token values across packages.
- Do not change `DESIGN.md` without checking whether `docs/foundations` or package READMEs also need updates.
- Do not delete `node_modules` as part of routine cleanup.

## When Unsure

Make the smallest structural change that preserves package boundaries. Update
docs before guessing at a new abstraction.
