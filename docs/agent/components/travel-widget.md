# TravelWidget

## Purpose

TravelWidget is an image-led summary card for travel, booking, and commerce
results. It presents a visual area, primary title, supporting details,
description text, custom content rows, and one overlay action while preserving a
single primary card control.

## Landing Requirement

TravelWidget lands with component source, component CSS, this docs file, example
usage in `examples/react`, tests, stable `data-slot` / `data-*` attributes,
content-resilience notes, and keyboard/focus behavior for the primary control
and internal carousel controls.

## When To Use

- Use for hotel, trip, listing, booking, offer, or commerce result summaries.
- Use `variant="large"` for image-led cards where comparison happens one card at
  a time.
- Use `variant="small"` for denser lists that still need a thumbnail, title, and
  price or reward content.
- Pass multiple image URLs when users should browse a short image carousel.

## When Not To Use

- Do not use for simple rows; use [Item](item.md).
- Do not use for generic grouped panels; use [Surface](surface.md).
- Do not put essential status, price, rating, or availability only in the image.
- Do not use the default button control when custom content contains nested
  buttons or links; set `use="div"` and make child controls explicit.

## Anatomy / Slots

```tsx
<TravelWidget>
  <TravelWidget.Action />
  <TravelWidget.Title />
  <TravelWidget.Details />
  <TravelWidget.Description />
  <TravelWidget.Content />
</TravelWidget>
```

Named exports are also available as `TravelWidgetAction`,
`TravelWidgetTitle`, `TravelWidgetDetails`, `TravelWidgetDescription`, and
`TravelWidgetContent`.

`TravelWidgetSkeleton` mirrors the same visual layout and exposes
`TravelWidgetSkeleton.Title`, `Details`, `Description`, and `Content`.

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `large`, `small` | `large` | Controls image and content layout. |
| `image` | `string`, `string[]` |  | One image URL or a short carousel. Images are decorative backgrounds. |
| `use` | React element type | `button` | Renders the primary summary control. |
| `disabled` | `boolean` | `false` | Native disabled on button controls; `aria-disabled` elsewhere. |
| `type` | native button type | `button` | Applied only when `use="button"`. |

The root forwards refs to the outer widget wrapper. Native interaction
attributes such as `onClick`, `aria-label`, and `aria-labelledby` are applied to
the primary control.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `travel-widget` | Root wrapper |
| `data-slot` | `travel-widget-control`, `travel-widget-media`, `travel-widget-body`, `travel-widget-title`, `travel-widget-details`, `travel-widget-description`, `travel-widget-content`, `travel-widget-action` | Component |
| `data-slot` | `travel-widget-carousel`, `travel-widget-carousel-button`, `travel-widget-carousel-status` | Component |
| `data-slot` | `travel-widget-skeleton`, `travel-widget-skeleton-media`, `travel-widget-skeleton-body`, `travel-widget-skeleton-title`, `travel-widget-skeleton-details`, `travel-widget-skeleton-description`, `travel-widget-skeleton-content`, `travel-widget-skeleton-content-line`, `travel-widget-skeleton-content-value` | Skeleton |
| `data-variant` | `large`, `small` | Root and skeleton |
| `data-image` | `true`, `false` | Root |
| `data-disabled` | `true` when disabled | Root |
| `data-carousel` | `true` when multiple images are provided | Media |

## Accessibility Contract

TravelWidget renders a neutral wrapper and a primary control inside it. The
default primary control is a `button`, labelled by `TravelWidget.Title` unless
the consumer provides `aria-label` or `aria-labelledby`.

`TravelWidget.Action` is rendered as a sibling overlay, not inside the primary
control, so icon-only action buttons keep their own accessible names. Carousel
controls are real buttons in the media layer and expose previous/next labels
plus a status label for the current image position.

Images are decorative CSS backgrounds. Consumers must include the listing name,
price, rating, availability, and status in text slots.

## Content Resilience Rules

TravelWidget fills the available container width. Title, details, description,
content, and action slots wrap by default. The small variant stacks to one
column at the compact breakpoint so side-by-side content does not crush the
primary title at narrow widths or high zoom.

Use content slots for long translated labels and user-generated listing names.
Do not truncate primary titles, price, status, or required action labels.

## Styling Contract

The root class is `pds-travel-widget`; slot classes use the
`pds-travel-widget-*` prefix. Styling lives in
`packages/react/src/components.css`.

Preserve the wrapper/control split: the wrapper owns surface, image, action, and
carousel layout, while the inner control owns the primary click/focus target.
Preserve `data-variant`, `data-image`, and the slot selectors because previews,
tests, and agent-authored compositions rely on them.

## Token Usage

TravelWidget uses PDS surface color, overlay color, state layers, focus shadow,
spacing, radius, elevation, typography, disabled opacity, and motion tokens.
Do not hard-code upstream color, spacing, radius, typography, or shadow values.

## State Behavior

- Hover and pressed state apply to the widget surface when the primary control
  is interactive and not disabled.
- Focus-visible on the primary control applies the shared focus shadow to the
  widget wrapper.
- `disabled` disables the primary button control or maps to `aria-disabled` for
  non-button controls.
- Carousel previous/next controls update local image position only.
- Skeleton variants are visual only and default to `aria-hidden="true"`.

## Composition Examples

```tsx
import { Button, Icon, TravelWidget } from "@pds/react";

<TravelWidget image="/hotel.jpg" onClick={() => openListing()}>
  <TravelWidget.Action>
    <Button aria-label="Save hotel" intent="secondary" size="icon">
      <Icon name="favorite" />
    </Button>
  </TravelWidget.Action>
  <TravelWidget.Title>Omni Hilton Hotel</TravelWidget.Title>
  <TravelWidget.Details>Hotel rental - Rating 4.5</TravelWidget.Details>
  <TravelWidget.Content>GBP 1,480 - Free cancellation</TravelWidget.Content>
</TravelWidget>;
```

## Known Limitations

- TravelWidget does not fetch images, pre-load media, or own routing.
- TravelWidget does not provide image alternative text because media is
  decorative; essential details belong in text slots.
- TravelWidget does not virtualize lists of cards.

## Do / Don't For Agents

Do:

- Keep status, rating, price, and availability in text.
- Use PDS Button, Badge, Details, Icon, and other public primitives inside slots.
- Preserve the action overlay as a sibling of the primary control.

Don't:

- Do not hard-code upstream design-system colors or imported fixture helpers.
- Do not nest icon-only controls inside the default button control.
- Do not add product-specific booking, payment, or favorite state APIs.

## Related Components

- [Item](item.md)
- [Details](details.md)
- [Badge](badge.md)
- [Button](button.md)
- [Surface](surface.md)
- [Skeleton](skeleton.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- Component source: `packages/react/src/components/travel-widget.tsx`
