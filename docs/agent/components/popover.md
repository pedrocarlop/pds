# Popover

## Purpose

Popover provides non-modal contextual content backed by Radix Popover.

## When To Use

- Use for compact inspectors, filters, and inline settings.
- Use when content belongs to a trigger but is richer than a menu.

## When Not To Use

- Do not use for blocking confirmation; use Dialog.
- Do not use for simple action lists; use Menu.

## Anatomy / Slots

```tsx
<Popover>
  <PopoverTrigger />
  <PopoverContent />
</Popover>
```

## Public API

Exports include `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`,
`PopoverAnchor`, and `PopoverPortal`. `PopoverContent` accepts `showArrow`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `popover-trigger`, `popover-content`, `popover-close`, `popover-arrow` | Component |
| `data-state`, `data-side`, `data-align` | Radix values | Radix |

## Accessibility Contract

Radix owns positioning, focus handling, outside dismissal, and Escape dismissal.
Consumers own accessible trigger labels and any headings or form labels inside
the content.

## Content Resilience Rules

Popover content wraps and is viewport constrained. Long content should use
internal scrolling only when the product task requires it.

## Styling Contract

Classes use the `pds-popover-*` prefix. CSS depends on content animation,
viewport constraints, arrow fill, and close-button focus/hover selectors.

## Token Usage

Uses popover surface color, typography, spacing, radius, elevation, state layer,
focus, and motion tokens.

## State Behavior

Open state is owned by Radix. `showArrow` only controls arrow rendering.

## Composition Examples

```tsx
import { Button, Popover, PopoverContent, PopoverTrigger } from "pds";

<Popover>
  <PopoverTrigger asChild><Button>Filters</Button></PopoverTrigger>
  <PopoverContent>Filter controls</PopoverContent>
</Popover>
```

## Known Limitations

- Popover does not trap focus like Dialog.

## Do / Don't For Agents

Do:

- Use Popover for contextual, non-blocking content.

Don't:

- Do not hide critical workflow steps in transient popovers.

## Related Components

- [Menu](menu.md)
- [Dialog](dialog.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Popover source](../../../packages/react/src/components/popover.tsx)
