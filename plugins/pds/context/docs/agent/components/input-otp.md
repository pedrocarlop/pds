# InputOTP

## Purpose

InputOTP provides a one-time-code input with a single accessible input control
and visible grouped slots for verification, recovery, and MFA codes.

![InputOTP component preview](images/input-otp.png)

## When To Use

- Use for short verification codes that benefit from per-character slots.
- Use `InputOTPGroup` to group related digits and `InputOTPSeparator` to divide
  code segments.
- Use `invalid` when validation feedback exists outside the control.

## When Not To Use

- Do not use InputOTP for general numeric input, passwords, or long identifiers.
- Do not use slot text as the only label; provide an accessible label on
  `InputOTP`.

## Anatomy / Slots

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
  </InputOTPGroup>
  <InputOTPSeparator />
</InputOTP>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `maxLength` | number | required by primitive | Number of slots/code characters. |
| `invalid` | boolean | `false` | Sets invalid state and `aria-invalid`. |
| `containerClassName` | string | `undefined` | Applied to the visible container. |

`InputOTP` passes through `input-otp` props. Slot, group, and separator props
extend native `div` attributes. Exports include `InputOTP`, `InputOTPGroup`,
`InputOTPSlot`, `InputOTPSeparator`, and matching prop types.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `input-otp` | `InputOTP` input |
| `data-invalid` | `true` | `InputOTP` when `invalid` is true |
| `data-slot` | `input-otp-group` | `InputOTPGroup` |
| `data-slot` | `input-otp-slot` | `InputOTPSlot` |
| `data-active` | `true` | Active slot |
| `data-filled` | `true` | Slot with a character |
| `data-placeholder-visible` | `true` | Empty slot showing placeholder char |
| `data-slot` | `input-otp-separator` | `InputOTPSeparator` |

## Accessibility Contract

`input-otp` owns the single native input, keyboard editing, paste behavior, and
screen-reader interaction. Consumers must provide a visible label, `aria-label`,
or `aria-labelledby`, and wire error text with `aria-describedby`.

`invalid` sets `aria-invalid="true"` on the input. Separator is visual and uses
`role="separator"`.

## Content Resilience Rules

Slots have stable dimensions for code entry. Groups may wrap in compact
containers. Error text remains outside the control so validation stays readable
at narrow widths and 200% zoom.

## Styling Contract

Classes use the `pds-input-otp-*` prefix and live in
`packages/react/src/components.css`. CSS depends on slot data attributes,
`:has(.pds-input-otp-control:focus-visible)`, `aria-invalid`, and disabled
input selectors.

## Token Usage

InputOTP uses PDS form surface color, typography, spacing, radius, focus,
invalid state, disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Visible slots render as tokenized code boxes. | `data-slot='input-otp-slot'` | Native input remains the accessible control. |
| Focus-visible | Input focus | Active slot uses focus treatment. | `.pds-input-otp:has(.pds-input-otp-control:focus-visible)` | Focus remains on the native input. |
| Disabled | `disabled` | Container dims and suppresses editing through native input. | `.pds-input-otp:has(.pds-input-otp-control:disabled)` | Native disabled behavior applies. |
| Error | `invalid` or `aria-invalid` | Slots use invalid border and ring treatment. | `aria-invalid='true'`, `data-invalid='true'` | Error text is consumer-owned. |

Non-applicable states: Hover, active, loading, and success.

## State Behavior

`InputOTPSlot` reads slot state from `OTPInputContext`. Active, filled, and
placeholder-visible data attributes are derived from the primitive.

## Composition Examples

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@pds/react";

<InputOTP aria-label="Verification code" maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>;
```

## Known Limitations

- InputOTP does not validate, submit, or request codes.
- InputOTP does not include label or error slots.

## Do / Don't For Agents

Do:

- Provide a label and external validation message.
- Keep slot count aligned with `maxLength`.
- Preserve the single-input accessibility model.

Don't:

- Do not replace the primitive with separate per-digit inputs.
- Do not hide required error text in the slots.

## Related Components

- [Input](input.md)
- [Field](field.md)
- [Button](button.md)

## Related Sources

- Component source: [packages/react/src/components/input-otp.tsx](../../../packages/react/src/components/input-otp.tsx)
