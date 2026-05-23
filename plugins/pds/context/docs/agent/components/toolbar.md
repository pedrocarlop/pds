# Toolbar

## Purpose

Toolbar groups compact controls for editing, filtering, or manipulating the
current product surface.

## When To Use

- Use for local tool rows with buttons, links, toggle groups, and separators.
- Use when controls act on the same nearby content region.

## When Not To Use

- Do not use Toolbar for primary page navigation; use PageHeader, Tabs, or app
  navigation patterns.
- Do not place unrelated page actions in one toolbar.

## Anatomy / Slots

```tsx
<Toolbar aria-label="Editor tools">
  <ToolbarButton>Undo</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarToggleGroup type="single">
    <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
  </ToolbarToggleGroup>
</Toolbar>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `ToolbarButton.type` | Native button type | `button` | Avoids accidental form submission. |
| Radix Toolbar props | Orientation, loop, dir, disabled, value props | Radix defaults | Passed through to each primitive. |

Toolbar parts extend Radix Toolbar props and forward refs.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `toolbar`, `toolbar-button`, `toolbar-link`, `toolbar-separator`, `toolbar-toggle-group`, `toolbar-toggle-item` | Component |
| `data-orientation` | `horizontal`, `vertical` | Radix |
| `data-state` | `on`, `off` on toggle items | Radix |

## Accessibility Contract

Toolbar should have an accessible name when multiple toolbars may appear.
Radix owns toolbar keyboard navigation and toggle behavior. Icon-only toolbar
controls need accessible names.

## Content Resilience Rules

Toolbar may scroll horizontally when controls exceed the available width. Keep
individual control labels concise and put descriptions outside the toolbar.

## Styling Contract

Classes use the `pds-toolbar-*` prefix. CSS depends on Radix orientation and
toggle state selectors.

## Token Usage

Toolbar uses PDS spacing, radius, typography, color, focus, state-layer,
disabled, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Inline tool row with compact controls. | `data-slot='toolbar-*'` | Name the toolbar when needed. |
| Pressed | Toggle item on | Selected state-layer background. | `data-state='on'` | Pressed state is Radix-owned. |
| Hover | Pointer hover | Neutral hover state layer on controls. | `:hover` | Suppressed when disabled. |
| Focus-visible | Keyboard focus | Shared PDS focus ring on focusable controls. | `:focus-visible` | Keyboard navigation is Radix-owned. |
| Disabled | Disabled control | Disabled opacity and no hover treatment. | `:disabled` | Disabled semantics are Radix-owned. |

Non-applicable states: Loading, Error, Success. Use surrounding status or field
feedback for those states.

## State Behavior

Toolbar delegates orientation, roving focus, and toggle group interaction to
Radix.

## Composition Examples

```tsx
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@pds/react";

<Toolbar aria-label="Run tools">
  <ToolbarButton>Retry</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarButton>Copy</ToolbarButton>
</Toolbar>
```

## Known Limitations

- Toolbar does not manage overflow menus.

## Do / Don't For Agents

Do:

- Group controls that act on the same region.
- Use accessible names for icon-only controls.

Don't:

- Do not use Toolbar as a page header or navigation bar.

## Related Components

- [Button](button.md)
- [ToggleGroup](toggle-group.md)
- [Separator](separator.md)

## Related Sources

- Component source: [packages/react/src/components/toolbar.tsx](../../../packages/react/src/components/toolbar.tsx)
