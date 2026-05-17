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

## State Behavior

Checked and indeterminate states use accent fill. Disabled checkboxes suppress
hover treatment through native disabled selectors.

## Composition Examples

```tsx
import { Checkbox } from "pds";

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

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Checkbox source](../../../packages/react/src/components/checkbox.tsx)
