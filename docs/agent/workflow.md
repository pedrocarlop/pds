# Agent Workflow

PDS is designed to be usable by coding agents through markdown source files.
Use these rules after the repository-level adapters in [AGENTS.md](../../AGENTS.md)
or [CLAUDE.md](../../CLAUDE.md).

## Read Order

1. [AGENTS.md](../../AGENTS.md)
2. [DESIGN.md](../../DESIGN.md)
3. [docs/start-here.md](../start-here.md)
4. [docs/foundations/tokens.md](../foundations/tokens.md)
5. [docs/foundations/colour.md](../foundations/colour.md)
6. [docs/foundations/typography.md](../foundations/typography.md)
7. [docs/foundations/spacing.md](../foundations/spacing.md)
8. [docs/foundations/layout-types.md](../foundations/layout-types.md)
9. [docs/foundations/motion.md](../foundations/motion.md)
10. [docs/foundations/content-resilience.md](../foundations/content-resilience.md)
11. [docs/recipes](../recipes)
12. [docs/agent/screen-structures](screen-structures/README.md)
13. [docs/agent/patterns](patterns/README.md)
14. [docs/architecture/repository-structure.md](../architecture/repository-structure.md)

## Task Routing

- For visual decisions, use `DESIGN.md` first, then the matching foundation doc,
  then token source in `packages/tokens/src`.
- For React component edits, use `packages/react/README.md` for package scope and
  the matching file in [components](components/README.md) for component
  contracts.
- For user design feedback after a PDS output or review, use
  [skills/self-improve.md](skills/self-improve.md). Component feedback should
  update the matching component contract unless the existing doc already
  contained the exact rule and the miss was only failure to follow it.
- For React app setup or PDS adoption, use the matching file in `docs/recipes`.
- For page-level IA, navigation, or task-focus decisions, use the matching file
  in [screen structures](screen-structures/README.md) before pattern and
  component guidance.
- For documented product flows, use the matching file in [patterns](patterns/README.md), then
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
- Import `@pds/react/styles.css` when using React components from `@pds/react`.
- Import `@pds/tokens/styles.css` directly only for token-only consumers.
- Use scoped imports such as `@pds/tokens/colour.css`, `@pds/tokens/layout.css`, or `@pds/tokens/motion.css` only when a consumer deliberately needs one foundation.
- Import React components from `@pds/react`; do not deep-import from package source directories.
- Choose tokens by role, not by visual preference.
- Keep generated UI operational, dense, and inspectable.

## Visual Decision Rules

- Use semantic token names as the first clue.
- Prefer surfaces, spacing, and radius over borders.
- Use layout tokens for shared app widths, readable measures, side-panel minimums, and breakpoints.
- When a request references an original component, raw code, or an upstream
  design-system primitive, extract the original fill, radius, spacing,
  typography, state, and accessibility laws before mapping them to PDS.
- When a request includes a visual reference for a component, map the component
  anatomy before implementation: root elements, sibling groups, child slots,
  icons, counters, remove controls, selected/disabled states, and overflow
  forms. Do not convert repeated sibling controls into child slots unless the
  reference or upstream source explicitly shows containment.
- If the original source is missing, ask for it or document assumptions; do not
  present inferred PDS defaults as the original component contract.
- Never hard-code colors in UI CSS, component code, examples, inline SVGs, or data URI assets.
- Only map design concepts to CSS variables that exist in `packages/tokens/src`;
  do not invent local token-like names for missing component concepts.
- Use accent color sparingly for intent and active state.
- Preserve readable contrast on dark surfaces.
- Use tokenized motion for state, hierarchy, and spatial continuity; respect `prefers-reduced-motion`.
- Use status colors only for status.
- Use performance colors only for metric direction.
- Use pattern docs when they narrow component guidance for a repeated product
  flow.
- Keep layouts resilient to translation, user-generated content, accessibility text settings, and 200% browser zoom.
- Do not truncate primary actions, required form labels, error messages, or state feedback.
- Treat valid design critique as a guidance gap until evidence shows otherwise:
  identify whether the rule was missing, failed, ambiguous, conflicting, or
  unowned, then update the smallest durable owner.

## Repo Change Rules

- Do not add components unless explicitly asked.
- Do not add a docs website unless explicitly asked.
- Do not introduce a new package before documenting its ownership boundary.
- Do not deep-import from another package source directory.
- Do not duplicate token values across packages.
- Do not change `DESIGN.md` without checking whether `docs/foundations` or package READMEs also need updates.
- Do not delete `node_modules` as part of routine cleanup.
- Do not leave component-level design feedback only in the chat transcript when
  it reveals reusable guidance; self-improve the relevant component docs or
  failed workflow instructions.

## When Unsure

Make the smallest structural change that preserves package boundaries. Update
docs before guessing at a new abstraction.
