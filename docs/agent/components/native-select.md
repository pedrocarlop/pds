# NativeSelect

## Purpose

NativeSelect provides a tokenized native `select` control for compact forms
where browser-native option rendering is preferred over the custom Select
popover.

![NativeSelect component preview](images/native-select.png)

## When To Use

- Use for simple option lists in forms and settings panels.
- Use when native mobile or browser select behavior is preferable.

## When Not To Use

- Do not use NativeSelect for searchable, grouped, or richly rendered options;
  use Select or a future Combobox.
- Do not use placeholder-only labeling.

## Anatomy / Slots

```tsx
<NativeSelect aria-label="Model">
  <NativeSelectOption value="fast">Fast model</NativeSelectOption>
</NativeSelect>
```

## Public API

Exports include `NativeSelect`, `NativeSelectOption`,
`NativeSelectOptGroup`, and their prop types.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `size` | `default`, `sm` | `default` | Controls select height and padding. |
| `invalid` | boolean | `false` | Adds invalid state and `aria-invalid`. |
| `wrapperClassName` | string | `undefined` | Applies to the wrapper slot. |

NativeSelect accepts native select attributes except numeric `size`, which is
reserved for PDS sizing.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `native-select-wrapper`, `native-select`, `native-select-icon`, `native-select-option`, `native-select-optgroup` | Component |
| `data-size` | `default`, `sm` | Component |
| `data-invalid` | `true` when invalid | Component |
| `data-disabled` | `true` when disabled | Component wrapper |

## Accessibility Contract

NativeSelect renders a native `select`. Consumers own visible labels,
`aria-label`, `aria-labelledby`, helper text, error text, and
`aria-describedby` wiring.

## Content Resilience Rules

Long option labels remain available through browser-native select behavior.
Keep visible labels and validation messages outside the control.

## Styling Contract

Classes use the `pds-native-select-*` prefix. CSS depends on native disabled,
focus-visible, `aria-invalid`, `data-size`, and wrapper disabled state.

## Token Usage

Uses typography, spacing, radius, color, focus, invalid, disabled opacity, and
motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Native select with tokenized field surface. | `data-slot='native-select'` | Labeling is consumer-owned. |
| Focus-visible | Keyboard focus | Shared PDS focus shadow. | `.pds-native-select:focus-visible` | Focus remains on the native select. |
| Disabled | `disabled` | Wrapper and select dim and suppress interaction. | `data-disabled='true'`, `:disabled` | Native disabled prevents editing and form submission. |
| Error | `invalid` or `aria-invalid` | Invalid ring and danger stroke. | `data-invalid='true'`, `aria-invalid='true'` | Pair with visible error text. |

Non-applicable states: Active, Loading, Success. Use child components or the
surrounding region for those states when needed.

## State Behavior

`invalid` sets `aria-invalid="true"` unless an explicit ARIA invalid value is
provided. `disabled` is passed to the native select and mirrored on the wrapper.

## Composition Examples

```tsx
import { NativeSelect, NativeSelectOption } from "@pds/react";

<NativeSelect aria-label="Model routing" defaultValue="balanced">
  <NativeSelectOption value="fast">Fast</NativeSelectOption>
  <NativeSelectOption value="balanced">Balanced</NativeSelectOption>
</NativeSelect>
```

## Known Limitations

- NativeSelect does not support custom option rendering.
- NativeSelect reserves the native numeric `size` attribute for PDS size.

## Do / Don't For Agents

Do:

- Use visible labels and helper text for form context.

Don't:

- Do not use NativeSelect when options need search or rich metadata.

## Related Components

- [Select](select.md)
- [Field](field.md)
- [Input](input.md)

## Related Sources

- Component source: [packages/react/src/components/native-select.tsx](../../../packages/react/src/components/native-select.tsx)
