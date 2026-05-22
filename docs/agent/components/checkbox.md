# Checkbox

## Purpose

Checkbox provides a compact binary or indeterminate control backed by Radix
Checkbox.

## When To Use

- Use for independent yes/no settings.
- Use indeterminate state when a parent selection summarizes mixed children.

## When Not To Use

- Do not use for mutually exclusive choices; use RadioGroup.
- Do not use as a disclosure control.

## Anatomy / Slots

```tsx
<Checkbox aria-label="Include archived runs" />
```

## Public API

| Export | Notes |
| --- | --- |
| `Checkbox` | Styled Radix root with default indicator. |
| `CheckboxIndicator` | Optional custom indicator slot. |

`Checkbox` accepts `invalid` and Radix checkbox props.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `checkbox`, `checkbox-indicator` | Component |
| `data-invalid` | `true` when invalid | Component |
| `data-state` | `checked`, `unchecked`, `indeterminate` | Radix |

## Accessibility Contract

Radix renders checkbox semantics and keyboard behavior. Consumers own visible
labels or ARIA labels and any helper or error text. `invalid` maps to
`aria-invalid="true"`.

## Content Resilience Rules

Checkbox itself is fixed-size. Labels should live outside the control and wrap in
the consuming layout.

## Styling Contract

Classes use the `pds-checkbox-*` prefix. CSS depends on Radix `data-state`,
native disabled state, focus-visible, and invalid attributes.

## Token Usage

Uses color, radius, focus, invalid state, interaction state layer, disabled
opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Unchecked checkbox renders neutral control and indicator slot. | `data-slot='checkbox'`, `data-state='unchecked'` | Radix checkbox owns checkbox semantics. |
| Hover | Pointer hover | Enabled checkbox uses neutral hover state layer. | `.pds-checkbox:not(:disabled):hover` | Hover does not change checked state. |
| Focus-visible | Keyboard focus | Checkbox uses the shared PDS focus shadow. | `.pds-checkbox:focus-visible` | Keyboard users toggle with native checkbox interaction through Radix. |
| Active | Pressed | Press toggles checked or indeterminate state with accent fill when selected. | `data-state='checked'`, `data-state='indeterminate'` | Radix updates `aria-checked` for checked and mixed states. |
| Disabled | `disabled` / `aria-disabled` | Disabled checkbox dims and suppresses hover treatment. | `.pds-checkbox:disabled` | Radix disabled checkbox is not activatable. |
| Error | `data-invalid` / error prop | Invalid checkbox uses semantic invalid border treatment. | `data-invalid='true'`, `aria-invalid='true'` | `invalid` sets or preserves invalid ARIA state. |

Non-applicable states: Loading, Success. Use child components or the surrounding region for those states when needed.

## State Behavior

Checked and indeterminate states use accent fill. Disabled checkboxes suppress
hover treatment through native disabled selectors.

## Composition Examples

```tsx
import { Checkbox } from "@pds/react";

<label>
  <Checkbox defaultChecked /> Include archived runs
</label>
```

## Known Limitations

- Checkbox does not include label or field text slots.

## Do / Don't For Agents

Do:

- Preserve Radix state attributes and invalid ARIA mapping.

Don't:

- Do not put long text inside the fixed-size control.

## Related Components

- [RadioGroup](radio-group.md)
- [Switch](switch.md)

## Related Sources

- Component source: [packages/react/src/components/checkbox.tsx](../../../packages/react/src/components/checkbox.tsx)
