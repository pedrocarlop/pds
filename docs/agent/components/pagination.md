# Pagination

## Purpose

Pagination provides navigation primitives for paged data sets.

## When To Use

- Use when content is split into discrete pages.
- Use `PaginationPrevious` and `PaginationNext` for adjacent movement.

## When Not To Use

- Do not use for hierarchy navigation; use Breadcrumbs.
- Do not use for client-side tabs or filters.

## Anatomy / Slots

```tsx
<Pagination>
  <PaginationList>
    <PaginationItem><PaginationLink isCurrent>1</PaginationLink></PaginationItem>
  </PaginationList>
</Pagination>
```

## Public API

Exports include `Pagination`, `PaginationList`, `PaginationItem`,
`PaginationLink`, `PaginationPrevious`, `PaginationNext`, and
`PaginationEllipsis`. `PaginationLink` accepts `asChild` and `isCurrent`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `pagination`, `pagination-list`, `pagination-item`, `pagination-link`, `pagination-previous`, `pagination-next`, `pagination-ellipsis` | Component |
| `data-current` | `true` when current | `PaginationLink` |

## Accessibility Contract

`Pagination` renders `nav` with `aria-label="Pagination"` by default.
`isCurrent` maps to `aria-current="page"`. Consumers own hrefs, disabled
behavior, and total-page announcements.

## Content Resilience Rules

Pagination wraps when constrained. Keep labels short, but do not remove
accessible text from previous and next links.

## Styling Contract

Classes use the `pds-pagination-*` prefix. CSS depends on current state, link
hover/focus, and list wrapping.

## Token Usage

Uses typography, spacing, radius, color, focus, and state layer tokens.

## State Behavior

Current links use accent fill. Disabled behavior is consumer-owned for custom
link/button composition.

## Composition Examples

```tsx
import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext } from "pds";

<Pagination>
  <PaginationList>
    <PaginationItem><PaginationLink href="?page=1" isCurrent>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="?page=2" /></PaginationItem>
  </PaginationList>
</Pagination>
```

## Known Limitations

- Pagination does not generate page ranges.

## Do / Don't For Agents

Do:

- Preserve current-page ARIA state.

Don't:

- Do not use Pagination for infinite scroll status.

## Related Components

- [Table](table.md)
- [Breadcrumbs](breadcrumbs.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Pagination source](../../../packages/react/src/components/pagination.tsx)
