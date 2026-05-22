# Add PDS To An Existing React App

Use this recipe when a React app already exists and needs to consume PDS
components and styles.

## Before You Start

- The app must use React `^18.3.0` or `^19.0.0`.
- Most React apps should install `@pds/react`; it includes the token dependency.
- Do not deep-import from `packages/react/src` or `packages/tokens/src`.

## Install The Latest Package

Use the root [install guide](../../README.md#install-in-an-app) for registry
and update commands. Return here for app-root style wiring and verification.

## Install With Codex

Use the Codex prompt in the root [install guide](../../README.md#install-with-codex),
then continue with this recipe's style and smoke-test steps.

## Install From This Repo Before A Registry Release

For an app inside this pnpm workspace, add `@pds/react` with the workspace protocol:

```sh
pnpm --filter <app-package-name> add @pds/react@workspace:^
```

For an external local app, use the tarball workflow in the root
[local install guide](../../README.md#local-install-before-a-registry-release).

## Load Styles Once

Import the package stylesheet once in the app root, before local application
CSS that intentionally customizes layout around PDS components.

```tsx
import "@pds/react/styles.css";
import "./app.css";
```

Common root files include `src/main.tsx`, `src/App.tsx`, or the framework's
root layout entry. Do not import `@pds/react/styles.css` in every component.

## Verify The Integration

Render a small PDS surface through public package imports:

```tsx
import {
  Button,
  Surface,
  SurfaceContent,
  SurfaceHeader,
  SurfaceTitle
} from "@pds/react";

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

- Import components from `@pds/react`.
- Import `@pds/react/styles.css` once.
- Keep app-owned layout CSS separate from PDS component styling.
- Use PDS tokens through the package stylesheet instead of copying CSS variable
  values.
- Put product state, routing, data fetching, analytics, and side effects in the
  app, not in PDS components.
- Read the matching [component contracts](../agent/components/README.md)
  before changing PDS component APIs or depending on component-specific slots.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Components render unstyled | Confirm `@pds/react/styles.css` is imported from the app root and the package build includes `dist/styles.css`. |
| External local install cannot resolve `@pds/tokens` | Install both local tarballs, not only the `@pds/react` tarball. |
| React peer dependency warning | Use React `^18.3.0` or `^19.0.0`. |
| Local CSS overrides PDS unintentionally | Move broad selectors after review, scope app CSS to app-owned layout classes, and avoid overriding PDS component classes directly. |

## Acceptance Check

- The app installs or updates `@pds/react` without deep imports.
- The app imports `@pds/react/styles.css` once.
- A smoke-test surface renders with PDS styling.
- Local app CSS does not duplicate token values.
- The app's React version satisfies the package peer dependency range.
