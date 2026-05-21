# Switch

## Purpose

Switch provides an immediate on/off setting backed by Radix Switch.

## When To Use

- Use for settings that can be enabled or disabled immediately.
- Use when the current state matters as much as the action.

## When Not To Use

- Do not use for form acknowledgements; use Checkbox.
- Do not use for commands that need confirmation; use Button.

## Anatomy / Slots

```tsx
<Switch aria-label="Enable automation" />
```

## Public API

| Export | Notes |
| --- | --- |
| `Switch` | Styled Radix root with default thumb. |
| `SwitchThumb` | Optional custom thumb slot. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `switch`, `switch-thumb` | Component |
| `data-state` | `checked`, `unchecked` | Radix |

## Accessibility Contract

Radix owns switch semantics and keyboard behavior. Consumers must provide a
visible or ARIA label.

## Content Resilience Rules

Switch is fixed-size. Any explanatory label should live outside the control and
wrap in the consuming layout.

## Styling Contract

Classes use the `pds-switch-*` prefix. CSS depends on Radix `data-state`,
disabled, hover, focus-visible, and thumb transform selectors.

## Token Usage

Uses color, radius, elevation, focus, interaction state layer, disabled opacity,
and motion tokens.

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Unchecked switch renders neutral track and thumb. | `data-slot='switch'`, `data-state='unchecked'` | Radix switch owns switch semantics and ARIA checked state. |
| Hover | Pointer hover | Enabled switch uses neutral hover state layer; checked hover preserves accent fill. | `.pds-switch:not(:disabled):hover`, `[data-state='checked']:hover` | Hover does not change checked state. |
| Focus-visible | Keyboard focus | Switch uses shared PDS focus shadow. | `.pds-switch:focus-visible` | Keyboard users toggle through Radix switch behavior. |
| Active | Pressed | Pressed switch toggles checked state and moves the thumb. | `data-state='checked'`, `.pds-switch-thumb` | Radix updates ARIA checked state. |
| Disabled | `disabled` / `aria-disabled` | Disabled switch dims and suppresses pointer affordance. | `.pds-switch:disabled` | Radix disabled switch is not activatable. |
| Loading | `loading` prop / `data-busy` | Not applicable: Switch has no loading state. | Not applicable | Disable the switch and expose busy state externally if needed. |
| Error | `data-invalid` / error prop | Not applicable: Switch has no invalid prop. | Not applicable | Use field-level validation messaging around the switch. |
| Success | status / success prop | Not applicable: checked state is preference state, not success. | `data-state='checked'` only | Use separate status text for save success. |

## State Behavior

Checked state uses accent fill and moves the thumb. Disabled switches dim and
suppress pointer affordance.

## Composition Examples

```tsx
import { Switch } from "@pds/react";

<label>
  <Switch defaultChecked /> Enable background runs
</label>
```

## Known Limitations

- Switch does not include label or description slots.

## Do / Don't For Agents

Do:

- Preserve accessible labeling expectations.

Don't:

- Do not use Switch for destructive or delayed actions.

## Related Components

- [Checkbox](checkbox.md)
- [Button](button.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Switch source](../../../packages/react/src/components/switch.tsx)
