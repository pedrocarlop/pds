# Breadcrumb

## Purpose

Breadcrumb provides the singular `temp-ext-v4` breadcrumb API for semantic
hierarchy navigation while preserving the same PDS behavior as Breadcrumbs.

![Breadcrumb component preview](images/breadcrumb.png)

## When To Use

- Use when imported code expects `Breadcrumb*` export names.
- Use for nested inspectable resources and drill-down pages.
- Use `BreadcrumbPage` for the current page.

## When Not To Use

- Do not use for peer view switching; use Tabs.
- Do not use for pagination.
- Prefer existing `Breadcrumbs*` exports in new PDS-native code unless
  compatibility with `temp-ext-v4` source matters.

## Anatomy / Slots

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/runs">Runs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Run 123</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Public API

Exports include `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, and
`BreadcrumbEllipsis`, plus prop types for each exported part.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `aria-label` on `Breadcrumb` | string | `Breadcrumb` | Labels the navigation landmark. |
| `asChild` on `BreadcrumbLink` | boolean | `false` | Composes a router link through Radix Slot. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `breadcrumb`, `breadcrumb-list`, `breadcrumb-item`, `breadcrumb-link`, `breadcrumb-page`, `breadcrumb-separator`, `breadcrumb-ellipsis` | Component |

## Accessibility Contract

`Breadcrumb` renders `nav` with a default `aria-label`. `BreadcrumbPage` sets
`aria-current="page"`. Separators are hidden from assistive tech. Consumers own
link destinations and router behavior.

## Content Resilience Rules

Breadcrumb labels wrap by default and keep the current page available in narrow
containers. Use ellipsis only when omitted hierarchy is still recoverable
elsewhere.

## Styling Contract

Classes use the `pds-breadcrumb-*` prefix. CSS intentionally mirrors the
existing `pds-breadcrumbs-*` treatment so singular and plural APIs stay visually
aligned.

## Token Usage

Uses typography, spacing, color, radius, focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Breadcrumb navigation renders list, links, current page, separators, and ellipsis. | `data-slot='breadcrumb-*'` | Use nav labeling and mark the current page. |
| Hover | Pointer hover | Links use the shared text hover treatment. | `.pds-breadcrumb-link:hover` | Hover does not change current-page semantics. |
| Focus-visible | Keyboard focus | Links use the shared PDS focus shadow. | `.pds-breadcrumb-link:focus-visible` | Keyboard focus remains on the anchor. |
| Current page | `BreadcrumbPage` | Foreground emphasis and `aria-current`. | `data-slot='breadcrumb-page'` | Announces the current page. |

Non-applicable states: Disabled, Loading, Error, Success. Use child components
or the surrounding region for those states.

## State Behavior

Breadcrumb is static except for native link interaction and optional Slot-based
router link composition.

## Composition Examples

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from "@pds/react";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/runs">Runs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbPage>Run 123</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

## Known Limitations

- Breadcrumb does not insert separators automatically.
- Breadcrumb is a compatibility API beside the older `Breadcrumbs*` API.

## Do / Don't For Agents

Do:

- Preserve `aria-current` on the current page.
- Use `asChild` for router links instead of nesting anchors.

Don't:

- Do not use Breadcrumb for in-page tabs.

## Related Components

- [Breadcrumbs](breadcrumbs.md)
- [NavigationMenu](navigation-menu.md)
- [Pagination](pagination.md)
- [Tabs](tabs.md)

## Related Sources

- Component source: [packages/react/src/components/breadcrumb.tsx](../../../packages/react/src/components/breadcrumb.tsx)
