# Agent Documentation

This folder is the canonical home for PDS agent-facing documentation. Humans
review agent behavior here; root and plugin files are compatibility adapters for
tools that require fixed filenames.

Use [router.md](router.md) for task decision-making. Use this file as the folder
index once the task route is known.

## Entry Points

- [router.md](router.md): compact LLM navigation and minimum reading paths.
- [workflow.md](workflow.md): shared editing, verification, source inspection,
  and cleanup rules for coding agents.
- [screen structures](screen-structures/README.md): page-level IA and layout
  structures for generated screens.
- [components](components/README.md): React component contracts for agents.
- [patterns](patterns/README.md): repeatable product flow guidance.
- [skills](skills/README.md): canonical PDS plugin skill workflows.

Choose the matching child doc from an index, then stop expanding that branch.
Do not read every markdown file before starting.

## Compatibility Adapters

- `AGENTS.md` is the Codex-compatible root adapter and should stay short.
- `CLAUDE.md` is the Claude-compatible root adapter and imports `AGENTS.md`.
- `plugins/pds/skills/*/SKILL.md` files are plugin discovery adapters; they
  read the generated plugin context, while detailed source workflows live in
  [skills](skills/README.md).
- `DESIGN.md` remains top-level for design.md tooling and portable design
  context.

Do not reintroduce full agent workflows outside `docs/agent`. Add links from
tool-required files back to this folder instead.
