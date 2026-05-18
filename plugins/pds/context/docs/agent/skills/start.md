# Start A PDS App

Use this workflow only when the user explicitly invokes the PDS starter and
wants the current empty folder turned into a new PDS-backed React app.

## Behavior

Run the bundled installer script from the folder that should become the app. The
folder must be empty, or contain only `.git`, `.gitignore`, or `.DS_Store`. If
the folder contains application files, stop and tell the user to choose an empty
folder.

The script creates a Vite React TypeScript app, installs `@pds/react@latest`
from npm, imports `@pds/react/styles.css` once, replaces the default Vite UI
with a PDS starter surface, and runs the generated app build. It stages the app
in a temporary directory first, then copies the result into the target only
after install and build succeed.

If `@pds/react@latest` is not available from the configured registry, the
script stops before writing app files and asks for a local PDS checkout. Local
tarball installation is available when `--pds-repo` is passed explicitly, when
`PDS_REPO` points to a checkout, or when the starter is run from inside this PDS
repo.

## Invocation

From `plugins/pds/skills/start`:

```sh
node ./scripts/create-pds-vite-app.mjs
node ./scripts/create-pds-vite-app.mjs --target <empty-folder>
node ./scripts/create-pds-vite-app.mjs --pds-repo <pds-repo-path>
```

When invoked through Claude, `${CLAUDE_PLUGIN_ROOT}` may be used as the plugin
root. When invoked through Codex, resolve this skill directory as the plugin
resource root.

## Completion Message

Report the generated app path, whether PDS was installed from npm or local
tarballs, and the generated app commands `pnpm dev` and `pnpm build`. If the
registry package is unavailable, report that no app files were written and ask
for `--pds-repo <path>` or `PDS_REPO`. Do not start the development server
unless the user asks for it.
