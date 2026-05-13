# Start Here

PDS is organized as a design system workspace, not a single package dump.

## Repository Map

- `DESIGN.md`: portable design contract for LLMs and design tooling; links to detailed guidelines.
- `AGENTS.md`: working rules and read order for coding agents.
- `docs/README.md`: documentation index.
- `docs/foundations`: token guidance, visual rationale, motion, and content resilience rules.
- `docs/architecture`: structure, ownership, and scaling guidance.
- `docs/ai`: LLM-specific usage guidance.
- `packages/tokens`: token implementation package.
- `packages/react`: PDS React component package.
- `examples/react`: private browser demo consumer for starter React primitives;
  not a publishable package or full docs site.

## First Principles

- Tokens are the source of visual consistency.
- Documentation should explain why, not repeat every implementation line.
- Packages should have one clear reason to exist.
- LLM guidance should be close to the code and easy to parse.
- Generated files should be reproducible from source.

## Current Scope

The current workspace supports tokens, an initial React component slice, tests,
agent-readable guidance, and a lightweight private React examples app. It does
not include a website, Storybook, visual regression suite, or broader component
library in this phase.

## Navigation Rule

Every repo-level markdown file should either link to `DESIGN.md`, link from
`DESIGN.md`, or explain a package boundary linked from the docs index. This keeps
the design contract connected to implementation instead of becoming a detached
style note.
