# Table

## Purpose

Table provides semantic tabular data primitives with PDS density and surface
styling.

## When To Use

- Use for row-and-column data where headers define cell meaning.
- Use `density="compact"` for dense operational tables.

## When Not To Use

- Do not use Table for key-value metadata; use DataList.
- Do not use for card grids or non-tabular layouts.

## Anatomy / Slots

```tsx
<TableContainer>
  <Table>
    <TableHeader />
    <TableBody />
  </Table>
</TableContainer>
```

## Public API

Exports include `TableContainer`, `Table`, `TableHeader`, `TableBody`,
`TableFooter`, `TableRow`, `TableHead`, `TableCell`, and `TableCaption`.
`Table` accepts `density="default" | "compact"`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `table-container`, `table`, `table-header`, `table-body`, `table-footer`, `table-row`, `table-head`, `table-cell`, `table-caption` | Component |
| `data-density` | `default`, `compact` | `Table` |

## Accessibility Contract

Components render native table elements. Consumers own meaningful captions,
header scope, sorting controls, and any ARIA annotations.

## Content Resilience Rules

Cells wrap by default. `TableContainer` provides horizontal overflow for narrow
viewports and zoom.

## Styling Contract

Classes use the `pds-table-*` prefix. CSS depends on density and native table
structure.

## Token Usage

Uses surface color, typography, spacing, radius, elevation, and state layer
tokens.

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Table renders container, semantic table sections, rows, cells, and caption at selected density. | `data-slot='table-*'`, `data-density` | Use native table semantics for tabular data. |
| Hover | Pointer hover | Rows apply a neutral hover layer to cells. | `.pds-table-row:hover .pds-table-cell` | Hover does not imply row selection. |
| Focus-visible | Keyboard focus | Not applicable by default: table rows are not focusable. | Not applicable | Focusable controls inside cells own focus treatment. |
| Active | Pressed | Not applicable: Table has no row activation state. | Not applicable | Clickable row behavior must be provided by controls or links. |
| Disabled | `disabled` / `aria-disabled` | Not applicable: Table has no disabled state. | Not applicable | Disabled state belongs to controls inside cells. |
| Loading | `loading` prop / `data-busy` | Not applicable: Table has no loading state. | Not applicable | Use Skeleton rows or busy state on the table region while data loads. |
| Error | `data-invalid` / error prop | Not applicable: Table has no error state. | Not applicable | Use InlineAlert or error rows outside the data table semantics. |
| Success | status / success prop | Not applicable: Table has no success state. | Not applicable | Use status cells, Badge, or RunStatus for row success. |

## State Behavior

Rows receive a neutral hover layer. Sorting, selection, and virtualization are
consumer-owned.

## Composition Examples

```tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@pds/react";

<TableContainer>
  <Table>
    <TableHeader><TableRow><TableHead>Status</TableHead></TableRow></TableHeader>
    <TableBody><TableRow><TableCell>Running</TableCell></TableRow></TableBody>
  </Table>
</TableContainer>
```

## Known Limitations

- Table does not provide sorting, selection, resizing, or virtualization.

## Do / Don't For Agents

Do:

- Preserve native table semantics.

Don't:

- Do not replace semantic headers with generic divs.

## Related Components

- [DataList](data-list.md)
- [Pagination](pagination.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Table source](../../../packages/react/src/components/table.tsx)
