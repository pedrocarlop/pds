# Start A PDS App

Use this workflow when the user explicitly invokes the PDS starter to create a
new PDS-backed React app, adopt PDS into an existing React app, or refresh only
project-local PDS guidance.

## Command

Command: `/pds:start`.

## Minimum Read Path

Use [router.md](../router.md), this workflow, and the target folder listing or
package manifest. Add [start-new-react-app.md](../../recipes/start-new-react-app.md)
for empty targets, [add-to-existing-react-app.md](../../recipes/add-to-existing-react-app.md)
for React adoption, root [README.md](../../../README.md) for install/update
command explanations, and component contracts only when the user also asks to
customize a screen.

## Behavior

Run the bundled starter script from the folder that should become or receive the
app:

```sh
node ./scripts/start-pds-project.mjs
node ./scripts/start-pds-project.mjs --target <path>
node ./scripts/start-pds-project.mjs --target <path> --mode new
node ./scripts/start-pds-project.mjs --target <path> --mode adopt
node ./scripts/start-pds-project.mjs --target <path> --mode context
```

Default `--mode auto` creates a new app when the target is empty or contains
only `.git`, `.gitignore`, or `.DS_Store`. It adopts PDS when the target has a
React `package.json`. If the target is non-empty and not a React app, stop and
use `--mode context` only when the user wants PDS guidance installed without
React package adoption.

For a new app, the script creates a Vite React TypeScript app, installs
`@pds/react@latest` from npm, imports `@pds/react/styles.css` once, replaces the
default Vite UI with a PDS starter surface, installs project-local PDS guidance,
and runs the generated app build. It stages the app in a temporary directory
first, then copies the generated files into the target only after the staged
install and build succeed. Do not copy staged `node_modules` into the target;
pnpm symlinks can point back to the temporary directory. After copying, run the
target folder's own install and build so the new environment is immediately
runnable.

For an existing React app, the script installs or updates `@pds/react@latest`,
refreshes `docs/pds/context`, merges marked PDS sections into existing
`AGENTS.md`, `CLAUDE.md`, and `DESIGN.md` files, and adds the
`@pds/react/styles.css` import when exactly one supported root entrypoint is
detected. If no safe root entrypoint is detected, report that the package and
guidance were installed and that the stylesheet import needs a manual root-file
choice.

Generated Vite apps should import the first-screen primitives from
`@pds/react/starter`. That narrow public export keeps the starter dev server on
the Button, Badge, and Surface surface area instead of loading the full component
barrel during dependency optimization.

If `@pds/react@latest` is not available from the configured registry, the
script stops before writing app files and asks for a local PDS checkout. Local
tarball installation is available when `--pds-repo` is passed explicitly, when
`PDS_REPO` points to a checkout, or when the starter is run from inside this PDS
repo.

## Project Guidance

`/pds:start` must install the local PDS guidance bundle in every generated app.
The bundle lives at `docs/pds/context` and includes root adapters, `DESIGN.md`,
router and workflow docs, every skill workflow, component contracts,
foundations, patterns, screen structures, recipes, package READMEs, reference
docs, readiness evidence, and evaluation scenarios. This is not optional:
without the local bundle, later LLM work in the project can miss the PDS routes
for [implementing screens](implement-screen.md),
[creating reusable components](create-component.md), reviewing UI, and
[self-improving from design feedback](self-improve.md).

The starter must also create top-level `AGENTS.md`, `CLAUDE.md`, and
`DESIGN.md` adapters that point to the local bundle. Treat
`docs/pds/context` as generated reference material; refresh it from the plugin
instead of editing it by hand.

For existing apps that only need guidance refreshed, run context mode:

```sh
node <plugin-root>/skills/start/scripts/start-pds-project.mjs --target <project-path> --mode context
```

Context mode refreshes `docs/pds/context` and merges a marked PDS section into
existing `AGENTS.md`, `CLAUDE.md`, and `DESIGN.md` files instead of replacing
project-specific instructions.

## Invocation

From `plugins/pds/skills/start`:

```sh
node ./scripts/start-pds-project.mjs
node ./scripts/start-pds-project.mjs --target <path>
node ./scripts/start-pds-project.mjs --target <path> --mode context
node ./scripts/create-pds-vite-app.mjs
node ./scripts/create-pds-vite-app.mjs --target <empty-folder>
node ./scripts/create-pds-vite-app.mjs --pds-repo <pds-repo-path>
node ./scripts/install-pds-project-context.mjs --target <existing-project>
```

When invoked through Claude, `${CLAUDE_PLUGIN_ROOT}` may be used as the plugin
root. When invoked through Codex, resolve this skill directory as the plugin
resource root.

## Completion Message

For new apps, report the generated app path, whether PDS was installed from npm
or local tarballs, that project-local PDS guidance was installed in
`docs/pds/context`, and the generated app commands `pnpm dev` and `pnpm build`.
For existing React apps, report the target path, package source, guidance path,
and whether the stylesheet import was added, already present, or skipped for
manual root-file selection. If the registry package is unavailable, report that
no app files were written and ask for `--pds-repo <path>` or `PDS_REPO`. Do not
start the development server unless the user asks for it.
