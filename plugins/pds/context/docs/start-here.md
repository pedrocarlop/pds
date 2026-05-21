# Start Here

This file is the human maintainer orientation for the repository. It explains
what each top-level area owns and what should not be added casually.

It is not the package install guide; use the root [README](../README.md) for
install and update commands. It is not the agent workflow; use
[AGENTS.md](../AGENTS.md) and [docs/agent](agent/README.md) for that.

PDS is organized as a design system workspace, not a single package dump.

## Repository Map

- `DESIGN.md`: portable design contract for LLMs and design tooling; links to detailed guidelines.
- `AGENTS.md`: Codex-compatible adapter that points to `docs/agent`.
- `CLAUDE.md`: Claude-compatible adapter that imports `AGENTS.md`.
- `docs/README.md`: documentation index.
- `docs/agent`: canonical agent workflows, component contracts, screen
  structures, patterns, and skill workflows.
- `docs/foundations`: token guidance, visual rationale, layout types, motion, and content resilience rules.
- `docs/recipes`: practical React app setup and PDS adoption recipes.
- `docs/architecture`: structure, ownership, and scaling guidance.
- `plugins/pds`: PDS agent plugin skills for help, audit, implementation,
  review, self-improvement from feedback, and app bootstrapping. Its `SKILL.md`
  files are discovery adapters that read the generated plugin context; canonical
  workflows stay in `docs/agent/skills`.
- `scripts`: repository maintenance scripts for repeatable local hygiene.
- `packages/tokens`: token implementation package.
- `packages/react`: PDS React component package.
- `examples/react`: private browser demo consumer for starter React primitives;
  not a publishable package or full docs site.

## First Principles

- Tokens are the source of visual consistency.
- Documentation should explain why, not repeat every implementation line.
- Packages should have one clear reason to exist.
- Agent guidance should be centralized in `docs/agent` and easy to parse.
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
