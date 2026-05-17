# Agent Workspace

Agent workspace covers product surfaces where a user collaborates with an agent
while inspecting status, tool activity, and the next message.

## Overview

Use this pattern when conversation, tool state, and user control must remain
visible during an active run. The highest-risk mistake is hiding tool progress or
the composer behind decorative chat UI. PDS provides the primitives; client
products own run data, streaming, persistence, and tool execution.

## States

| State | Required behavior |
| --- | --- |
| Idle | Show the transcript, composer, and last known run state. |
| Running | Preserve transcript context, expose active run status, and keep tool activity inspectable. |
| Waiting | Make the required user action visible near the composer or inspector. |
| Error | Keep failed tool details and recovery actions in the current workspace. |
| Complete | Confirm completion without removing audit-relevant messages or tool output. |

## Layout Anatomy

- Primary region: transcript and composer.
- Secondary region: tool status, selected tool detail, run metadata, or side
  inspection.
- Header region: current task identity and top-level run status.
- On narrow screens, the inspector stacks after the transcript and remains
  reachable without hiding the composer.

## Flow Variants

| Flow | Use |
| --- | --- |
| Single run | One transcript, one composer, one inspectable tool stack. |
| Multi-step run | Preserve step status and selected step detail in the inspector. |
| Human handoff | Keep the required human action visible next to the composer or status area. |

## Component Composition

Compose `Surface`, `Transcript`, `Message`, `RunStatus`, `Composer`,
`DataList`, `Progress`, `InlineAlert`, and action `Button` controls. Use
`Tabs` only when switching between distinct workspace modes, not to hide active
run state.

## Accessibility

- Give the transcript, composer, and inspector accessible names.
- Preserve keyboard access to tool rows, message actions, and composer actions.
- Expose asynchronous run progress with visible status and app-owned live-region
  behavior where needed.
- Focus should stay in the current task after sending a message or selecting a
  tool detail.

## Content Resilience

Long messages, tool names, generated identifiers, timestamps, and translated
status labels wrap by default. Tool output can scroll inside a product-owned
region only when the full value remains accessible. Composer labels, required
actions, and error text do not truncate.

## Client Responsibilities

Client products own message streaming, tool execution, markdown rendering,
attachments, audit storage, retries, cancellation, and persistence.

## Verification

- Running state keeps transcript, composer, and selected tool status visible.
- Tool selection is keyboard reachable and updates the detail panel.
- Long generated identifiers wrap in narrow containers.
- Error state keeps failed tool context and retry action visible.
- The surface remains usable at 200% zoom.

## Do's And Don'ts

Do:

- Keep agent work inspectable while the run is active.
- Put user recovery near the failed tool or composer.
- Preserve message and tool history after completion.

Don't:

- Do not hide run status in a toast-only confirmation.
- Do not replace inspectable tool output with decorative activity indicators.
- Do not truncate required user actions or error messages.

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [Transcript](../components/transcript.md)
- [Composer](../components/composer.md)
- [RunStatus](../components/run-status.md)
