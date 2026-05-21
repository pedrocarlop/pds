# PageHeader

## Purpose

PageHeader provides the page-level heading region for product screens. It owns
the responsive arrangement of breadcrumbs, title, description, metadata, and
page actions without owning routing, tabs, or page shell layout.

## Landing Requirement

Before PageHeader lands, the change must include component source, component
CSS, this docs file, example usage in `examples/react`, tests, stable
`data-slot` attributes, content-resilience notes, and keyboard/focus behavior
for any interactive children.

## When To Use

- Use at the top of product pages, settings pages, collection pages, detail
  pages, and task pages that need a durable page identity.
- Use `PageHeaderActions` for page-level actions such as save, create, invite,
  export, or refresh.
- Use `PageHeaderMeta` for status badges, ownership metadata, timestamps, or
  compact page state.
- Use `PageHeaderBreadcrumbs` when the page sits inside a deeper route
  hierarchy.

## When Not To Use

- Do not use PageHeader inside small cards or repeated modules; use Surface
  slots instead.
- Do not use PageHeader as the global app shell or navigation container.
- Do not put form-field labels, row titles, or list item headings in
  PageHeaderTitle.
- Do not use PageHeaderActions for row-level or card-level actions.

## Anatomy / Slots

```tsx
<PageHeader>
  <PageHeaderBreadcrumbs />
  <PageHeaderContent>
    <PageHeaderText>
      <PageHeaderTitle />
      <PageHeaderDescription />
      <PageHeaderMeta />
    </PageHeaderText>
    <PageHeaderActions />
  </PageHeaderContent>
</PageHeader>
```

`PageHeaderBreadcrumbs`, `PageHeaderDescription`, `PageHeaderMeta`, and
`PageHeaderActions` are optional. `PageHeaderTitle` renders an `h1` by default.

## Public API

| Export | Notes |
| --- | --- |
| `PageHeader` | Root semantic `header`; accepts native header attributes. |
| `PageHeaderBreadcrumbs` | Optional wrapper for `Breadcrumbs`, back links, or route context. |
| `PageHeaderContent` | Main layout row containing text and optional actions. |
| `PageHeaderText` | Text stack containing title, description, and metadata. |
| `PageHeaderTitle` | Page title slot; renders `h1`. |
| `PageHeaderDescription` | Supporting copy slot; renders `p`. |
| `PageHeaderMeta` | Compact metadata/status row. |
| `PageHeaderActions` | Page-level action row. |

All exports forward refs, preserve `className`, and pass native attributes to
their rendered element.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `page-header` | `PageHeader` |
| `data-slot` | `page-header-breadcrumbs` | `PageHeaderBreadcrumbs` |
| `data-slot` | `page-header-content` | `PageHeaderContent` |
| `data-slot` | `page-header-text` | `PageHeaderText` |
| `data-slot` | `page-header-title` | `PageHeaderTitle` |
| `data-slot` | `page-header-description` | `PageHeaderDescription` |
| `data-slot` | `page-header-meta` | `PageHeaderMeta` |
| `data-slot` | `page-header-actions` | `PageHeaderActions` |

## Accessibility Contract

PageHeader renders a semantic `header` and PageHeaderTitle renders an `h1`.
Consumers own page landmarks when more than one header exists on a screen.
Interactive children inside breadcrumbs or actions must provide their own
accessible names, keyboard behavior, disabled behavior, and focus treatment.

Use only one page-level `h1` per composed page unless the host application has a
document outline reason to do otherwise. Metadata and badges must use readable
text; color alone is not enough for page state.

## Content Resilience Rules

The title, description, breadcrumbs, metadata, and actions wrap by default.
Titles and descriptions keep a readable max measure through
`--pds-layout-reading-max`. Actions wrap below the title stack on compact
viewports and remain visible at 200% zoom.

Do not truncate page titles, required state, or primary action labels in the
header. If a page title is generated or user-authored, allow wrapping before
adding product-owned abbreviation rules.

## Styling Contract

The root class is `pds-page-header`; slot classes use the
`pds-page-header-*` prefix. Styling lives in
`packages/react/src/components.css`.

CSS depends on the slot classes and the compact breakpoint media rule. Preserve
the content/actions grid behavior so page actions can align to the right on
wide screens and wrap below the title on compact screens.

## Token Usage

PageHeader uses PDS typography, color, spacing, and layout tokens. It does not
own surface color, radius, elevation, or motion because it is an unframed page
region.

## State Matrix

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Header lays out breadcrumbs, text, metadata, and actions with tokenized spacing and type. | `data-slot='page-header'` and child slots | Root is semantic `header`; title is `h1`. |
| Hover | Pointer hover | Not applicable on root. | Not applicable | Interactive children own hover behavior. |
| Focus-visible | Keyboard focus | Not applicable on root. | Not applicable | Buttons, links, and menus inside actions own focus behavior. |
| Active | Pressed | Not applicable on root. | Not applicable | Activation belongs to child controls. |
| Disabled | `disabled` / `aria-disabled` | Not applicable on root. | Not applicable | Disable child controls individually. |
| Loading | `loading` prop / `data-busy` | Not applicable on root. | Not applicable | Use child status, Skeleton, Progress, or busy action text. |
| Error | `data-invalid` / error prop | Not applicable on root. | Not applicable | Use InlineAlert or visible metadata for page errors. |
| Success | status / success prop | Not applicable on root. | Not applicable | Use Badge, RunStatus, Toast, or inline confirmation as appropriate. |

## State Behavior

PageHeader has no internal state. It reads no ARIA, Radix, or native state
attributes beyond the semantics of its rendered elements. Interactive behavior
belongs to composed children.

## Composition Examples

```tsx
import {
  Badge,
  Button,
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderText,
  PageHeaderTitle
} from "@pds/react";

<PageHeader>
  <PageHeaderContent>
    <PageHeaderText>
      <PageHeaderTitle>Settings</PageHeaderTitle>
      <PageHeaderDescription>
        Manage workspace defaults, account access, and system behavior.
      </PageHeaderDescription>
      <PageHeaderMeta>
        <Badge>6 sections</Badge>
      </PageHeaderMeta>
    </PageHeaderText>
    <PageHeaderActions>
      <Button intent="secondary">Export</Button>
      <Button>Save changes</Button>
    </PageHeaderActions>
  </PageHeaderContent>
</PageHeader>
```

## Known Limitations

- PageHeader does not create an app shell, global navigation, or route behavior.
- PageHeader does not manage sticky headers or scroll affordances.
- PageHeader does not enforce a single primary action.
- PageHeader does not provide tab switching; compose Tabs below the header when
  needed.

## Do / Don't For Agents

Do:

- Preserve `data-slot` values and semantic `header` / `h1` defaults.
- Keep page-level actions in `PageHeaderActions`.
- Let text and actions wrap before adding product-owned truncation.
- Use existing `Breadcrumbs`, `Badge`, `RunStatus`, and `Button` children.

Don't:

- Do not frame PageHeader as a card or nested Surface.
- Do not use PageHeader for module titles inside cards.
- Do not hide required state or primary actions in icon-only controls without
  accessible names.

## Related Components

- [Breadcrumbs](breadcrumbs.md)
- [Button](button.md)
- [Badge](badge.md)
- [Surface](surface.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [Layout types](../../foundations/layout-types.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- Component source: `packages/react/src/components/page-header.tsx`
