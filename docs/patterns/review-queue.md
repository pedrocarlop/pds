# Review Queue

Review queue covers product surfaces where users inspect pending agent actions
and approve, reject, retry, or defer them.

## Overview

Use this pattern when a product needs human review before an agent action can
continue. The highest-risk mistake is separating the decision controls from the
context needed to make the decision. PDS provides composition primitives; client
products own queue data, permissions, audit records, and side effects.

## States

| State | Required behavior |
| --- | --- |
| Pending | Show a scannable list and selected detail with risk, owner, and age. |
| Loading | Preserve queue context and expose progress without layout collapse. |
| Approved | Confirm the decision while keeping the reviewed item visible. |
| Rejected | Keep the original proposal and revision path visible. |
| Error | Keep the user in context, preserve selection, and offer retry. |
| Empty | Explain that no reviews match the current filter and keep navigation available. |

## Layout Anatomy

- Queue region: filter, pending list, risk/status metadata, and empty state.
- Detail region: selected item summary, owner, risk, age, and decision controls.
- Feedback region: inline success, rejection, loading, or error state near the
  decision controls.
- On narrow screens, queue and detail stack while keeping the selected item
  title and decision actions visible.

## Flow Variants

| Flow | Use |
| --- | --- |
| Single decision | One item is selected and decisions update inline. |
| Batch review | Multiple items can be selected only when risk and consequences remain clear. |
| Escalation | High-risk items route to a secondary reviewer or policy owner. |

## Component Composition

Compose `Surface`, `Button`, `Badge`, `RunStatus`, `DataList`, `InlineAlert`,
`Skeleton`, `Select`, and `Table` when dense rows are needed. Do not create a
generic review-queue component until multiple products prove the same API.

## Accessibility

- Queue items must be keyboard reachable and expose selected state.
- Decision buttons use visible labels; danger or rejection cannot rely on color
  alone.
- Loading and error states stay near the affected decision area.
- Focus remains in the queue or selected detail after a decision state changes.

## Content Resilience

Review titles, generated summaries, owner names, risk labels, and error messages
wrap. Lower-priority metadata can wrap or move to the next line. Primary
decision labels, selected item titles, and recoverable errors do not truncate.

## Client Responsibilities

Client products own authorization, queue fetching, optimistic updates, audit
metadata, undo policy, analytics, and network error handling.

## Verification

- Pending list selection updates the detail view.
- Loading preserves list/detail layout and does not remove task context.
- Approve, reject, and error states are visible inline.
- Empty state explains the current filter and leaves controls reachable.
- Keyboard navigation and 200% zoom keep decisions usable.

## Do's And Don'ts

Do:

- Keep decision controls close to the evidence.
- Preserve selection and user progress on failure.
- Show risk and ownership before approval.

Don't:

- Do not hide recoverable errors in toast-only feedback.
- Do not approve high-risk generated changes without visible context.
- Do not collapse the queue into disconnected cards when a list is clearer.

## Related Sources

- [DESIGN.md](../../DESIGN.md)
- [Content resilience](../foundations/content-resilience.md)
- [Button](../../packages/react/docs/components/button.md)
- [InlineAlert](../../packages/react/docs/components/inline-alert.md)
- [DataList](../../packages/react/docs/components/data-list.md)
