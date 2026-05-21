# Tooltip

## Purpose

Tooltip provides the PDS supplemental label and description primitive. It wraps
Radix Tooltip for trigger behavior, timing, keyboard support, portal rendering,
and accessible tooltip semantics.

## When To Use

- Use for brief supplemental labels, icon button names, or compact metadata
  explanations.
- Use `TooltipProvider` around related tooltip groups.
- Use `showArrow={false}` only when the surrounding layout makes the attachment
  point clear.

## When Not To Use

- Do not put required instructions, errors, or state feedback only in a tooltip.
- Do not use Tooltip for rich popovers, menus, or persistent help panels.
- Do not use Tooltip as the only way to reveal critical content on touch-first
  surfaces.

## Anatomy / Slots

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger />
    <TooltipContent />
  </Tooltip>
</TooltipProvider>
```

`TooltipContent` renders through a Radix portal and includes `TooltipArrow` by
default.

## Public API

| Export | Notes |
| --- | --- |
| `TooltipProvider` | Radix provider. |
| `Tooltip` | Radix root with stable slot attribute. |
| `TooltipTrigger` | Radix trigger with stable slot attribute. |
| `TooltipContent` | PDS styled Radix content; accepts `showArrow`. |

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `showArrow` | `boolean` | `true` | Renders the tooltip arrow. |
| `sideOffset` | Radix side offset | `8` | Default spacing from trigger. |

Radix props pass through to their matching primitive exports.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `tooltip` | `Tooltip` |
| `data-slot` | `tooltip-trigger` | `TooltipTrigger` |
| `data-slot` | `tooltip-content` | `TooltipContent` |
| `data-slot` | `tooltip-arrow` | `TooltipContent` when arrow is shown |

Radix also owns `data-state`, `data-side`, and `data-align` attributes used by
positioning and animation selectors.

## Accessibility Contract

Radix owns tooltip roles, trigger wiring, keyboard focus opening, pointer
behavior, and portal placement. Consumers own trigger accessibility, especially
for icon-only triggers.

Tooltip content must be supplemental. Required labels, errors, and instructions
must also exist in visible or otherwise accessible UI.

## Content Resilience Rules

Tooltip content wraps inside a viewport-constrained width. Keep content concise,
but preserve the full label when translation is longer than expected.

## Styling Contract

The content class is `pds-tooltip-content`; arrow styling uses
`pds-tooltip-arrow`. Styling lives in `packages/react/src/components.css`.

CSS depends on Radix placement and open state attributes. Preserve wrapping,
z-index, and reduced-motion behavior when changing tooltip selectors.

## Token Usage

Tooltip uses PDS surface color, foreground color, typography, spacing, radius,
elevation, and motion tokens.

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Trigger renders normally; content and optional arrow render when Radix opens the tooltip. | `data-slot='tooltip-*'`, Radix `data-state` | Radix owns tooltip relationship, delay, and dismissal behavior. |
| Hover | Pointer hover | Pointer hover on trigger opens positioned tooltip content through Radix. | Radix trigger hover and content `data-state` | Tooltip content supplements but does not replace accessible names. |
| Focus-visible | Keyboard focus | Keyboard focus on trigger opens tooltip through Radix; trigger owns focus styling. | Radix trigger focus and content `data-state` | Trigger remains the keyboard focus target. |
| Active | Pressed | Not applicable: Tooltip has no activation behavior. | Not applicable | Do not put interactive content inside tooltip. |
| Disabled | `disabled` / `aria-disabled` | No root disabled state; disabled trigger behavior is native or consumer-owned. | Trigger `disabled` or `aria-disabled` | Disabled triggers may not emit focus or hover events. |
| Loading | `loading` prop / `data-busy` | Not applicable: Tooltip has no loading state. | Not applicable | Do not use tooltip content for loading announcements. |
| Error | `data-invalid` / error prop | Not applicable: Tooltip has no error state. | Not applicable | Use validation messaging outside tooltip-only content. |
| Success | status / success prop | Not applicable: Tooltip has no success state. | Not applicable | Use visible status text for success feedback. |

## State Behavior

Open state, delay, pointer handling, and keyboard behavior are owned by Radix.
`showArrow` only controls arrow rendering. `sideOffset` defaults to a compact
PDS spacing value.

## Composition Examples

```tsx
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@pds/react";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button aria-label="Refresh" size="icon">R</Button>
    </TooltipTrigger>
    <TooltipContent>Refresh run status</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Known Limitations

- Tooltip does not provide popover, menu, or hover-card behavior.
- Tooltip does not guarantee access to critical content on every input mode.
- Tooltip does not manage icon-only trigger names.

## Do / Don't For Agents

Do:

- Preserve Radix primitives and slot attributes.
- Keep tooltip text concise and wrapping.
- Ensure required information is available outside Tooltip.

Don't:

- Do not put errors or required instructions only in Tooltip.
- Do not replace menus or popovers with Tooltip.
- Do not remove Radix positioning state selectors from CSS without tests.

## Related Components

- [Button](button.md)
- [Badge](badge.md)
- [Avatar](avatar.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Tooltip source](../../../packages/react/src/components/tooltip.tsx)
