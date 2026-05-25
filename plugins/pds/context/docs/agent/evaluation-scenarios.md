# Agent Evaluation Scenarios

This file owns outcome-oriented scenarios for checking whether PDS helps Codex,
Claude, and other coding agents produce reliable product UI. The readiness audit
proves wiring. These scenarios describe the generated outcomes that should be
sampled manually today and automated later when agent-run evaluation is added.

Use this file when changing agent workflows, package contracts, component
contracts, foundations, examples, or plugin context in a way that could change
the quality of generated output.

## Scenario Rules

- Run scenarios against the current workspace, not memory of a previous run.
- Use the smallest reading path from [router.md](router.md) before generating.
- Record evidence from files, rendered UI, screenshots, tests, or command
  output. Chat-only confidence is not evidence.
- Compare Codex and Claude behavior against the same canonical docs and
  package APIs.
- Treat a failed scenario as a self-improvement trigger. Route the gap to the
  smallest durable owner in [living-system.md](living-system.md).
- Score each run with the rubric below so Codex and Claude outcomes can be
  compared without relying on taste or memory.
- Store the result record with the artifact under review, in the issue or PR, or
  in the next durable evaluation log if one is added. Do not leave the only
  result in a private chat transcript.
- Do not mark the full PDS objective complete from this file alone. Pair
  scenario results with [readiness-audit.md](readiness-audit.md), package
  checks, browser preview checks, and rendered inspection.

## Scoring Rubric

Score each criterion from 0 to 2.

| Criterion | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Route Fidelity | Skips or invents the route | Uses part of the route but misses an owner | Uses the smallest documented route and stops expansion |
| Package API Correctness | Deep imports, missing styles, or invented APIs | Public APIs are mostly correct with minor drift | Uses documented package imports, exports, and checks |
| Task Fitness | Output is decorative, generic, or off-task | Core task works but key states or density are weak | Output fits the user job, domain, density, and workflow |
| Token And Visual Fidelity | Hard-coded visual values or one-note palette | Mostly tokenized with minor visual drift | Token-first, inspectable, and aligned to foundations |
| Resilience And Accessibility | Breaks long text, zoom, keyboard, or focus | Covers common cases but misses one stress path | Handles long content, 200% zoom proxy, focus, and states |
| Verification Evidence | No runnable evidence | Some checks or screenshots, but incomplete | Commands, rendered evidence, and source links prove the result |
| Self-Improvement Handling | Failure stays in chat or local artifact | Gap is noted but not routed or enforced | Gap is routed to the smallest owner and enforcement is updated |

## Pass Conditions

- A scenario passes at 12 or more total points, with no 0 in Route Fidelity,
  Package API Correctness, Task Fitness, or Verification Evidence.
- A scenario fails immediately if it uses a private or invented package API,
  cannot be run or inspected, leaves critical text unreadable at the required
  viewport, or gives Codex and Claude different canonical guidance.
- A failed scenario must produce a self-improvement follow-up: missing,
  ambiguous, failed, conflicting, unowned, missing evidence, missing enforcement,
  implementation shortcut, or premature systemization.

## Result Record Template

Use this shape when recording a run:

```md
Scenario:
Agent: Codex | Claude | other
Date:
Prompt:
Route Used:
Artifact Links:
Evidence:
Scores:
- Route Fidelity:
- Package API Correctness:
- Task Fitness:
- Token And Visual Fidelity:
- Resilience And Accessibility:
- Verification Evidence:
- Self-Improvement Handling:
Total:
Decision: pass | fail
Failure Classification:
Smallest Durable Owner:
Follow-Up:
Verification Commands:
```

## Scenario: start-new-pds-app

- Route: [skills/start.md](skills/start.md) and
  [recipes/start-new-react-app.md](../recipes/start-new-react-app.md).
- Prompt: Create a new PDS React app in a temporary folder, keep the first
  screen operational, and verify it builds.
- Required Evidence: package manifest, app entrypoint, token stylesheet import,
  React stylesheet import, project-local PDS guidance in `docs/pds/context`,
  root `AGENTS.md`, `CLAUDE.md`, and `DESIGN.md` adapters, generated first
  screen, and build command output.
- Quality Signals: the first screen is a usable product surface, imports
  `@pds/tokens` and `@pds/react` through public package APIs, avoids hard-coded
  visual values, and remains readable at a 200% zoom proxy.
- Failure Signals: landing-page filler, local token-like variables, missing
  package imports, missing project-local PDS guidance, unverified build output,
  or setup instructions that diverge between Codex and Claude.
- Pass Conditions: public package imports and stylesheet imports are present,
  local PDS routes are available through `docs/pds/context`, the generated app
  builds, the first screen is inspectable in browser, and the run meets the
  shared scoring rubric.
- Verification: run the generated app's documented checks, inspect the first
  screen in a browser, then run this repo's `pnpm check` if repo guidance or
  plugin context changed.

## Scenario: implement-review-queue-screen

- Route: [skills/implement-screen.md](skills/implement-screen.md),
  [screen-structures/first-level-navigation-page.md](screen-structures/first-level-navigation-page.md),
  [patterns/review-queue.md](patterns/review-queue.md), and only the component
  contracts used by the screen.
- Prompt: Implement a dense operations review queue for analysts who compare
  cases, status, assignee, risk, and next action throughout the day.
