# Accordion

## Purpose

Accordion groups related disclosure sections backed by Radix Accordion.

## When To Use

- Use for stacked product sections where only some detail needs to be visible.
- Use when headings should remain scannable while details expand inline.

## When Not To Use

- Do not use for single inline disclosure; use Collapsible.
- Do not use for tabbed peer views; use Tabs.

## Anatomy / Slots

```tsx
<Accordion>
  <AccordionItem>
    <AccordionHeader>
      <AccordionTrigger />
    </AccordionHeader>
    <AccordionContent />
  </AccordionItem>
</Accordion>
```

## Public API

Exports include `Accordion`, `AccordionItem`, `AccordionHeader`,
`AccordionTrigger`, and `AccordionContent`. Props follow Radix Accordion.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `type` | `single`, `multiple` | Radix default | Controls selection model. |
| `value`, `defaultValue`, `onValueChange` | Radix values | Radix default | Use controlled state for product-owned expansion. |
| `collapsible`, `disabled`, `orientation` | Radix props | Radix default | Preserve Radix semantics. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `accordion`, `accordion-item`, `accordion-header`, `accordion-trigger`, `accordion-content`, `accordion-content-inner` | Component |
| `data-state`, `data-disabled`, `data-orientation` | Radix values | Radix |

## Accessibility Contract

Radix owns heading button semantics, `aria-expanded`, disabled state, keyboard
navigation, and content relationships. Consumers must provide concise trigger
text that describes the section.

## Content Resilience Rules

Trigger and content text wrap. Keep trigger copy short enough to scan and put
long generated details inside `AccordionContent`.

## Styling Contract

Classes use the `pds-accordion-*` prefix. CSS owns the section surface,
trigger, chevron, content padding, open state, focus ring, and disabled opacity.

## Token Usage

Uses color, spacing, radius, elevation, typography, state layer, focus, disabled
opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Stacked surface with neutral trigger and wrapped content. | `.pds-accordion`, `.pds-accordion-trigger` | Radix owns button and region relationships. |
| Open | Expanded item | Trigger gets selected state layer and chevron rotates. | `data-state='open'` | `aria-expanded` is set by Radix. |
| Focus-visible | Keyboard focus | Trigger uses shared PDS focus shadow. | `.pds-accordion-trigger:focus-visible` | Keyboard operation follows Radix Accordion. |
| Disabled | Disabled item or trigger | Trigger uses disabled opacity and cannot open. | `data-disabled`, `:disabled` | Radix removes disabled activation. |

Non-applicable states: Loading, Error, Success. Use content children or the
surrounding region for those states.

## State Behavior

Open and disabled state are Radix-owned. The component only maps slots and
tokenized styling.

## Composition Examples

```tsx
import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from "@pds/react";
```

## Known Limitations

- Accordion does not animate height yet.

## Do / Don't For Agents

Do:

- Keep `AccordionTrigger` inside `AccordionHeader`.

Don't:

- Do not place primary workflow actions only inside collapsed content.

## Related Components

- [Collapsible](collapsible.md)
- [Tabs](tabs.md)

## Related Sources

- Component source: [packages/react/src/components/accordion.tsx](../../../packages/react/src/components/accordion.tsx)
