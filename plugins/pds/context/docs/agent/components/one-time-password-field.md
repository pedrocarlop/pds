# OneTimePasswordField

## Purpose

OneTimePasswordField provides segmented one-time code entry backed by Radix
One Time Password Field.

## When To Use

- Use for short verification codes where each character needs a fixed slot.

## When Not To Use

- Do not use for ordinary passwords; use PasswordToggleField or Input.
- Do not use for long tokens or recovery codes.

## Anatomy / Slots

```tsx
<OneTimePasswordField>
  <OneTimePasswordFieldInput />
  <OneTimePasswordFieldHiddenInput />
</OneTimePasswordField>
```

## Public API

Exports include `OneTimePasswordField`, `OneTimePasswordFieldInput`, and
`OneTimePasswordFieldHiddenInput`. Props follow the Radix unstable OTP field.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | undefined | Submitted through the hidden input. |
| `value`, `defaultValue`, `onValueChange` | string | undefined | Controls the full code value. |
| `validationType` | `alpha`, `numeric`, `alphanumeric`, `none` | Radix default | Controls accepted characters. |
| `index` | number | undefined | Sets input order. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `one-time-password-field`, `one-time-password-field-input`, `one-time-password-field-hidden-input` | Component |
| `data-orientation`, disabled/read-only attributes | Radix/native values | Radix/native |

## Accessibility Contract

Consumers must label each visible input or provide surrounding label context.
Radix owns value coordination, roving focus, hidden input submission, and
sanitization.

## Content Resilience Rules

OTP inputs are fixed affordances; surrounding labels and messages must carry
long explanatory copy.

## Styling Contract

Classes use the `pds-one-time-password-field-*` prefix. The hidden input uses
`pds-visually-hidden`.

## Token Usage

Uses input color, spacing, radius, typography, focus, invalid, disabled opacity,
and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Fixed character inputs in horizontal or vertical group. | `.pds-one-time-password-field` | Inputs need labels. |
| Focus-visible | Keyboard focus | Input uses shared PDS focus shadow. | `.pds-one-time-password-field-input:focus-visible` | Roving focus follows Radix behavior. |
| Invalid | Native invalid state | Input uses invalid ring. | `[aria-invalid='true']` | Pair with visible error text outside the field. |
| Disabled | `disabled` | Inputs use disabled opacity. | `:disabled` | Disabled fields cannot update. |

Non-applicable states: Loading, Success. Use surrounding feedback components for
those states.

## State Behavior

Value distribution, auto submit, paste handling, and sanitization are Radix-owned.

## Composition Examples

```tsx
import { OneTimePasswordField, OneTimePasswordFieldInput } from "@pds/react";
```

## Known Limitations

- The primitive is exported under Radix unstable APIs upstream.

## Do / Don't For Agents

Do:

- Include `OneTimePasswordFieldHiddenInput` when a native form should submit the
  full code value.

Don't:

- Do not use this for long secret values.

## Related Components

- [Input](input.md)
- [PasswordToggleField](password-toggle-field.md)

## Related Sources

- Component source: [packages/react/src/components/one-time-password-field.tsx](../../../packages/react/src/components/one-time-password-field.tsx)
