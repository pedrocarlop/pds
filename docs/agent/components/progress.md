# Progress

## Purpose

Progress communicates determinate or indeterminate task completion backed by
Radix Progress.

## When To Use

- Use for uploads, generation steps, or long-running known tasks.
- Use indeterminate progress when completion percentage is unknown.

## When Not To Use

- Do not use for short actions that complete immediately.
- Do not use as the only status signal.

## Anatomy / Slots

```tsx
<Progress aria-label="Upload progress" value={45} />
```

## Public API

| Export | Notes |
| --- | --- |
| `Progress` | Styled Radix root with default indicator. |
| `ProgressIndicator` | Optional custom indicator slot. |

`Progress` accepts Radix progress props including `value` and `max`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `progress`, `progress-indicator` | Component |
| `data-indeterminate` | `true` when value is absent | Component |

## Accessibility Contract

Radix owns progressbar semantics. Consumers must provide a label with
`aria-label`, `aria-labelledby`, or surrounding text.

## Content Resilience Rules

Progress is visual and fixed-height. Pair it with readable status text when the
value needs to be inspectable.

## Styling Contract

Classes use the `pds-progress-*` prefix. CSS uses `--pds-progress-value` from the
root style and reduced-motion-safe animations.

## Token Usage

Uses color, radius, state, and motion tokens.

## State Behavior

Determinate progress transforms the indicator by percentage. Indeterminate
progress animates the indicator and remains accessible as an unlabeled value.

## Composition Examples

```tsx
import { Progress } from "pds";

<Progress aria-label="Run completion" value={70} />
<Progress aria-label="Waiting for model" value={null} />
```

## Known Limitations

- Progress does not render value text.

## Do / Don't For Agents

Do:

- Pair long-running progress with text status.

Don't:

- Do not rely on animation alone to communicate progress.

## Related Components

- [Skeleton](skeleton.md)
- [RunStatus](run-status.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Progress source](../../../packages/react/src/components/progress.tsx)
