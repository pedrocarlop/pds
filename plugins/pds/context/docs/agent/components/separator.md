# Separator

## Purpose

Separator is the PDS structural divider primitive for rare cases where spacing
and surface contrast are not enough.

## When To Use

- Use to separate toolbar groups, menu sections, or dense metadata clusters.
- Use decorative separators when the divider does not communicate document
  structure.

## When Not To Use

- Do not use Separator as the default way to group list rows or cards.
- Do not use Separator to create page layout when spacing or surfaces can carry
  the hierarchy.

## Anatomy / Slots

```tsx
<Separator />
<Separator orientation="vertical" />
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `orientation` | `horizontal`, `vertical` | `horizontal` | Passed to Radix Separator. |
| `decorative` | `boolean` | `true` | Keeps purely visual separators out of the accessibility tree. |

Separator extends Radix Separator root props and forwards refs.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `separator` | Component |
| `data-orientation` | `horizontal`, `vertical` | Radix |

## Accessibility Contract

Decorative separators are hidden from assistive technology. Set
`decorative={false}` only when the separator represents meaningful document or
widget structure.

## Content Resilience Rules

Separator has no text content. It should flex with its container and must not
force sibling content to truncate.

## Styling Contract

The root class is `pds-separator`; styling lives in
`packages/react/src/components.css`. Preserve orientation selectors.

## Token Usage

Separator uses PDS neutral color, spacing, and radius tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Thin neutral divider sized by orientation. | `data-slot='separator'`, `data-orientation` | Decorative by default. |

Non-applicable states: Hover, Focus-visible, Active, Disabled, Loading, Error,
Success.

## State Behavior

Separator has no interactive state. Orientation is reflected by Radix data
attributes.

## Composition Examples

```tsx
import { Separator } from "@pds/react";

<Separator />
```

## Known Limitations

- Separator does not replace PDS surface, spacing, or fake-divider list
  composition guidance.

## Do / Don't For Agents

Do:

- Prefer spacing and surfaces before adding a separator.
- Keep decorative separators decorative.

Don't:

- Do not use Separator to draw borders around cards or panels.

## Related Components

- [Toolbar](toolbar.md)
- [Menu](menu.md)

## Related Sources

- Component source: [packages/react/src/components/separator.tsx](../../../packages/react/src/components/separator.tsx)
