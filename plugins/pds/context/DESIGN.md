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

## Routing

Read [AGENTS.md](AGENTS.md) for repo safety rules, then use
[docs/agent/router.md](docs/agent/router.md) to choose the minimum reading path
for the task. Do not read every foundation, pattern, or component file by
default.

For visual decisions, read only the matching foundation docs in
[docs/foundations](docs/foundations) and confirm implemented CSS custom
properties in [packages/tokens/src](packages/tokens/src).

For React component work, read [packages/react/README.md](packages/react/README.md),
the selected component contracts in
[docs/agent/components](docs/agent/components/README.md), and the existing
source, styles, examples, and tests for the components involved.

For screen or flow work, use the router to select one
[screen structure](docs/agent/screen-structures/README.md), then read only
matching pattern and component docs.

## Task Sources

- Use [docs/recipes](docs/recipes) for React app setup and PDS adoption.
- Use [docs/agent/skills](docs/agent/skills/README.md) for plugin skill
  workflows.
- Use [docs/agent/living-system.md](docs/agent/living-system.md) when a task is
  about growing PDS itself, self-improvement loops, promotion rules, or keeping
  Codex and Claude behavior aligned.
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
- Do not create or modify components before reading the selected component
  contracts, package source, styles, examples, and tests.
- Do not add detailed PDS guidance back into this file; update the narrowest
  owning doc listed above.
