# NavigationMenu

## Purpose

NavigationMenu provides top-level navigation and flyout content backed by Radix
Navigation Menu.

## When To Use

- Use for product navigation with top-level links and optional rich flyouts.

## When Not To Use

- Do not use for command menus; use Menubar or Menu.
- Do not use for local view switching; use Tabs.

## Anatomy / Slots

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger />
      <NavigationMenuContent />
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>
```

## Public API

Exports include `NavigationMenu`, `NavigationMenuSub`, `NavigationMenuList`,
`NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuLink`,
`NavigationMenuIndicator`, `NavigationMenuContent`, and
`NavigationMenuViewport`.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `value`, `defaultValue`, `onValueChange` | Radix values | Radix default | Controls active flyout. |
| `active` | boolean on link | `false` | Marks current navigation link. |
| `orientation`, `delayDuration`, `skipDelayDuration` | Radix props | Radix default | Preserve Radix behavior. |

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `navigation-menu`, `navigation-menu-sub`, `navigation-menu-list`, `navigation-menu-item`, `navigation-menu-trigger`, `navigation-menu-link`, `navigation-menu-indicator`, `navigation-menu-content`, `navigation-menu-viewport` | Component |
| `data-state`, `data-active`, `data-motion` | Radix values | Radix |

## Accessibility Contract

Radix owns nav structure, trigger relationships, keyboard navigation, active
content, and viewport sizing. Consumers must use links for actual navigation.

## Content Resilience Rules

Links and triggers wrap. Viewport is constrained to readable layout tokens and
compact viewport width.

## Styling Contract

Classes use the `pds-navigation-menu-*` prefix. CSS owns root/list layout,
trigger/link states, content surface, indicator, and viewport.

## Token Usage

Uses layout, color, spacing, radius, elevation, typography, state layer, focus,
disabled opacity, and motion tokens.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Navigation items render as wrapped pill controls. | `.pds-navigation-menu-*` | Root renders native navigation. |
| Active | Active link or open trigger | Link or trigger uses selected state layer. | `data-active`, `data-state='open'` | Current location should be represented by active links. |
| Focus-visible | Keyboard focus | Trigger and link use shared PDS focus shadow. | `:focus-visible` | Radix owns keyboard navigation. |
| Disabled | Disabled trigger | Disabled opacity. | `:disabled` | Disabled navigation should be rare. |

Non-applicable states: Loading, Error, Success. Use content children or page
state for those.

## State Behavior

Flyout state, motion attributes, and viewport dimensions are Radix-owned.

## Composition Examples

```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuTrigger } from "@pds/react";
```

## Known Limitations

- NavigationMenu does not provide routing integration.

## Do / Don't For Agents

Do:

- Use `NavigationMenuLink` for actual route changes.

Don't:

- Do not use NavigationMenu for command palettes or destructive actions.

## Related Components

- [Tabs](tabs.md)
- [Menubar](menubar.md)

## Related Sources

- Component source: [packages/react/src/components/navigation-menu.tsx](../../../packages/react/src/components/navigation-menu.tsx)
