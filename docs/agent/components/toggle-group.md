# ToggleGroup

## Purpose

ToggleGroup groups related Toggle-like options with single or multiple
selection behavior.

## When To Use

- Use for compact mutually exclusive view modes or multi-select tool states.
- Use when the controls are peers in one local decision.

## When Not To Use

- Do not use ToggleGroup for navigation; use Tabs or segmented navigation.
- Do not use it for long option labels or settings requiring descriptions.

## Anatomy / Slots

```tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `ToggleGroup.type` | `single`, `multiple` | Required by Radix | Controls selection model. |
| `ToggleGroupItem.size` | `sm`, `md`, `lg`, `icon` | `md` | Mirrors Toggle sizing. |
| `ToggleGroupItem.variant` | `default`, `outline` | `default` | Mirrors Toggle emphasis. |

ToggleGroup and items extend Radix ToggleGroup props and forward refs.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `toggle-group`, `toggle-group-item` | Component |
| `data-size` | `sm`, `md`, `lg`, `icon` | Component |
| `data-variant` | `default`, `outline` | Component |
| `data-state` | `on`, `off` | Radix |

## Accessibility Contract

Radix owns roving focus, keyboard interaction, and pressed state. Consumers must
provide understandable item labels and values.

## Content Resilience Rules

Keep item labels short. The group may overflow or wrap in surrounding layout,
but individual controls remain fixed-height.

## Styling Contract

Classes use the `pds-toggle-group-*` prefix. CSS depends on item state, size,
variant, hover, focus-visible, and disabled selectors.

## Token Usage

ToggleGroup uses PDS segmented surface, spacing, radius, typography, color,
focus, state-layer, disabled, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Item off | Neutral group surface and transparent item. | `data-slot='toggle-group-item'` | Group behavior is Radix-owned. |
| Pressed | Item on | Selected state-layer item background. | `data-state='on'` | Pressed state is announced by Radix. |
| Hover | Pointer hover | Neutral hover state layer. | `:hover` | Suppressed when disabled. |
| Focus-visible | Keyboard focus | Shared PDS focus ring on item. | `:focus-visible` | Roving focus remains inside group. |
| Disabled | Disabled item or group | Disabled opacity and no hover treatment. | `:disabled` | Disabled semantics are Radix-owned. |

Non-applicable states: Loading, Error, Success. Use surrounding UI for those
states.

## State Behavior

ToggleGroup delegates single or multiple selection, roving focus, and keyboard
interaction to Radix.

## Composition Examples

```tsx
import { ToggleGroup, ToggleGroupItem } from "@pds/react";

<ToggleGroup aria-label="View mode" defaultValue="list" type="single">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>
```

## Known Limitations

- ToggleGroup does not render descriptions or validation feedback.

## Do / Don't For Agents

Do:

- Keep related items in one group.
- Use Tabs when the selection changes panels or navigation state.

Don't:

- Do not put unrelated commands in one ToggleGroup.

## Related Components

- [Toggle](toggle.md)
- [Tabs](tabs.md)
- [Toolbar](toolbar.md)

## Related Sources

- Component source: [packages/react/src/components/toggle-group.tsx](../../../packages/react/src/components/toggle-group.tsx)
