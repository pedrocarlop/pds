# Run Details

Run details covers product surfaces where users inspect one agent run, its tool
activity, evidence, decisions, errors, and audit trail.

## Overview

Use this pattern when a run has enough state that it needs a durable detail
surface instead of only transcript context. The highest-risk mistake is making
the run feel complete while hiding failed tools, approval requirements, or
source evidence. PDS supplies composition primitives; client products own run
data, tool execution, persistence, permissions, and audit storage.

## States

| State | Required behavior |
| --- | --- |
| Queued | Show run identity, requester, target workspace, and expected next step. |
| Running | Keep current step, tool activity, cancel or pause controls, and latest evidence visible. |
| Waiting | Place the required approval, credentials, or user input near the blocked step. |
| Failed | Preserve failed tool context, error detail, retry action, and impact. |
| Complete | Confirm completion while keeping outputs, sources, and audit metadata available. |

## Layout Anatomy

- Identity region: run title, status, owner, workspace, model, timestamps, and
  high-level actions.
- Timeline region: ordered steps, tool calls, approvals, retries, and failures.
- Detail region: selected step output, sources, logs, artifacts, or diff.
- Audit region: permissions, signatures, policy checks, and immutable metadata.
- On narrow screens, identity stays first, timeline follows, and selected detail
  stacks after the active step without hiding required actions.

## Flow Variants

| Flow | Use |
| --- | --- |
| Live run | The user watches step progress and can cancel, pause, or provide input. |
| Completed run | The user audits output, sources, duration, and final state. |
| Failed run | The user diagnoses a failed tool and decides whether to retry or revise. |
| Approval-gated run | The user reviews a proposed action before the agent can continue. |

## Component Composition

Compose `PageHeader`, `RunStatus`, `Surface`, `DataList`, `Progress`,
`InlineAlert`, `Table`, `Tabs`, `Badge`, `Button`, `Dialog`, `BottomSheet`, and
`Toast` for non-blocking completion feedback. Use `Transcript` and `Message`
when conversation context is part of the run detail.

Do not create a generic run-details component until multiple products prove the
same timeline, evidence, audit, and action API.

## Accessibility

- Give the timeline, selected detail, and audit regions accessible names.
- Keep tool rows and approval controls keyboard reachable.
- Keep focus near the active step after selecting a tool, retrying, or approving.
- Use visible status text and app-owned live-region behavior for asynchronous
  step changes where needed.
- Modal or sheet reviews must be named, dismissible, and return focus to the
  triggering action.

## Content Resilience

Run titles, tool names, generated identifiers, source URLs, error messages,
artifact names, and timestamps wrap. Long logs or code output may scroll inside
a product-owned detail region only when the selected step, failure state, and
required actions remain visible. Required approval text and errors do not
truncate at 200% zoom.

## Client Responsibilities

Client products own run fetching, streaming, timeline normalization, log
redaction, source previews, artifact links, cancellation policy, retry behavior,
approval enforcement, permissions, analytics, and audit records.

## Verification

- Running state keeps current step, status, and control actions visible.
- Selecting a timeline step updates the detail region and preserves focus
  context.
- Failed state keeps error detail and retry action in the run detail surface.
- Approval-gated state cannot continue until the required approval is complete.
- Long identifiers, URLs, logs, and generated titles remain usable at 200% zoom.

## Do's And Don'ts

Do:

- Keep the active step and selected detail connected.
- Preserve failed tool context and retry state.
- Show source evidence and audit metadata before destructive or external action.

Don't:

- Do not collapse a failed run into only a toast or status pill.
- Do not hide approval requirements in a detached modal without run context.
- Do not make transient logs the only source of audit-relevant information.

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [RunStatus](../components/run-status.md)
- [DataList](../components/data-list.md)
- [Dialog](../components/dialog.md)
