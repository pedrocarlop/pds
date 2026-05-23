# Toast

## Purpose

Toast provides the PDS non-blocking feedback primitive for temporary
notifications such as saved, completed, queued, or recoverable contextual
messages.

![Toast component preview](images/toast.png)

## When To Use

- Use for feedback that can disappear without blocking the user's current task.
- Use `tone="success"` for completed actions, `warning` for caution, `danger`
  for recoverable failure notices, and `neutral` for general updates.
- Pair Toast with inline feedback when the message is required for completion or
  recovery.

## When Not To Use

- Do not use Toast for required validation errors, locked requirements, or
  audit-relevant state that must remain visible.
- Do not use Toast as a modal, confirmation dialog, or persistent alert.
- Do not rely on tone color alone; include visible text.

## Anatomy / Slots

```tsx
<ToastProvider>
  <ToastViewport />
  <Toast>
    <ToastTitle />
    <ToastDescription />
    <ToastAction />
    <ToastClose />
  </Toast>
</ToastProvider>
```

## Public API

| Export | Notes |
| --- | --- |
| `ToastProvider` | Radix provider for duration, swipe direction, and label behavior. |
| `ToastViewport` | PDS styled viewport. |
| `Toast` | PDS styled Radix root; accepts `tone`. |
| `ToastTitle` | Title slot. |
| `ToastDescription` | Supporting message slot. |
| `ToastAction` | Optional action; requires Radix `altText`. |
| `ToastClose` | Dismiss control with default accessible content. |

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `tone` | `neutral`, `success`, `warning`, `danger` | `neutral` | Maps to semantic feedback accent. |

Radix props pass through to their matching primitive exports.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `toast-viewport` | `ToastViewport` |
| `data-slot` | `toast` | `Toast` |
| `data-tone` | `neutral`, `success`, `warning`, `danger` | `Toast` |
| `data-slot` | `toast-title` | `ToastTitle` |
| `data-slot` | `toast-description` | `ToastDescription` |
| `data-slot` | `toast-action` | `ToastAction` |
| `data-slot` | `toast-close` | `ToastClose` |

Radix owns `data-state` and `data-swipe` attributes used for animation and
gesture selectors.

## Accessibility Contract

Radix owns toast announcement behavior, viewport hotkey support, pause/resume,
and dismiss behavior. Consumers must provide concise localized text.

`ToastAction` must include meaningful `altText`. Icon-only custom close content
must provide an accessible name; the default `ToastClose` uses "Dismiss
notification".

## Content Resilience Rules

Toast title, description, action, and close content wrap in narrow containers.
Use short messages because toasts are transient, but do not truncate required
feedback. Required errors belong inline, not only in Toast.

## Styling Contract

Toast classes use the `pds-toast-*` prefix; styling lives in
`packages/react/src/components.css`.

CSS depends on `data-tone`, Radix `data-state`, Radix `data-swipe`,
`:focus-visible`, hover, active, and disabled selectors.

## Token Usage

Toast uses PDS surface color, semantic status color, spacing, radius, elevation,
typography, focus, state layer, disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Toast renders viewport, title, description, action, and close slots with neutral tone by default. | `data-slot='toast'`, `data-tone` | Radix toast owns live-region and dismissible toast semantics. |
| Hover | Pointer hover | Toast action and close controls use hover state layers. | `.pds-toast-action:not(:disabled):hover`, `.pds-toast-close:not(:disabled):hover` | Hover does not pause or alter announcement semantics by itself. |
| Focus-visible | Keyboard focus | Action and close controls use shared PDS focus shadow. | `.pds-toast-action:focus-visible`, `.pds-toast-close:focus-visible` | Keyboard users can reach toast actions when they are rendered. |
| Active | Pressed or swipe gesture | Action and close controls use pressed state; Radix swipe states animate movement. | `.pds-toast-action:active`, `.pds-toast-close:active`, Radix `data-swipe` | Close activation dismisses through Radix. |
| Disabled | `disabled` / `aria-disabled` | Disabled toast action or close controls dim and suppress hover treatment. | `.pds-toast-action:disabled`, `.pds-toast-close:disabled` | Disabled native controls are not activatable. |
| Error | `data-invalid` / error prop | Danger tone uses semantic danger accent treatment. | `data-tone='danger'` | Toast text must clearly state the error. |
| Success | status / success prop | Success tone uses semantic success accent treatment. | `data-tone='success'` | Toast text must clearly state the success result. |

Non-applicable states: Loading. Use child components or the surrounding region for those states when needed.

## State Behavior

Open, closed, swipe move, swipe cancel, and swipe end states are owned by Radix.
Tone only changes semantic accent treatment.

## Composition Examples

```tsx
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@pds/react";

<ToastProvider>
  <ToastViewport />
  <Toast open tone="success">
    <ToastTitle>Agreement signed</ToastTitle>
    <ToastDescription>We saved the acceptance timestamp.</ToastDescription>
    <ToastAction altText="Review agreement details">Review</ToastAction>
    <ToastClose />
  </Toast>
</ToastProvider>
```

## Known Limitations

- Toast does not manage a queue or application notification store.
- Toast does not replace inline validation, alerts, or modal confirmations.

## Do / Don't For Agents

Do:

- Keep messages concise and text-visible.
- Use semantic tone only for real feedback state.
- Preserve Radix state and swipe selectors.

Don't:

- Do not put required recovery instructions only in Toast.
- Do not add app-specific notification queues to this primitive.

## Related Components

- [Button](button.md)
- [Dialog](dialog.md)
- [BottomSheet](bottom-sheet.md)

## Related Sources

- Component source: [packages/react/src/components/toast.tsx](../../../packages/react/src/components/toast.tsx)
