# PDS React Examples

This private consumer app exercises the public `@pds/react` package.

## Ladle Component Previews

Ladle previews are registry-driven from `src/component-previews`.

- Add one `*.preview.tsx` module for every root component source file in
  `packages/react/src/components`.
- Name preview modules after the component source file, for example
  `button.preview.tsx` for `button.tsx`.
- Export a default `ComponentPreview` object with curated JSX that imports PDS
  components only from `@pds/react`.
- The registry in `src/component-previews/index.ts` auto-loads matching preview
  modules, so a new preview appears in Ladle without editing the story file.
- Run `pnpm examples:previews:sync` after adding or removing a preview module so
  the static Ladle sidebar stories are regenerated.
- `pnpm examples:previews:check` fails when a root component source file and
  preview module drift out of sync or when the generated sidebar story file is
  stale.
