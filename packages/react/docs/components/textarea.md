# Textarea

## Purpose

Textarea is the PDS multiline field primitive. It provides token-first field
styling, density, invalid state mapping, native textarea behavior, and stable
attributes for package CSS and tests.

## When To Use

- Use for multiline notes, prompts, descriptions, or generated text input.
- Use `density="compact"` for dense product panels where the field still needs
  multiline behavior.
- Use `invalid` when the product surface provides validation feedback.

## When Not To Use

- Do not use Textarea for full message composers that need PDS action/footer
  layout; use Composer.
- Do not rely on placeholder text as the only label.
- Do not add auto-submit, persistence, or validation side effects here.

## Anatomy / Slots

Textarea has one public root slot.

```tsx
<Textarea aria-label="Message" />
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `density` | `default`, `compact` | `default` | Controls field spacing and minimum height. |
| `invalid` | `boolean` | `false` | Adds invalid data state and `aria-invalid`. |
| `aria-invalid` | React ARIA invalid value | `undefined` | Preserved when provided. |

Textarea extends native textarea attributes except for narrowed `aria-invalid`,
forwards refs, and preserves `className`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `textarea` | Component |
| `data-density` | `default`, `compact` | Component |
| `data-invalid` | `true` when `invalid` is true | Component |

## Accessibility Contract

Textarea renders a native `textarea`. Consumers own labels, helper text, error
text, `aria-describedby`, validation announcements, and keyboard shortcut
behavior.

When `invalid` is true, Textarea sets `aria-invalid="true"`. Explicit ARIA
values such as `grammar` or `spelling` are preserved when passed directly.

## Content Resilience Rules

Textarea should remain readable with longer user-authored or translated content.
The native field owns scrolling once content exceeds the rendered size. Required
labels, errors, and helper text belong outside the field and must not be hidden.

## Styling Contract

The root class is `pds-textarea`; styling lives in
`packages/react/src/components.css`.

CSS depends on `data-density`, `data-invalid`, `aria-invalid`, `:hover`,
`:focus-visible`, and native `:disabled`. Preserve invalid focused treatment
when changing selectors.

## Token Usage

Textarea uses PDS typography, spacing, radius, color, focus, invalid state,
interaction state layer, disabled opacity, and motion tokens.

## State Behavior

- `invalid` sets `data-invalid="true"` and `aria-invalid="true"`.
- Explicit `aria-invalid` values are passed through.
- Disabled textareas use native `disabled` behavior and disabled styling.
- Hover treatment is suppressed for disabled textareas.

## Composition Examples

```tsx
import { Textarea } from "pds";

<Textarea aria-label="Message" />
<Textarea aria-label="Notes" density="compact" rows={3} />
<Textarea aria-describedby="message-error" aria-label="Message" invalid />
```

## Known Limitations

- Textarea does not auto-resize beyond native/browser behavior.
- Textarea does not include label, helper text, or error slots.
- Textarea does not submit, validate, or persist content.

## Do / Don't For Agents

Do:

- Preserve native textarea semantics and ref forwarding.
- Keep `invalid` and explicit `aria-invalid` behavior distinct.
- Use Composer for message-entry surfaces that need actions and footer content.

Don't:

- Do not add product side effects or keyboard shortcuts here.
- Do not hide validation text inside placeholder copy.
- Do not remove native textarea attribute passthrough.

## Related Components

- [Input](input.md)
- [Composer](composer.md)
- [Transcript](transcript.md)

## Related Sources

- [DESIGN.md](../../../../DESIGN.md)
- [Content resilience](../../../../docs/foundations/content-resilience.md)
- [PDS React README](../../README.md)
- [components.css](../../src/components.css)
- [Textarea source](../../src/components/textarea.tsx)
