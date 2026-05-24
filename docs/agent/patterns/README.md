# PDS Patterns

Patterns document repeatable product flows that combine PDS foundations and
components. They describe state, accessibility, resilience, and client
responsibilities without creating a single required implementation.

Use this index only when the task matches a documented repeated product flow.
Choose the matching child doc, then stop. Pattern guidance can supersede general
component guidance when a flow has legal, safety, audit, or task-completion
requirements.

## Decision Table

| Flow need | Use |
| --- | --- |
| Agent conversation, tool execution, workspace state, transcript, or run status | [Agent workspace](agent-workspace.md) |
| One run's timeline, tool evidence, approval gates, output, errors, or audit trail | [Run details](run-details.md) |
| Legal or policy document review with explicit acceptance or signing | [Agreement signing](agreement-signing.md) |
| Queue-based triage, approval, review, or batch decisions | [Review queue](review-queue.md) |
| Preferences, account, admin, permissions, system state, or configuration | [Settings and system](settings-system.md) |
| No matching repeated flow | Skip patterns and use screen structure plus component contracts only |

## Current Patterns

- [Agent workspace](agent-workspace.md)
- [Run details](run-details.md)
- [Agreement signing](agreement-signing.md)
- [Review queue](review-queue.md)
- [Settings and system](settings-system.md)

## Rendered Workflow Templates

The private React visual lab includes rendered templates for the current agent
workflow set in `examples/react/src/stories/agent-scenarios.stories.tsx`:

- Agent workspace.
- Review queue.
- Run details.
- Settings.
- Approval/signing flow.

`pnpm examples:visual:check` exercises these templates at desktop and a 200%
zoom proxy so workflow guidance is checked against real component composition.

## Authoring

Create new pattern docs from [_template.md](_template.md). Keep them practical:
name the user job, supported states, expected component composition, content
resilience rules, accessibility requirements, and verification scenarios.

Do not add a new React component just because a pattern exists. Add components
only when multiple patterns or product surfaces need a reusable primitive with a
stable public API.
