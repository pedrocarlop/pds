# Add PDS To An Existing React App

Use this recipe when a React app already exists and needs to consume PDS
components and styles.

## Before You Start

- The app must use React `^18.3.0` or `^19.0.0`.
- PDS package source lives in this repo at [packages/react](../../packages/react).
- The React package depends on [@pds/tokens](../../packages/tokens), so external
  local installs need both packages available.
- Do not deep-import from `packages/react/src` or `packages/tokens/src`.

## Install From This Repo

For an app inside this pnpm workspace, add `pds` with the workspace protocol:

```sh
pnpm --filter <app-package-name> add pds@workspace:^
```

For an app outside this repo before PDS is published, build and pack the local
packages, then install both tarballs in the app:

```sh
cd /path/to/PDS
pnpm build
mkdir -p /tmp/pds-packages
pnpm --dir packages/tokens pack --pack-destination /tmp/pds-packages
pnpm --dir packages/react pack --pack-destination /tmp/pds-packages

cd /path/to/react-app
pnpm add /tmp/pds-packages/pds-tokens-0.0.0.tgz /tmp/pds-packages/pds-0.0.0.tgz
```

When PDS is published, the app can use the registry package instead:

```sh
pnpm add pds
```

## Load Styles Once

Import the package stylesheet once in the app root, before local application
CSS that intentionally customizes layout around PDS components.

```tsx
import "pds/styles.css";
import "./app.css";
```

Common root files include `src/main.tsx`, `src/App.tsx`, or the framework's
root layout entry. Do not import `pds/styles.css` in every component.

## Verify The Integration

Render a small PDS surface through public package imports:

```tsx
import {
  Button,
  Surface,
  SurfaceContent,
  SurfaceHeader,
  SurfaceTitle
} from "pds";

export function PdsSmokeTest() {
  return (
    <Surface>
      <SurfaceHeader>
        <SurfaceTitle>PDS is installed</SurfaceTitle>
      </SurfaceHeader>
      <SurfaceContent>
        <Button type="button">Run check</Button>
      </SurfaceContent>
    </Surface>
  );
}
```

The app should build, render the dark PDS surface treatment, and show tokenized
button styling without local CSS recreating PDS colors, spacing, radius, or
motion values.

## Integration Rules

- Import components from `pds`.
- Import `pds/styles.css` once.
- Keep app-owned layout CSS separate from PDS component styling.
- Use PDS tokens through the package stylesheet instead of copying CSS variable
  values.
- Put product state, routing, data fetching, analytics, and side effects in the
  app, not in PDS components.
- Read the matching [component docs](../../packages/react/docs/components/README.md)
  before changing PDS component APIs or depending on component-specific slots.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Components render unstyled | Confirm `pds/styles.css` is imported from the app root and the package build includes `dist/styles.css`. |
| External local install cannot resolve `@pds/tokens` | Install both local tarballs, not only `pds-0.0.0.tgz`. |
| React peer dependency warning | Use React `^18.3.0` or `^19.0.0`. |
| Local CSS overrides PDS unintentionally | Move broad selectors after review, scope app CSS to app-owned layout classes, and avoid overriding PDS component classes directly. |

## Acceptance Check

- The app installs `pds` without deep imports.
- The app imports `pds/styles.css` once.
- A smoke-test surface renders with PDS styling.
- Local app CSS does not duplicate token values.
- The app's React version satisfies the package peer dependency range.
