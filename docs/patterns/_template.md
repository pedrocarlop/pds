# Pattern Name

One-sentence description of the user flow and why it needs pattern guidance.

## Overview

State the product job, the highest-risk mistake, and which parts of general
component guidance this pattern narrows or overrides.

## States

List the required states and what must remain visible in each state.

| State | Required behavior |
| --- | --- |
| Default | Describe the normal ready state. |
| Loading | Preserve context and expose progress or busy state. |
| Success | Confirm completion without hiding audit-relevant state. |
| Error | Keep recovery in context. |

## Layout Anatomy

Name the stable regions of the page or flow, the hierarchy between them, and
which regions may collapse, wrap, or become secondary on narrow screens.

## Flow Variants

| Flow | Use |
| --- | --- |
| Variant | Describe when this variant applies. |

## Component Composition

Name the PDS primitives to compose and the responsibilities that stay with the
consumer.

## Accessibility

Document keyboard, focus, screen-reader, landmark, live-region, and visible-label
requirements.

## Content Resilience

Document how the flow handles translation, long user content, narrow containers,
and 200% browser zoom. If the pattern is not fully boundless, name each overflow
mechanism.

## Client Responsibilities

List data, analytics, audit, persistence, validation, and error handling that
PDS does not own.

## Verification

- Scenario to test.
- Scenario to test.
- Keyboard and focus scenario to test.
- Long-content or 200% zoom scenario to test.

## Do's And Don'ts

Do:

- Preserve required state feedback.

Don't:

- Do not hide primary actions or required feedback.

## Related Sources

- [DESIGN.md](../../DESIGN.md)
- [Content resilience](../foundations/content-resilience.md)
- [PDS React components](../../packages/react/docs/components/README.md)
