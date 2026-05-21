# Details

## Purpose

Details renders compact label-value rows with optional supporting notes. DetailsCell
uses the same structure with grouped-cell row semantics.

## When To Use

- Use Details for label-value rows, fees, metadata, and short explanatory notes.
- Use DetailsCell when the same row belongs in a grouped cell layout.
- Use the skeleton variants while row content loads asynchronously.

## When Not To Use

- Do not use Details for full form layouts, complex tables, or long narrative
  content.
- Do not use DetailsCell when a richer interactive row is needed; use
  [Item](item.md) or [Cell](cell.md) instead.
- Do not rely on DetailsSkeleton as the only loading announcement for an owning
  region.

## Anatomy / Slots

```tsx
<Details>
  <Details.Title />
  <Details.Content />
  <Details.Note />
</Details>
```

Named slot exports are available as `DetailsTitle`, `DetailsContent`,
`DetailsNote`, `DetailsSkeletonTitle`, `DetailsSkeletonContent`, and
`DetailsSkeletonNote`.

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `default`, `compact`, `header` | `default` | Sets row hierarchy. |
| `use` | React element type | `div` | Renders the root element. |
| `disabled` | `boolean` | `false` | Native `disabled` on buttons; `aria-disabled` elsewhere. |
| `indent` | `number` |  | Writes `--pds-details-indent`. |
| `type` | Native button type | `button` | Applied only when `use="button"`. |

DetailsCell, DetailsSkeleton, and DetailsCellSkeleton share the Details props.
Skeleton children are optional and default to title and content placeholders.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `details`, `details-cell`, `details-title`, `details-content`, `details-note`, `details-skeleton`, `details-cell-skeleton`, `details-skeleton-title`, `details-skeleton-content`, `details-skeleton-note` | Component |
| `data-variant` | `default`, `compact`, `header` | Component |
| `data-disabled` | `true` when disabled | Component |

## Accessibility Contract

Details does not invent row semantics. Consumers choose the root element with
`use`: keep the default `div` for static rows, use `button` only for rows that
activate an action, and use landmark or section elements only when the
surrounding document structure calls for them. Button Details default to
`type="button"`.

Disabled button roots use native `disabled`. Disabled non-button roots expose
`aria-disabled="true"`; consumers still own preventing activation if they add
custom event handlers to non-button roots.

DetailsSkeleton and DetailsCellSkeleton default to decorative loading structure
through Skeleton slots. Expose loading state on the owning region when the
skeleton replaces meaningful content.

## Content Resilience Rules

Details rows must allow title, content, and note text to wrap. Do not truncate
labels, required values, error text, or state feedback. Keep short metadata in
Details; move long explanations to adjacent prose or Surface content.

Indentation is expressed through `--pds-details-indent` and must not force text
outside narrow containers or 200% zoom layouts.

## Styling Contract

The root classes are `pds-details` and `pds-details-cell`; slot classes use the
`pds-details-*` prefix. DetailsSkeleton composes Skeleton slots for loading
placeholders.

Current package CSS does not define custom Details state selectors. Preserve the
stable classes, `data-slot`, `data-variant`, `data-disabled`, polymorphic root
behavior, and skeleton composition so future styling can target the contract
without changing markup.

## Token Usage

Details uses inherited PDS typography, spacing, radius, disabled, and skeleton
motion tokens through its root, slots, and composed Skeleton children. Do not add
hard-coded colors, spacing, radii, or local component-specific token names.

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Details renders title, content, and optional note with selected variant. | `data-slot="details"`, `data-variant` | Semantics come from the chosen `use` element. |
| Hover | Pointer hover | No package hover selector currently applies to Details roots. | Not applicable | If rendered as a button, native or consumer styles may apply hover. |
| Focus-visible | Keyboard focus | No package focus-visible selector currently applies to Details roots. | Not applicable | If rendered as a button, keyboard focus remains on the native button. |
| Active | Pressed | No package pressed selector currently applies to Details roots. | Not applicable | If rendered as a button, activation is native button behavior. |
| Disabled | `disabled` / `aria-disabled` | Disabled roots expose stable disabled state for styling and tests. | `data-disabled="true"`, native `disabled`, `aria-disabled="true"` | Native button roots disable activation; non-button roots expose `aria-disabled`. |
| Loading | `loading` prop / `data-busy` | DetailsSkeleton and DetailsCellSkeleton render Skeleton placeholders. | `data-slot="details-skeleton"`, `data-slot="details-cell-skeleton"` | Expose loading on the owning region when skeletons replace content. |
| Error | `data-invalid` / error prop | Not applicable: Details has no invalid or error state. | Not applicable | Use adjacent validation or alert components for errors. |
| Success | status / success prop | Not applicable: Details has no success state. | Not applicable | Use Badge, RunStatus, or status text near Details for success. |

## State Behavior

- Details has no package-defined hover, pressed, or focus-visible treatment.
- Disabled button roots use native disabled behavior.
- Disabled non-button roots expose `aria-disabled="true"` and
  `data-disabled="true"`.
- Skeleton variants compose Skeleton and are visual placeholders only.
- `variant` changes row hierarchy but does not change semantics.

## Code Construction Rules

- Keep the root behavior aligned with Cell: polymorphic `use`, forwarded refs,
  native button disabled behavior, non-button `aria-disabled`, and default
  `type="button"`.
- Keep content structure in explicit slots instead of parsing children.
- Compose skeleton slots from Skeleton so loading placeholders inherit the
  shared skeleton contract.
- Preserve both compound slot access and named exports.

## Composition Examples

```tsx
import { Details, DetailsCell, DetailsSkeleton } from "@pds/react";

<Details>
  <Details.Title>Billing period</Details.Title>
  <Details.Content>Monthly</Details.Content>
  <Details.Note>Renews on the first day of each month.</Details.Note>
</Details>

<DetailsCell use="button">
  <DetailsCell.Title>Plan</DetailsCell.Title>
  <DetailsCell.Content>Team</DetailsCell.Content>
</DetailsCell>

<DetailsSkeleton />
```

## Known Limitations

- Details does not provide validation, success, sorting, routing, or disclosure
  state.
- Details does not style hover or focus-visible states today.
- DetailsSkeleton does not announce loading by itself.

## Do / Don't For Agents

Do:

- Preserve `data-slot`, `data-variant`, and `data-disabled`.
- Keep polymorphic disabled behavior aligned with the source implementation.
- Use Skeleton composition for loading placeholders.

Don't:

- Do not add interaction semantics to static Details rows.
- Do not hard-code Details-specific visual values.
- Do not use Details for complex forms or tabular data.

## Related Components

- [Cell](cell.md)
- [Skeleton](skeleton.md)
- [Item](item.md)

## Related Sources

- [Cell](cell.md)
- [Skeleton](skeleton.md)
- [PDS React README](../../../packages/react/README.md)
- [Details source](../../../packages/react/src/components/details.tsx)
