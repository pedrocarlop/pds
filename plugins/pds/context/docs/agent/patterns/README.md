# PDS Patterns

Patterns document repeatable product flows that combine PDS foundations and
components. They describe state, accessibility, resilience, and client
responsibilities without creating a single required implementation.

Use patterns after [DESIGN.md](../../../DESIGN.md) and the relevant foundation
docs. Pattern guidance can supersede general component guidance when a flow has
legal, safety, audit, or task-completion requirements.

## Current Patterns

- [Agent workspace](agent-workspace.md)
- [Agreement signing](agreement-signing.md)
- [Review queue](review-queue.md)
- [Settings and system](settings-system.md)

## Authoring

Create new pattern docs from [_template.md](_template.md). Keep them practical:
name the user job, supported states, expected component composition, content
resilience rules, accessibility requirements, and verification scenarios.

Do not add a new React component just because a pattern exists. Add components
only when multiple patterns or product surfaces need a reusable primitive with a
stable public API.
