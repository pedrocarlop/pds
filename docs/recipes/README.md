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

PDS is currently a local workspace with publishable packages, not a documented
registry release. Prefer local workspace dependencies for in-repo consumers. For
external local app experiments, build and pack both publishable packages from
this repo, then install both tarballs in the app.

When `pds` is published to a registry, registry install commands can replace the
local tarball step without changing application imports:

```sh
pnpm add pds
```

Application code should still import React components from `pds` and import
`pds/styles.css` once at the app root.

## Related Sources

- [DESIGN.md](../../DESIGN.md)
- [Agent workflow](../agent/workflow.md)
- [PDS React package](../../packages/react)
- [PDS React component contracts](../agent/components/README.md)
