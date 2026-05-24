# Start Here

This file is the human maintainer orientation for the repository. It explains
what each top-level area owns and what should not be added casually.

It is not the package install guide; use the root [README](../README.md) for
install and update commands. It is not the agent workflow; use
[AGENTS.md](../AGENTS.md) and [docs/agent](agent/README.md) for that.

PDS is organized as a design system workspace, not a single package dump.
Its growth model lives in [docs/agent/living-system.md](agent/living-system.md)
so agent-facing quality improvements stay routed to durable owners.
The objective-level readiness audit lives in
[docs/agent/readiness-audit.md](agent/readiness-audit.md).
Outcome-oriented task scenarios for sampling Codex and Claude result quality
live in [docs/agent/evaluation-scenarios.md](agent/evaluation-scenarios.md).

## Repository Map

- `DESIGN.md`, `AGENTS.md`, and `CLAUDE.md`: fixed-name adapters into the
  canonical docs.
- `docs/agent`: router, workflow, component contracts, screen structures,
  patterns, skills, readiness audit, and living-system model.
- `docs/foundations`: token guidance including colour, type, spacing, layout,
  elevation, motion, and content resilience.
- `docs/reference`: generated React API reference and supported surface matrix.
- `docs/recipes` and `docs/architecture`: app adoption paths and repo boundary
  rules.
- `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `.github/workflows`, and
  `docs/release-policy.md`: public-repo maturity basics.
- `plugins/pds`: thin skill adapters plus generated plugin context copied from
  canonical guidance.
- `packages/tokens`, `packages/react`, and `packages/cli`: publishable packages.
- `examples/react`: private browser consumer, not a docs site or publishable app.

Use [docs/architecture/repository-structure.md](architecture/repository-structure.md)
for detailed package and generated-output boundaries.

## First Principles

- Tokens are the source of visual consistency.
- Documentation should explain why, not repeat every implementation line.
- Packages should have one clear reason to exist.
- Agent guidance should be centralized in `docs/agent` and easy to parse.
- Generated files should be reproducible from source.

## Current Scope

The current workspace supports tokens, an initial React component slice, pattern
guidance, React adoption recipes, tests, agent-readable guidance, and a
lightweight private React examples app. It includes generated reference docs and
CI wiring, but does not include a website, Storybook, visual regression suite,
design-tool export, or broader component library in this phase.

## Navigation Rule

Every repo-level markdown file should either link to `DESIGN.md`, link from
`DESIGN.md`, or explain a package boundary linked from the docs index. This keeps
the design contract connected to implementation instead of becoming a detached
style note.
