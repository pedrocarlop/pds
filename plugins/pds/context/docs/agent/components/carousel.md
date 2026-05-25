# Carousel

## Purpose

Carousel provides an Embla-backed carousel with PDS slots for the region,
viewport content, slides, previous/next controls, keyboard arrow handling, and
API exposure from `temp-ext-v4`.

![Carousel component preview](images/carousel.png)

## When To Use

- Use for a small set of peer cards, media, or status panels.
- Use `setApi` when a parent needs Embla control or status.
- Use vertical orientation only when the viewport height is intentionally fixed.

## When Not To Use

- Do not use for long lists; use a list, grid, or table.
- Do not hide required content exclusively inside off-screen slides.
- Do not use as a replacement for Tabs when content needs random access.

## Anatomy / Slots

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem />
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Public API

Exports include `Carousel`, `CarouselContent`, `CarouselItem`,
`CarouselPrevious`, `CarouselNext`, `useCarousel`, `CarouselApi`,
`CarouselOptions`, `CarouselPlugin`, and prop types for each part.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `carousel`, `carousel-content`, `carousel-item`, `carousel-previous`, `carousel-next` | Component |
| `data-orientation` | `horizontal`, `vertical` | Component |
| `aria-roledescription` | `carousel`, `slide` | Component |

## Accessibility Contract

The root renders as a named `region` when consumers provide `aria-label` or
`aria-labelledby`. Slides render as groups with `aria-roledescription="slide"`.
Controls have accessible previous/next labels and disabled state mirrors Embla
scroll availability.

## Content Resilience Rules

Slide content wraps within each `CarouselItem`. Do not place fixed-width cards
inside slides unless they are constrained by a responsive max width.

## Styling Contract

Classes use the `pds-carousel-*` prefix. CSS owns viewport overflow, horizontal
and vertical spacing, slide sizing, and control positioning.

## Token Usage

Uses spacing, focus, state, typography inherited from nested content, motion,
and Button tokens.

## State Contract

| State | Trigger | Visual treatment | Selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | Full-width viewport and slide track. | `.pds-carousel` | Root should be named. |
| Horizontal | `orientation="horizontal"` | Inline track and side controls. | `[data-orientation="horizontal"]` | ArrowLeft/ArrowRight scroll. |
| Vertical | `orientation="vertical"` | Block track and top/bottom controls. | `[data-orientation="vertical"]` | Ensure height is constrained. |
| Cannot scroll | Embla at edge | Control disabled. | `.pds-carousel-button:disabled` | Native disabled button. |
| Focus-visible | Keyboard focus | Shared PDS focus shadow through Button. | `.pds-carousel-button:focus-visible` | Controls remain tabbable when enabled. |

## State Behavior

`Carousel` initializes Embla, exposes `api` through context and `setApi`, tracks
`canScrollPrev`/`canScrollNext`, and handles ArrowLeft/ArrowRight on the root.

## Composition Examples

```tsx
import { Carousel, CarouselContent, CarouselItem } from "@pds/react";

<Carousel aria-label="Run summaries">
  <CarouselContent>
    <CarouselItem>Run 1</CarouselItem>
    <CarouselItem>Run 2</CarouselItem>
  </CarouselContent>
</Carousel>;
```

## Known Limitations

- Carousel does not provide pagination dots.
- Carousel does not virtualize slides.

## Do / Don't For Agents

Do:

- Provide an accessible region name.
- Keep slide count modest.

Don't:

- Do not put primary workflows only in hidden slides.

## Related Sources

- Component source: [packages/react/src/components/carousel.tsx](../../../packages/react/src/components/carousel.tsx)
