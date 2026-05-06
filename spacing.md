# PDS Spacing And Radius Guidelines

This file is for LLMs and contributors applying PDS spacing, layout rhythm, and radius.
Choose spacing tokens by layout role, not by numeric preference.

## Component Spacing Rules

- Default component padding should generally be `--pds-space-sp-400` (`16px`) on all sides for widgets, lists, cards, inputs, and grouped surfaces.
- Lateral padding inside components should remain visually consistent across the interface and should generally use `--pds-space-sp-400`.
- Internal spacing between atoms may use different spacing tokens when visual balance, density, readability, or hierarchy calls for it.
- Larger spacing tokens define structural layout rhythm. Smaller spacing tokens exist mainly for optical balance inside components.
- Internal atom spacing should feel readable and balanced rather than mechanically equal everywhere.
- Components with different internal structures should still share aligned outer paddings so screens keep a consistent vertical and horizontal rhythm.

## Full Spacing Scale

- `--pds-space-sp-50` (`2px`): Hairline adjustments, micro alignment corrections, optical nudges, icon refinements, and tiny internal spacing.
- `--pds-space-sp-100` (`4px`): Very small spacing between tightly grouped atoms, nested surface separation, badges, and compact inline elements.
- `--pds-space-sp-200` (`8px`): Small spacing between icons and labels, compact horizontal groups, chips, segmented controls, carousel items, and inline actions.
- `--pds-space-sp-300` (`12px`): Medium compact spacing for tighter vertical grouping inside components, dense content layouts, and secondary internal spacing.
- `--pds-space-sp-400` (`16px`): Primary spacing unit for component padding, default vertical rhythm, spacing between components, and general layout structure.
- `--pds-space-sp-500` (`20px`): Transitional spacing when slightly more breathing room than SP400 is needed without reaching section-level separation.
- `--pds-space-sp-600` (`24px`): Large section spacing between headers and content, large grouped sections, and major layout transitions.
- `--pds-space-sp-800` (`32px`): Extra large spacing for major layout separation, large content groups, or immersive layouts.
- `--pds-space-sp-1000` (`40px`): Hero-level or highly spacious layout separation. Use sparingly for premium breathing room and large visual sections.

## Radius Tokens

- Use `--pds-radius-primary` (`24px`) for widgets, cards, grouped containers, list modules, panels, and most elevated component surfaces.
- Use `--pds-radius-nested` (`20px`) for components inside `WidgetBackground` containers, usually paired with `NestedBackground`.
- Use `--pds-radius-full` (`999px`) for buttons, tabs, segmented controls, search bars, chips, pills, filter controls, and compact interactive rounded elements.

## Spacing Philosophy

- Outer spacing and component paddings should remain highly consistent across the system.
- Inner spacing may adapt depending on typography, icon size, density, and component composition.
- Spacing should feel visually balanced rather than mathematically equal everywhere.
- Components should visually align with one another even when their internal composition differs.
- Smaller spacing tokens primarily exist to balance internal atom composition rather than page-level layout structure.
- Do not invent one-off spacing or radius values for product layout. Exceptions are element dimensions, typography, accessibility utilities, and externally imposed embed sizes.
