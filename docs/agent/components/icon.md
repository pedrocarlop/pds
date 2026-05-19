# Icon

## Purpose

Icon is the PDS wrapper for Google Material Symbols Rounded. It gives consumers
a stable React API, the existing `data-icon` sizing hook, and the shared
Material Symbols variation settings used across PDS icons.

## When To Use

- Use for compact visual affordances inside Button, menus, pagination, and other
  product controls.
- Use when the icon name exists in the Google Material Symbols library.
- Use `label` only when the icon itself communicates meaning that is not already
  present in visible text or an enclosing accessible name.

## When Not To Use

- Do not use Icon as a badge, avatar, status label, or replacement for visible
  text.
- Do not use icon-only interactive controls without an accessible name on the
  control.
- Do not override the Material Symbols variation settings per instance.

## Anatomy / Slots

```tsx
<Icon name="add" />
```

Meaningful standalone icons can be labelled:

```tsx
<Icon label="Synced" name="check_circle" />
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `name` | Material Symbols ligature name | Required | Use snake-case names such as `add`, `close`, or `chevron_right`. |
| `label` | `string` | `undefined` | Adds `role="img"` and an accessible name. |

Icon extends `span` attributes, forwards refs, and preserves `className`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `icon` | Component |
| `data-icon` | Empty marker | Component |

## Accessibility Contract

Icons are decorative by default and render with `aria-hidden="true"`. Passing
`label` makes the icon discoverable as an image with that accessible name. For
icon-only buttons, put the accessible name on the Button rather than on the icon.

## Content Resilience Rules

Icon renders a single Material Symbols ligature and should stay visually compact.
Do not place prose or generated content in Icon.

## Styling Contract

The root classes are `pds-icon` and `material-symbols-rounded`; styling lives in
`packages/react/src/components.css`. The package stylesheet imports Google
Material Symbols Rounded and fixes all icons to:

```css
font-variation-settings:
  "FILL" 0,
  "wght" 400,
  "GRAD" 0,
  "opsz" 24;
```

Preserve the `.material-symbols-rounded` class for compatibility with Google
Material Symbols examples and agent-authored markup.

## Token Usage

Icon inherits color and size from its context. Spacing is owned by the parent
component or layout.

## State Behavior

Icon has no state of its own. Parent components own hover, pressed, selected,
disabled, and focus states.

## Composition Examples

```tsx
import { Button, Icon } from "@pds/react";

<Button>
  <Icon name="add" />
  Create run
</Button>

<Button aria-label="Create run" size="icon">
  <Icon name="add" />
</Button>
```

## Known Limitations

- Icon depends on Google Fonts unless the consuming environment overrides the
  Material Symbols font with a self-hosted equivalent.
- Icon does not validate symbol names at runtime.

## Do / Don't For Agents

Do:

- Use Material Symbols Rounded names in snake case.
- Keep icons decorative when adjacent text or an enclosing control already names
  the action.
- Preserve the `data-icon` marker so component CSS can size icons consistently.

Don't:

- Do not add per-icon fill, weight, grade, or optical-size variants.
- Do not use local SVGs for standard Material Symbols when Icon can express the
  same affordance.

## Related Components

- [Button](button.md)
- [Menu](menu.md)
- [Pagination](pagination.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Icon source](../../../packages/react/src/components/icon.tsx)
