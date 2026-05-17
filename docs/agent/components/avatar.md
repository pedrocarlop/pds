# Avatar

## Purpose

Avatar provides the PDS identity primitive for people, agents, teams, or compact
actors in product surfaces. It wraps Radix Avatar primitives and adds PDS sizing,
fallback, badge, and group slots.

## When To Use

- Use for actor identity next to messages, assignees, run owners, or compact
  collaborators.
- Use `AvatarFallback` when an image may fail or is unavailable.
- Use `AvatarBadge` for compact presence or status markers when the surrounding
  UI explains the meaning.
- Use `AvatarGroup` and `AvatarGroupCount` for small identity clusters.

## When Not To Use

- Do not use Avatar as a generic icon container.
- Do not use image-only avatars without meaningful `alt` text or an equivalent
  label where identity matters.
- Do not encode critical state only in `AvatarBadge` color.

## Anatomy / Slots

```tsx
<Avatar>
  <AvatarImage />
  <AvatarFallback />
  <AvatarBadge />
</Avatar>
```

```tsx
<AvatarGroup>
  <Avatar />
  <AvatarGroupCount />
</AvatarGroup>
```

## Public API

| Export | Notes |
| --- | --- |
| `Avatar` | Radix root; accepts `size`. |
| `AvatarImage` | Radix image primitive. |
| `AvatarFallback` | Radix fallback primitive. |
| `AvatarBadge` | Decorative or labeled status marker. |
| `AvatarGroup` | Group wrapper for clustered avatars. |
| `AvatarGroupCount` | Overflow count or compact group label. |

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` | Root avatar size. |

All exports forward refs, preserve `className`, and pass native or Radix props
through to the rendered element.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `avatar` | `Avatar` |
| `data-size` | `sm`, `md`, `lg` | `Avatar` |
| `data-slot` | `avatar-image` | `AvatarImage` |
| `data-slot` | `avatar-fallback` | `AvatarFallback` |
| `data-slot` | `avatar-badge` | `AvatarBadge` |
| `data-slot` | `avatar-group` | `AvatarGroup` |
| `data-slot` | `avatar-group-count` | `AvatarGroupCount` |

## Accessibility Contract

Radix owns image fallback behavior. Consumers own `alt` text, surrounding labels,
and whether a badge needs an accessible name. Use an empty `alt` only when the
avatar is decorative and the identity is already available in adjacent text.

`AvatarBadge` renders a `span`; add `aria-label` only when the badge has
meaningful status.

## Content Resilience Rules

Avatar dimensions are intentionally fixed. Fallback initials and group counts
must stay compact and fit inside the fixed shape. Longer identity text belongs
outside the avatar in adjacent labels.

## Styling Contract

Slot classes use the `pds-avatar-*` prefix; styling lives in
`packages/react/src/components.css`.

CSS depends on `data-size` on the root and group selectors for count sizing.
Preserve slot selectors because tests and examples use them as structure hooks.

## Token Usage

Avatar uses PDS radius, surface color, typography, spacing, and status token
categories. Do not add one-off sizes or badge colors without updating docs and
tests.

## State Behavior

Avatar has no interactive state. Radix controls image loading and fallback
display. Badge and group behavior are presentational.

## Composition Examples

```tsx
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage
} from "pds";

<Avatar size="md">
  <AvatarImage alt="Pedro" src="/avatar.png" />
  <AvatarFallback>PC</AvatarFallback>
  <AvatarBadge aria-label="Online" />
</Avatar>

<AvatarGroup>
  <Avatar><AvatarFallback>AI</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>
```

## Known Limitations

- Avatar does not provide tooltips, menus, or profile popovers.
- AvatarGroup does not calculate overflow counts.
- AvatarBadge does not define a status vocabulary.

## Do / Don't For Agents

Do:

- Preserve Radix Avatar primitives and slot exports.
- Keep fallback and group-count text constrained inside fixed shapes.
- Require surrounding copy or accessible labels for meaningful status badges.

Don't:

- Do not make Avatar a general icon button.
- Do not add dynamic group measurement or overflow logic here.
- Do not hard-code avatar sizes outside tokenized CSS.

## Related Components

- [Message](message.md)
- [Transcript](transcript.md)
- [Badge](badge.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Avatar source](../../../packages/react/src/components/avatar.tsx)
