# Tokens

PDS tokens are implemented as CSS custom properties with the `--pds-` prefix.

## Source

- Foundation CSS files in [packages/tokens/src](../../packages/tokens/src) are the current implementation source.
- [packages/tokens/src/styles.css](../../packages/tokens/src/styles.css) bundles those foundation files for the default public import.
- [DESIGN.md](../../DESIGN.md) is the portable, agent-readable visual contract.
- [docs/foundations/colour.md](colour.md), [docs/foundations/typography.md](typography.md), [docs/foundations/spacing.md](spacing.md), [docs/foundations/layout-types.md](layout-types.md), [docs/foundations/motion.md](motion.md), and [docs/foundations/content-resilience.md](content-resilience.md) explain usage.
- [packages/tokens/README.md](../../packages/tokens/README.md) explains package ownership and exports.

## Ownership

The token package owns shared visual values. Future component packages should
consume those values instead of defining one-off color, spacing, radius, shadow,
duration, or easing constants.

## Naming

Token names describe role before appearance:

- `--pds-color-foreground`
- `--pds-color-base-widget-background`
- `--pds-color-status-success`
- `--pds-font-sans`
- `--pds-body1`
- `--pds-lh-body1`
- `--pds-space-sp-400`
- `--pds-radius-primary`
- `--pds-layout-breakpoint-narrow`
- `--pds-motion-duration-standard`
- `--pds-ease-smooth-swoop`

## Current Outputs

`@pds/tokens/styles.css` remains the recommended default import and exposes all
CSS variables plus the `.pds-tabular` numeric typography utility. Scoped imports
are available from `@pds/tokens/colour.css`, `@pds/tokens/typography.css`,
`@pds/tokens/spacing.css`, `@pds/tokens/layout.css`,
`@pds/tokens/elevation.css`, and `@pds/tokens/motion.css`.

Future outputs can include DTCG JSON, TypeScript token metadata, iOS, Android,
or Tailwind exports when the repo needs those consumers.

## Update Rule

When a token changes, update the implementation source first, then update
`DESIGN.md` if the portable contract changes, and update foundation guidelines if
usage rules change.
