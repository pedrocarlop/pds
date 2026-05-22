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
- Single-component Ladle pages render the preview directly under the page
  header. Do not wrap those pages in per-component panels or repeat the page
  title and description as subheaders; reserve labeled panels for the gallery.
- Run `pnpm examples:previews:sync` after adding or removing a preview module so
  the static Ladle sidebar stories are regenerated.
- `pnpm examples:previews:check` fails when a root component source file and
  preview module drift out of sync or when the generated sidebar story file is
  stale.
- `pnpm examples:visual:build` builds the static Ladle app used by browser
  verification.
- `pnpm examples:visual:check` serves the built Ladle output and runs Playwright
  Chromium checks for every component preview at desktop and a 200% zoom proxy.
  Install the browser once with `pnpm exec playwright install chromium`.
- Browser check failure screenshots are written to
  `/tmp/pds-preview-browser-failures`.

## Ladle Scenario Previews

Agent outcome scenarios live in `src/stories/agent-scenarios.stories.tsx`.
These stories compose existing public PDS components into rendered product
surfaces for representative Codex and Claude tasks. The browser visual check
verifies them alongside component previews at desktop and a 200% zoom proxy.
