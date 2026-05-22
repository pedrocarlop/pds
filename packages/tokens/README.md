# @pds/tokens

Framework-agnostic design tokens for PDS.

## Owns

- CSS custom properties with the `--pds-` prefix.
- The `.pds-tabular` numeric typography utility.
- The default exported stylesheet at `@pds/tokens/styles.css`.
- Scoped foundation stylesheets at `@pds/tokens/colour.css`, `@pds/tokens/typography.css`, `@pds/tokens/spacing.css`, `@pds/tokens/layout.css`, `@pds/tokens/elevation.css`, and `@pds/tokens/motion.css`.

## Install

Most React apps should install `@pds/react` instead; it includes this token package.
Install `@pds/tokens` directly only for token-only consumers.

```sh
pnpm add @pds/tokens@latest
```

Import all token CSS:

```tsx
import "@pds/tokens/styles.css";
```

Or import one foundation stylesheet when the consumer deliberately needs only
that token group:

```tsx
import "@pds/tokens/colour.css";
import "@pds/tokens/typography.css";
import "@pds/tokens/spacing.css";
import "@pds/tokens/layout.css";
import "@pds/tokens/elevation.css";
import "@pds/tokens/motion.css";
```

## Source Files

- `src/colour.css`, `src/typography.css`, `src/spacing.css`, `src/layout.css`, `src/elevation.css`, and `src/motion.css`: implementation sources for foundation CSS variables.
- `src/styles.css`: aggregate stylesheet that imports the foundation CSS files.
- `src/index.ts`: package metadata for token consumers.

## Related Docs

- [DESIGN.md](../../DESIGN.md) for the portable token contract used by design tooling.
- [docs/foundations/tokens.md](../../docs/foundations/tokens.md) for ownership and update rules.
- [docs/foundations/colour.md](../../docs/foundations/colour.md) for color usage.
- [docs/foundations/typography.md](../../docs/foundations/typography.md) for typography usage.
- [docs/foundations/spacing.md](../../docs/foundations/spacing.md) for spacing and radius usage.
- [docs/foundations/layout-types.md](../../docs/foundations/layout-types.md) for shared layout dimensions and breakpoints.
- [docs/foundations/elevation.md](../../docs/foundations/elevation.md) for shadow and focus ring usage.
- [docs/foundations/motion.md](../../docs/foundations/motion.md) for motion usage.
