# ActionMenu

## Purpose

ActionMenu provides a compact command-style dropdown for grouped actions, backed
by Radix Dropdown Menu.

## When To Use

- Use for command lists attached to toolbar or row action triggers.
- Use `ActionMenuShortcut` for keyboard hints.

## When Not To Use

- Do not use for checkbox or radio menu choices; use Menu.
- Do not use for searchable command palettes.

## Anatomy / Slots

```tsx
<ActionMenu>
  <ActionMenuTrigger />
  <ActionMenuContent>
    <ActionMenuItem>Archive</ActionMenuItem>
  </ActionMenuContent>
</ActionMenu>
```

## Public API

Exports include `ActionMenu`, `ActionMenuTrigger`, `ActionMenuContent`,
`ActionMenuItem`, `ActionMenuLabel`, `ActionMenuSeparator`,
`ActionMenuShortcut`, `ActionMenuGroup`, and `ActionMenuPortal`.

`ActionMenuItem` accepts `intent="default" | "danger"`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `action-menu-trigger`, `action-menu-content`, `action-menu-item`, `action-menu-label`, `action-menu-separator`, `action-menu-shortcut` | Component |
| `data-intent` | `default`, `danger` | `ActionMenuItem` |
| `data-highlighted`, `data-disabled` | Radix values | Radix |

## Accessibility Contract

Radix owns menu roles, focus management, keyboard navigation, and dismissal.
Consumers must provide an accessible trigger name and handle action side effects.

## Content Resilience Rules

Items wrap by default. Keep command labels concise and place shortcuts in the
shortcut slot.

## Styling Contract

Classes use the `pds-action-menu-*` prefix. CSS shares menu surface behavior and
depends on highlighted, disabled, and danger intent selectors.

## Token Usage

Uses popover surface color, typography, spacing, radius, elevation, state layer,
disabled opacity, and motion tokens.

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Trigger, content, labels, separators, and items use menu spacing and neutral item treatment. | `data-slot='action-menu-*'`, `.pds-action-menu-item` | Radix menu primitives own menu roles, roving focus, and selection semantics. |
| Hover | Pointer hover or Radix highlight | Highlighted items receive the shared hover state layer. | `data-highlighted`, `.pds-action-menu-item[data-highlighted]` | Highlight follows Radix pointer and keyboard focus management. |
| Focus-visible | Keyboard focus | Focused trigger or item uses the shared PDS focus shadow. | `.pds-action-menu-item:focus-visible`, trigger focus selector from composed control | Keyboard users navigate items through Radix menu behavior. |
| Active | Pressed or selected menu item | Pressed trigger opens the menu; selected item activation keeps item treatment stable. | Radix trigger events and `.pds-action-menu-item` | Activation semantics are owned by the chosen trigger and Radix item type. |
| Disabled | `disabled` or Radix disabled item | Disabled items use disabled opacity and suppress highlight selection. | `data-disabled`, `.pds-action-menu-item[data-disabled]` | Radix removes disabled items from activation. |
| Loading | `loading` prop / `data-busy` | Not applicable: ActionMenu has no loading or busy state. | Not applicable | Expose loading on the triggering region or item content if needed. |
| Error | `data-invalid` / error prop | Not applicable: danger intent is destructive emphasis, not validation error. | `data-intent='danger'` only | Do not use menu danger items as error announcements. |
| Success | status / success prop | Not applicable: ActionMenu has no success state. | Not applicable | Use item text or surrounding status components for success feedback. |

## State Behavior

Highlighted items use hover state layer. Danger items change foreground only.

## Composition Examples

```tsx
import { ActionMenu, ActionMenuContent, ActionMenuItem, ActionMenuTrigger } from "@pds/react";

<ActionMenu>
  <ActionMenuTrigger>Actions</ActionMenuTrigger>
  <ActionMenuContent>
    <ActionMenuItem>Duplicate</ActionMenuItem>
    <ActionMenuItem intent="danger">Delete</ActionMenuItem>
  </ActionMenuContent>
</ActionMenu>
```

## Known Limitations

- ActionMenu does not include search or nested choices.

## Do / Don't For Agents

Do:

- Use ActionMenu for concise command lists.

Don't:

- Do not use ActionMenu as a command palette replacement when search is needed.

## Related Components

- [Menu](menu.md)
- [Button](button.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [ActionMenu source](../../../packages/react/src/components/action-menu.tsx)
