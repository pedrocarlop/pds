# FilterChip

## Purpose

FilterChip is the compact filter summary control for PDS product surfaces. It
opens or targets filter UI while keeping selected filter values visible inside
the control.

## Landing Requirement

Before FilterChip changes land, keep source, component CSS, this docs file,
example usage in `examples/react`, tests, stable `data-slot` / `data-*`
attributes, content-resilience notes, and focus behavior in sync.

## When To Use

- Use for toolbar, header, or list controls that open filter choices.
- Use `active` when the filter has applied values or represents the current
  filtering state.
- Use `FilterChipValue` for visible applied values inside the chip.

## When Not To Use

- Do not use FilterChip for status metadata; use Badge.
- Do not use FilterChip for primary actions; use Button.
- Do not hide applied filter state in color alone when values can be shown.

## Anatomy / Slots

```tsx
<FilterChip label="Filters">
  <FilterChip.Value>Team members</FilterChip.Value>
  <FilterChip.Value>Statuses</FilterChip.Value>
</FilterChip>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `label` | `ReactNode` | required | Primary filter control label. |
| `active` | `boolean` | `false` | Maps to `data-active` and default `aria-pressed` when no `aria-pressed` prop is provided. |
| `disabled` | native button disabled | `false` | Uses native button disabled behavior and `data-disabled`. |

FilterChip extends native `button` attributes, forwards refs, preserves
`className`, and defaults `type` to `button`.

FilterChipValue extends native `span` attributes, forwards refs, and preserves
`className`. It is available as both `FilterChip.Value` and
`FilterChipValue`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `filter-chip` | FilterChip |
| `data-slot` | `filter-chip-label` | FilterChip |
| `data-slot` | `filter-chip-values` | FilterChip |
| `data-slot` | `filter-chip-value` | FilterChipValue |
| `data-active` | `true` | FilterChip |
| `data-disabled` | `true` | FilterChip |

## Accessibility Contract

FilterChip renders a native `button`. Consumers should provide an accessible
label when the visible content is not enough, and should wire `aria-expanded`,
`aria-controls`, or popover/menu behavior when the chip opens another surface.

When `active` is true, FilterChip sets `aria-pressed="true"` unless the consumer
provides `aria-pressed`. Applied values remain visible text, so screen readers
can announce them as part of the button name.

## Content Resilience Rules

FilterChip labels and values wrap by default. Applied values should stay visible
in narrow toolbars, translated strings, zoomed layouts, and compact side panels.
Do not truncate required filter state inside this component.

## Styling Contract

The root class is `pds-filter-chip`; value styling uses
`pds-filter-chip-value`. Styling lives in
`packages/react/src/components.css`.

CSS depends on `data-active`, `data-disabled`, `:disabled`, `:hover`,
`:active`, and `:focus-visible`. Preserve those selectors when changing
implementation details.

## Token Usage

FilterChip uses PDS color, typography, spacing, radius, focus, and motion
tokens. Active and interaction states use shared state-layer tokens instead of
one-off colors.

## State Behavior

`active` changes visual treatment and default pressed semantics. Native
`disabled` prevents activation and removes hover/pressed treatments through CSS.
FilterChip does not own popover state or filter values.

## Composition Examples

```tsx
import { FilterChip } from "@pds/react";

<FilterChip label="Filters" />

<FilterChip active label="Filters">
  <FilterChip.Value>Team members</FilterChip.Value>
  <FilterChip.Value>Statuses</FilterChip.Value>
</FilterChip>
```

## Known Limitations

- FilterChip does not open a popover or menu by itself.
- FilterChipValue is display-only and does not provide remove buttons.
- FilterChip does not manage filter selection state.

## Do / Don't For Agents

Do:

- Preserve native button semantics and default `type="button"`.
- Keep applied values visible and wrapping.
- Use `active` only for applied or selected filter state.

Don't:

- Do not use FilterChip as a badge or status-only label.
- Do not add icon-only filter chips without an accessible label.
- Do not hard-code colors, spacing, radius, or motion values.

## Related Components

- [Button](button.md)
- [Badge](badge.md)
- [Popover](popover.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [FilterChip source](../../../packages/react/src/components/filter-chip.tsx)
