# PDS Colour Guidelines

This file is for LLMs and contributors applying PDS colours in product UI.
Choose tokens by usage, not by hue.

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
- Do not invent ad hoc hex, rgb, hsl, or named colours inside components.

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

- Use `--pds-color-grey-tone-2` for ultra-subtle overlays and minimal interaction states.
- Use `--pds-color-grey-tone-5` for subtle hover states, light overlays, and disabled states.
- Use `--pds-color-grey-tone-8` for stronger hover and pressed treatment. Use it for separator fallback only when a physical stroke is truly necessary.
- Use `--pds-color-grey-tone-10` for pressed states, focused states, and stronger interaction emphasis.
- Use `--pds-color-grey-tone-20` for inactive states, disabled surfaces, and stronger muted overlays.

## Semantic Colour

- Use `--pds-color-status-success`, `--pds-color-status-warning`, `--pds-color-status-danger`, and `--pds-color-status-inactive` only for semantic UI states.
- Use `--pds-color-performance-positive` and `--pds-color-performance-negative` only for metric direction such as gains, losses, growth, decline, profit, and loss.
- Do not use performance tokens for generic success or error messaging.
- Do not use status tokens for financial or performance direction.

## Transparency And Effects

- Use `--pds-color-overlay-fill` for modal backdrops, dimming layers, and image readability overlays.
- Use `--pds-color-base-grouped-background-0pct`, `--pds-color-base-grouped-background-20pct`, `--pds-color-base-grouped-background-40pct`, `--pds-color-base-grouped-background-60pct`, and `--pds-color-base-grouped-background-80pct` only as readability overlays for images and media.
- Use `--pds-color-shimmer` only for skeleton loading and progressive rendering states.

## Brand Palette

Brand tokens use the `--pds-color-brand-*` prefix. They exist for branding moments, illustrations, charts, generated art direction, and decorative assets.

Do not use brand palette tokens for normal UI text, controls, surfaces, statuses, overlays, or component state. If a component needs colour, use the semantic token that describes its job.
