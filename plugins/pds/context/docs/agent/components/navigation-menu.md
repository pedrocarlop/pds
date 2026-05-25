# NavigationMenu

## Purpose

NavigationMenu provides a Radix-backed top-level navigation menu with triggers,
content panels, links, indicator, and viewport support from `temp-ext-v4`.

![NavigationMenu component preview](images/navigation-menu.png)

## When To Use

- Use for top-level product navigation that reveals grouped links or panels.
- Use `NavigationMenuLink` for navigational links inside menu content.
- Use `viewport={false}` when content should render as a local popover instead
  of the shared viewport.

## When Not To Use

- Do not use for command execution; use Command, Menu, or DropdownMenu.
- Do not use for in-page peer tabs; use Tabs.
- Do not use for breadcrumb hierarchy; use Breadcrumb or Breadcrumbs.

## Anatomy / Slots

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger />
      <NavigationMenuContent>
        <NavigationMenuLink />
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuIndicator />
</NavigationMenu>
```

## Public API

Exports include `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`,
`NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`,
`NavigationMenuIndicator`, `NavigationMenuViewport`,
`navigationMenuTriggerStyle`, and prop types for exported parts.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `viewport` on `NavigationMenu` | boolean | `true` | Renders the shared Radix viewport. |
| `value`, `defaultValue`, `onValueChange` | Radix values | Radix defaults | Control the open item. |
| `active` on `NavigationMenuLink` | boolean | Radix default | Marks the current navigation link. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `navigation-menu`, `navigation-menu-list`, `navigation-menu-item`, `navigation-menu-trigger`, `navigation-menu-content`, `navigation-menu-link`, `navigation-menu-indicator`, `navigation-menu-viewport`, `navigation-menu-viewport-positioner` | Component |
| `data-viewport` | `true`, `false` | Component |
| `data-state`, `data-motion`, `data-orientation`, `data-active`, `data-disabled` | Radix values | Radix |

## Accessibility Contract

Radix owns roving focus, trigger/content association, keyboard navigation,
indicator/viewport state, orientation metadata, and open/closed state. Consumers
must provide meaningful trigger labels and real link destinations.

## Content Resilience Rules

Navigation links and content wrap long translated labels. Keep top-level
triggers short enough to scan. Use grouped panel content for dense navigation
sets instead of cramming long descriptions into triggers.

## Styling Contract

Classes use the `pds-navigation-menu-*` prefix. CSS owns trigger states,
viewport and local-popover surfaces, link hover/active states, indicator arrow,
motion, focus, and disabled opacity. Preserve Radix state attributes and the
`data-viewport` branch.

## Token Usage

Uses popover surface color, typography, spacing, radius, elevation, state layer,
disabled opacity, focus, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Horizontal trigger list with optional viewport. | `data-slot='navigation-menu-*'` | Radix owns navigation menu semantics. |
| Hover/highlighted | Pointer hover or Radix highlight | Trigger/link receives shared hover layer. | `:hover`, `data-highlighted` | Highlight follows Radix focus model. |
| Open | Trigger item open | Trigger uses hover layer; icon rotates; content/viewport renders. | `data-state='open'`, `data-popup-open` | Trigger controls associated content. |
| Active link | `active` on link | Link uses shared hover/selected treatment. | `data-active` | Use for current route. |
| Focus-visible | Keyboard focus | Shared PDS focus shadow. | `:focus-visible` | Keyboard focus remains on trigger/link. |
| Disabled | Radix disabled state | Disabled opacity and no activation. | `data-disabled`, `disabled` | Radix suppresses interaction. |

Non-applicable states: Loading, Error, Success. Use surrounding feedback or
content inside panels for those states.

## State Behavior

`NavigationMenu` controls whether a shared `NavigationMenuViewport` is rendered.
`NavigationMenuTrigger` appends a Material Symbols disclosure icon.
`navigationMenuTriggerStyle()` returns the PDS trigger class for compatibility
with upstream composition.

## Composition Examples

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@pds/react";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="workspace">
      <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/runs">Runs dashboard</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>;
```

## Known Limitations

- NavigationMenu does not own app routing.
- NavigationMenu does not virtualize large navigation panels.

## Do / Don't For Agents

Do:

- Keep top-level trigger labels short.
- Use `NavigationMenuLink active` for the current route.

Don't:

- Do not hard-code navigation surface colors or spacing outside `components.css`.

## Related Components

- [Breadcrumb](breadcrumb.md)
- [Breadcrumbs](breadcrumbs.md)
- [Menu](menu.md)
- [Tabs](tabs.md)

## Related Sources

- Component source: [packages/react/src/components/navigation-menu.tsx](../../../packages/react/src/components/navigation-menu.tsx)
