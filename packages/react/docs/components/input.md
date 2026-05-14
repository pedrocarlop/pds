# Input

## Purpose

Input is the PDS single-line field primitive. It provides token-first field
styling, density, invalid state mapping, native input behavior, and stable
attributes for package CSS and tests.

## When To Use

- Use for short single-line values such as names, filters, identifiers, or
  compact settings.
- Use `density="compact"` only when surrounding layout needs denser controls.
- Use `invalid` when the product surface has validation feedback for the field.

## When Not To Use

- Do not use Input for long prompts or multiline content; use Textarea or
  ComposerInput.
- Do not rely on placeholder text as the only label.
- Do not hide validation messages in the field component.

## Anatomy / Slots

Input has one public root slot.

```tsx
<Input aria-label="Run name" />
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `density` | `default`, `compact` | `default` | Controls field spacing and height. |
| `invalid` | `boolean` | `false` | Adds invalid data state and `aria-invalid`. |
| `aria-invalid` | React ARIA invalid value | `undefined` | Preserved when provided. |

Input extends native input attributes except for narrowed `aria-invalid`, forwards
refs, and preserves `className`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `input` | Component |
| `data-density` | `default`, `compact` | Component |
| `data-invalid` | `true` when `invalid` is true | Component |

## Accessibility Contract

Input renders a native `input`. Consumers own visible labels, `aria-label`,
`aria-labelledby`, helper text, error text, and `aria-describedby` wiring.

When `invalid` is true, Input sets `aria-invalid="true"`. Explicit ARIA values
such as `grammar` or `spelling` are preserved when passed directly.

## Content Resilience Rules

Input is a single-line control, so long values scroll inside the native field.
Use visible helper text or adjacent metadata when generated identifiers or
validated values need to remain inspectable outside the field.

## Styling Contract

The root class is `pds-input`; styling lives in
`packages/react/src/components.css`.

CSS depends on `data-density`, `data-invalid`, `aria-invalid`, `:hover`,
`:focus-visible`, and native `:disabled`. Preserve invalid focused treatment
when changing selectors.

## Token Usage

Input uses PDS typography, spacing, radius, color, focus, invalid state,
interaction state layer, disabled opacity, and motion tokens.

## State Behavior

- `invalid` sets `data-invalid="true"` and `aria-invalid="true"`.
- Explicit `aria-invalid` values are passed through.
- Disabled inputs use native `disabled` behavior and disabled styling.
- Hover treatment is suppressed for disabled inputs.

## Composition Examples

```tsx
import { Input } from "pds";

<Input aria-label="Prompt title" placeholder="Summarize latest run" />
<Input aria-label="Run ID" density="compact" defaultValue="run-123" />
<Input aria-describedby="name-error" aria-label="Name" invalid />
```

## Known Limitations

- Input does not include label, helper text, or error slots.
- Input does not perform validation.
- Input does not mask, format, or parse values.

## Do / Don't For Agents

Do:

- Preserve native input semantics and ref forwarding.
- Keep `invalid` and explicit `aria-invalid` behavior distinct.
- Add tests when changing density, invalid, disabled, or focus selectors.

Don't:

- Do not add field wrapper APIs here without an explicit task.
- Do not use placeholder text as documentation or instructions.
- Do not remove native input attribute passthrough.

## Related Components

- [Textarea](textarea.md)
- [Composer](composer.md)
- [Button](button.md)

## Related Sources

- [DESIGN.md](../../../../DESIGN.md)
- [Content resilience](../../../../docs/foundations/content-resilience.md)
- [PDS React README](../../README.md)
- [components.css](../../src/components.css)
- [Input source](../../src/components/input.tsx)
