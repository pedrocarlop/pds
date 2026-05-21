# BottomSheet

## Purpose

BottomSheet provides a bottom-attached modal surface for focused review or
short tasks that should stay anchored to the current context, especially on
narrow screens.

## When To Use

- Use for document review, compact task detail, or contextual decisions that
  benefit from bottom entry.
- Use `BottomSheetBody` for long content so header identity and footer actions
  stay reachable.
- Use `BottomSheetTitle` and `BottomSheetDescription` for accessible naming.

## When Not To Use

- Do not use BottomSheet for full application navigation or long-form page
  structure.
- Do not use it when a compact centered modal is clearer; use [Dialog](dialog.md).
- Do not hide every close path.

## Anatomy / Slots

```tsx
<BottomSheet>
  <BottomSheetTrigger />
  <BottomSheetContent>
    <BottomSheetHeader>
      <BottomSheetTitle />
      <BottomSheetDescription />
    </BottomSheetHeader>
    <BottomSheetBody />
    <BottomSheetFooter />
  </BottomSheetContent>
</BottomSheet>
```

`BottomSheetContent` renders `BottomSheetPortal`, `BottomSheetOverlay`, Radix
content, and the default close button when `showCloseButton` is true.

## Public API

| Export | Notes |
| --- | --- |
| `BottomSheet` | Radix Dialog root. |
| `BottomSheetTrigger` | Radix trigger with stable slot attribute. |
| `BottomSheetPortal` | Radix portal. |
| `BottomSheetOverlay` | PDS styled Radix overlay. |
| `BottomSheetContent` | PDS styled bottom-attached content; accepts `showCloseButton`. |
| `BottomSheetHeader` | Header layout slot. |
| `BottomSheetBody` | Scrollable content slot. |
| `BottomSheetFooter` | Footer action slot. |
| `BottomSheetTitle` | Radix title with PDS styling. |
| `BottomSheetDescription` | Radix description with PDS styling. |
| `BottomSheetClose` | Radix close primitive with stable slot attribute. |

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `showCloseButton` | `boolean` | `true` | Adds the default close button inside `BottomSheetContent`. |

Radix props pass through to their matching primitive exports.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `bottom-sheet-trigger` | `BottomSheetTrigger` |
| `data-slot` | `bottom-sheet-close` | `BottomSheetClose` and default close button |
| `data-slot` | `bottom-sheet-overlay` | `BottomSheetOverlay` |
| `data-slot` | `bottom-sheet-content` | `BottomSheetContent` |
| `data-slot` | `bottom-sheet-header` | `BottomSheetHeader` |
| `data-slot` | `bottom-sheet-body` | `BottomSheetBody` |
| `data-slot` | `bottom-sheet-footer` | `BottomSheetFooter` |
| `data-slot` | `bottom-sheet-title` | `BottomSheetTitle` |
| `data-slot` | `bottom-sheet-description` | `BottomSheetDescription` |

Radix owns `data-state` attributes for open and closed modal state.

## Accessibility Contract

Radix owns modal roles, focus trapping, Escape dismissal, outside interaction,
and title/description wiring. Consumers must provide a meaningful title and any
required description or visible labels.

If `showCloseButton={false}`, the consumer must provide another visible close or
cancel path. The default close button has `aria-label="Close"` and visually
hidden text.

## Content Resilience Rules

BottomSheet content is viewport constrained. `BottomSheetBody` scrolls when
content is taller than available space; header and footer actions remain
reachable. Titles, descriptions, body content, and footer actions wrap under
translation and 200% zoom.

## Styling Contract

BottomSheet classes use the `pds-bottom-sheet-*` prefix; styling lives in
`packages/react/src/components.css`.

CSS depends on slot classes, Radix `data-state`, close-button hover/active/focus
selectors, viewport media queries, and reduced-motion treatment.

## Token Usage

BottomSheet uses PDS overlay, surface color, spacing, radius, elevation,
typography, focus, state layer, disabled opacity, and motion tokens.

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Sheet trigger renders normally; overlay and content render when Radix opens the sheet. | `data-slot='bottom-sheet-*'`, Radix `data-state` | Radix owns modal dialog semantics and dismissal behavior. |
| Hover | Pointer hover | Default close button uses neutral hover treatment. | `.pds-bottom-sheet-close:not(:disabled):hover` | Hover does not change modal semantics. |
| Focus-visible | Keyboard focus | Close button uses shared PDS focus shadow; trigger focus belongs to the trigger control. | `.pds-bottom-sheet-close:focus-visible` | Radix manages focus movement for modal content. |
| Active | Pressed | Close button uses pressed state layer before dismissal. | `.pds-bottom-sheet-close:not(:disabled):active` | Activation closes through Radix close behavior. |
| Disabled | `disabled` / `aria-disabled` | Disabled close or trigger controls use disabled opacity through native disabled selectors. | `.pds-bottom-sheet-close:disabled` | Disabled native controls are not activatable. |
| Loading | `loading` prop / `data-busy` | Not applicable: BottomSheet has no loading state. | Not applicable | Expose loading inside the sheet body with Progress or Skeleton. |
| Error | `data-invalid` / error prop | Not applicable: BottomSheet has no validation state. | Not applicable | Place errors inside the sheet content with alert or form components. |
| Success | status / success prop | Not applicable: BottomSheet has no success state. | Not applicable | Place success feedback inside content or close after completion. |

## State Behavior

Open and closed state is owned by Radix. `showCloseButton` only controls
rendering of the internal close control; it does not alter Radix dismissal
behavior.

## Composition Examples

```tsx
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  Button
} from "@pds/react";

<BottomSheet>
  <BottomSheetTrigger asChild>
    <Button intent="secondary">Review agreement</Button>
  </BottomSheetTrigger>
  <BottomSheetContent>
    <BottomSheetHeader>
      <BottomSheetTitle>Review agreement</BottomSheetTitle>
      <BottomSheetDescription>Read the current version before accepting.</BottomSheetDescription>
    </BottomSheetHeader>
    <BottomSheetBody>Agreement content</BottomSheetBody>
    <BottomSheetFooter>
      <BottomSheetClose asChild>
        <Button intent="secondary">Cancel</Button>
      </BottomSheetClose>
      <Button>Accept</Button>
    </BottomSheetFooter>
  </BottomSheetContent>
</BottomSheet>
```

## Known Limitations

- BottomSheet only supports bottom placement.
- BottomSheet does not provide route transitions or app-owned submission logic.
- BottomSheet does not implement drag-to-dismiss.

## Do / Don't For Agents

Do:

- Use `BottomSheetBody` for long content.
- Preserve default close accessibility.
- Keep footer actions visible and wrapping.

Don't:

- Do not turn BottomSheet into a generic side sheet without changing its public
  API and docs.
- Do not place required feedback outside the visible sheet context.

## Related Components

- [Dialog](dialog.md)
- [Button](button.md)
- [Toast](toast.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [BottomSheet source](../../../packages/react/src/components/bottom-sheet.tsx)
