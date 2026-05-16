# Breadcrumbs

## Purpose

Breadcrumbs provides semantic hierarchy navigation for the current location.

## When To Use

- Use for nested inspectable resources and drill-down pages.
- Use `BreadcrumbsPage` for the current page.

## When Not To Use

- Do not use for peer view switching; use Tabs.
- Do not use for pagination.

## Anatomy / Slots

```tsx
<Breadcrumbs>
  <BreadcrumbsList>
    <BreadcrumbsItem><BreadcrumbsLink href="/">Runs</BreadcrumbsLink></BreadcrumbsItem>
    <BreadcrumbsItem><BreadcrumbsPage>Current run</BreadcrumbsPage></BreadcrumbsItem>
  </BreadcrumbsList>
</Breadcrumbs>
```

## Public API

Exports include `Breadcrumbs`, `BreadcrumbsList`, `BreadcrumbsItem`,
`BreadcrumbsLink`, `BreadcrumbsPage`, `BreadcrumbsSeparator`, and
`BreadcrumbsEllipsis`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `breadcrumbs`, `breadcrumbs-list`, `breadcrumbs-item`, `breadcrumbs-link`, `breadcrumbs-page`, `breadcrumbs-separator`, `breadcrumbs-ellipsis` | Component |

## Accessibility Contract

`Breadcrumbs` renders `nav` with `aria-label="Breadcrumb"` by default.
`BreadcrumbsPage` sets `aria-current="page"`. Consumers own link hrefs and
custom separator placement.

## Content Resilience Rules

Items wrap by default. Use ellipsis only when intermediate hierarchy is available
elsewhere.

## Styling Contract

Classes use the `pds-breadcrumbs-*` prefix. CSS depends on link hover, current
page, separator, and wrapping list layout.

## Token Usage

Uses typography, spacing, color, radius, and focus tokens.

## State Behavior

Breadcrumbs is static except for native link interaction.

## Composition Examples

```tsx
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList, BreadcrumbsPage } from "pds";

<Breadcrumbs>
  <BreadcrumbsList>
    <BreadcrumbsItem><BreadcrumbsLink href="/runs">Runs</BreadcrumbsLink></BreadcrumbsItem>
    <BreadcrumbsItem><BreadcrumbsPage>Run 123</BreadcrumbsPage></BreadcrumbsItem>
  </BreadcrumbsList>
</Breadcrumbs>
```

## Known Limitations

- Breadcrumbs does not insert separators automatically.

## Do / Don't For Agents

Do:

- Preserve `aria-current` on the current page.

Don't:

- Do not use Breadcrumbs for in-page tabs.

## Related Components

- [Tabs](tabs.md)
- [Pagination](pagination.md)

## Related Sources

- [DESIGN.md](../../../../DESIGN.md)
- [PDS React README](../../README.md)
- [components.css](../../src/components.css)
- [Breadcrumbs source](../../src/components/breadcrumbs.tsx)
