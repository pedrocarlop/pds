# PDS Screen Structures

Screen structures document page-level information architecture and layout shape
before agents choose product-flow patterns or component contracts. Use them when
the screen type determines navigation, header, content priority, responsive
stacking, or task focus.

Use this index to choose one matching child doc, then stop. Read foundation,
pattern, and component docs only after the structure is selected and only when
they are relevant to the implementation or review.

## Decision Table

| Screen need | Use |
| --- | --- |
| Top-level product area with persistent navigation, section header, and browsable content | [First Level Navigation Page](first-level-navigation-page.md) |
| Single-task flow where the user completes one action from beginning to end | [Focus Layout](focus-layout.md) |
| Neither structure fits | Use the closest current structure, document the gap, and avoid inventing a new structure unless the task asks for it |

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
