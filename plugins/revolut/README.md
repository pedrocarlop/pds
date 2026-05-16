# Revolut PDS Starter Plugin

This plugin bootstraps an empty folder into a Vite React TypeScript app that
uses PDS packages from this repo.

## What `/start` Creates

- Vite React TypeScript app files.
- Local installs for packed `@pds/tokens` and `pds` tarballs.
- A root import for `pds/styles.css`.
- A first PDS screen built from public `pds` component imports.
- Token-based root CSS for background, foreground, typography, and layout.

## Requirements

- Node compatible with the PDS workspace engines.
- `pnpm >= 9`.
- A local checkout of the PDS repo.
- An empty target folder, or a folder that only contains `.git`,
  `.gitignore`, or `.DS_Store`.

If the plugin cannot find the PDS repo automatically, set `PDS_REPO_PATH` or
pass the repo path as the first argument:

```sh
/revolut:start /path/to/PDS
```

## Codex Usage

The repo-local marketplace entry lives at `.agents/plugins/marketplace.json` and
points at `./plugins/revolut`. After enabling the plugin in Codex, use
`@revolut` and invoke the `start` skill from the empty folder that should become
the app.

## Claude Usage

For local testing from this repo:

```sh
claude --plugin-dir ./plugins/revolut
```

Then run the namespaced skill from the empty target folder:

```sh
/revolut:start
```

Claude plugin skills are namespaced by plugin, so the command is
`/revolut:start` rather than a global `/start`.
