# Select

## Purpose

Select provides a token-first single-value selection control backed by Radix
Select for keyboard navigation, typeahead, popover positioning, and selection
semantics.

## When To Use

- Use for compact option sets where only one value can be chosen.
- Use when available choices should remain constrained by product logic.

## When Not To Use

- Do not use for multi-select flows.
- Do not use when all options should stay visible; use RadioGroup or Tabs.

## Anatomy / Slots

```tsx
<Select>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="queued">Queued</SelectItem>
  </SelectContent>
</Select>
```

## Public API

| Export | Notes |
| --- | --- |
| `Select`, `SelectGroup`, `SelectValue`, `SelectPortal` | Radix primitives. |
| `SelectTrigger` | Styled trigger with `density` and `invalid`. |
| `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator` | Styled popover and item slots. |

`SelectTrigger` accepts `density="default" | "compact"` and `invalid`.
`SelectContent` accepts `showScrollButtons`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `select-trigger`, `select-content`, `select-item`, `select-label`, `select-separator` | Component |
| `data-density` | `default`, `compact` | `SelectTrigger` |
| `data-invalid` | `true` when invalid | `SelectTrigger` |
| `data-state`, `data-highlighted`, `data-disabled` | Radix values | Radix |

## Accessibility Contract

Radix owns combobox/listbox behavior, keyboard navigation, typeahead, and value
selection. Consumers must provide visible or ARIA labeling for the trigger.
`invalid` maps to `aria-invalid="true"` while explicit ARIA invalid values are
preserved.

## Content Resilience Rules

Trigger labels and items wrap by default. Keep option text short enough to scan,
but do not truncate generated values unless the full value is available nearby.

## Styling Contract

Classes use the `pds-select-*` prefix and live in `components.css`. CSS depends
on trigger density, invalid state, Radix highlight/checked/disabled attributes,
and scroll button slots.

## Token Usage

Uses color, typography, spacing, radius, elevation, focus, invalid state,
interaction state layer, disabled opacity, and motion tokens.

## State Behavior

Radix owns open/closed, highlighted, checked, and disabled state. Hover treatment
is suppressed for disabled triggers.

## Composition Examples

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "pds";

<Select defaultValue="running">
  <SelectTrigger aria-label="Run status">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="running">Running</SelectItem>
    <SelectItem value="paused">Paused</SelectItem>
  </SelectContent>
</Select>
```

## Known Limitations

- Select does not provide multi-select behavior.
- Select does not include a visible label wrapper.

## Do / Don't For Agents

Do:

- Preserve Radix primitives and stable slot attributes.
- Keep invalid and explicit `aria-invalid` behavior distinct.

Don't:

- Do not hard-code option colors or add non-token popover styling.

## Related Components

- [Input](input.md)
- [RadioGroup](radio-group.md)
- [Menu](menu.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Select source](../../../packages/react/src/components/select.tsx)
