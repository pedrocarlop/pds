# Agent Router

Use this file to choose the smallest useful reading path for a PDS task. Do not
read every markdown file before starting. Use indexes to choose, read only the
selected docs, then inspect source and tests before editing existing code.

## Two Modes

| Mode | Route |
| --- | --- |
| I need to choose what to do | Start with this router, then use the matching index in `docs/agent` to choose one workflow, structure, pattern, or component contract. |
| I know what to edit | Skip broad indexes unless ownership is unclear. Read the specific workflow or contract, the source files, nearby tests, and the relevant quality gates. |

## Minimum Routes

| Task | Read first | Choose | Read only if relevant | Stop when |
| --- | --- | --- | --- | --- |
| Implement a screen or flow | [skills/implement-screen.md](skills/implement-screen.md), [workflow.md](workflow.md) | One [screen structure](screen-structures/README.md); one [pattern](patterns/README.md) only when the flow matches; component contracts for used components | Matching foundation docs, app recipe, screen quality gates | Structure, components, source, states, and verification path are clear |
| Create a reusable component | [skills/create-component.md](skills/create-component.md), [packages/react/README.md](../../packages/react/README.md) | Similar component contracts and [components/_template.md](components/_template.md) | Relevant foundations, component quality gates, examples README | Reusability, API, slots, styles, tests, preview, and exports are specified |
| Review PDS UI | [skills/review-pds.md](skills/review-pds.md), changed files | Matching screen structure and component contracts for the reviewed surface | Relevant foundations, patterns, quality gates | Findings can be tied to source lines and owning docs |
| Self-improve from feedback | [skills/self-improve.md](skills/self-improve.md), evidence for the artifact | Smallest durable owner from the table below | Source, tests, screenshots, Figma, or upstream primitives needed to verify the gap | The gap is classified and the owning doc/source is clear |
| Start a new PDS app | [skills/start.md](skills/start.md), [recipes/start-new-react-app.md](../recipes/start-new-react-app.md) | None unless the first screen is also requested | `README.md`, target folder state | App setup path and verification command are clear |
| Audit an existing app | [skills/audit.md](skills/audit.md), target app manifest and entrypoints | Existing-app recipe when the app is React | Root styles, layout files, routing files | Adoption status, likely changes, risks, and checks are clear |

## Source Of Truth

| Topic | Owner |
| --- | --- |
| Workflow decisions | [workflow.md](workflow.md) and [skills](skills/README.md) |
| Screen structures | [screen-structures](screen-structures/README.md) |
| Product-flow patterns | [patterns](patterns/README.md) |
| Component contracts | [components](components/README.md) |
| Foundation rules | [docs/foundations](../foundations) |
| Token source | `packages/tokens/src` |
| React implementation source | `packages/react/src` |
| Verification source | `pnpm check`, package tests, examples checks, and quality gates |

## Durable Owner Routing

| Feedback or change | Smallest durable owner |
| --- | --- |
| Page shape, hierarchy, navigation, or task focus | Screen structures |
| Repeated product flow behavior | Patterns |
| Component anatomy, API, slots, states, or accessibility | Component contract and React source |
| Shared visual, token, color, type, spacing, motion, or resilience rule | Foundation docs and token source |
| Package boundary, file ownership, or new package | Architecture docs |
| Agent workflow miss | The matching skill workflow or [workflow.md](workflow.md) |

## Stop Rules

- Choose the matching child doc from an index, then stop expanding that branch.
- Read component contracts only for components being used, edited, reviewed, or
  created.
- Read foundation docs only for visual areas being changed.
- Read patterns only when the flow matches a documented repeated product flow.
- Read screen structures only for page-level layout, navigation, hierarchy, or
  task-focus decisions.
- Read architecture docs only when moving files, changing ownership, or adding
  packages.
- Do not over-route: if the target and owner are known, go directly to the
  narrow owner.
- Do not under-route: if the task is page-level, choose a screen structure
  before implementing or reviewing components.

## Navigation Anti-Patterns

- Do not read every component contract to implement one surface.
- Do not use foundation docs as component specs.
- Do not use screen structures as React component specs.
- Do not update `DESIGN.md` when a narrower owner exists.
- Do not create a component just because a screen structure mentions a region.
- Do not rely only on docs when source and tests already exist.

## Freshness And Conflicts

Source and tests beat stale docs for current implementation behavior. If docs
disagree with each other, or docs conflict with source in a way that changes the
task, stop and report the conflict instead of guessing.

## Route Examples

- "Build this onboarding flow" -> implement screen, choose Focus Layout, read
  matching form components and relevant foundations.
- "Create a Banner component" -> create component, use the component template,
  inspect nearby alert or surface components.
- "Review this UI" -> review workflow, changed files, matching structure,
  involved component contracts.
- "This layout feels wrong" -> self-improve workflow, route to the screen
  structure owner unless evidence shows the issue belongs to a narrower owner.
