# Tokens

PDS tokens are implemented as CSS custom properties with the `--pds-` prefix.

## Source

- `packages/tokens/src/styles.css` is the current implementation source.
- `DESIGN.md` is the agent-readable visual contract.
- `docs/foundations/colour.md` and `docs/foundations/spacing.md` explain usage.

## Ownership

The token package owns shared visual values. Component packages consume those
values and should not define one-off color, spacing, radius, or shadow constants.

## Naming

Token names describe role before appearance:

- `--pds-color-foreground`
- `--pds-color-base-widget-background`
- `--pds-color-status-success`
- `--pds-space-sp-400`
- `--pds-radius-primary`

## Current Outputs

`@pds/tokens/styles.css` exposes the CSS variables for package consumers.

Future outputs can include DTCG JSON, TypeScript token metadata, iOS, Android,
or Tailwind exports when the repo needs those consumers.
