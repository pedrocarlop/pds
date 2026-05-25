# Command

## Purpose

Command provides a searchable command-list surface for quick actions, palette
dialogs, and filtered item sets imported from `temp-ext-v4`.

![Command component preview](images/command.png)

## When To Use

- Use for command palettes, searchable action menus, and grouped quick actions.
- Use `CommandDialog` when the command list should appear as a modal palette.
- Use `CommandShortcut` for keyboard hints that are metadata, not item labels.

## When Not To Use

- Do not use Command for persistent navigation.
- Do not use it for selecting form values; use Combobox, Select, or
  NativeSelect.

## Anatomy / Slots

```tsx
<Command>
  <CommandInput />
  <CommandList>
    <CommandGroup>
      <CommandItem />
    </CommandGroup>
  </CommandList>
</Command>
```

## Public API

Exports include `Command`, `CommandDialog`, `CommandInput`, `CommandList`,
`CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, and
`CommandShortcut`, plus prop types for each exported part.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `title` on `CommandDialog` | string | `Command palette` | Hidden dialog title for assistive tech. |
| `description` on `CommandDialog` | string | `Search for a command to run.` | Hidden dialog description. |
| `showCloseButton` on `CommandDialog` | boolean | `false` | Passed to DialogContent. |
| `value`, `defaultValue`, `onValueChange`, `filter`, `shouldFilter` | cmdk props | cmdk defaults | Owned by cmdk. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `command`, `command-input-wrapper`, `command-input`, `command-list`, `command-empty`, `command-group`, `command-item`, `command-item-indicator`, `command-separator`, `command-shortcut` | Component |
| `data-selected`, `data-disabled` | cmdk values | cmdk |
| `data-checked` | `true` when consumers mark a checked item | Consumer |

## Accessibility Contract

cmdk owns command-list filtering, keyboard navigation, item selection, active
item tracking, disabled item behavior, and accessible combobox/list semantics.
Consumers must provide a command label, stable item values, and side-effect
handlers. `CommandDialog` wires a hidden Dialog title and description.

## Content Resilience Rules

Command items and group headings wrap long labels and translated text. Shortcuts
stay in the trailing slot and should remain terse. Keep command groups concise
so the list remains scannable in narrow palettes and at 200% zoom.

## Styling Contract

Classes use the `pds-command-*` prefix. CSS owns the popover surface, search
input surface, list scrolling, group heading treatment, selected/checked item
states, disabled opacity, separators, and shortcut metadata. Preserve cmdk
state selectors and the stable `data-slot` values.

## Token Usage

Uses popover and search surface color, typography, spacing, radius, elevation,
state layer, disabled opacity, focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Search field and grouped command list in a popover surface. | `.pds-command`, `data-slot='command-*'` | cmdk owns semantics. |
| Focus-visible | Input or item receives keyboard focus | PDS focus ring on the focused control. | `.pds-command-input:focus-visible`, `.pds-command-item:focus-visible` | Keyboard focus remains on cmdk-managed controls. |
| Selected | cmdk active item | Shared hover state layer. | `data-selected='true'` | Tracks current active item. |
| Checked | Consumer marks item checked | Selected state layer and check indicator. | `data-checked='true'` | Use only for commands representing current state. |
| Disabled | `disabled` on `CommandItem` | Disabled opacity and no activation. | `data-disabled='true'` | cmdk suppresses disabled selection. |
| Empty | Filtering has no results | Centered empty text. | `CommandEmpty`, `data-slot='command-empty'` | cmdk renders the empty slot. |

Non-applicable states: Loading, Error, and Success. Represent those states with
items, empty content, or surrounding feedback components.

## State Behavior

`CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandEmpty`,
and `CommandSeparator` pass through cmdk behavior. `CommandDialog` composes the
existing PDS Dialog and keeps modal semantics there.

## Composition Examples

```tsx
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from "@pds/react";

<Command label="Workspace commands">
  <CommandInput aria-label="Search commands" placeholder="Search commands" />
  <CommandList>
    <CommandItem value="open-run">
      Open run <CommandShortcut>Enter</CommandShortcut>
    </CommandItem>
  </CommandList>
</Command>;
```

## Known Limitations

- Command does not virtualize large result sets.
- Command does not own command side effects.

## Do / Don't For Agents

Do:

- Provide stable `value` props for items whose labels can change.
- Keep keyboard hints inside `CommandShortcut`.

Don't:

- Do not hard-code palette colors or spacing outside `components.css`.

## Related Components

- [Combobox](combobox.md)
- [Dialog](dialog.md)
- [Menu](menu.md)

## Related Sources

- Component source: [packages/react/src/components/command.tsx](../../../packages/react/src/components/command.tsx)
