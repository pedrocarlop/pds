# Packages

Publishable code lives in this folder. Add a package only when it has a distinct
consumer, build output, or ownership boundary.

## Current Packages

- `tokens`: [`@pds/tokens`](tokens/README.md), the framework-agnostic token package.
- `react`: [`@pds/react`](react/README.md), the React component package.
- `cli`: [`@pds/cli`](cli/README.md), the installer for Codex and Claude plugin setup.

## Which Package To Install

Use the root [install guide](../README.md#install-in-an-app) for React apps.
Install `@pds/tokens` directly only when a non-React consumer needs PDS CSS
variables without components.

## Dependency Direction

Implementation packages may depend on `packages/tokens`. Token packages should
not depend on React or app code.

## Related Docs

- [DESIGN.md](../DESIGN.md) for the portable design contract.
- [docs/architecture/repository-structure.md](../docs/architecture/repository-structure.md) for package structure rules.
- [docs/foundations/tokens.md](../docs/foundations/tokens.md) for token ownership rules.