- Required Evidence: selected route notes, source diff, rendered desktop view,
  rendered 200% zoom proxy or narrow viewport view, and test or build output.
  This repo keeps a rendered reference for this scenario in
  `examples/react/src/stories/agent-scenarios.stories.tsx`.
- Quality Signals: navigation, filters, table or list density, status, empty
  state, loading state, keyboard focus, and primary actions are visible without
  marketing-page composition.
- Failure Signals: oversized hero sections, decorative cards inside cards,
  single-hue palette drift, truncated critical labels, hidden status, or missing
  route to the owning screen structure and pattern.
- Pass Conditions: the rendered screen supports the review job at desktop and a
  200% zoom proxy, critical status and actions remain visible, and the run meets
  the shared scoring rubric.
- Verification: run the target app checks, inspect screenshots, and run
  `pnpm examples:visual:check` for the rendered reference; run `pnpm check`
  when the scenario exposes reusable PDS guidance changes.

## Scenario: create-reusable-component

- Route: [skills/create-component.md](skills/create-component.md),
  [components/_template.md](components/_template.md), and
  [packages/react/README.md](../../packages/react/README.md).
- Prompt: Add a reusable React component only when the product need cannot be
  solved by an existing PDS component or composition.
- Required Evidence: component contract, source file, CSS, tests, preview,
  package export, README entry, and package contract check output.
- Quality Signals: stable props, stable `data-slot` or state attributes,
  token-first CSS, accessible keyboard behavior, long-content resilience, and
  preview coverage at desktop and 200% zoom proxy.
- Failure Signals: source without contract, contract without source, deep
  imports, hard-coded colors, missing preview, missing package export, or
  examples that resize when state text changes.
- Pass Conditions: source, contract, styles, tests, preview, README, and export
  map move together; browser preview coverage passes; and the run meets the
  shared scoring rubric.
- Verification: run `pnpm docs:lint`, `pnpm packages:check`, component tests,
  browser preview checks, and `pnpm check` before handing back.

## Scenario: review-and-self-improve

- Route: [skills/review-pds.md](skills/review-pds.md),
  [skills/self-improve.md](skills/self-improve.md), and the smallest durable
  owner in [living-system.md](living-system.md).
- Prompt: Review a generated PDS screen after design feedback says it feels
  wrong, then fix the artifact and improve the guidance that allowed the issue.
- Required Evidence: source lines for review findings, screenshot or rendered
  artifact, root-cause classification, owning doc or source patch, and
  verification output.
- Quality Signals: findings are concrete, ranked, tied to source, and converted
  into a reusable rule only when evidence shows the issue can recur.
- Failure Signals: defending the previous output without evidence, changing a
  broad adapter instead of the narrow owner, or leaving durable guidance only in
  the chat transcript.
- Pass Conditions: review findings cite source or rendered evidence, the fix is
  applied when expected, reusable guidance is patched at the smallest owner, and
  the run meets the shared scoring rubric.
- Verification: run the affected app checks plus `pnpm docs:lint`; run full
  `pnpm check` when package, component, preview, plugin, or token behavior
  changes.

## Scenario: audit-existing-react-app

- Route: [skills/audit.md](skills/audit.md) and
  [recipes/add-to-existing-react-app.md](../recipes/add-to-existing-react-app.md).
- Prompt: Audit an existing React app for PDS adoption readiness without
  rewriting unrelated app architecture.
- Required Evidence: package manifest, entrypoints, stylesheet imports, root
  layout files, project-local PDS guidance status, component usage, token usage,
  and a ranked adoption report.
- Quality Signals: the audit separates blockers, quick wins, migration risks,
  and suggested checks; it respects existing app ownership and does not invent
  package APIs.
- Failure Signals: broad refactors without evidence, deleting local app styles
  before mapping token roles, skipping source inspection, missing local PDS
  guidance for future LLM work, or recommending deep imports from PDS packages.
- Pass Conditions: the audit is backed by inspected source, separates adoption
  risk levels, preserves app ownership, avoids invented APIs, and meets the
  shared scoring rubric.
- Verification: run the target app's existing checks when available; run PDS
  checks only if this repo's guidance or packages changed.

## Scenario: package-boundary-change

- Route: [living-system.md](living-system.md),
  [readiness-audit.md](readiness-audit.md), and
  [architecture/repository-structure.md](../architecture/repository-structure.md)
  when ownership boundaries change.
- Prompt: Change a package export, install path, CLI option, or generated plugin
  context rule while keeping Codex and Claude aligned.
- Required Evidence: package manifest, source entrypoint, package README,
  root package index, plugin context sync, project guidance installer evidence,
  and package contract coverage.
- Quality Signals: public exports, install docs, source files, plugin context,
  and readiness evidence move together without committing generated `dist/`
  output.
- Failure Signals: docs/source drift, plugin context out of sync, generated app
  context missing PDS routes, new package without ownership docs, package README
  missing install guidance, or stale Codex and Claude adapters.
- Pass Conditions: package manifest, source entrypoint, README, root package
  index, plugin context, project guidance installer, readiness evidence, and
  package contract coverage stay aligned, and the run meets the shared scoring
  rubric.
- Verification: run `pnpm packages:check`, `pnpm docs:lint`,
  `pnpm plugin:context`, `pnpm plugin:context:check`, and full `pnpm check`.
