# PDS Colour Guidelines

This file is for LLMs and contributors applying PDS colours in product UI.
Choose tokens by usage, not by hue.

Sources: [DESIGN.md](../../DESIGN.md) and
[packages/tokens/src/colour.css](../../packages/tokens/src/colour.css).

## Core Rules

- Use `--pds-color-foreground` for primary readable text.
- Use `--pds-color-grey-tone-50` for secondary text, descriptions, helper text, metadata, subtitles, timestamps, and supporting copy.
- Use `--pds-color-grey-tone-20` for secondary icons, chevrons, disclosure indicators, and low-emphasis utility icons.
- Use `--pds-color-accent` for primary actions, links, active states, highlighted actions, and focus emphasis.
- Use `--pds-color-on-accent` only for text or icons placed directly on `--pds-color-accent`.
- Use `--pds-color-accent-neutral` when emphasis is needed without brand colour.
- Use `--pds-color-on-accent-neutral` only for text or icons placed directly on `--pds-color-accent-neutral`.
- Use `--pds-color-action-background` for secondary action surfaces tied to the accent colour.
- Use `--pds-color-action-background-neutral` for monochrome secondary actions and low-emphasis neutral actions.
- Do not invent ad hoc hex, rgb, hsl, or named colours inside components,
  examples, product UI, inline SVGs, data URI assets, or local CSS. Add or use a
  PDS token instead.

## Surface Rules

- Use `--pds-color-base-grouped-background` for the root app or page background.
- Use `--pds-color-base-widget-background` for cards, widgets, modules, and primary grouped components placed on grouped backgrounds.
- Use `--pds-color-base-nested-background` for internal grouped content inside widgets or grouped containers.
- Use `--pds-color-base-popover-background` for menus, dropdowns, contextual overlays, and popovers.
- Use `--pds-color-base-search-background` for search fields and search containers.
- Use `--pds-color-base-segmented-background` for segmented control containers.
- Use `--pds-color-segmented-active` for the selected segment or tab inside segmented controls.
- Use elevated surface tokens only when a surface needs additional hierarchy, visual separation, or overlay depth.

## Overlays And States

- Use `--pds-color-grey-tone-2` for ultra-subtle overlays and minimal non-interactive layering.
- Use `--pds-color-grey-tone-5` for light overlays and quiet disabled surfaces.
- Use `--pds-color-grey-tone-8` for stronger neutral layering. Use it for separator fallback only when a physical stroke is truly necessary.
- Use `--pds-color-grey-tone-10` for stronger neutral layering and interaction emphasis.
- Use `--pds-color-grey-tone-20` for inactive states, disabled surfaces, and stronger muted overlays.
- Use `--pds-color-state-layer-hover` for neutral hover feedback on interactive controls and rows.
- Use `--pds-color-state-layer-pressed` for neutral pressed feedback.
- Use `--pds-color-state-layer-selected` for selected tabs, segments, rows, list options, and similar future selection patterns.
- Use `--pds-color-state-layer-on-solid-hover` and `--pds-color-state-layer-on-solid-pressed` as overlay layers on solid accent or semantic controls.
- Use `--pds-color-state-focus-ring` for keyboard focus emphasis through `--pds-shadow-focus`.
- Use `--pds-color-state-invalid-ring` with `--pds-color-status-danger` for invalid form-field emphasis.
- Use `--pds-state-disabled-opacity` for disabled interactive controls when the whole control should dim.
- Keep hover and pressed states disabled for controls that are disabled or `aria-disabled`.
- Do not use `--pds-color-overlay-fill` for component hover, pressed, selected, or disabled states. It is reserved for modal and readability overlays.

## Semantic Colour

- Use `--pds-color-status-success`, `--pds-color-status-warning`, `--pds-color-status-danger`, and `--pds-color-status-inactive` only for semantic UI states.
- Use `--pds-color-performance-positive` and `--pds-color-performance-negative` only for metric direction such as gains, losses, growth, decline, profit, and loss.
- Do not use performance tokens for generic success or error messaging.
- Do not use status tokens for financial or performance direction.

PDS uses a hybrid interaction-state model. Semantic colour tokens provide the
base meaning, while reusable state layer tokens provide hover, pressed, focus,
selected, disabled, and invalid feedback. Avoid adding new intent-specific hover
tokens such as success-hover or warning-hover unless a future component contract
proves that a shared state layer cannot express the interaction. Existing
`--pds-color-accent-hover` and `--pds-color-status-danger-hover` tokens remain
available for compatibility, but new component styling should prefer state
layers.

## Transparency And Effects

- Use `--pds-color-overlay-fill` for modal backdrops, dimming layers, and image readability overlays.
- Use `--pds-color-base-grouped-background-0pct`, `--pds-color-base-grouped-background-20pct`, `--pds-color-base-grouped-background-40pct`, `--pds-color-base-grouped-background-60pct`, and `--pds-color-base-grouped-background-80pct` only as readability overlays for images and media.
- Use `--pds-color-shimmer` only for skeleton loading and progressive rendering states.

## Brand Palette

Brand tokens use the `--pds-color-brand-*` prefix. They exist for branding moments, illustrations, charts, generated art direction, and decorative assets.

Do not use brand palette tokens for normal UI text, controls, surfaces, statuses, overlays, or component state. If a component needs colour, use the semantic token that describes its job.
