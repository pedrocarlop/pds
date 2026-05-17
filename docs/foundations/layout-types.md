# PDS Layout Types

This file owns shared viewport breakpoints and reusable layout dimensions for
PDS product UI. Spacing tokens own rhythm and padding; layout tokens own app
shell widths, readable measure, side-panel minimums, and breakpoint thresholds.

Related sources: start with [DESIGN.md](../../DESIGN.md) for the portable
contract, then use [packages/tokens/src/layout.css](../../packages/tokens/src/layout.css)
for implementation values.

## Layout Tokens

- `--pds-layout-viewport-min`: minimum supported viewport width.
- `--pds-layout-breakpoint-compact`: component-level compact viewport threshold.
- `--pds-layout-breakpoint-narrow`: page-level narrow viewport threshold.
- `--pds-layout-content-max`: default maximum app shell width.
- `--pds-layout-reading-max`: readable heading and prose measure.
- `--pds-layout-hero-max`: compact hero/header copy measure.
- `--pds-layout-narrow-frame`: narrow demonstration or constrained-control frame.
- `--pds-layout-side-panel-min`: default side-panel minimum column width.
- `--pds-layout-side-panel-wide-min`: wider side-panel minimum column width.

## Breakpoint Rules

- Do not invent hard-coded breakpoint values in product, example, or component
  CSS. Add or change the layout token first, then update this file.
- Use `--pds-layout-breakpoint-compact` for component-level compression where
  local controls need to stack earlier than the full page.
- Use `--pds-layout-breakpoint-narrow` for page shells, examples, and product
  surfaces that switch from multi-column to single-column layout.
- CSS custom properties are not valid in native media query conditions. When a
  media query cannot be avoided, mirror the numeric value from
  `packages/tokens/src/layout.css` exactly and keep the token name documented in
  the owning CSS, test, or review finding.

## Layout Dimension Rules

- Use layout variables for shared app shell widths, readable measures,
  side-panel minimums, and narrow frames.
- Keep one-off embed sizes, asset dimensions, icon geometry, and component
  internals local unless they become shared layout rules.
- Do not put spacing rhythm, radius, typography, or color values in layout
  tokens; those belong to their matching foundation token files.
