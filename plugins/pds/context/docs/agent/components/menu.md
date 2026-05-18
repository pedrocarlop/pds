# Menu

## Purpose

Menu provides contextual dropdown actions and choices backed by Radix Dropdown
Menu.

## When To Use

- Use for secondary action sets attached to a trigger.
- Use checkbox or radio menu items for compact preference choices.

## When Not To Use

- Do not use for persistent navigation.
- Do not put large forms inside Menu; use Popover or Dialog.

## Anatomy / Slots

```tsx
<Menu>
  <MenuTrigger />
  <MenuContent>
    <MenuItem>Rename</MenuItem>
  </MenuContent>
</Menu>
```

## Public API

Exports include `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`,
`MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuLabel`,
`MenuSeparator`, `MenuShortcut`, `MenuGroup`, `MenuPortal`, `MenuSub`,
`MenuSubTrigger`, and `MenuSubContent`.

`MenuItem`, `MenuCheckboxItem`, and `MenuRadioItem` accept
`intent="default" | "danger"`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `menu-trigger`, `menu-content`, `menu-item`, `menu-checkbox-item`, `menu-radio-item`, `menu-label`, `menu-separator`, `menu-shortcut` | Component |
| `data-intent` | `default`, `danger` | Component |
| `data-highlighted`, `data-disabled`, `data-state` | Radix values | Radix |

## Accessibility Contract

Radix owns menu roles, focus management, keyboard navigation, submenus, checked
state, and dismissal. Consumers must provide an accessible trigger name.

## Content Resilience Rules

Menu labels and items wrap. Keep command text scannable and put dense shortcuts
in `MenuShortcut`.

## Styling Contract

Classes use the `pds-menu-*` prefix. CSS depends on highlighted, checked,
disabled, and danger intent selectors.

## Token Usage

Uses popover surface color, typography, spacing, radius, elevation, state layer,
disabled opacity, and motion tokens.

## State Behavior

Highlighted items use hover state layer. Checked items use selected state layer.
Danger items change foreground only.

## Composition Examples

```tsx
import { Menu, MenuContent, MenuItem, MenuShortcut, MenuTrigger } from "@pds/react";

<Menu>
  <MenuTrigger>More</MenuTrigger>
  <MenuContent>
    <MenuItem>Copy <MenuShortcut>⌘C</MenuShortcut></MenuItem>
    <MenuItem intent="danger">Delete</MenuItem>
  </MenuContent>
</Menu>
```

## Known Limitations

- Menu does not include command filtering or search.

## Do / Don't For Agents

Do:

- Keep destructive actions marked with `intent="danger"`.

Don't:

- Do not use Menu for modal workflows.

## Related Components

- [ActionMenu](action-menu.md)
- [Popover](popover.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Menu source](../../../packages/react/src/components/menu.tsx)
