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

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Pagination renders nav list, previous/next controls, links, and ellipsis. | `data-slot='pagination-*'` | Use navigation semantics and accessible labels for previous and next. |
| Hover | Pointer hover | Pagination links use link or button hover treatment from composed elements. | `data-slot='pagination-link'` | Hover does not change current-page semantics. |
| Focus-visible | Keyboard focus | Pagination links use focus treatment from anchor or button composition. | `data-slot='pagination-link'`, `:focus-visible` on composed control | Keyboard focus remains on the active page control. |
| Active | Pressed | Current page uses accent fill; pressed controls use native activation behavior. | `data-current='true'`, native `:active` | Current page should expose current-page semantics. |
| Disabled | `disabled` / `aria-disabled` | Disabled previous or next is consumer-owned for custom composition. | Consumer `disabled` or `aria-disabled` | Consumer must prevent activation when using `aria-disabled`. |

Non-applicable states: Loading, Error, Success. Use child components or the surrounding region for those states when needed.

## State Behavior

Current links use accent fill. Disabled behavior is consumer-owned for custom
link/button composition.

## Composition Examples

```tsx
import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext } from "@pds/react";

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

- Component source: [packages/react/src/components/pagination.tsx](../../../packages/react/src/components/pagination.tsx)
