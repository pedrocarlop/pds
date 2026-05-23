# AspectRatio

## Purpose

AspectRatio preserves a fixed media or preview frame backed by Radix Aspect
Ratio.

## When To Use

- Use for screenshots, generated previews, charts, or media that must keep a
  stable ratio.

## When Not To Use

- Do not use for free-flowing text content.
- Do not use when the child should determine height naturally.

## Anatomy / Slots

```tsx
<AspectRatio>
  <img />
</AspectRatio>
```

## Public API

Exports include `AspectRatio`. Props follow Radix Aspect Ratio.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `ratio` | number | `1` | Common values are `16 / 9`, `4 / 3`, or `1`. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `aspect-ratio` | Component |

## Accessibility Contract

AspectRatio does not add semantics. Consumers must provide accessible names for
images, iframes, or interactive children.

## Content Resilience Rules

Use AspectRatio for bounded visual content. Text-heavy children must handle
their own overflow within the fixed frame.

## Styling Contract

The `.pds-aspect-ratio` class owns radius, nested background, and overflow.
Direct media children fill the frame and use `object-fit: cover`.

## Token Usage

Uses color, radius, and layout tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Child content is clipped to a tokenized frame. | `.pds-aspect-ratio` | Semantics come from the child. |

Non-applicable states: Hover, Focus, Active, Disabled, Loading, Error, Success.
Those states belong to child content.

## State Behavior

AspectRatio is layout-only and does not own interaction state.

## Composition Examples

```tsx
import { AspectRatio } from "@pds/react";
```

## Known Limitations

- AspectRatio does not provide image loading, fallback, or captions.

## Do / Don't For Agents

Do:

- Provide accessible labels for media children.

Don't:

- Do not place unconstrained long text directly inside the ratio frame.

## Related Components

- [Surface](surface.md)
- [Skeleton](skeleton.md)

## Related Sources

- Component source: [packages/react/src/components/aspect-ratio.tsx](../../../packages/react/src/components/aspect-ratio.tsx)
