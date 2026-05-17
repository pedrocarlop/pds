# Dialog

## Purpose

Dialog provides the PDS modal overlay primitive. It wraps Radix Dialog for focus
management and accessibility, then adds PDS overlay, content, header, footer,
title, description, and close-button styling.

## When To Use

- Use for blocking confirmations, focused review flows, or compact modal tasks.
- Use `DialogTitle` and `DialogDescription` for accessible dialog naming.
- Keep `showCloseButton` enabled unless another visible close or cancel action
  exists.

## When Not To Use

- Do not use Dialog for non-blocking inline details; use Surface or disclosure
  patterns outside this package.
- Do not hide all close affordances.
- Do not put full-page workflows or persistent application navigation inside a
  modal.

## Anatomy / Slots

```tsx
<Dialog>
  <DialogTrigger />
  <DialogContent>
    <DialogHeader>
      <DialogTitle />
      <DialogDescription />
    </DialogHeader>
    <DialogFooter />
  </DialogContent>
</Dialog>
```

`DialogContent` renders `DialogPortal`, `DialogOverlay`, Radix content, and the
default close button when `showCloseButton` is true.

## Public API

| Export | Notes |
| --- | --- |
| `Dialog` | Radix root. |
| `DialogTrigger` | Radix trigger with stable slot attribute. |
| `DialogPortal` | Radix portal. |
| `DialogOverlay` | PDS styled Radix overlay. |
| `DialogContent` | PDS styled Radix content; accepts `showCloseButton`. |
| `DialogHeader` | Header layout slot. |
| `DialogFooter` | Footer layout slot. |
| `DialogTitle` | Radix title with PDS styling. |
| `DialogDescription` | Radix description with PDS styling. |
| `DialogClose` | Radix close primitive with stable slot attribute. |

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `showCloseButton` | `boolean` | `true` | Adds the default close button inside `DialogContent`. |

Radix props pass through to their matching primitive exports.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `dialog-trigger` | `DialogTrigger` |
| `data-slot` | `dialog-close` | `DialogClose` and default close button |
| `data-slot` | `dialog-overlay` | `DialogOverlay` |
| `data-slot` | `dialog-content` | `DialogContent` |
| `data-slot` | `dialog-header` | `DialogHeader` |
| `data-slot` | `dialog-footer` | `DialogFooter` |
| `data-slot` | `dialog-title` | `DialogTitle` |
| `data-slot` | `dialog-description` | `DialogDescription` |

Radix also owns `data-state` attributes used for open and closed animation
selectors.

## Accessibility Contract

Radix owns modal roles, focus trapping, Escape dismissal, outside interaction,
and title/description wiring. Consumers must provide a meaningful title and any
required description or visible labels.

If `showCloseButton={false}`, the consumer must provide another visible close or
cancel path. The default close button has `aria-label="Close"` and visually
hidden text.

## Content Resilience Rules

Dialog content wraps and scrolls within the viewport when content is taller than
available space. Titles, descriptions, and footer actions must remain available
under translation and 200% zoom.

## Styling Contract

Dialog classes use the `pds-dialog-*` prefix; styling lives in
`packages/react/src/components.css`.

CSS depends on slot classes, Radix `data-state`, close-button hover/active/focus
selectors, and viewport media queries. Preserve content scroll behavior and the
default close-button structure.

## Token Usage

Dialog uses PDS surface color, overlay color, spacing, radius, elevation,
typography, focus, state layer, and motion tokens.

## State Behavior

Open and closed state is owned by Radix and exposed through `data-state`.
`showCloseButton` only controls rendering of the internal close control; it does
not alter Radix dismissal behavior.

## Composition Examples

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "pds";

<Dialog>
  <DialogTrigger asChild>
    <Button>Review</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Review run</DialogTitle>
      <DialogDescription>Confirm the next action for this run.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button intent="secondary">Cancel</Button>
      <Button>Approve</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Known Limitations

- Dialog does not provide alert-dialog semantics.
- Dialog does not include form submission behavior.
- Dialog does not provide nested route or full-screen workflow patterns.

## Do / Don't For Agents

Do:

- Preserve Radix primitives and default close accessibility.
- Keep content viewport-constrained and scrollable.
- Update tests and docs when changing close behavior or slot structure.

Don't:

- Do not remove the title/description accessibility expectation.
- Do not hide every close path.
- Do not add app-specific modal workflows to the primitive.

## Related Components

- [Button](button.md)
- [Surface](surface.md)
- [Input](input.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Dialog source](../../../packages/react/src/components/dialog.tsx)
