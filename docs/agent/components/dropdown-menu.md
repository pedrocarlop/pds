# DropdownMenu

## Purpose

DropdownMenu provides the exact Radix dropdown menu surface from `temp-ext-v4`
with PDS styling, stable slots, checked items, radio choices, submenus, and
shortcut metadata.

![DropdownMenu component preview](images/dropdown-menu.png)

## When To Use

- Use when an app or imported component expects `DropdownMenu*` exports.
- Use for secondary action sets, compact choices, and nested commands attached
  to a trigger.

## When Not To Use

- Do not use for persistent navigation.
- Do not put large forms or search workflows inside DropdownMenu; use Popover,
  Dialog, or a dedicated command surface.

## Anatomy / Slots

```tsx
<DropdownMenu>
  <DropdownMenuTrigger />
  <DropdownMenuContent>
    <DropdownMenuLabel />
    <DropdownMenuItem />
  </DropdownMenuContent>
</DropdownMenu>
```

## Public API

Exports include `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`,
`DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`,
`DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`,
`DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`,
`DropdownMenuSub`, `DropdownMenuSubTrigger`, and `DropdownMenuSubContent`.

`DropdownMenuItem`, `DropdownMenuCheckboxItem`, and `DropdownMenuRadioItem`
accept `intent="default" | "danger"` and `inset`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `dropdown-menu-trigger`, `dropdown-menu-content`, `dropdown-menu-item`, `dropdown-menu-checkbox-item`, `dropdown-menu-radio-item`, `dropdown-menu-label`, `dropdown-menu-separator`, `dropdown-menu-shortcut`, `dropdown-menu-sub-trigger`, `dropdown-menu-sub-content` | Component |
| `data-intent` | `default`, `danger` | Component |
| `data-inset` | `true` | Component |
| `data-highlighted`, `data-disabled`, `data-state` | Radix values | Radix |

## Accessibility Contract

Radix owns menu roles, checked state semantics, submenu behavior, focus
management, keyboard navigation, and dismissal. Consumers must provide an
accessible trigger name and handle action side effects.

## Content Resilience Rules

Menu content and items wrap long labels and translated text. Keep labels
scannable, place dense shortcuts in `DropdownMenuShortcut`, and avoid relying on
fixed menu widths.

## Styling Contract

Classes use the `pds-dropdown-menu-*` prefix and share the PDS menu surface
treatment. CSS depends on highlighted, checked, disabled, danger intent, and
inset selectors.

## Token Usage

Uses popover surface color, typography, spacing, radius, elevation, state layer,
disabled opacity, focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Content, labels, separators, and items use menu spacing and neutral treatment. | `data-slot='dropdown-menu-*'`, `.pds-dropdown-menu-item` | Radix menu primitives own roles and roving focus. |
| Hover | Pointer hover or Radix highlight | Highlighted items receive the shared hover state layer. | `data-highlighted`, `.pds-dropdown-menu-item[data-highlighted]` | Highlight follows Radix pointer and keyboard focus management. |
| Focus-visible | Keyboard focus | Focused items use the shared PDS focus shadow. | `.pds-dropdown-menu-item:focus-visible` | Keyboard users navigate items through Radix menu behavior. |
| Checked | Checkbox or radio item selected | Checked items use selected state layer and an indicator. | `data-state='checked'`, `.pds-dropdown-menu-item[data-state='checked']` | Radix owns checkbox and radio item ARIA state. |
| Disabled | Radix disabled item | Disabled items use disabled opacity and suppress activation. | `data-disabled`, `.pds-dropdown-menu-item[data-disabled]` | Radix removes disabled items from activation. |

Non-applicable states: Loading, Error, Success. Use child content or the
surrounding region for those states.

## State Behavior

Highlighted items use hover state layer. Checked items use selected state layer.
Danger items change foreground only. Submenus use Radix open state and the
`DropdownMenuSubTrigger` chevron.

## Composition Examples

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@pds/react";

<DropdownMenu>
  <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      Copy run id <DropdownMenuShortcut>Cmd+C</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem intent="danger">Delete draft</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

## Known Limitations

- DropdownMenu does not include search, filtering, or command palette behavior.

## Do / Don't For Agents

Do:

- Use `intent="danger"` for destructive actions.
- Use `DropdownMenuShortcut` for keyboard hints rather than appending shortcut
  text into labels.

Don't:

- Do not hard-code menu colors or spacing outside `components.css`.

## Related Components

- [Menu](menu.md)
- [ActionMenu](action-menu.md)
- [Popover](popover.md)

## Related Sources

- Component source: [packages/react/src/components/dropdown-menu.tsx](../../../packages/react/src/components/dropdown-menu.tsx)
