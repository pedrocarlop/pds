# Contributing

Thanks for improving PDS. Keep changes small, token-first, and tied to the
owning docs or package boundary.

## Local Setup

```sh
pnpm install
pnpm exec playwright install chromium
pnpm check
```

## Change Rules

- Read `AGENTS.md`, `DESIGN.md`, and the narrow owning doc under `docs/agent`
  before editing source.
- Keep token values in `packages/tokens`; do not duplicate visual values in
  React components, examples, or docs.
- Keep React component changes in `packages/react` and update the matching
  component contract, preview, tests, and generated reference docs together.
- Run `pnpm docs:reference:sync` after changing component props, exports,
  previews, tests, or known limitations.
- Do not commit generated `dist/` output.

## Verification

Run the full gate before opening a PR:

```sh
pnpm check
```

Use `pnpm clean:workspace` after checks when ignored build or cache artifacts
should be removed.

## Pull Requests

Include:

- What changed and why.
- Which owning docs changed.
- Verification command output.
- Screenshots only when visual behavior changed.
