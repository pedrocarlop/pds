# PDS Recipes

Recipes are practical setup paths for consuming PDS from React applications.
They complement [patterns](../agent/patterns/README.md), which describe
repeatable product flows, and [foundations](../foundations), which own token and
visual rules.

Use these recipes after [DESIGN.md](../../DESIGN.md) and
[docs/start-here.md](../start-here.md). They should stay copyable without
becoming a generated starter app or documentation site.

## Current Recipes

- [Add PDS to an existing React app](add-to-existing-react-app.md)
- [Start a new React app with PDS](start-new-react-app.md)

## Install Model

For published releases, install the React package from the app folder:

```sh
pnpm add pds@latest
```

Then import `pds/styles.css` once at the app root and import components from
`pds`. The `pds` package brings in `@pds/tokens` for React consumers.

For Codex-based setup, open Codex in the app folder and ask it to install the
latest `pds` package, import `pds/styles.css` once, use public imports from
`pds`, and run the app checks.

Before a registry release is available, use local workspace dependencies for
in-repo apps. For external local app experiments, build and pack both
publishable packages from this repo, then install both tarballs in the app.

Use the same command to update a published install:

```sh
pnpm add pds@latest
```

## Related Sources

- [DESIGN.md](../../DESIGN.md)
- [Agent workflow](../agent/workflow.md)
- [PDS React package](../../packages/react)
- [PDS React component contracts](../agent/components/README.md)
