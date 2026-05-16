# RadioGroup

## Purpose

RadioGroup provides mutually exclusive choice controls backed by Radix
RadioGroup.

## When To Use

- Use when all options should remain visible.
- Use for small sets of mutually exclusive settings.

## When Not To Use

- Do not use for independent toggles; use Checkbox or Switch.
- Do not use for long option lists; use Select.

## Anatomy / Slots

```tsx
<RadioGroup defaultValue="manual">
  <RadioGroupItem value="manual" aria-label="Manual" />
</RadioGroup>
```

## Public API

| Export | Notes |
| --- | --- |
| `RadioGroup` | Styled Radix root. |
| `RadioGroupItem` | Styled option with default indicator. |
| `RadioGroupIndicator` | Optional custom indicator slot. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `radio-group`, `radio-group-item`, `radio-group-indicator` | Component |
| `data-orientation` | `vertical`, `horizontal` | Component |
| `data-state` | `checked`, `unchecked` | Radix |

## Accessibility Contract

Radix owns radiogroup semantics, roving focus, and keyboard behavior. Consumers
must provide a group label and labels for each item.

## Content Resilience Rules

Radio items are fixed-size; labels should be adjacent content that can wrap.
Horizontal groups wrap when space is constrained.

## Styling Contract

Classes use the `pds-radio-group-*` prefix. CSS depends on orientation, checked
state, focus-visible, hover, and disabled selectors.

## Token Usage

Uses color, spacing, radius, focus, state layer, disabled opacity, and motion
tokens.

## State Behavior

The checked item uses accent fill. Orientation is passed to Radix and exposed as
`data-orientation`.

## Composition Examples

```tsx
import { RadioGroup, RadioGroupItem } from "pds";

<RadioGroup aria-label="Run mode" defaultValue="safe">
  <label><RadioGroupItem value="safe" /> Safe</label>
  <label><RadioGroupItem value="fast" /> Fast</label>
</RadioGroup>
```

## Known Limitations

- RadioGroup does not include label text slots.

## Do / Don't For Agents

Do:

- Keep labels external and accessible.

Don't:

- Do not use RadioGroup for large datasets.

## Related Components

- [Select](select.md)
- [Checkbox](checkbox.md)

## Related Sources

- [DESIGN.md](../../../../DESIGN.md)
- [PDS React README](../../README.md)
- [components.css](../../src/components.css)
- [RadioGroup source](../../src/components/radio-group.tsx)
