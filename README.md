# PDS

PDS is a design system for agent-facing React product UI: conversations, tool
runs, review flows, status surfaces, and inspectable work.

This README is the install and update guide for people consuming PDS. It does
not own repo structure, design rules, or agent workflow.

Most app teams should install the `pds` React package. It includes the component
styles and the token package it needs.

If you want Codex or Claude to get `/pds:*` commands, install the PDS plugin
first. The plugin is separate from the React package: the plugin teaches the
agent how to audit, build, review, or start PDS-backed React apps.

## Install The PDS Plugin

Use this when you want to use PDS from Codex or Claude in any project.

### Codex

1. Keep this PDS folder somewhere permanent on your computer. Do not move or
   delete it after installing the plugin.
2. Open Codex.
3. Open this PDS folder in Codex.
4. Ask Codex:

```text
Install the PDS plugin from this repository for my Codex app. Use
.agents/plugins/marketplace.json, enable pds@pds-local, and tell me when I need
to restart Codex.
```

5. Restart Codex.
6. Open any React project in Codex and ask:

```text
/pds:help
```

If Codex does not recognize `/pds:help`, open this PDS folder again and repeat
step 4.

### Claude

For Claude Code, open Terminal, go to this PDS folder, and start Claude with the
local plugin:

```sh
cd /path/to/PDS
claude --plugin-dir ./plugins/pds
```

Then type:

```text
/pds:help
```

If Claude cannot find the plugin, make sure the `cd` path points at this PDS
folder and that `plugins/pds` exists inside it.

The full plugin guide is in [plugins/pds/README.md](plugins/pds/README.md).

## Install In An App

From the folder of the React app that will use PDS:

```sh
pnpm add pds@latest
```

Other package managers work the same way:

```sh
npm install pds@latest
yarn add pds@latest
bun add pds@latest
```

Then import the stylesheet once in the app root, before app-owned CSS:

```tsx
import "pds/styles.css";
import "./app.css";
```

Use public imports from `pds`:

```tsx
import { Button, Surface, SurfaceContent } from "pds";

export function Example() {
  return (
    <Surface>
      <SurfaceContent>
        <Button type="button">Run check</Button>
      </SurfaceContent>
    </Surface>
  );
}
```

Do not deep-import from `packages/react/src` or copy token values into app CSS.

## Install With Codex

Open Codex in the React app folder and ask:

```text
Install the latest PDS package in this React app. Import pds/styles.css once at
the app root, use public imports from pds, and run the app checks.
```

For an app inside this repository, ask Codex to use the workspace package:

```text
Add pds to this workspace app with pds@workspace:^, import pds/styles.css once,
and run pnpm check.
```

## Update To Latest

From the consuming app folder:

```sh
pnpm add pds@latest
```

Equivalent commands:

```sh
npm install pds@latest
yarn add pds@latest
bun add pds@latest
```

After updating, run the app's normal build or test command. For this repository,
run:

```sh
pnpm check
```

If an app only consumes token CSS without React components, install or update
the token package directly:

```sh
pnpm add @pds/tokens@latest
```

## Local Install Before A Registry Release

If the packages are not available from a registry yet, install them from this
repo.

For an app inside this pnpm workspace:

```sh
pnpm --filter <app-package-name> add pds@workspace:^
```

For an app outside this repo:

```sh
cd /path/to/PDS
pnpm install
pnpm build
mkdir -p /tmp/pds-packages
pnpm --dir packages/tokens pack --pack-destination /tmp/pds-packages
pnpm --dir packages/react pack --pack-destination /tmp/pds-packages

cd /path/to/react-app
pnpm add /tmp/pds-packages/pds-tokens-*.tgz /tmp/pds-packages/pds-[0-9]*.tgz
```

Install both tarballs for local external apps. The React package depends on
`@pds/tokens`.

## Package Choice

- `pds`: React components and `pds/styles.css`. Use this for React apps.
- `@pds/tokens`: CSS custom properties only. Use this for token-only consumers.

## Work On This Repo

Install workspace dependencies:

```sh
pnpm install
```

Run all checks before handing work back:

```sh
pnpm check
```

Clean ignored build/cache artifacts without deleting installed dependencies:

```sh
pnpm clean:workspace
```

## More Context

- Repo orientation for maintainers: [docs/start-here.md](docs/start-here.md).
- Design rules: [DESIGN.md](DESIGN.md).
- Full docs index: [docs/README.md](docs/README.md).
- Agent workflow: [AGENTS.md](AGENTS.md).
