---
name: start
description: Bootstrap the current empty folder into a Vite React TypeScript app wired to PDS.
argument-hint: [pds-repo-path]
disable-model-invocation: true
allowed-tools: [Bash, Read]
---

# Start A PDS App

Use this skill only when the user explicitly invokes the PDS starter and
wants the current folder turned into a new PDS-backed React app.

## Behavior

Run the bundled installer script from the folder that should become the app.
The folder must be empty, or contain only `.git`, `.gitignore`, or `.DS_Store`.
If the folder contains application files, stop and tell the user to choose an
empty folder.

The script:

1. Finds the PDS repo from the first skill argument, `PDS_REPO_PATH`, or the
   repo-local plugin source layout.
2. Creates a Vite React TypeScript app.
3. Builds and packs `@pds/tokens` and `pds` from the PDS repo.
4. Installs both tarballs into the new app.
5. Imports `pds/styles.css` once from `src/main.tsx`.
6. Replaces the default Vite UI with a PDS starter surface.
7. Runs the generated app build.

## Invocation

If a PDS repo path was provided:

```sh
node "${CLAUDE_PLUGIN_ROOT}/skills/start/scripts/create-pds-vite-app.mjs" --pds-repo "$ARGUMENTS"
```

If no argument was provided:

```sh
node "${CLAUDE_PLUGIN_ROOT}/skills/start/scripts/create-pds-vite-app.mjs"
```

For Codex, resolve this skill directory as the plugin resource root and run the
same script path from the target folder. If no plugin-root environment variable
is available, locate this `SKILL.md` file and run:

```sh
node ./scripts/create-pds-vite-app.mjs
```

from `plugins/pds/skills/start`, passing `--target <empty-folder>` when the
current working directory is not the target app folder.

## Completion Message

When the command succeeds, report:

- The generated app path.
- That PDS was installed from local tarballs.
- The commands `pnpm dev` and `pnpm build` for the generated app.

Do not start the development server unless the user asks for it.
