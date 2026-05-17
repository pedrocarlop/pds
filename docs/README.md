# Documentation

This folder contains the detailed guidance that `DESIGN.md` points to.
Agent-facing guidance is centralized under [agent](agent/README.md).

## Index

- [start-here.md](start-here.md): human orientation and repository map.
- [agent](agent/README.md): canonical agent routing, workflows, component
  contracts, patterns, and skill workflows.
- [foundations/tokens.md](foundations/tokens.md): token ownership and source rules.
- [foundations/colour.md](foundations/colour.md): color usage rules.
- [foundations/typography.md](foundations/typography.md): typography role and recipe rules.
- [foundations/spacing.md](foundations/spacing.md): spacing and radius usage rules.
- [foundations/layout-types.md](foundations/layout-types.md): shared layout dimensions and breakpoints.
- [foundations/motion.md](foundations/motion.md): motion duration, easing, and reduced-motion rules.
- [foundations/content-resilience.md](foundations/content-resilience.md): translation, zoom, and overflow behavior.
- [recipes](recipes): practical React app setup and PDS adoption recipes.
- [architecture/repository-structure.md](architecture/repository-structure.md): package and documentation structure.

## Relationship To DESIGN.md

[DESIGN.md](../DESIGN.md) is the compact, portable entry point. These docs are
the expanded guidelines. If a design rule changes, update both the portable
contract and the specific guideline that owns the detail.
