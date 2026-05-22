# Documentation

This file is only the documentation index. It points readers to the document
that owns each topic instead of repeating setup steps, repo orientation, or
agent workflow.

For package install and update commands, use the root [README](../README.md).
For human repo orientation, use [start-here.md](start-here.md). Agent-facing
guidance is centralized under [agent](agent/README.md).

## Index

- [start-here.md](start-here.md): human orientation and repository map.
- [agent](agent/README.md): canonical agent routing, workflows, component
  contracts, screen structures, patterns, and skill workflows.
- [agent/living-system.md](agent/living-system.md): operating model for growing
  and self-improving PDS for Codex and Claude.
- [agent/readiness-audit.md](agent/readiness-audit.md): objective-level
  evidence floor for AI-agent reliability.
- [agent/evaluation-scenarios.md](agent/evaluation-scenarios.md):
  outcome-oriented task scenarios for Codex and Claude result quality.
- [agent/skills](agent/skills/README.md): canonical `/pds:*` plugin workflows.
- [foundations](foundations/README.md): foundation guidance index for visual
  token usage.
- [foundations/tokens.md](foundations/tokens.md): token ownership and source rules.
- [foundations/colour.md](foundations/colour.md): color usage rules.
- [foundations/typography.md](foundations/typography.md): typography role and recipe rules.
- [foundations/spacing.md](foundations/spacing.md): spacing and radius usage rules.
- [foundations/layout-types.md](foundations/layout-types.md): shared layout dimensions and breakpoints.
- [foundations/elevation.md](foundations/elevation.md): shadows, surface depth, and focus ring usage.
- [foundations/motion.md](foundations/motion.md): motion duration, easing, and reduced-motion rules.
- [foundations/content-resilience.md](foundations/content-resilience.md): translation, zoom, and overflow behavior.
- [recipes](recipes): practical React app setup and PDS adoption recipes.
- [architecture/repository-structure.md](architecture/repository-structure.md): package and documentation structure.
- [packages](../packages/README.md): publishable package ownership and install
  boundaries.

## Relationship To DESIGN.md

[DESIGN.md](../DESIGN.md) is the compact, portable entry point. These docs are
the expanded guidelines. If a design rule changes, update both the portable
contract and the specific guideline that owns the detail.
