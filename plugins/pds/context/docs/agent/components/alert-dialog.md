# AlertDialog

## Purpose

AlertDialog provides blocking confirmation surfaces backed by Radix Alert
Dialog.

## When To Use

- Use for destructive or irreversible confirmations.
- Use when the user must explicitly choose before continuing.

## When Not To Use

- Do not use for non-blocking context; use Popover or HoverCard.
- Do not use for ordinary forms; use Dialog or Form composition.

## Anatomy / Slots

```tsx
<AlertDialog>
  <AlertDialogTrigger />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle />
      <AlertDialogDescription />
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel />
      <AlertDialogAction />
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Public API

Exports include `AlertDialog`, `AlertDialogTrigger`, `AlertDialogPortal`,
`AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogHeader`,
`AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`,
`AlertDialogAction`, and `AlertDialogCancel`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `open`, `defaultOpen`, `onOpenChange` | Radix values | Radix default | Use controlled state when workflow state owns dismissal. |
| `asChild` | Radix slot prop | `false` | Use for PDS Button triggers or actions when needed. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `alert-dialog-trigger`, `alert-dialog-overlay`, `alert-dialog-content`, `alert-dialog-header`, `alert-dialog-footer`, `alert-dialog-title`, `alert-dialog-description`, `alert-dialog-action`, `alert-dialog-cancel` | Component |
| `data-state` | Radix values | Radix |

## Accessibility Contract

Radix owns modal semantics, focus management, Escape handling, and alert dialog
role wiring. Consumers must include a title, description, and clear cancel and
action labels.

## Content Resilience Rules

Title and description wrap. Footer actions wrap on compact screens. Do not
truncate destructive action labels or warning copy.

## Styling Contract

Classes use the `pds-alert-dialog-*` prefix and share overlay/content structure
with Dialog. CSS owns overlay, modal surface, footer wrapping, and action button
treatments.

## Token Usage

Uses overlay, popover surface, spacing, radius, elevation, typography, state
layer, focus, disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Closed or mounted content | Trigger renders normally; content renders as modal when open. | `data-slot='alert-dialog-*'` | Radix owns modal semantics. |
| Open | `open` or trigger activation | Overlay and centered content animate in. | `data-state='open'` | Focus is moved into the dialog. |
| Focus-visible | Keyboard focus | Action and cancel controls use PDS focus shadow. | `.pds-alert-dialog-action:focus-visible`, `.pds-alert-dialog-cancel:focus-visible` | Keep both actions keyboard reachable. |
| Disabled | Disabled action control | Control uses disabled opacity. | `:disabled` | Disabled actions must not dismiss or confirm. |

Non-applicable states: Loading, Error, Success. Represent those inside the
dialog body when the workflow requires them.

## State Behavior

`AlertDialogAction` confirms and closes through Radix. `AlertDialogCancel`
cancels and restores focus.

## Composition Examples

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@pds/react";
```

## Known Limitations

- Browser-level focus-trap verification remains future work.

## Do / Don't For Agents

Do:

- Keep cancel and confirm actions visible together.

Don't:

- Do not hide destructive consequences in secondary copy only.

## Related Components

- [Dialog](dialog.md)
- [Popover](popover.md)

## Related Sources

- Component source: [packages/react/src/components/alert-dialog.tsx](../../../packages/react/src/components/alert-dialog.tsx)
