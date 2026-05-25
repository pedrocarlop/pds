# PDS

PDS is a design system for agent-facing React product UI: conversations, tool
runs, review flows, status surfaces, and inspectable work.

This README is the install and update guide for people consuming PDS. It does
not own repo structure, design rules, or agent workflow.

Most app teams should install the `@pds/react` React package. It includes the
component styles and the token package it needs.

If you want Codex or Claude to get `/pds:*` commands, install the PDS plugin
first. The plugin is separate from the React package: the plugin teaches the
agent how to audit, build, review, or start PDS-backed React apps.

## Install The PDS Plugin

Use this when you want to use PDS from Codex or Claude in any project.

Install the plugin with the published CLI:

```sh
npx @pds/cli@latest install
```

The installer registers the PDS marketplace, enables the plugin where the local
agent CLI supports it, and tells you when to restart the app. It installs Codex
and Claude support when their CLIs are available.

Codex-only install:

```sh
npx @pds/cli@latest install --tool codex
```

Claude-only install:

```sh
npx @pds/cli@latest install --tool claude
```

Dry run:

```sh
npx @pds/cli@latest install --dry-run
```

After installing, restart Codex or Claude. Open any React project and run:

```text
/pds:help
```

When a project should keep PDS rules available for future LLM work, install or
refresh the project-local guidance bundle from the PDS plugin. New apps created
with `/pds:start` do this automatically. Existing apps can run:

```sh
node <plugin-root>/skills/start/scripts/install-pds-project-context.mjs --target <react-app-path>
```

This writes `docs/pds/context` plus top-level `AGENTS.md`, `CLAUDE.md`, and
`DESIGN.md` adapters so agents can resolve the PDS routes for pages, reusable
components, reviews, and self-improvement.

Codex copy-paste prompt:

```text
Run `npx @pds/cli@latest install --tool codex`, restart Codex, then use
`/pds:help`.
```

The full plugin guide is in [plugins/pds/README.md](plugins/pds/README.md).

## Install In An App

From the folder of the React app that will use PDS:

```sh
pnpm add @pds/react@latest
```

Other package managers work the same way:

```sh
npm install @pds/react@latest
yarn add @pds/react@latest
bun add @pds/react@latest
```

Then import the stylesheet once in the app root, before app-owned CSS:

```tsx
import "@pds/react/styles.css";
import "./app.css";
```

Use public imports from `@pds/react`:

```tsx
import { Button, Surface, SurfaceContent } from "@pds/react";

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
Install the latest PDS package in this React app. Import
@pds/react/styles.css once at the app root, use public imports from @pds/react,
install or refresh project-local PDS guidance at docs/pds/context, and run the
app checks.
```

For an app inside this repository, ask Codex to use the workspace package:

```text
Add @pds/react to this workspace app with @pds/react@workspace:^, import
@pds/react/styles.css once, and run pnpm check.
```

## Update To Latest

From the consuming app folder:

```sh
pnpm add @pds/react@latest
```

Equivalent commands:

```sh
npm install @pds/react@latest
yarn add @pds/react@latest
bun add @pds/react@latest
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
pnpm --filter <app-package-name> add @pds/react@workspace:^
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
pnpm add /tmp/pds-packages/pds-tokens-*.tgz /tmp/pds-packages/pds-react-*.tgz
```

Install both tarballs for local external apps. The React package depends on
`@pds/tokens`.

## Package Choice

- `@pds/react`: React components and `@pds/react/styles.css`. Use this for React apps.
- `@pds/tokens`: CSS custom properties only. Use this for token-only consumers.

## Work On This Repo

Install workspace dependencies:

```sh
pnpm install
```

Install the Chromium browser used by the component preview browser check:

```sh
pnpm exec playwright install chromium
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
- Supported surface matrix: [docs/reference/supported-surface-matrix.md](docs/reference/supported-surface-matrix.md).
- Release policy: [docs/release-policy.md](docs/release-policy.md).
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md).
- Security policy: [SECURITY.md](SECURITY.md).
