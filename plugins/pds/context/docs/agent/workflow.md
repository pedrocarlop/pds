# Agent Workflow

PDS is designed to be usable by coding agents through markdown source files. Use
these rules after reading [AGENTS.md](../../AGENTS.md) and using
[router.md](router.md) to choose the task route.

## Context Loading

- Do not read every markdown file before starting. Use [router.md](router.md)
  and indexes to choose the smallest path that can support the task.
- If the target is known, read the specific workflow or contract, source files,
  nearby tests, and relevant quality gates.
- Foundation docs are only required for the visual areas being changed.
- Architecture docs are only required when moving files, changing ownership, or
  adding packages.
- Patterns are only required when the flow matches a documented repeated product
  flow.
- Screen structures are only required for page-level layout, navigation,
  hierarchy, or task-focus decisions.
- Component contracts are only required for components being used, edited,
  reviewed, or created.
- Use [living-system.md](living-system.md) when the task changes how PDS grows,
  self-improves, promotes local patterns, or stays reliable across Codex and
  Claude.
- Source files and tests must still be inspected before editing existing code.
  Do not rely only on docs when implementation exists.
- For verification, use `pnpm check`; it covers publishable packages, the
  private React example consumer, plugin context sync, `DESIGN.md` lint,
  package contract coverage, skill contract coverage, component contract coverage,
  foundation contract coverage, guidance contract coverage, agent evaluation scenario coverage,
  the agent readiness audit, and browser-level component preview smoke checks.
- Use [evaluation-scenarios.md](evaluation-scenarios.md) when a change could
  alter the quality of generated Codex or Claude outcomes, not only the
  structure of docs or packages.
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
- Do not add a new guidance surface, package, pattern, or component before
  checking the growth routing in [living-system.md](living-system.md).

## When Unsure

Make the smallest structural change that preserves package boundaries. Update
docs before guessing at a new abstraction.
