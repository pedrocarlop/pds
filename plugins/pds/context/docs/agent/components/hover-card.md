# HoverCard

## Purpose

HoverCard provides non-modal hover or focus preview content backed by Radix
Hover Card.

## When To Use

- Use for lightweight previews of users, agents, files, runs, or metadata.

## When Not To Use

- Do not use for required workflow steps.
- Do not use for action menus; use Menu.

## Anatomy / Slots

```tsx
<HoverCard>
  <HoverCardTrigger />
  <HoverCardContent />
</HoverCard>
```

## Public API

Exports include `HoverCard`, `HoverCardTrigger`, `HoverCardPortal`, and
`HoverCardContent`. `HoverCardContent` accepts `showArrow`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `open`, `defaultOpen`, `onOpenChange` | Radix values | Radix default | Use controlled state for previews that must stay visible. |
| `openDelay`, `closeDelay` | number | Radix default | Use sparingly. |
| `showArrow` | boolean | `true` | Controls the PDS arrow. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `hover-card-trigger`, `hover-card-content`, `hover-card-arrow` | Component |
| `data-state`, `data-side`, `data-align` | Radix values | Radix |

## Accessibility Contract

Radix owns hover/focus timing, positioning, outside interactions, and Escape
dismissal. Consumers must keep the trigger accessible without depending on the
preview.

## Content Resilience Rules

HoverCard content wraps and is viewport constrained. Keep preview copy concise
and non-essential.

## Styling Contract

Classes use the `pds-hover-card-*` prefix. Content shares popover surface
constraints and arrow fill behavior.

## Token Usage

Uses popover surface, spacing, radius, elevation, typography, state layer,
focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Closed or mounted content | Trigger renders as supplied; content uses popover surface when open. | `data-slot='hover-card-*'` | Trigger must stand alone. |
| Open | Hover, focus, or controlled state | Content and optional arrow animate in. | `data-state='open'` | Radix owns preview interactions. |
| Focus-visible | Trigger focus | Trigger focus treatment is owned by trigger composition. | Trigger selector | Do not hide essential content in HoverCard. |

Non-applicable states: Active, Disabled, Loading, Error, Success. Use trigger
or content children for those states.

## State Behavior

Open state and positioning are Radix-owned. PDS maps content and arrow styling.

## Composition Examples

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@pds/react";
```

## Known Limitations

- HoverCard is not a modal and does not trap focus.

## Do / Don't For Agents

Do:

- Keep HoverCard information supplementary.

Don't:

- Do not put required form controls inside HoverCard.

## Related Components

- [Popover](popover.md)
- [Tooltip](tooltip.md)

## Related Sources

- Component source: [packages/react/src/components/hover-card.tsx](../../../packages/react/src/components/hover-card.tsx)
