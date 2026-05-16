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

## State Behavior

Highlighted items use hover state layer. Danger items change foreground only.

## Composition Examples

```tsx
import { ActionMenu, ActionMenuContent, ActionMenuItem, ActionMenuTrigger } from "pds";

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

- [DESIGN.md](../../../../DESIGN.md)
- [PDS React README](../../README.md)
- [components.css](../../src/components.css)
- [ActionMenu source](../../src/components/action-menu.tsx)
