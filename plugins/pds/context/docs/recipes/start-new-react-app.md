# Start A New React App With PDS

Use this recipe when starting a new React app that consumes PDS. The app can use
the published `@pds/react` package, live inside this workspace as a private consumer,
or install packed local packages before a registry release is available.

## Choose The App Location

For a private in-repo consumer, create the app under an existing workspace glob
such as `examples/*`. This gives the app a workspace dependency on `@pds/react` and
matches the existing [examples/react](../../examples/react) model.

For a standalone app outside this repo, install `@pds/react@latest` from the app
folder. If a registry release is not available yet, pack the local packages and
install the tarballs.

Do not add a new app to the PDS repo unless the task explicitly asks for one.

## Create The React App

Use the team's chosen React toolchain. For a Vite React TypeScript app:

```sh
pnpm create vite my-pds-app --template react-ts
cd my-pds-app
pnpm install
```

For generated Vite starters, use the narrow starter export for the first screen.
It keeps the dev server focused on Button, Badge, and Surface primitives while
the full component barrel remains available from `@pds/react` as the app grows:

```tsx
import { Badge, Button, Surface } from "@pds/react/starter";
```

If the app should live inside this workspace, create it under `examples/` or add
its folder to [pnpm-workspace.yaml](../../pnpm-workspace.yaml) before installing
workspace dependencies.

## Install Project Guidance

Generated PDS starters must include the project-local PDS guidance bundle:

- `docs/pds/context`: generated PDS context with root adapters, `DESIGN.md`,
  router and workflow docs, every skill workflow, component contracts,
  foundations, patterns, screen structures, recipes, package READMEs, reference
  docs, readiness evidence, and evaluation scenarios.
- `AGENTS.md`, `CLAUDE.md`, and `DESIGN.md`: top-level adapters that route
  future LLM work to the local PDS bundle.

When using `/pds:start`, this happens automatically. When creating a fresh app
by hand from an installed PDS plugin, run:

```sh
node <plugin-root>/skills/start/scripts/install-pds-project-context.mjs --target <new-app-path>
```

Do this before asking an agent to create pages, flows, reusable components, UI
reviews, or self-improvement patches in the new app.

## Install PDS From The Registry

Use the root [install guide](../../README.md#install-in-an-app) for registry
and update commands. Return here to wire the Vite root and first screen.

## Install With Codex

Use the Codex prompt in the root [install guide](../../README.md#install-with-codex),
then continue with this recipe's root wiring.

## Install PDS From This Repo Before A Registry Release

For an in-repo app in this workspace:

```sh
pnpm --filter <app-package-name> add @pds/react@workspace:^
```

For an external local app, use the tarball workflow in the root
[local install guide](../../README.md#local-install-before-a-registry-release).
Install both tarballs because the packed `@pds/react` package depends on
`@pds/tokens`.

## Wire The App Root

Import PDS styles once in the root entry file before app CSS.

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@pds/react/styles.css";
import "./app.css";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Start app CSS from PDS tokens instead of introducing a parallel visual system:

```css
:root {
  color: var(--pds-color-foreground);
  background: var(--pds-color-base-grouped-background);
  font-family: var(--pds-font-sans);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  min-width: var(--pds-layout-viewport-min);
  min-height: 100vh;
  margin: 0;
  color: var(--pds-color-foreground);
  background: var(--pds-color-base-grouped-background);
}

#root {
  min-height: 100vh;
}
```

## Build The First Screen

Start with app-owned page layout and PDS components for the product module:

```tsx
import {
  Badge,
  Button,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceHeader,
  SurfaceTitle
} from "@pds/react/starter";

export function App() {
  return (
    <main className="app-shell">
      <Surface level="elevated">
        <SurfaceHeader>
          <div>
            <SurfaceTitle>Operations review</SurfaceTitle>
            <SurfaceDescription>
              Inspect generated work before sending it forward.
            </SurfaceDescription>
          </div>
          <SurfaceAction>
            <Badge tone="accent">Ready</Badge>
          </SurfaceAction>
        </SurfaceHeader>
        <SurfaceContent>
          <div className="app-actions">
            <Button type="button">Start review</Button>
            <Button intent="secondary" type="button">
              Save draft
            </Button>
          </div>
        </SurfaceContent>
      </Surface>
    </main>
  );
}
```

Keep the surrounding shell CSS layout-focused:

```css
.app-shell {
  display: grid;
  width: min(var(--pds-layout-content-max), calc(100vw - var(--pds-space-sp-800)));
  min-height: 100vh;
  margin: 0 auto;
  align-content: center;
  padding: var(--pds-space-sp-800) 0;
}

.app-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--pds-space-sp-200);
}

/* Keep in sync with --pds-layout-breakpoint-narrow. */
@media (max-width: 760px) {
  .app-shell {
    width: min(100% - var(--pds-space-sp-400), var(--pds-layout-content-max));
    align-content: start;
    padding: var(--pds-space-sp-500) 0;
  }
}
```

## Grow From PDS Primitives

- Use `Surface` for grouped modules and inspectable panels.
- Use `Button`, `Badge`, `Input`, and `Textarea` for common controls before
  creating local equivalents.
- Use `Dialog`, `BottomSheet`, `Toast`, and `Tooltip` when the interaction
  matches their component contracts.
- Use `Message`, `Transcript`, `Composer`, and `RunStatus` for agent-facing
  conversation or run surfaces.
- Keep business logic, routing, persistence, and network behavior in the app.

## Acceptance Check

- The app installs PDS through the registry, a workspace dependency, or both
  local tarballs.
- `@pds/react/styles.css` is imported once at the root.
- Project-local PDS guidance exists at `docs/pds/context`, and top-level
  `AGENTS.md`, `CLAUDE.md`, and `DESIGN.md` route to it.
- Root CSS uses PDS tokens for base color, typography, spacing, and layout.
- The first screen uses public imports from `@pds/react/starter` or
  `@pds/react`.
- The app builds without deep imports or copied token values.
- Narrow viewport and 200% zoom checks keep primary actions and required text
  visible.
