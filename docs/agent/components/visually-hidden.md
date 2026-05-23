# VisuallyHidden

## Purpose

VisuallyHidden keeps content available to assistive technology while removing it
from visual layout.

## When To Use

- Use for accessible names or context when an icon-only control lacks visible
  text.
- Use for extra screen-reader context that would duplicate visible UI.

## When Not To Use

- Do not hide required visible labels, errors, or primary state feedback.
- Do not use VisuallyHidden to hide content that should be inspectable.

## Anatomy / Slots

```tsx
<Button size="icon">
  <Icon name="refresh" />
  <VisuallyHidden>Refresh run</VisuallyHidden>
</Button>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| Radix VisuallyHidden props | Native span props | Radix defaults | Forwards refs and children. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `visually-hidden` | Component |

## Accessibility Contract

Content remains in the accessibility tree. Consumers must ensure hidden text
does not conflict with visible labels or create duplicate names.

## Content Resilience Rules

Keep hidden text concise. Do not put long instructions or dynamic content only
inside VisuallyHidden.

## Styling Contract

The root class is `pds-visually-hidden`; styling lives in
`packages/react/src/components.css` and follows the standard visually hidden
utility pattern.

## Token Usage

VisuallyHidden does not use visual tokens. Its exceptional raw dimensions are
restricted to the hidden utility selector.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Removed from visual layout but readable by assistive technology. | `data-slot='visually-hidden'` | Content remains accessible. |

Non-applicable states: Hover, Focus-visible, Active, Disabled, Loading, Error,
Success.

## State Behavior

VisuallyHidden has no state. It forwards Radix VisuallyHidden behavior.

## Composition Examples

```tsx
import { Button, Icon, VisuallyHidden } from "@pds/react";

<Button size="icon">
  <Icon name="refresh" />
  <VisuallyHidden>Refresh run</VisuallyHidden>
</Button>
```

## Known Limitations

- VisuallyHidden does not replace visible labels for required form fields.

## Do / Don't For Agents

Do:

- Use it for icon-only accessible names when visible text is not possible.

Don't:

- Do not hide required visible product feedback.

## Related Components

- [Button](button.md)
- [Icon](icon.md)

## Related Sources

- Component source: [packages/react/src/components/visually-hidden.tsx](../../../packages/react/src/components/visually-hidden.tsx)
