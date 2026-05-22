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
    <SelectGroup>
      <SelectLabel>Status</SelectLabel>
      <SelectItem value="queued">Queued</SelectItem>
    </SelectGroup>
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

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Trigger renders selected value and chevron at selected density; content renders when open. | `data-slot='select-trigger'`, `data-density`, Radix `data-state` | Radix owns select trigger, listbox, item, and value semantics. |
| Hover | Pointer hover | Enabled trigger uses neutral hover border treatment. | `.pds-select-trigger:not(:disabled):hover` | Hover is suppressed for disabled trigger. |
| Focus-visible | Keyboard focus | Trigger uses shared PDS focus shadow; invalid focus keeps invalid border. | `.pds-select-trigger:focus-visible`, `[aria-invalid='true']:focus-visible` | Keyboard interaction follows Radix select behavior. |
| Active | Pressed | Pressed trigger opens content; checked item uses selected state layer. | `data-state='open'`, `.pds-select-item[data-state='checked']` | Radix owns selected item ARIA state. |
| Disabled | `disabled` / `aria-disabled` | Disabled trigger and items dim and suppress highlight selection. | `.pds-select-trigger:disabled`, `data-disabled` | Radix disabled controls are not activatable. |
| Error | `data-invalid` / error prop | Invalid trigger uses invalid border treatment. | `data-invalid='true'`, `aria-invalid='true'` | `invalid` sets invalid ARIA state while explicit values are preserved. |

Non-applicable states: Loading, Success. Use child components or the surrounding region for those states when needed.

## State Behavior

Radix owns open/closed, highlighted, checked, and disabled state. Hover treatment
is suppressed for disabled triggers.

## Composition Examples

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pds/react";

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
- Place `SelectLabel` inside `SelectGroup`; Radix throws when labels are used
  outside a group.

Don't:

- Do not hard-code option colors or add non-token popover styling.

## Related Components

- [Input](input.md)
- [RadioGroup](radio-group.md)
- [Menu](menu.md)

## Related Sources

- Component source: [packages/react/src/components/select.tsx](../../../packages/react/src/components/select.tsx)
