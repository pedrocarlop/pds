# DataList

## Purpose

DataList provides semantic key-value metadata layouts using native description
list elements.

## When To Use

- Use for entity details, run metadata, or settings summaries.
- Use when each value is explained by a term.

## When Not To Use

- Do not use for true row-and-column comparisons; use Table.
- Do not use for navigation lists.

## Anatomy / Slots

```tsx
<DataList>
  <DataListItem>
    <DataListTerm />
    <DataListDescription />
  </DataListItem>
</DataList>
```

## Public API

Exports include `DataList`, `DataListItem`, `DataListTerm`, and
`DataListDescription`. `DataList` accepts `density="default" | "compact"`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `data-list`, `data-list-item`, `data-list-term`, `data-list-description` | Component |
| `data-density` | `default`, `compact` | `DataList` |

## Accessibility Contract

DataList renders a native `dl` with `dt` and `dd` slots. Consumers must preserve
the term/description relationship.

## Content Resilience Rules

Terms and descriptions wrap. On narrow screens the item grid stacks into one
column.

## Styling Contract

Classes use the `pds-data-list-*` prefix. CSS depends on density and item grid
layout.

## Token Usage

Uses surface color, typography, spacing, radius, and content resilience tokens.

## State Behavior

DataList is static and owns no interactive state.

## Composition Examples

```tsx
import { DataList, DataListDescription, DataListItem, DataListTerm } from "@pds/react";

<DataList>
  <DataListItem>
    <DataListTerm>Run ID</DataListTerm>
    <DataListDescription>run_123</DataListDescription>
  </DataListItem>
</DataList>
```

## Known Limitations

- DataList does not include copy actions or inline editing.

## Do / Don't For Agents

Do:

- Keep `dt` and `dd` semantics intact.

Don't:

- Do not use DataList as a generic grid.

## Related Components

- [Table](table.md)
- [Surface](surface.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [DataList source](../../../packages/react/src/components/data-list.tsx)
