# Drawer

## Purpose

Drawer provides a draggable Vaul-backed modal panel for bottom, top, left, or
right drawer interactions.

![Drawer component preview](images/drawer.png)

## When To Use

- Use for task panels that benefit from drag-to-dismiss or snap behavior.
- Use for bottom drawers on touch-first workflows.
- Use `DrawerBody` for content that can grow or scroll.

## When Not To Use

- Do not use Drawer when a static edge panel is enough; use Sheet.
- Do not use it for irreversible confirmations; use AlertDialog.
- Do not use it as permanent page navigation.

## Anatomy / Slots

```tsx
<Drawer direction="bottom">
  <DrawerTrigger />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle />
      <DrawerDescription />
    </DrawerHeader>
    <DrawerBody />
    <DrawerFooter />
  </DrawerContent>
</Drawer>
```

`DrawerContent` renders `DrawerPortal`, `DrawerOverlay`, Vaul content, an
optional handle, and the default close button when `showCloseButton` is true.

## Public API

Exports include `Drawer`, `DrawerNestedRoot`, `DrawerTrigger`, `DrawerPortal`,
`DrawerOverlay`, `DrawerContent`, `DrawerHandle`, `DrawerClose`,
`DrawerHeader`, `DrawerBody`, `DrawerFooter`, `DrawerTitle`, and
`DrawerDescription`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `direction` | Vaul directions | `bottom` in Vaul | Passed to `Drawer`. |
| `showHandle` | `boolean` | `true` | Adds the default handle inside `DrawerContent`. |
| `showCloseButton` | `boolean` | `true` | Adds the default close button inside `DrawerContent`. |

Vaul props pass through to their matching primitive exports.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `drawer-trigger`, `drawer-overlay`, `drawer-content`, `drawer-handle`, `drawer-close`, `drawer-header`, `drawer-body`, `drawer-footer`, `drawer-title`, `drawer-description` | Component |
| `data-vaul-drawer-direction` | `top`, `right`, `bottom`, `left` | Vaul |
| `data-state` | Vaul open and closed values | Vaul |

## Accessibility Contract

Vaul and Radix Dialog own modal dialog role, focus management, Escape dismissal,
outside interaction behavior, dragging, and title/description wiring. Consumers
must provide a meaningful title and another visible close path when
`showCloseButton={false}`.

## Content Resilience Rules

Drawer content is viewport constrained. `DrawerBody` scrolls while header,
handle, close, and footer remain reachable. Labels and body copy wrap under
translation, narrow layouts, and 200% zoom.

## Styling Contract

Classes use the `pds-drawer-*` prefix. CSS depends on Vaul
`data-vaul-drawer-direction`, slot classes, close hover/active/focus selectors,
and compact viewport media queries.

## Token Usage

Uses overlay, popover surface, typography, spacing, radius, elevation, focus,
state layer, disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Drawer content attaches to the Vaul direction. | `data-slot='drawer-*'`, `data-vaul-drawer-direction` | Vaul owns modal dialog semantics and drag behavior. |
| Hover | Pointer hover | Default close button uses neutral hover treatment. | `.pds-drawer-close:not(:disabled):hover` | Hover does not change modal semantics. |
| Focus-visible | Keyboard focus | Close button uses shared PDS focus shadow. | `.pds-drawer-close:focus-visible` | Vaul manages focus movement. |
| Active | Pressed close or drag | Close uses pressed state; drag behavior is owned by Vaul. | `.pds-drawer-close:not(:disabled):active`, Vaul drag attributes | Drag-to-dismiss is handled by Vaul. |
| Disabled | Disabled close or trigger | Disabled controls use disabled opacity. | `.pds-drawer-close:disabled` | Disabled native controls are not activatable. |

Non-applicable states: Loading, Error, Success. Use child content or the
surrounding workflow for those states.

## State Behavior

Open, closed, direction, snap points, active snap point, drag, release, and
dismissal behavior are owned by Vaul. PDS owns slots, default handle, default
close affordance, and token-backed styles.

## Composition Examples

```tsx
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@pds/react";

<Drawer direction="bottom">
  <DrawerTrigger>Review patch</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Review pending patch</DrawerTitle>
      <DrawerDescription>Confirm generated changes.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>Patch summary</DrawerBody>
  </DrawerContent>
</Drawer>;
```

## Known Limitations

- Drawer does not include app-owned persistence or form submission logic.
- Drawer styling does not define custom snap-point layouts beyond Vaul props.

## Do / Don't For Agents

Do:

- Use Drawer when drag behavior matters.
- Keep header identity and footer actions reachable.

Don't:

- Do not use Drawer as a static navigation sidebar.
- Do not remove every close path.

## Related Components

- [Sheet](sheet.md)
- [BottomSheet](bottom-sheet.md)
- [Dialog](dialog.md)

## Related Sources

- Component source: [packages/react/src/components/drawer.tsx](../../../packages/react/src/components/drawer.tsx)
