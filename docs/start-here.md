# Start Here

PDS is organized as a design system workspace, not a single package dump.

## Repository Map

- `DESIGN.md`: portable design contract for LLMs and design tooling.
- `AGENTS.md`: working rules and read order for coding agents.
- `docs/foundations`: token guidance and visual rationale.
- `docs/architecture`: structure, ownership, and scaling decisions.
- `docs/ai`: LLM-specific usage guidance.
- `docs/decisions`: durable architecture decisions.
- `packages/tokens`: token implementation package.
- `packages/react`: React implementation package.
- `apps`: reserved for future docs or examples, intentionally empty for now.

## First Principles

- Tokens are the source of visual consistency.
- Documentation should explain why, not repeat every implementation line.
- Packages should have one clear reason to exist.
- LLM guidance should be close to the code and easy to parse.
- Generated files should be reproducible from source.

## Current Scope

The current workspace supports tokens, React primitives, and agent-readable
guidance. It does not include a website, Storybook, visual regression suite, or
new component work in this phase.
