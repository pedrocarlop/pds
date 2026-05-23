# ScrollArea

## Purpose

ScrollArea provides tokenized custom scroll regions backed by Radix Scroll Area.

## When To Use

- Use for bounded logs, lists, or panels where the scroll affordance belongs to
  the component.

## When Not To Use

- Do not use for full-page scrolling.
- Do not use when native overflow is sufficient and no styled affordance is
  needed.

## Anatomy / Slots

```tsx
<ScrollArea>
  <ScrollAreaViewport />
  <ScrollAreaScrollbar>
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
  <ScrollAreaCorner />
</ScrollArea>
```

## Public API

Exports include `ScrollArea`, `ScrollAreaViewport`, `ScrollAreaScrollbar`,
`ScrollAreaThumb`, and `ScrollAreaCorner`. Props follow Radix Scroll Area.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `type` | `auto`, `always`, `scroll`, `hover` | Radix default | Controls scrollbar visibility. |
| `scrollHideDelay` | number | Radix default | Delay before hiding scrollbars. |
| `orientation` | `horizontal`, `vertical` | `vertical` on scrollbar | Controls scrollbar axis. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `scroll-area`, `scroll-area-viewport`, `scroll-area-scrollbar`, `scroll-area-thumb`, `scroll-area-corner` | Component |
| `data-orientation`, `data-state` | Radix values | Radix |

## Accessibility Contract

ScrollArea does not replace semantic list or region labels. Consumers must label
scrollable regions when context is not obvious.

## Content Resilience Rules

Use explicit height or max-height on the ScrollArea root. Content remains
available through the viewport and should not be clipped without scroll access.

## Styling Contract

Classes use the `pds-scroll-area-*` prefix. CSS owns root clipping, viewport
fill, scrollbar axis sizing, thumb color, and corner behavior.

## Token Usage

Uses spacing, radius, color, state layer, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Viewport fills root; scrollbar uses transparent track and tokenized thumb. | `.pds-scroll-area-*` | Semantics come from children. |
| Hover | Pointer over scrollbar | Thumb shifts to stronger neutral tone. | `.pds-scroll-area-scrollbar:hover .pds-scroll-area-thumb` | Native scrolling remains available. |
| Orientation | Scrollbar orientation | Axis changes width or height. | `data-orientation` | Radix owns pointer scrolling behavior. |

Non-applicable states: Disabled, Loading, Error, Success. Use child content or
surrounding feedback components for those states.

## State Behavior

Scrollbar visibility, thumb drag behavior, and corner sizing are Radix-owned.

## Composition Examples

```tsx
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "@pds/react";
```

## Known Limitations

- ScrollArea does not provide virtualization.

## Do / Don't For Agents

Do:

- Set a bounded height or max-height on the root.

Don't:

- Do not hide required actions below a tiny scroll region.

## Related Components

- [DataList](data-list.md)
- [Table](table.md)

## Related Sources

- Component source: [packages/react/src/components/scroll-area.tsx](../../../packages/react/src/components/scroll-area.tsx)
