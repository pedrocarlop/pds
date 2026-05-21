# PDS Screen Structures

Screen structures document page-level information architecture and layout shape
before agents choose product-flow patterns or component contracts. Use them when
the screen type determines navigation, header, content priority, responsive
stacking, or task focus.

Use screen structures after [DESIGN.md](../../../DESIGN.md), the relevant
foundation docs, and before choosing a matching [pattern](../patterns/README.md)
or [component contract](../components/README.md).

## Current Structures

- [First Level Navigation Page](first-level-navigation-page.md)
- [Focus Layout](focus-layout.md)

## Authoring

Future screen structures should include:

- Overview: the product job and why this structure exists.
- Use when: page types, navigation entries, or task contexts that match.
- Do not use when: flows or page types that need a different structure.
- Structure: stable regions in an ASCII anatomy tree.
- Rules: checkable layout, navigation, hierarchy, and responsive behavior.
- PDS Component Mapping: components that commonly implement the structure.
- App CSS Responsibilities: layout-only ownership boundaries for local CSS.
- State Placement: where loading, empty, error, success, and saving feedback
  belongs.
- Example: one concrete mapped screen.
- Quality gates: structure-specific checks agents must satisfy before handoff.
- Related sources: foundation, pattern, and component docs needed to implement
  the structure.

Do not add a new React component just because a screen structure exists. Screen
structures describe app-owned composition; reusable package primitives still
need component contracts and stable public APIs.
