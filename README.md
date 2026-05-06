# pds

A bare React and TypeScript UI library skeleton designed from the ground up for LLM agents.

This repository is intentionally small. Components, source guides, docs, and publishing workflows can be added step by step.

## Install

After the package is published to npm:

```sh
pnpm add pds
```

For now, clone this repository and install dependencies locally:

```sh
pnpm install
```

## Use

```tsx
import { AgentSurface } from "pds";
import "pds/styles.css";

export function Example() {
  return (
    <AgentSurface>
      Agent-facing UI starts here.
    </AgentSurface>
  );
}
```

## Develop

```sh
pnpm install
pnpm check
```

## Scripts

- `pnpm typecheck` checks TypeScript.
- `pnpm lint` runs ESLint.
- `pnpm build` builds the library.
- `pnpm check` runs typecheck, lint, and build.
