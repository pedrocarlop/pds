# PasswordToggleField

## Purpose

PasswordToggleField provides a password input with show/hide state backed by
Radix Password Toggle Field.

## When To Use

- Use for password or secret fields where users need visibility control.

## When Not To Use

- Do not use for one-time codes; use OneTimePasswordField.
- Do not use for non-secret text inputs.

## Anatomy / Slots

```tsx
<PasswordToggleField>
  <PasswordToggleFieldInput />
  <PasswordToggleFieldToggle>
    <PasswordToggleFieldSlot />
  </PasswordToggleFieldToggle>
</PasswordToggleField>
```

## Public API

Exports include `PasswordToggleField`, `PasswordToggleFieldInput`,
`PasswordToggleFieldToggle`, `PasswordToggleFieldSlot`, and
`PasswordToggleFieldIcon`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `visible`, `defaultVisible`, `onVisiblityChange` | Radix values | Radix default | Controls password visibility. |
| `autoComplete` | `current-password`, `new-password` | undefined | Available on input. |
| `hidden`, `visible`, `render` | slot props | Required by slot form | Controls toggle label/icon rendering. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `password-toggle-field`, `password-toggle-field-input`, `password-toggle-field-toggle`, `password-toggle-field-icon` | Component |

## Accessibility Contract

Consumers must provide an accessible toggle label that changes or clearly
describes the action. Radix owns visibility state and input `type` switching.

## Content Resilience Rules

The input flexes and the toggle stays visible. Keep toggle labels concise; put
long instructions in surrounding form help text.

## Styling Contract

Classes use the `pds-password-toggle-field-*` prefix. Input reuses `pds-input`;
toggle uses tokenized compact button styling.

## Token Usage

Uses input/button color, spacing, radius, typography, state layer, focus,
disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Hidden password | Input renders as password and toggle uses neutral action background. | `.pds-password-toggle-field-*` | Toggle needs an accessible name. |
| Visible | Toggle activated | Radix switches input type to text. | Radix visibility state | Label or icon should communicate current action. |
| Focus-visible | Keyboard focus | Toggle uses PDS focus shadow; input uses input focus. | `:focus-visible` | Both input and toggle are keyboard reachable. |
| Disabled | Disabled input or toggle | Disabled opacity. | `:disabled` | Disabled controls cannot change visibility. |

Non-applicable states: Loading, Error, Success. Use surrounding form feedback.

## State Behavior

Visibility state and input type switching are Radix-owned. PDS wraps the root in
a styled div because the Radix root is not a DOM element.

## Composition Examples

```tsx
import { PasswordToggleField, PasswordToggleFieldInput, PasswordToggleFieldToggle } from "@pds/react";
```

## Known Limitations

- The upstream prop is named `onVisiblityChange`; preserve that spelling for
  Radix compatibility.

## Do / Don't For Agents

Do:

- Include a visible or accessible toggle label.

Don't:

- Do not use the field for non-secret content.

## Related Components

- [Input](input.md)
- [OneTimePasswordField](one-time-password-field.md)

## Related Sources

- Component source: [packages/react/src/components/password-toggle-field.tsx](../../../packages/react/src/components/password-toggle-field.tsx)
