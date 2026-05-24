# Repository Structure

This workspace follows a small monorepo shape used by mature design systems:
foundations first, implementation packages second, documentation alongside the
source, and generated outputs kept out of source control.

## Top Level

- `DESIGN.md`: machine-readable tokens plus human-readable visual rationale.
- `AGENTS.md`: Codex-compatible adapter for agent instructions.
- `CLAUDE.md`: Claude-compatible adapter that imports `AGENTS.md`.
- `docs/`: human and agent guidance.
- `docs/agent`: canonical agent workflows, component contracts, screen
  structures, patterns, and skill workflows.
- `scripts/`: repeatable repository maintenance scripts.
- `plugins/`: agent plugins, skills, and generated plugin context.
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
the token system needs it. Token export, design kit, and Figma mapping are
intentionally deferred until the React component APIs and token names are stable
enough that design-tool output will not freeze churn into external assets.

### `packages/react`

Owns the `@pds/react` React package. It exports the initial PDS component slice and
`@pds/react/styles.css`, which imports token CSS and package component CSS.

Current source:

- `src/components`: starter PDS primitives for actions, feedback, overlays,
  fields, surfaces, and agent-facing product composition.
- `src/components.css`: token-first component styles.
- `src/styles.css`: aggregate stylesheet for package consumers.

Current boundary decision:

- Keep the public boundary as Radix-backed styled React components plus stable
  PDS slots, props, and data attributes.
- Do not add a true headless primitives package yet. Radix already owns the
  hardest keyboard, focus, role, typeahead, popover, and modal behavior for the
  current component set, and a separate headless layer would duplicate that
  contract before PDS has enough non-React or unstyled consumers.
- Revisit a headless layer only when at least two real consumers need unstyled
  primitives, a non-React target, or behavior reuse without PDS CSS. That change
  needs an architecture update, package ownership, generated API reference
  coverage, component contracts, tests, and migration guidance.
- Keep any future design-tool output downstream of stable component APIs:
  token export first, then design kit primitives, then Figma mapping.

## Documentation

- `docs/README.md`: index of documentation sources.
- `docs/foundations`: design rules by foundation, including motion and resilient content behavior.
- `docs/agent`: all canonical agent-only guidance, including screen structures,
  flow-level patterns, and React component contracts.
- `docs/architecture`: how the system is organized.

Docs should be short, navigable, and written as source material for both humans
and LLMs.

`DESIGN.md` is intentionally top-level because design tools and coding agents can
discover it quickly. It should stay connected to docs and package source through
links rather than becoming the only place where design rules are written.

## Plugins

`plugins/pds` owns agent skills for PDS adoption workflows plus a generated
context bundle for installed plugins. Skills should route agents to the bundled
context, while canonical source guidance stays in `docs/agent/skills` and
package source rather than being rewritten inside plugin adapters.

Plugin skills may create or modify app code, but durable PDS guidance should
move through the narrowest owner named by
[docs/agent/router.md](../agent/router.md) and
[docs/agent/living-system.md](../agent/living-system.md).

## Scripts

The `scripts` folder owns repeatable workspace and package maintenance commands.
Package manifests should call these scripts instead of embedding long shell or
Node one-liners when the behavior is shared across packages.

## Examples

`examples/react` is a private Vite browser demo that consumes the public `@pds/react`
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
