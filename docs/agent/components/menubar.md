# Menubar

## Purpose

Menubar provides persistent command menus backed by Radix Menubar.

## When To Use

- Use for dense command surfaces where top-level menu categories remain visible.

## When Not To Use

- Do not use for page navigation; use NavigationMenu or Tabs.
- Do not use for a single trigger action list; use Menu.

## Anatomy / Slots

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger />
    <MenubarContent>
      <MenubarItem />
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Public API

Exports include `Menubar`, `MenubarMenu`, `MenubarTrigger`,
`MenubarContent`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioGroup`,
`MenubarRadioItem`, `MenubarLabel`, `MenubarSeparator`, `MenubarShortcut`,
`MenubarGroup`, `MenubarPortal`, `MenubarSub`, `MenubarSubTrigger`, and
`MenubarSubContent`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `value`, `defaultValue`, `onValueChange` | Radix values | Radix default | Controls active top-level menu. |
| `intent` | `default`, `danger` | `default` | Available on item variants. |
| `inset` | boolean | `false` | Adds leading alignment space. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `menubar`, `menubar-trigger`, `menubar-content`, `menubar-item`, `menubar-checkbox-item`, `menubar-radio-item`, `menubar-label`, `menubar-separator`, `menubar-shortcut`, `menubar-sub-trigger`, `menubar-sub-content` | Component |
| `data-intent` | `default`, `danger` | Component |
| `data-state`, `data-highlighted`, `data-disabled` | Radix values | Radix |

## Accessibility Contract

Radix owns menubar roles, roving focus, keyboard navigation, submenus, checked
state, and dismissal. Consumers must use clear top-level trigger labels.

## Content Resilience Rules

Menubar can scroll horizontally. Item labels wrap in content; top-level trigger
labels should stay concise.

## Styling Contract

`pds-menubar` and `pds-menubar-trigger` own the top-level bar. Content and items
reuse shared `pds-menu-*` classes.

## Token Usage

Uses segmented surface, popover surface, spacing, radius, elevation, typography,
state layer, focus, disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Top-level bar and triggers use segmented treatment. | `.pds-menubar`, `.pds-menubar-trigger` | Radix owns menubar roles. |
| Open | Active menu | Trigger gets selected state; content uses menu surface. | `data-state='open'` | Keyboard navigation stays in Radix. |
| Highlighted | Pointer or keyboard highlight | Item receives hover state layer. | `data-highlighted` | Highlight follows Radix focus. |
| Disabled | Disabled item or trigger | Disabled opacity. | `data-disabled`, `:disabled` | Disabled items cannot activate. |

Non-applicable states: Loading, Error, Success. Use item content or surrounding
feedback for those states.

## State Behavior

Menu state and keyboard behavior are Radix-owned. PDS adds slots and styling.

## Composition Examples

```tsx
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@pds/react";
```

## Known Limitations

- Menubar does not include command search.

## Do / Don't For Agents

Do:

- Use `MenubarShortcut` for compact keyboard hints.

Don't:

- Do not put long paragraphs in menubar content.

## Related Components

- [Menu](menu.md)
- [ContextMenu](context-menu.md)

## Related Sources

- Component source: [packages/react/src/components/menubar.tsx](../../../packages/react/src/components/menubar.tsx)
