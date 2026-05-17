# Repository Structure

This workspace follows a small monorepo shape used by mature design systems:
foundations first, implementation packages second, documentation alongside the
source, and generated outputs kept out of source control.

## Top Level

- `DESIGN.md`: machine-readable tokens plus human-readable visual rationale.
- `AGENTS.md`: instructions for LLM coding agents.
- `docs/`: human and agent guidance.
- `docs/patterns`: repeatable product flow guidance.
- `scripts/`: repeatable repository maintenance scripts.
- `plugins/`: repo-local agent plugins and skills.
- `packages/`: publishable packages.
- `examples/`: private demo consumers that exercise publishable packages.
- `turbo.json`: package task graph.
- `pnpm-workspace.yaml`: workspace package discovery.

## Packages

### `packages/tokens`

Owns PDS design token implementation. This package should remain framework
agnostic. Docs and future packages consume it instead of duplicating values.

Current source:

- `src/colour.css`, `src/typography.css`, `src/spacing.css`, `src/layout.css`, `src/elevation.css`, and `src/motion.css`: foundation CSS custom properties with the `--pds-` prefix.
- `src/styles.css`: aggregate stylesheet that imports the foundation CSS files for the stable default package export.

Future source can add DTCG JSON, token build scripts, and platform exports when
the token system needs it.

### `packages/react`

Owns the `pds` React package. It exports the initial PDS component slice and
`pds/styles.css`, which imports token CSS and package component CSS.

Current source:

- `src/components`: starter PDS primitives for actions, feedback, overlays,
  fields, surfaces, and agent-facing product composition.
- `src/components.css`: token-first component styles.
- `src/styles.css`: aggregate stylesheet for package consumers.

## Documentation

- `docs/README.md`: index of documentation sources.
- `docs/foundations`: design rules by foundation, including motion and resilient content behavior.
- `docs/patterns`: flow-level guidance for composing foundations and components.
- `docs/ai`: guidance for coding agents and LLM consumers.
- `docs/architecture`: how the system is organized.

Docs should be short, navigable, and written as source material for both humans
and LLMs.

`DESIGN.md` is intentionally top-level because design tools and coding agents can
discover it quickly. It should stay connected to docs and package source through
links rather than becoming the only place where design rules are written.

## Plugins

`plugins/pds` owns repo-local agent skills for PDS adoption workflows. Skills
should route agents to the canonical docs and package source rather than copying
long design-system rules into plugin text.

Plugin skills may create or modify app code, but durable PDS guidance should
live in the narrowest source of truth: component context docs for component
rules, foundation docs for shared visual rules, pattern docs for flow rules, and
plugin skill files for workflow rules.

## Scripts

The `scripts` folder owns repeatable workspace and package maintenance commands.
Package manifests should call these scripts instead of embedding long shell or
Node one-liners when the behavior is shared across packages.

## Examples

`examples/react` is a private Vite browser demo that consumes the public `pds`
package like an application would. It exists to demonstrate starter primitives
in real layout states; it is not a publishable package, Storybook replacement,
full documentation site, or product UI surface.

## Scaling Rules

- Add a package only when it has a separate publishing or ownership boundary.
- Add docs before abstractions when the missing piece is shared understanding.
- Keep generated files in `dist/` and out of version control.
- Use `pnpm clean:workspace` to remove ignored `dist/`, `.turbo/`, and
  `.DS_Store` artifacts while preserving installed dependencies.
- Prefer stable import paths over deep imports from implementation files.
