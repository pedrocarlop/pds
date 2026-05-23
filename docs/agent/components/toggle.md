# Toggle

## Purpose

Toggle is the PDS single pressed-state control for compact on/off formatting,
view, or tool options.

## When To Use

- Use for a standalone pressed state such as pin, compact view, bold, or mute.
- Use icon-only toggles only when the button has an accessible name.

## When Not To Use

- Do not use Toggle for form submission actions; use Button.
- Do not use Toggle for binary settings that need explicit on/off wording; use
  Switch.

## Anatomy / Slots

```tsx
<Toggle aria-label="Pin run">
  <Icon name="keep" />
</Toggle>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `size` | `sm`, `md`, `lg`, `icon` | `md` | Controls fixed control size. |
| `variant` | `default`, `outline` | `default` | Controls neutral surface emphasis. |
| Radix Toggle props | `pressed`, `defaultPressed`, `onPressedChange`, `disabled` | Radix defaults | Own pressed behavior. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `toggle` | Component |
| `data-size` | `sm`, `md`, `lg`, `icon` | Component |
| `data-variant` | `default`, `outline` | Component |
| `data-state` | `on`, `off` | Radix |

## Accessibility Contract

Toggle renders a button with Radix pressed semantics. Icon-only toggles require
`aria-label`, `aria-labelledby`, or hidden text.

## Content Resilience Rules

Toggle is fixed-height and single-line. Keep labels concise and put explanatory
copy outside the control.

## Styling Contract

The root class is `pds-toggle`; styling lives in
`packages/react/src/components.css`. Preserve `data-state`, `data-size`, and
disabled selectors.

## Token Usage

Toggle uses PDS typography, spacing, radius, color, focus, state-layer,
disabled, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | `data-state='off'` | Transparent or neutral outline treatment. | `data-slot='toggle'` | Button semantics are Radix-owned. |
| Pressed | `data-state='on'` | Selected state-layer background. | `data-state='on'` | Pressed state is announced by Radix. |
| Hover | Pointer hover | Neutral hover state layer. | `:hover` | Suppressed when disabled. |
| Focus-visible | Keyboard focus | Shared PDS focus ring. | `:focus-visible` | Keyboard focus remains on the toggle. |
| Disabled | Disabled prop | Disabled opacity and no hover treatment. | `:disabled` | Native disabled behavior is Radix-owned. |

Non-applicable states: Loading, Error, Success. Use surrounding UI for those
states.

## State Behavior

Toggle delegates pressed state, keyboard activation, and ARIA pressed behavior
to Radix.

## Composition Examples

```tsx
import { Icon, Toggle } from "@pds/react";

<Toggle aria-label="Pin run" size="icon">
  <Icon name="keep" />
</Toggle>
```

## Known Limitations

- Toggle does not enforce mutual exclusivity; use ToggleGroup.

## Do / Don't For Agents

Do:

- Preserve pressed-state semantics from Radix.
- Use accessible names for icon-only toggles.

Don't:

- Do not use Toggle for destructive actions.

## Related Components

- [ToggleGroup](toggle-group.md)
- [Button](button.md)
- [Switch](switch.md)

## Related Sources

- Component source: [packages/react/src/components/toggle.tsx](../../../packages/react/src/components/toggle.tsx)
