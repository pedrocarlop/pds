---
version: alpha
name: PDS
description: Agent-facing design system.
---

## Purpose

This file is a routing adapter for tools that automatically discover
`DESIGN.md`. It intentionally does not contain PDS visual rules, token recipes,
component contracts, or implementation examples.

Agents must not design, implement, or review UI from this file alone. If you
cannot read the linked docs and package source, stop and ask for access instead
of guessing.

## Required Reading

Read these sources before making visual or UI implementation decisions:

1. [AGENTS.md](AGENTS.md) for repo safety rules.
2. [docs/agent/workflow.md](docs/agent/workflow.md) for routing, read order,
   edit rules, verification, and cleanup.
3. [docs/start-here.md](docs/start-here.md) for the repository map.
4. [docs/foundations/tokens.md](docs/foundations/tokens.md) for token ownership
   and output rules.
5. [docs/foundations/colour.md](docs/foundations/colour.md) for color rules.
6. [docs/foundations/typography.md](docs/foundations/typography.md) for
   typography rules.
7. [docs/foundations/spacing.md](docs/foundations/spacing.md) for spacing and
   radius rules.
8. [docs/foundations/layout-types.md](docs/foundations/layout-types.md) for
   shared layout dimensions and breakpoints.
9. [docs/foundations/motion.md](docs/foundations/motion.md) for motion rules.
10. [docs/foundations/content-resilience.md](docs/foundations/content-resilience.md)
    for translation, zoom, and overflow behavior.
11. [packages/tokens/src](packages/tokens/src) for the implemented CSS custom
    properties.

## Component Gate

Before creating, modifying, composing, or reviewing React components, also read:

- [packages/react/README.md](packages/react/README.md) for package scope and
  public usage rules.
- [docs/agent/components/README.md](docs/agent/components/README.md) for
  component contract routing.
- The specific component contract files in
  [docs/agent/components](docs/agent/components).
- Relevant product-flow guidance in
  [docs/agent/patterns](docs/agent/patterns/README.md).
- Existing component source, CSS, examples, and tests in
  [packages/react](packages/react) and [examples](examples).

Do not implement a new component until the foundation docs, token source,
component docs, package docs, and nearby implementation patterns have all been
read.

## Task Sources

- Use [docs/recipes](docs/recipes) for React app setup and PDS adoption.
- Use [docs/agent/skills](docs/agent/skills/README.md) for plugin skill
  workflows.
- Use [docs/architecture/repository-structure.md](docs/architecture/repository-structure.md)
  before moving files, adding packages, or changing ownership boundaries.
- Use [docs/agent/skills/self-improve.md](docs/agent/skills/self-improve.md)
  when user design feedback reveals missing, failed, ambiguous, conflicting, or
  unowned guidance.

## Source Ownership

- `docs/foundations` owns visual guidelines.
- `packages/tokens/src` owns CSS custom properties.
- `docs/agent/components` owns React component contracts.
- `packages/react` owns React implementation and package styles.
- `docs/agent/patterns` owns repeatable product-flow guidance.
- `docs/recipes` owns app setup and adoption paths.
- `docs/agent` owns agent routing, workflows, and verification rules.

## Do Not Stop Here

- Do not treat `DESIGN.md` as a standalone design system manual.
- Do not infer token values, visual rules, accessibility behavior, component
  APIs, or implementation patterns from this file.
- Do not create or modify components before satisfying the component gate.
- Do not add detailed PDS guidance back into this file; update the narrowest
  owning doc listed above.
