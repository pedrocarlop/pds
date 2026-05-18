# InlineAlert

## Purpose

InlineAlert provides in-flow feedback for neutral, success, warning, and danger
messages.

## When To Use

- Use for form feedback, policy notes, validation summaries, or local warnings.
- Use `tone="danger"` only for error or destructive-risk feedback.

## When Not To Use

- Do not use for transient global feedback; use Toast.
- Do not use for modal confirmations; use Dialog.

## Anatomy / Slots

```tsx
<InlineAlert tone="warning">
  <InlineAlertTitle />
  <InlineAlertDescription />
</InlineAlert>
```

## Public API

Exports include `InlineAlert`, `InlineAlertTitle`, `InlineAlertDescription`, and
`InlineAlertActions`. `InlineAlert` accepts
`tone="neutral" | "success" | "warning" | "danger"`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `inline-alert`, `inline-alert-title`, `inline-alert-description`, `inline-alert-actions` | Component |
| `data-tone` | `neutral`, `success`, `warning`, `danger` | Component |

## Accessibility Contract

InlineAlert defaults to `role="status"` for neutral and success tones and
`role="alert"` for warning and danger tones. Consumers may override `role`.

## Content Resilience Rules

Text wraps by default. Do not truncate alert titles, descriptions, or required
state feedback.

## Styling Contract

Classes use the `pds-inline-alert-*` prefix. CSS depends on `data-tone` to set
the semantic accent.

## Token Usage

Uses semantic color, surface color, typography, spacing, radius, and elevation
tokens.

## State Behavior

Tone changes only visual treatment and default live-region role.

## Composition Examples

```tsx
import { InlineAlert, InlineAlertDescription, InlineAlertTitle } from "@pds/react";

<InlineAlert tone="danger">
  <InlineAlertTitle>Run failed</InlineAlertTitle>
  <InlineAlertDescription>Retry after reviewing credentials.</InlineAlertDescription>
</InlineAlert>
```

## Known Limitations

- InlineAlert does not include a dismiss control.

## Do / Don't For Agents

Do:

- Keep message content readable and complete.

Don't:

- Do not use status colors for non-status decoration.

## Related Components

- [Toast](toast.md)
- [Badge](badge.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [InlineAlert source](../../../packages/react/src/components/inline-alert.tsx)
