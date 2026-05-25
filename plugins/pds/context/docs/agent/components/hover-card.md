# HoverCard

## Purpose

HoverCard shows lightweight, non-interactive preview content anchored to a
trigger during pointer or focus exploration.

![HoverCard component preview](images/hover-card.png)

## When To Use

- Use for profile, object, or run previews that help users inspect context.
- Use when the content is helpful but not required to complete the task.

## When Not To Use

- Do not use HoverCard for actions, forms, or required decisions; use Popover or
  Dialog.
- Do not rely on HoverCard as the only place important information appears.

## Anatomy / Slots

```tsx
<HoverCard>
  <HoverCardTrigger />
  <HoverCardContent />
</HoverCard>
```

## Public API

Exports include `HoverCard`, `HoverCardTrigger`, `HoverCardContent`,
`HoverCardPortal`, and `HoverCardContentProps`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `showArrow` | boolean | `true` | Renders the positioned arrow. |
| `align` | Radix align values | `center` | Passed to Radix content. |
| `sideOffset` | number | `8` | Passed to Radix content. |
| `collisionPadding` | number | `16` | Keeps content away from viewport edges. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `hover-card-trigger`, `hover-card-content`, `hover-card-arrow` | Component |
| `data-state`, `data-side`, `data-align` | Radix values | Radix |

## Accessibility Contract

Radix owns hover/focus timing and positioning. Consumers own accessible trigger
labels. HoverCard content should be supplementary because hover-only discovery
is not guaranteed on touch devices.

## Content Resilience Rules

HoverCard content is viewport constrained and wraps long labels. Keep previews
compact; move dense, scrollable, or actionable content to Popover, Dialog, or a
dedicated page section.

## Styling Contract

Classes use the `pds-hover-card-*` prefix. CSS owns popover surface styling,
viewport width, arrow fill, elevation, and open animation.

## Token Usage

Uses popover surface color, typography, spacing, radius, elevation, and motion
tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Closed render | Trigger renders normally; content appears when Radix opens it. | `data-slot='hover-card-*'` | Trigger semantics are consumer-owned. |
| Open | Hover or focus based on Radix timing | Content renders as a compact elevated surface. | `data-state='open'`, `.pds-hover-card-content` | Content must be supplementary. |
| Collision | Near viewport edge | Radix repositions content. | Radix `data-side`, `data-align` | Position changes must not alter meaning. |

Non-applicable states: Disabled, Error, Loading, Success. Use trigger or content
children for those states when needed.

## State Behavior

HoverCard open state and delays are Radix-owned. `showArrow` only controls arrow
rendering.

## Composition Examples

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@pds/react";

<HoverCard>
  <HoverCardTrigger asChild><a href="/runs/123">Run 123</a></HoverCardTrigger>
  <HoverCardContent>Queued by Pedro, awaiting review.</HoverCardContent>
</HoverCard>
```

## Known Limitations

- HoverCard is not a substitute for touch-first required content.
- HoverCard should not contain form controls.

## Do / Don't For Agents

Do:

- Keep hover previews concise and redundant with accessible page content.

Don't:

- Do not put primary actions inside HoverCard.

## Related Components

- [Popover](popover.md)
- [Tooltip](tooltip.md)
- [Dialog](dialog.md)

## Related Sources

- Component source: [packages/react/src/components/hover-card.tsx](../../../packages/react/src/components/hover-card.tsx)
