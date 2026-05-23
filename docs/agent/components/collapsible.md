# Collapsible

## Purpose

Collapsible provides a single inline disclosure region backed by Radix
Collapsible.

## When To Use

- Use for one advanced section, optional detail, or inline reveal.

## When Not To Use

- Do not use for multiple stacked sections; use Accordion.
- Do not use for modal or overlay content.

## Anatomy / Slots

```tsx
<Collapsible>
  <CollapsibleTrigger />
  <CollapsibleContent />
</Collapsible>
```

## Public API

Exports include `Collapsible`, `CollapsibleTrigger`, and `CollapsibleContent`.
Props follow Radix Collapsible.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `open`, `defaultOpen`, `onOpenChange` | Radix values | Radix default | Use controlled state when product state owns disclosure. |
| `disabled` | boolean | `false` | Disables trigger activation. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `collapsible`, `collapsible-trigger`, `collapsible-content` | Component |
| `data-state`, `data-disabled` | Radix values | Radix |

## Accessibility Contract

Radix owns trigger button semantics, `aria-expanded`, disabled state, and content
relationship. Consumers must provide clear trigger text.

## Content Resilience Rules

Trigger and content wrap. Keep large generated content inside
`CollapsibleContent`, not in the trigger.

## Styling Contract

Classes use the `pds-collapsible-*` prefix. CSS owns surface, trigger, chevron,
content spacing, focus, open, and disabled states.

## Token Usage

Uses color, spacing, radius, elevation, typography, state layer, focus, disabled
opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Tokenized disclosure surface. | `.pds-collapsible` | Radix owns trigger semantics. |
| Open | `open` or trigger activation | Trigger uses selected state layer and chevron rotates. | `data-state='open'` | `aria-expanded` follows state. |
| Focus-visible | Keyboard focus | Trigger uses PDS focus shadow. | `.pds-collapsible-trigger:focus-visible` | Keyboard activation is native button behavior. |
| Disabled | `disabled` | Trigger uses disabled opacity. | `data-disabled`, `:disabled` | Disabled trigger cannot open content. |

Non-applicable states: Loading, Error, Success. Use child content for those
states.

## State Behavior

Open state is Radix-owned. PDS adds stable slots and tokenized styling.

## Composition Examples

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@pds/react";
```

## Known Limitations

- Collapsible does not animate height yet.

## Do / Don't For Agents

Do:

- Use Collapsible for one disclosure job.

Don't:

- Do not nest many Collapsible sections when Accordion is clearer.

## Related Components

- [Accordion](accordion.md)

## Related Sources

- Component source: [packages/react/src/components/collapsible.tsx](../../../packages/react/src/components/collapsible.tsx)
