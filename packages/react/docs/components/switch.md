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

## State Behavior

Checked state uses accent fill and moves the thumb. Disabled switches dim and
suppress pointer affordance.

## Composition Examples

```tsx
import { Switch } from "pds";

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

- [DESIGN.md](../../../../DESIGN.md)
- [PDS React README](../../README.md)
- [components.css](../../src/components.css)
- [Switch source](../../src/components/switch.tsx)
