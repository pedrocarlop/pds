# Agent Documentation

This folder is the canonical home for PDS agent-facing documentation. Humans
review agent behavior here; root and plugin files are compatibility adapters for
tools that require fixed filenames.

## Entry Points

- [workflow.md](workflow.md): shared editing, routing, verification, and cleanup
  rules for coding agents.
- [components](components/README.md): React component contracts for agents.
- [patterns](patterns/README.md): repeatable product flow guidance.
- [skills](skills/README.md): canonical PDS plugin skill workflows.

## Task Routing

- Visual decisions: start with [DESIGN.md](../../DESIGN.md), then use the
  matching foundation doc and `packages/tokens/src`.
- React component edits: use `packages/react/README.md`, the matching
  [component contract](components/README.md), source, CSS, and tests.
- Product flows: use the matching [pattern](patterns/README.md), then the
  involved component contracts.
- PDS app setup or adoption: use [docs/recipes](../recipes) and the relevant
  [skill workflow](skills/README.md) when invoked through the plugin.
- Package boundaries or file moves: use
  [docs/architecture/repository-structure.md](../architecture/repository-structure.md).
- Design feedback after PDS output or review: use
  [skills/self-improve.md](skills/self-improve.md) and update the smallest
  durable owner.

## Compatibility Adapters

- `AGENTS.md` is the Codex-compatible root adapter and should stay short.
- `CLAUDE.md` is the Claude-compatible root adapter and imports `AGENTS.md`.
- `plugins/pds/skills/*/SKILL.md` files are plugin discovery adapters; the
  detailed workflows live in [skills](skills/README.md).
- `DESIGN.md` remains top-level for design.md tooling and portable design
  context.

Do not reintroduce full agent workflows outside `docs/agent`. Add links from
tool-required files back to this folder instead.
