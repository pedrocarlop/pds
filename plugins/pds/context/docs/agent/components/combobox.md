# Combobox

## Purpose

Combobox provides a searchable value picker backed by Base UI, including input
composition, popup lists, grouped items, empty states, clear actions, and
multi-select chips.

![Combobox component preview](images/combobox.png)

## When To Use

- Use for searchable form values where users type to find an option.
- Use the chips anatomy for multi-select values inside a compact field surface.
- Use grouped items when a searchable value set benefits from clear categories.

## When Not To Use

- Do not use Combobox for action menus; use Command, Menu, or DropdownMenu.
- Do not use it for small static choices that do not need search; use Select or
  NativeSelect.

## Anatomy / Slots

```tsx
<Combobox>
  <ComboboxInput />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem />
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

Multi-select anatomy:

```tsx
<Combobox multiple>
  <ComboboxChips>
    <ComboboxChip />
    <ComboboxChipsInput />
  </ComboboxChips>
</Combobox>
```

## Public API

Exports include `Combobox`, `ComboboxInput`, `ComboboxContent`,
`ComboboxList`, `ComboboxItem`, `ComboboxGroup`, `ComboboxLabel`,
`ComboboxCollection`, `ComboboxEmpty`, `ComboboxSeparator`, `ComboboxChips`,
`ComboboxChip`, `ComboboxChipsInput`, `ComboboxTrigger`, `ComboboxClear`,
`ComboboxValue`, and `useComboboxAnchor`, plus prop types for exported parts.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `multiple` on `Combobox` | boolean | `false` | Enables multi-value mode through Base UI. |
| `value`, `defaultValue`, `onValueChange` | Base UI value props | Base UI defaults | Use controlled values for app state. |
| `showTrigger` on `ComboboxInput` | boolean | `true` | Shows the inline disclosure trigger. |
| `showClear` on `ComboboxInput` | boolean | `false` | Shows the inline clear action. |
| `side`, `align`, offsets, `anchor` on `ComboboxContent` | Base UI positioning props | `bottom`, `start`, offset `8` | Position the popup or attach it to chip anchors. |
| `showRemove` on `ComboboxChip` | boolean | `true` | Renders the chip remove action. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `combobox-input`, `combobox-trigger`, `combobox-clear`, `combobox-positioner`, `combobox-content`, `combobox-list`, `combobox-group`, `combobox-label`, `combobox-item`, `combobox-item-indicator`, `combobox-collection`, `combobox-empty`, `combobox-separator`, `combobox-chips`, `combobox-chip`, `combobox-chip-remove`, `combobox-chip-input` | Component |
| `data-open`, `data-closed`, `data-side`, `data-align`, `data-empty` | Base UI popup state | Base UI |
| `data-highlighted`, `data-selected`, `data-disabled` | Item state | Base UI |
| `data-visible`, `data-popup-open`, `data-placeholder`, `data-invalid` | Control state | Base UI |

## Accessibility Contract

Base UI owns combobox roles, input/listbox wiring, active descendant tracking,
item selection, disabled item behavior, popup dismissal, and chip remove
semantics. Consumers must provide an accessible input label, stable values, and
validation text when invalid.

## Content Resilience Rules

Combobox items, labels, empty text, and chips wrap long translated content. Keep
chips short enough to scan, and use grouped labels for dense option sets. Popup
content is constrained by viewport and anchor size so it remains usable in
narrow containers and at 200% zoom.

## Styling Contract

Classes use the `pds-combobox-*` prefix. CSS owns the input-group integration,
popup surface, list scrolling, highlighted/selected item states, clear and
trigger controls, chip field surface, chip remove affordance, invalid/focus
rings, and disabled opacity. Preserve Base UI data attributes and avoid hiding
`ComboboxEmpty`, which announces empty-result changes.

## Token Usage

Uses field/search and popover surface color, typography, spacing, radius,
elevation, state layer, invalid, disabled opacity, focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Searchable field with optional trigger and popup list. | `.pds-combobox-*`, `data-slot='combobox-*'` | Base UI owns combobox roles. |
| Open | Popup open | Trigger icon rotates; popup renders in a portal. | `data-popup-open`, `data-open` | Input keeps listbox linkage. |
| Highlighted | Keyboard or pointer active item | Shared hover state layer. | `data-highlighted` | Tracks active descendant. |
| Selected | Current selected item | Shared selected state layer and indicator. | `data-selected` | Base UI owns selection state. |
| Focus-visible | Input, item, trigger, clear, or chip remove receives keyboard focus | PDS focus ring. | `:focus-visible`, chip `:focus-within` | Focus remains on the interactive element. |
| Invalid | Field/Base UI invalid state or invalid child input | Invalid ring on the field/chips surface. | `data-invalid`, `[aria-invalid='true']` | Pair with visible error text. |
| Disabled | Base UI disabled state | Disabled opacity and no activation. | `data-disabled` | Base UI suppresses disabled interaction. |
| Empty | Filtered list has no results | Empty text remains mounted for polite announcement. | `data-empty`, `ComboboxEmpty` | Base UI announces empty changes. |

Non-applicable states: Loading and Success. Use adjacent feedback or item
content for those states.

## State Behavior

`ComboboxInput` composes PDS InputGroup with Base UI input behavior. `showClear`
uses Base UI Clear. `ComboboxContent` portals and positions the popup with Base
UI Positioner. `ComboboxChips`, `ComboboxChip`, and `ComboboxChipsInput` cover
the multi-select field anatomy.

## Composition Examples

```tsx
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@pds/react";

<Combobox defaultValue="review">
  <ComboboxInput aria-label="Review destination" showClear />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="review">Review queue</ComboboxItem>
      <ComboboxItem value="archive">Archive</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>;
```

## Known Limitations

- Combobox does not virtualize large option sets.
- Combobox does not own remote filtering or form submission side effects.

## Do / Don't For Agents

Do:

- Provide accessible labels and stable values for all selectable options.
- Keep `ComboboxEmpty` mounted so Base UI can announce empty results.

Don't:

- Do not use Combobox as a command palette or navigation menu.

## Related Components

- [Command](command.md)
- [InputGroup](input-group.md)
- [Select](select.md)
- [NativeSelect](native-select.md)

## Related Sources

- Component source: [packages/react/src/components/combobox.tsx](../../../packages/react/src/components/combobox.tsx)
