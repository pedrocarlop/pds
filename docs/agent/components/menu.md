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

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Trigger, content, labels, separators, and items use menu spacing and neutral item treatment. | `data-slot='menu-*'`, `.pds-menu-item` | Radix menu primitives own menu roles, roving focus, and selection semantics. |
| Hover | Pointer hover or Radix highlight | Highlighted items receive the shared hover state layer. | `data-highlighted`, `.pds-menu-item[data-highlighted]` | Highlight follows Radix pointer and keyboard focus management. |
| Focus-visible | Keyboard focus | Focused menu items use shared PDS focus shadow. | `.pds-menu-item:focus-visible` | Keyboard users navigate items through Radix menu behavior. |
| Active | Pressed or checked item | Checked menu items use selected state layer. | `data-state='checked'`, `.pds-menu-item[data-state='checked']` | Radix owns checkbox and radio item ARIA state. |
| Disabled | `disabled` or Radix disabled item | Disabled items use disabled opacity and suppress highlight selection. | `data-disabled`, `.pds-menu-item[data-disabled]` | Radix removes disabled items from activation. |
| Loading | `loading` prop / `data-busy` | Not applicable: Menu has no loading or busy state. | Not applicable | Expose loading on item content or surrounding region if needed. |
| Error | `data-invalid` / error prop | Not applicable: danger intent is destructive emphasis, not validation error. | `data-intent='danger'` only | Do not use danger items as error announcements. |
| Success | status / success prop | Not applicable: Menu has no success state. | Not applicable | Use item text or surrounding status components for success feedback. |

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
