# Badge

## Purpose

Badge is the PDS compact metadata and status primitive. It provides token-first
tone and emphasis treatment, stable attributes, wrapping labels, and optional
`asChild` composition for link-like metadata.

## When To Use

- Use for short status, category, count, or metadata labels.
- Use `tone` to describe semantic meaning, not visual preference.
- Use `emphasis="soft"` for default metadata and `emphasis="solid"` only when a
  badge must carry stronger status weight.
- Use `asChild` when a badge should compose onto a consumer-owned anchor or
  interactive element.

## When Not To Use

- Do not use Badge for primary actions; use Button.
- Do not use status tones for non-status decoration.
- Do not rely on badge color as the only status signal when the surrounding UI
  needs explicit text.

## Anatomy / Slots

Badge has one public root slot.

```tsx
<Badge>Queued</Badge>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `tone` | `neutral`, `accent`, `success`, `warning`, `danger`, `inactive` | `neutral` | Maps semantic status or metadata tone. |
| `emphasis` | `solid`, `soft`, `outline` | `soft` | Controls visual weight. |
| `asChild` | `boolean` | `false` | Renders through Radix `Slot.Root`. |

Badge extends native `span` attributes, forwards refs, and preserves
`className`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `badge` | Component |
| `data-tone` | `neutral`, `accent`, `success`, `warning`, `danger`, `inactive` | Component |
| `data-emphasis` | `solid`, `soft`, `outline` | Component |

## Accessibility Contract

Badge renders a neutral `span` by default. Consumers own any required status
announcements, roles, labels, links, or interactive behavior.

When using `asChild`, the child element owns its native semantics. Use meaningful
text because tone alone is not an accessible status label.

## Content Resilience Rules

Badge labels wrap instead of truncating by default. Keep copy short, but preserve
the full value when translation or generated metadata is longer than expected.

Do not hide required state feedback inside an icon-only badge unless a visible
or accessible label is also present.

## Styling Contract

The root class is `pds-badge`; styling lives in
`packages/react/src/components.css`.

CSS depends on `data-tone`, `data-emphasis`, and `:focus-visible` when Badge is
composed onto a focusable child. Preserve those selectors when changing
implementation details.

## Token Usage

Badge uses PDS color, typography, spacing, radius, focus, and motion tokens.
Status tones must map to semantic token categories rather than hard-coded
colors.

## State Behavior

Badge has no internal state. `asChild` may compose badge attributes onto a
consumer-owned interactive element, where focus and activation behavior remain
consumer-owned.

## Composition Examples

```tsx
import { Badge } from "@pds/react";

<Badge>Ready</Badge>
<Badge tone="success" emphasis="solid">Live</Badge>
<Badge tone="warning" emphasis="outline">Needs review</Badge>
<Badge asChild tone="accent">
  <a href="/runs/123">Queued</a>
</Badge>
```

## Known Limitations

- Badge does not provide live region behavior.
- Badge does not enforce short copy.
- Badge does not polyfill disabled or pressed behavior for `asChild` children.

## Do / Don't For Agents

Do:

- Preserve `data-slot`, `data-tone`, and `data-emphasis`.
- Keep badge copy readable and wrapping.
- Use status tones only for real status or semantic metadata.

Don't:

- Do not turn Badge into an action component.
- Do not add brand or performance colors for normal badge states.
- Do not truncate required status text by default.

## Related Components

- [RunStatus](run-status.md)
- [Button](button.md)
- [Message](message.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Badge source](../../../packages/react/src/components/badge.tsx)
