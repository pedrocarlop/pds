# PDS Skill Workflows

These files are the canonical workflows for the PDS plugin skills. The
`SKILL.md` files under `plugins/pds/skills/*` exist for Codex and Claude plugin
discovery and should point to the generated plugin context instead of
duplicating these workflows.

Use this index to choose one workflow, then stop.

## Decision Table

| User intent | Workflow |
| --- | --- |
| Learn what PDS does or choose a plugin command | [help.md](help.md) |
| Audit an existing web project before adopting PDS | [audit.md](audit.md) |
| Add a reusable React component to `@pds/react` | [create-component.md](create-component.md) |
| Implement or modify a React screen, page, or flow | [implement-screen.md](implement-screen.md) |
| Review UI changes against PDS | [review-pds.md](review-pds.md) |
| Turn design feedback into durable PDS guidance | [self-improve.md](self-improve.md) |
| Bootstrap an empty folder into a PDS-backed Vite React app | [start.md](start.md) |

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
