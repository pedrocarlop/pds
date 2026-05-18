# Tabs

## Purpose

Tabs provides same-page view switching backed by Radix Tabs. `TabsList` can use
line or segmented visual treatment.

## When To Use

- Use for peer views within one surface.
- Use `variant="segmented"` for compact mode controls.

## When Not To Use

- Do not use for page navigation; use app routing or Breadcrumbs.
- Do not hide required form content behind tabs unless the product flow handles
  validation clearly.

## Anatomy / Slots

```tsx
<Tabs defaultValue="activity">
  <TabsList>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="activity">Runs</TabsContent>
</Tabs>
```

## Public API

| Export | Notes |
| --- | --- |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Styled Radix slots. |

`TabsList` accepts `variant="line" | "segmented"`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `tabs`, `tabs-list`, `tabs-trigger`, `tabs-content` | Component |
| `data-variant` | `line`, `segmented` | `TabsList` |
| `data-state` | `active`, `inactive` | Radix |

## Accessibility Contract

Radix owns tablist/tab/tabpanel semantics, roving focus, and keyboard behavior.
Consumers must keep tab labels meaningful.

## Content Resilience Rules

Tab labels wrap and the list scrolls horizontally when constrained. Content
panels remain boundless by default.

## Styling Contract

Classes use the `pds-tabs-*` prefix. CSS depends on list variant, active state,
hover, focus-visible, and disabled selectors.

## Token Usage

Uses color, spacing, radius, typography, focus, state layer, segmented surface,
and motion tokens.

## State Behavior

Active triggers use selected state treatment. Segmented lists use segmented
surface and active tokens.

## Composition Examples

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pds/react";

<Tabs defaultValue="runs">
  <TabsList variant="segmented">
    <TabsTrigger value="runs">Runs</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="runs">Recent runs</TabsContent>
  <TabsContent value="settings">Automation settings</TabsContent>
</Tabs>
```

## Known Limitations

- Tabs does not provide animated panel transitions.

## Do / Don't For Agents

Do:

- Keep tabs for local peer views.

Don't:

- Do not use tabs for route breadcrumbs or unrelated destinations.

## Related Components

- [Select](select.md)
- [Breadcrumbs](breadcrumbs.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Tabs source](../../../packages/react/src/components/tabs.tsx)
