# Form

## Purpose

Form provides accessible form fields, labels, validation messages, and submit
controls backed by Radix Form.

## When To Use

- Use for product forms that need native validation and stable PDS field slots.

## When Not To Use

- Do not use for display-only data; use DataList or Details.
- Do not use for custom validation flows without native form semantics unless
  the product owns that behavior explicitly.

## Anatomy / Slots

```tsx
<Form>
  <FormField name="title">
    <FormLabel />
    <FormControl />
    <FormMessage />
  </FormField>
  <FormSubmit />
</Form>
```

## Public API

Exports include `Form`, `FormField`, `FormLabel`, `FormControl`,
`FormMessage`, `FormValidityState`, and `FormSubmit`. Props follow Radix Form.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `name` | string | Required on `FormField` | Connects label, control, and messages. |
| `serverInvalid` | boolean | `false` | Marks server-side invalid field state. |
| `match` | Radix validity matcher | Radix default | Controls message rendering. |
| `type` | button type | `submit` on `FormSubmit` | PDS defaults submit controls to native submit. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `form`, `form-field`, `form-label`, `form-control`, `form-message`, `form-submit` | Component |
| `data-valid`, validation attributes | Radix values | Radix |

## Accessibility Contract

Radix owns label-control-message relationships and validity matching. Consumers
must provide labels, required indicators in visible text when needed, and submit
handling.

## Content Resilience Rules

Labels and messages wrap. Do not truncate validation messages or required field
labels.

## Styling Contract

Classes use the `pds-form-*` prefix. `FormControl` reuses `pds-input`, and
`FormSubmit` reuses `pds-button` with submit defaults.

## Token Usage

Uses form/input/button color, spacing, radius, typography, state layer, focus,
invalid, disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Fields stack labels, controls, messages, and submit action. | `.pds-form`, `.pds-form-field` | Native form semantics remain intact. |
| Invalid | Native validity or server invalid | Control uses invalid input treatment; message uses danger color. | `aria-invalid`, `.pds-form-message` | Messages must be associated through Radix Form. |
| Focus-visible | Keyboard focus | Control and submit use shared PDS focus shadow. | `.pds-form-control:focus-visible`, `.pds-form-submit:focus-visible` | Focus stays on native controls. |
| Disabled | Disabled control or submit | Disabled controls use shared opacity. | `:disabled` | Disabled fields are not submitted by native forms. |

Non-applicable states: Loading and Success. Use surrounding feedback components
or button busy behavior when needed.

## State Behavior

Validation matching and message visibility are Radix-owned. PDS maps classes,
slots, and default submit styling.

## Composition Examples

```tsx
import { Form, FormControl, FormField, FormLabel, FormMessage, FormSubmit } from "@pds/react";
```

## Known Limitations

- Form does not provide schema validation or submission side effects.

## Do / Don't For Agents

Do:

- Keep labels and validation copy visible and specific.

Don't:

- Do not rely on placeholder text as the only field label.

## Related Components

- [Input](input.md)
- [Label](label.md)

## Related Sources

- Component source: [packages/react/src/components/form.tsx](../../../packages/react/src/components/form.tsx)
