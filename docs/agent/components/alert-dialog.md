# AlertDialog

## Purpose

AlertDialog provides a modal confirmation surface for irreversible or
high-impact actions. It wraps Radix Alert Dialog and adds PDS slots, action
controls, alert semantics, and token-backed styling.

![AlertDialog component preview](images/alert-dialog.png)

## When To Use

- Use before destructive or high-impact actions such as deleting generated
  output, discarding edits, or cancelling a running job.
- Use when the user must explicitly choose between cancelling and continuing.
- Use `AlertDialogTitle` and `AlertDialogDescription` for accessible naming and
  context.

## When Not To Use

- Do not use for informational messages; use Alert, InlineAlert, or Toast.
- Do not use for normal modal tasks that are not alerting; use Dialog or Sheet.
- Do not hide the cancel path.

## Anatomy / Slots

```tsx
<AlertDialog>
  <AlertDialogTrigger />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogMedia />
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
`AlertDialogFooter`, `AlertDialogMedia`, `AlertDialogTitle`,
`AlertDialogDescription`, `AlertDialogCancel`, and `AlertDialogAction`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `size` | `default`, `sm` | `default` | Controls `AlertDialogContent` width. |
| `intent` | Button intents | `secondary` for cancel, `danger` for action | Applies PDS button treatment. |
| `size` | Button sizes | `md` | Applies to cancel and action controls. |

Radix props pass through to their matching primitive exports.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `alert-dialog-trigger`, `alert-dialog-overlay`, `alert-dialog-content`, `alert-dialog-header`, `alert-dialog-footer`, `alert-dialog-media`, `alert-dialog-title`, `alert-dialog-description`, `alert-dialog-cancel`, `alert-dialog-action` | Component |
| `data-size` | `default`, `sm` | `AlertDialogContent` |
| `data-intent`, `data-size` | PDS button values | `AlertDialogCancel`, `AlertDialogAction` |
| `data-state` | Radix open and closed values | Radix |

## Accessibility Contract

Radix owns alert dialog role, focus trapping, Escape dismissal, outside
interaction behavior, and title/description wiring. Consumers must provide a
meaningful title, supporting description, visible cancel action, and explicit
action label.

## Content Resilience Rules

AlertDialog content wraps and scrolls within the viewport. Keep action labels
short, put context in the description, and use `AlertDialogMedia` for a compact
icon or status marker only.

## Styling Contract

Classes use the `pds-alert-dialog-*` prefix. Action and cancel controls use the
shared `.pds-button` contract with slot-specific data attributes.

## Token Usage

Uses overlay, popover surface, typography, spacing, radius, elevation, focus,
state layer, disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Overlay and centered content render when opened. | `data-slot='alert-dialog-*'`, `.pds-alert-dialog-content` | Radix owns alert dialog semantics and focus trap. |
| Hover | Pointer hover | Action controls use shared Button hover treatment. | `.pds-button[data-intent]` | Hover does not change alert semantics. |
| Focus-visible | Keyboard focus | Action controls use Button focus treatment. | `.pds-button:focus-visible` | Radix moves focus into the dialog. |
| Active | Pressed action | Buttons use pressed state before Radix resolves the action. | `.pds-button[data-intent]` | Action or cancel closes through Radix behavior. |
| Disabled | Disabled action or cancel | Disabled button opacity and activation suppression. | `.pds-button:disabled` | Disabled controls are not activatable. |

Non-applicable states: Loading, Error, Success. Put those states in child copy or
the surrounding workflow.

## State Behavior

Open and closed state is owned by Radix. `AlertDialogAction` defaults to
`intent="danger"` and `AlertDialogCancel` defaults to `intent="secondary"`.

## Composition Examples

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@pds/react";

<AlertDialog>
  <AlertDialogTrigger>Discard draft</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Discard generated draft?</AlertDialogTitle>
    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Discard</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

## Known Limitations

- AlertDialog does not provide async confirmation state.
- AlertDialog does not include form submission behavior.

## Do / Don't For Agents

Do:

- Use for irreversible or high-impact choices.
- Keep cancel and action labels explicit.

Don't:

- Do not use AlertDialog for routine information or passive feedback.
- Do not remove the cancel path.

## Related Components

- [Dialog](dialog.md)
- [Alert](alert.md)
- [Toast](toast.md)

## Related Sources

- Component source: [packages/react/src/components/alert-dialog.tsx](../../../packages/react/src/components/alert-dialog.tsx)
