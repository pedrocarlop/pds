# Slider

## Purpose

Slider is the PDS range-input primitive for bounded numeric settings.

## When To Use

- Use for numeric values where approximate adjustment is faster than typing.
- Use for bounded settings such as threshold, allocation, intensity, or zoom.

## When Not To Use

- Do not use Slider when exact numeric entry is required without an adjacent
  input or value readout.
- Do not use Slider for binary settings; use Switch or Toggle.

## Anatomy / Slots

```tsx
<Slider defaultValue={[40]} />
```

Custom anatomy is available when consumers need multiple thumbs or custom labels.

```tsx
<Slider>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb aria-label="Minimum" />
</Slider>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `thumbCount` | Positive number | Inferred | Controls default rendered thumbs when `children` are omitted. |
| Radix Slider props | `value`, `defaultValue`, `min`, `max`, `step`, `orientation`, disabled props | Radix defaults | Passed through to Radix Slider root. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `slider`, `slider-track`, `slider-range`, `slider-thumb` | Component |
| `data-orientation` | `horizontal`, `vertical` | Radix |
| `data-disabled` | Present when disabled | Radix |

## Accessibility Contract

Each thumb must have an accessible name. The default thumb uses `aria-label`.
Consumers own visible value display, units, helper text, and exact-entry inputs
when needed.

## Content Resilience Rules

Slider should fill available inline space without forcing surrounding labels or
values to truncate. Put long labels outside the control.

## Styling Contract

Classes use the `pds-slider-*` prefix. CSS depends on orientation and disabled
state attributes emitted by Radix.

## Token Usage

Slider uses PDS color, spacing, radius, focus, and disabled opacity tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Neutral track, accent range, neutral thumb. | `data-slot='slider-*'` | Thumb names identify the control. |
| Focus-visible | Keyboard focus on thumb | Shared focus ring on thumb. | `.pds-slider-thumb:focus-visible` | Keyboard interaction is Radix-owned. |
| Disabled | Disabled root | Whole slider dims and stops pointer interaction. | `data-disabled` | Disabled semantics are Radix-owned. |

Non-applicable states: Loading, Error, Success. Use surrounding field feedback
for those states.

## State Behavior

Slider delegates range math, thumb movement, orientation, keyboard behavior, and
controlled state to Radix.

## Composition Examples

```tsx
import { Label, Slider } from "@pds/react";

<Label id="confidence-label">Confidence threshold</Label>
<Slider aria-labelledby="confidence-label" defaultValue={[70]} max={100} />
```

## Known Limitations

- Slider does not render value labels or numeric inputs.

## Do / Don't For Agents

Do:

- Provide visible labels and accessible thumb names.
- Pair exact values with readable text when precision matters.

Don't:

- Do not use Slider as the only way to set critical exact values.

## Related Components

- [Input](input.md)
- [Switch](switch.md)
- [Toggle](toggle.md)

## Related Sources

- Component source: [packages/react/src/components/slider.tsx](../../../packages/react/src/components/slider.tsx)
