# PDS Skill Workflows

These files are the canonical workflows for the PDS plugin skills. The
`SKILL.md` files under `plugins/pds/skills/*` exist for Codex and Claude plugin
discovery and should point to the generated plugin context instead of
duplicating these workflows.

## Skills

- [help.md](help.md): choose the right PDS workflow and explain plugin usage.
- [audit.md](audit.md): inspect an existing web project and produce an adoption
  plan.
- [create-component.md](create-component.md): create a reusable PDS React
  component from a brief or unstyled React code and add it to docs, tests,
  exports, styles, and Ladle previews.
- [implement-screen.md](implement-screen.md): implement or modify a React web
  screen using PDS.
- [review-pds.md](review-pds.md): review UI changes against PDS.
- [self-improve.md](self-improve.md): turn design feedback into durable guidance
  improvements.
- [start.md](start.md): bootstrap an empty folder into a PDS-backed Vite React
  app.

Keep these workflows concise and route detailed design, component, and pattern
rules to the neighboring docs in `docs/agent`.
