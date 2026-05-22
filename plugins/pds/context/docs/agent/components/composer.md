# Composer

## Purpose

Composer is the PDS form primitive for entering agent-facing messages. It owns
the visual form container, textarea composition, action/footer layout, and
propagation of disabled and invalid state to `ComposerInput`. It does not own
submission side effects, shortcuts, attachments, model selection, or message
persistence.

## When To Use

- Use for message entry at the end of a [Transcript](transcript.md) or agent surface.
- Use when a product surface needs a PDS-styled form with a textarea and action
  row.
- Use `busy` when submission or generation is in progress.
- Use `disabled` when input should be unavailable.
- Use `invalid` when the composed input value fails validation.

## When Not To Use

- Do not use Composer for generic settings forms or unrelated multi-field forms.
- Do not place side-effect logic inside the component package.
- Do not add send buttons internally; actions are consumer-owned.
- Do not add attachment, tool picker, or shortcut behavior unless explicitly
  requested as a new slice.

## Anatomy / Slots

```tsx
<Composer>
  <ComposerInput />
  <ComposerActions />
  <ComposerFooter />
</Composer>
```

`ComposerInput` is built on PDS [Textarea](textarea.md). `ComposerActions` usually contains one
or more Buttons. `ComposerFooter` is for helper text, status text, or compact
metadata.

## Public API

| Export | Notes |
| --- | --- |
| `Composer` | Root `form`; accepts `busy`, `disabled`, and `invalid`. |
| `ComposerInput` | [Textarea](textarea.md)-based input that receives Composer context by default. |
| `ComposerActions` | Action row slot. |
| `ComposerFooter` | Helper/status/footer slot. |

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `busy` | `boolean` | `false` | Maps to `aria-busy` and `data-busy` on the form. |
| `disabled` | `boolean` | `false` | Maps to context and `data-disabled`; disables `ComposerInput` unless overridden. |
| `invalid` | `boolean` | `false` | Maps to context and `data-invalid`; invalidates `ComposerInput` unless overridden. |
| `aria-busy` | React ARIA busy value | `undefined` | Preserved when provided. |

`Composer` extends native form attributes except for a narrowed `aria-busy`
typing. `ComposerInput` uses the same props as [Textarea](textarea.md).

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `composer` | `Composer` |
| `data-busy` | `true` when busy | `Composer` |
| `data-disabled` | `true` when disabled | `Composer` |
| `data-invalid` | `true` when invalid | `Composer` |
| `data-slot` | `composer-input` | `ComposerInput` |
| `data-slot` | `composer-actions` | `ComposerActions` |
| `data-slot` | `composer-footer` | `ComposerFooter` |

`ComposerInput` also receives [Textarea](textarea.md) behavior, classes, `data-density`, and
`data-invalid` from the underlying Textarea. The composed slot overrides the
base textarea slot with `data-slot="composer-input"`.

## Accessibility Contract

Composer renders a native `form`. Consumers own `onSubmit`, validation messages,
form labels, keyboard shortcuts, submit button labels, and any live region
announcements.

`busy` maps to `aria-busy="true"` on the form. `disabled` disables
`ComposerInput` through context but does not automatically disable consumer-owned
buttons. Consumers should disable or adjust buttons as appropriate.

`invalid` propagates to `ComposerInput`, which maps invalid state to
`aria-invalid`. Consumers own `aria-describedby` links to error text.

## Content Resilience Rules

Composer should grow with text input, helper text, translated button labels, and
footer content. Actions wrap in narrow containers. Footer content wraps instead
of truncating by default.

Do not hide validation text, busy text, or required action labels. If a product
surface needs a fixed-height composer, the consumer owns the scroll and overflow
contract.

## Styling Contract

The root class is `pds-composer`; slot classes use the `pds-composer-*` prefix.
Styling lives in `packages/react/src/components.css`.

CSS depends on `:focus-within`, `data-invalid`, `data-busy`, and
`data-disabled`. `ComposerInput` composes `pds-composer-input` with [Textarea](textarea.md)
styling.

## Token Usage

Composer uses PDS surface color, spacing, radius, elevation/focus, typography,
interaction state layer, disabled opacity, invalid state, and motion tokens. Do
not add one-off form colors or untokenized transitions.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Composer renders grouped input, actions, and footer on the base composer surface. | `data-slot='composer'` | Root is a form; submit behavior is native and consumer-owned. |
| Focus-visible | Keyboard focus | Composer surface highlights when focus moves inside the form. | `.pds-composer:focus-within`, `.pds-composer-input:focus-visible` | Focus remains on the active input or control. |
| Disabled | `disabled` / `aria-disabled` | Disabled composer dims and disables `ComposerInput` by default. | `data-disabled='true'` | Disabled input is not editable; child props may override context state. |
| Loading | `loading` prop / `data-busy` | Busy composer applies busy visual treatment. | `data-busy='true'`, `aria-busy='true'` | `busy` announces busy state through `aria-busy` on the form. |
| Error | `data-invalid` / error prop | Invalid composer applies invalid treatment to root and input. | `data-invalid='true'`, `aria-invalid='true'` on input | Invalid input must keep visible error or supporting text nearby. |

Non-applicable states: Hover, Active, Success. Use child components or the surrounding region for those states when needed.

## State Behavior

- `busy` sets `aria-busy` and applies busy visual treatment.
- `disabled` dims the composer and disables `ComposerInput` by default.
- `invalid` applies invalid treatment to the composer and `ComposerInput`.
- `ComposerInput` props can override context-provided `disabled` and `invalid`.
- Submit behavior remains native form behavior and consumer-owned handlers.

## Composition Examples

```tsx
import { Button, Composer, ComposerActions, ComposerFooter, ComposerInput } from "@pds/react";

<Composer aria-label="Agent reply composer" onSubmit={handleSubmit}>
  <ComposerInput aria-label="Message" />
  <ComposerActions>
    <Button intent="secondary" type="button">Save draft</Button>
    <Button type="submit">Send</Button>
  </ComposerActions>
  <ComposerFooter>Submit behavior belongs to the consuming surface.</ComposerFooter>
</Composer>
```

```tsx
<Composer aria-label="Busy composer" busy disabled>
  <ComposerInput aria-label="Disabled message" />
  <ComposerActions>
    <Button disabled type="submit">Sending</Button>
  </ComposerActions>
</Composer>
```

## Known Limitations

- Composer does not submit, persist, reset, or validate messages.
- Composer does not provide keyboard shortcut behavior.
- Composer does not include attachments, model controls, or tool pickers.
- Composer does not auto-resize the textarea beyond native/browser behavior.

## Do / Don't For Agents

Do:

- Preserve form semantics and context propagation to `ComposerInput`.
- Keep submit buttons consumer-owned.
- Preserve `data-busy`, `data-disabled`, and `data-invalid`.
- Keep actions and footer wrapping in narrow layouts.

Don't:

- Do not add product side effects or message persistence here.
- Do not disable consumer-owned buttons implicitly without an explicit API
  change.
- Do not hide invalid state or replace `aria-invalid` propagation.
- Do not introduce fixed composer heights in the package stylesheet.

## Related Components

- [Button](button.md)
- [Message](message.md)
- [Transcript](transcript.md)
- [Textarea](textarea.md)

## Related Sources

- Component source: [packages/react/src/components/composer.tsx](../../../packages/react/src/components/composer.tsx)
