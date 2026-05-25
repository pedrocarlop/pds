# ContextMenu

## Purpose

ContextMenu provides a right-click or long-press command surface backed by Radix
Context Menu and styled with PDS menu contracts.

![ContextMenu component preview](images/context-menu.png)

## When To Use

- Use for object-specific commands that are secondary to the primary screen UI.
- Use when an imported surface expects `ContextMenu*` exports from PDS.

## When Not To Use

- Do not hide required or primary actions only in a context menu.
- Do not use ContextMenu for toolbar dropdowns; use DropdownMenu or Menu.

## Anatomy / Slots

```tsx
<ContextMenu>
  <ContextMenuTrigger />
  <ContextMenuContent>
    <ContextMenuItem />
  </ContextMenuContent>
</ContextMenu>
```

## Public API

Exports include `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`,
`ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`,
`ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`,
`ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`,
`ContextMenuSub`, `ContextMenuSubTrigger`, and `ContextMenuSubContent`.

`ContextMenuItem`, `ContextMenuCheckboxItem`, and `ContextMenuRadioItem` accept
`intent="default" | "danger"` and `inset`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `context-menu-trigger`, `context-menu-content`, `context-menu-item`, `context-menu-checkbox-item`, `context-menu-radio-item`, `context-menu-label`, `context-menu-separator`, `context-menu-shortcut`, `context-menu-sub-trigger`, `context-menu-sub-content` | Component |
| `data-intent` | `default`, `danger` | Component |
| `data-inset` | `true` | Component |
| `data-highlighted`, `data-disabled`, `data-state` | Radix values | Radix |

## Accessibility Contract

Radix owns context menu roles, focus management, keyboard navigation, checked
state semantics, submenu behavior, pointer positioning, and dismissal.
Consumers must provide the same actions through discoverable UI when actions are
required for task completion.

## Content Resilience Rules

Context menu labels wrap and remain available in narrow containers. Keep command
labels concise and reserve `ContextMenuShortcut` for keyboard hints.

## Styling Contract

Classes use the `pds-context-menu-*` prefix. CSS shares the PDS menu surface
treatment and depends on highlighted, checked, disabled, danger intent, and
inset selectors.

## Token Usage

Uses popover surface color, typography, spacing, radius, elevation, state layer,
disabled opacity, focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Trigger, content, labels, separators, and items use PDS menu treatment. | `data-slot='context-menu-*'`, `.pds-context-menu-item` | Radix owns roles, positioning, and roving focus. |
| Hover | Pointer hover or Radix highlight | Highlighted items receive the shared hover state layer. | `data-highlighted`, `.pds-context-menu-item[data-highlighted]` | Highlight follows Radix pointer and keyboard focus management. |
| Focus-visible | Keyboard focus | Focused trigger or item uses the shared PDS focus shadow. | `.pds-context-menu-trigger:focus-visible`, `.pds-context-menu-item:focus-visible` | Keyboard users can open and navigate through Radix behavior. |
| Checked | Checkbox or radio item selected | Checked items use selected state layer and an indicator. | `data-state='checked'`, `.pds-context-menu-item[data-state='checked']` | Radix owns checkbox and radio item ARIA state. |
| Disabled | Radix disabled item | Disabled items use disabled opacity and suppress activation. | `data-disabled`, `.pds-context-menu-item[data-disabled]` | Radix removes disabled items from activation. |

Non-applicable states: Loading, Error, Success. Use child content or the
surrounding region for those states.

## State Behavior

ContextMenu opens from context-menu input and positions content at the pointer.
Highlighted items use hover state layer. Checked items use selected state layer.
Danger items change foreground only.

## Composition Examples

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@pds/react";

<ContextMenu>
  <ContextMenuTrigger>Run row</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy run path</ContextMenuItem>
    <ContextMenuItem intent="danger">Remove run</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>;
```

## Known Limitations

- ContextMenu does not make hidden actions discoverable on its own.

## Do / Don't For Agents

Do:

- Provide another visible path for required actions.
- Keep destructive actions marked with `intent="danger"`.

Don't:

- Do not use ContextMenu as the only way to complete a core workflow.

## Related Components

- [DropdownMenu](dropdown-menu.md)
- [Menu](menu.md)
- [ActionMenu](action-menu.md)

## Related Sources

- Component source: [packages/react/src/components/context-menu.tsx](../../../packages/react/src/components/context-menu.tsx)
