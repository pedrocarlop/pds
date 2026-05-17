# Start Here

PDS is organized as a design system workspace, not a single package dump.

## Repository Map

- `DESIGN.md`: portable design contract for LLMs and design tooling; links to detailed guidelines.
- `AGENTS.md`: working rules and read order for coding agents.
- `docs/README.md`: documentation index.
- `docs/foundations`: token guidance, visual rationale, motion, and content resilience rules.
- `docs/recipes`: practical React app setup and PDS adoption recipes.
- `docs/patterns`: repeatable product flow guidance that composes foundations and components.
- `docs/architecture`: structure, ownership, and scaling guidance.
- `docs/ai`: LLM-specific usage guidance.
- `plugins/pds`: repo-local PDS agent plugin skills for help, audit,
  implementation, review, self-improvement from feedback, and app bootstrapping.
- `scripts`: repository maintenance scripts for repeatable local hygiene.
- `packages/tokens`: token implementation package.
- `packages/react`: PDS React component package.
- `examples/react`: private browser demo consumer for starter React primitives;
  not a publishable package or full docs site.

## Common Commands

- `pnpm check`: run lint, typecheck, tests, package builds, the private React example build, and `DESIGN.md` lint.
- `pnpm clean:workspace`: remove ignored `dist/`, `.turbo/`, and `.DS_Store`
  artifacts without deleting `node_modules`.

## First Principles

- Tokens are the source of visual consistency.
- Documentation should explain why, not repeat every implementation line.
- Packages should have one clear reason to exist.
- LLM guidance should be close to the code and easy to parse.
- Generated files should be reproducible from source.

## Current Scope

The current workspace supports tokens, an initial React component slice, pattern
guidance, React adoption recipes, tests, agent-readable guidance, and a
lightweight private React examples app. It does not include a website,
Storybook, visual regression suite, or broader component library in this phase.

## Navigation Rule

Every repo-level markdown file should either link to `DESIGN.md`, link from
`DESIGN.md`, or explain a package boundary linked from the docs index. This keeps
the design contract connected to implementation instead of becoming a detached
style note.
