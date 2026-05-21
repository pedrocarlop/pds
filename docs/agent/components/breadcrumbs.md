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

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Breadcrumb navigation renders list, links, current page, separators, and ellipsis. | `data-slot='breadcrumbs-*'` | Use `nav` labeling and mark the current page with page semantics. |
| Hover | Pointer hover | Links use native or consumer link hover treatment. | `data-slot='breadcrumbs-link'` | Hover does not change current-page semantics. |
| Focus-visible | Keyboard focus | Links use browser or app focus treatment. | `data-slot='breadcrumbs-link'`, `:focus-visible` on links | Keyboard focus remains on the anchor. |
| Active | Pressed | Links use native activation behavior. | `data-slot='breadcrumbs-link'`, native `:active` | Navigation activation is owned by anchor or router link. |
| Disabled | `disabled` / `aria-disabled` | Not applicable: Breadcrumbs has no disabled state. | Not applicable | Do not render disabled breadcrumbs as links. |
| Loading | `loading` prop / `data-busy` | Not applicable: Breadcrumbs has no loading state. | Not applicable | Use placeholder text or Skeleton before rendering breadcrumbs. |
| Error | `data-invalid` / error prop | Not applicable: Breadcrumbs has no error state. | Not applicable | Routing errors belong to the page or alert region. |
| Success | status / success prop | Not applicable: Breadcrumbs has no success state. | Not applicable | Success feedback belongs outside navigation. |

## State Behavior

Breadcrumbs is static except for native link interaction.

## Composition Examples

```tsx
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList, BreadcrumbsPage } from "@pds/react";

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

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Breadcrumbs source](../../../packages/react/src/components/breadcrumbs.tsx)
