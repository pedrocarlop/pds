# Details

## Purpose

Details renders compact label-value rows with optional supporting notes. DetailsCell
uses the same structure with grouped-cell row semantics.

## When To Use

- Use Details for label-value rows, fees, metadata, and short explanatory notes.
- Use DetailsCell when the same row belongs in a grouped cell layout.
- Use the skeleton variants while row content loads asynchronously.

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

## Code Construction Rules

- Keep the root behavior aligned with Cell: polymorphic `use`, forwarded refs,
  native button disabled behavior, non-button `aria-disabled`, and default
  `type="button"`.
- Keep content structure in explicit slots instead of parsing children.
- Compose skeleton slots from Skeleton so loading placeholders inherit the
  shared skeleton contract.
- Preserve both compound slot access and named exports.

## Related Sources

- [Cell](cell.md)
- [Skeleton](skeleton.md)
- [PDS React README](../../../packages/react/README.md)
- [Details source](../../../packages/react/src/components/details.tsx)
