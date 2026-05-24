# Reference

Generated and matrix-style reference docs live here. These files complement the
agent-facing contracts in `docs/agent`; they do not replace behavioral guidance.

## Index

- [React component API reference](react-components.md): generated from
  TypeScript component source and prop interfaces.
- [Supported surface matrix](supported-surface-matrix.md): generated readiness
  matrix for component maturity, source, docs, preview, tests,
  a11y/focus coverage, and known gaps.

## Maintenance

Run `pnpm docs:reference:sync` after changing public React component source,
component docs, previews, known limitations, or targeted test coverage.
`pnpm docs:lint` verifies these files are current.
