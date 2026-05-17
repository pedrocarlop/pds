# Packages

Publishable code lives in this folder. Add a package only when it has a distinct
consumer, build output, or ownership boundary.

## Current Packages

- `tokens`: `@pds/tokens`, the framework-agnostic token package.
- `react`: `pds`, the React component package.

## Which Package To Install

Install `pds` in React apps:

```sh
pnpm add pds@latest
```

Install `@pds/tokens` only when a consumer needs PDS CSS variables without React
components:

```sh
pnpm add @pds/tokens@latest
```

Use the same commands to update consuming apps to the latest published version.

## Dependency Direction

Implementation packages may depend on `packages/tokens`. Token packages should
not depend on React or app code.

## Related Docs

- [DESIGN.md](../DESIGN.md) for the portable design contract.
- [docs/architecture/repository-structure.md](../docs/architecture/repository-structure.md) for package structure rules.
- [docs/foundations/tokens.md](../docs/foundations/tokens.md) for token ownership rules.
