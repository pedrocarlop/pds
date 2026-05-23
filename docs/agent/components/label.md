# Label

## Purpose

Label is the PDS form-label primitive. It wraps the Radix Label source from the
temp package in PDS slots, typography, and token-first styling.

## When To Use

- Use for explicit labels associated with inputs, selects, textareas, switches,
  sliders, and custom form controls.
- Use when clicking the label should focus or activate the associated control.

## When Not To Use

- Do not use Label as helper text, metadata, badge text, or a layout wrapper.
- Do not hide required labels; pair helper text and errors with the field region.

## Anatomy / Slots

```tsx
<Label htmlFor="run-name">Run name</Label>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| Native label props | `htmlFor`, `children`, ARIA, events | Native | Extends Radix Label root props. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `label` | Component |

## Accessibility Contract

Consumers must connect Label to its control with `htmlFor` or by wrapping a
native labelable control. Required, optional, helper, and error semantics remain
owned by the field composition.

## Content Resilience Rules

Labels must remain visible and readable. Keep labels concise, but allow wrapping
when a field layout needs translated or user-provided copy.

## Styling Contract

The root class is `pds-label`; styling lives in
`packages/react/src/components.css`. Preserve the root slot and native label
behavior.

## Token Usage

Label uses PDS typography, foreground color, spacing, and disabled opacity
tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Emphasis typography and foreground text color. | `data-slot='label'` | Label association is consumer-owned. |
| Disabled | Consumer marks disabled state | Dims with shared disabled opacity. | `[aria-disabled='true']`, `[data-disabled='true']` | Disabled control semantics stay on the control. |

Non-applicable states: Hover, Focus-visible, Active, Loading, Error, Success.
Use the owning field or control for those states.

## State Behavior

Label does not manage state. It forwards native label props and Radix behavior.

## Composition Examples

```tsx
import { Input, Label } from "@pds/react";

<Label htmlFor="run-name">Run name</Label>
<Input id="run-name" />
```

## Known Limitations

- Label does not provide field layout, helper text, or error text.

## Do / Don't For Agents

Do:

- Preserve native label association.
- Keep visible labels available in product forms.

Don't:

- Do not replace Label with placeholder-only field naming.

## Related Components

- [Input](input.md)
- [Textarea](textarea.md)
- [Select](select.md)

## Related Sources

- Component source: [packages/react/src/components/label.tsx](../../../packages/react/src/components/label.tsx)
