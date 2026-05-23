# ContextMenu

## Purpose

ContextMenu provides right-click or long-press contextual actions backed by
Radix Context Menu.

## When To Use

- Use for secondary actions attached to a product row, canvas item, or object.

## When Not To Use

- Do not use as the only way to access important actions.
- Do not use for persistent navigation.

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
`ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`,
`ContextMenuSubTrigger`, and `ContextMenuSubContent`. Item props accept
`intent="default" | "danger"` and `inset`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `intent` | `default`, `danger` | `default` | Available on item variants. |
| `inset` | boolean | `false` | Adds leading alignment space. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `context-menu-trigger`, `context-menu-content`, `context-menu-item`, `context-menu-checkbox-item`, `context-menu-radio-item`, `context-menu-label`, `context-menu-separator`, `context-menu-sub-trigger`, `context-menu-sub-content` | Component |
| `data-intent` | `default`, `danger` | Component |
| `data-highlighted`, `data-disabled`, `data-state` | Radix values | Radix |

## Accessibility Contract

Radix owns menu roles, keyboard navigation, checked state, submenus, and
dismissal. Consumers must make all critical actions available outside the
context menu too.

## Content Resilience Rules

Menu items wrap and are viewport constrained through shared menu CSS. Keep item
labels direct and scannable.

## Styling Contract

ContextMenu reuses shared `pds-menu-*` content and item classes and adds
`pds-context-menu-trigger` for trigger focus styling.

## Token Usage

Uses popover surface, typography, spacing, radius, elevation, state layer,
disabled opacity, focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Trigger is consumer content; content uses shared menu surface. | `data-slot='context-menu-*'` | Radix owns context-menu semantics. |
| Highlighted | Pointer or keyboard highlight | Item receives hover state layer. | `data-highlighted`, `.pds-menu-item[data-highlighted]` | Highlight follows Radix focus management. |
| Checked | Checkbox or radio item selected | Item receives selected state layer. | `data-state='checked'` | Radix owns ARIA checked state. |
| Disabled | Disabled item | Item uses disabled opacity. | `data-disabled` | Radix removes disabled activation. |

Non-applicable states: Loading, Error, Success. Use item labels or surrounding
UI for those states.

## State Behavior

ContextMenu opens through Radix context-menu gestures. Submenus and selection
state are Radix-owned.

## Composition Examples

```tsx
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@pds/react";
```

## Known Limitations

- ContextMenu is an alternate action path, not a replacement for visible
  controls.

## Do / Don't For Agents

Do:

- Mark destructive items with `intent="danger"`.

Don't:

- Do not hide primary actions only in ContextMenu.

## Related Components

- [Menu](menu.md)
- [Menubar](menubar.md)

## Related Sources

- Component source: [packages/react/src/components/context-menu.tsx](../../../packages/react/src/components/context-menu.tsx)
