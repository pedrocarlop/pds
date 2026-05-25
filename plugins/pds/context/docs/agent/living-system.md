# Living PDS Operating Model

PDS is a living design system for agent-facing product UI. This document owns
how PDS grows, self-improves, and stays reliable for Codex, Claude, and other
coding agents without scattering rules across adapters or chat transcripts.

Use this file when planning PDS evolution, turning repeated feedback into
durable guidance, adding a new guidance surface, or deciding whether a change
belongs in tokens, React source, component contracts, patterns, screen
structures, recipes, or skill workflows.

Use [readiness-audit.md](readiness-audit.md) when the task asks whether PDS is
agent-reliable at the objective level or when verification wiring changes.
Use [evaluation-scenarios.md](evaluation-scenarios.md) when the task needs
outcome-oriented Codex and Claude sampling across representative agent work.

## Operating Principles

- Route before generating: pick the smallest relevant owner before writing code.
- Evidence before systemization: inspect source, tests, screenshots, generated
  UI, or upstream primitives before promoting feedback into PDS guidance.
- Tokens before visuals: add or adjust token guidance before hard-coding visual
  values in examples, components, or app CSS.
- Source and docs move together: public APIs, slots, state attributes, examples,
  tests, and component contracts should change as one unit.
- Thin adapters stay thin: `AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, and plugin
  `SKILL.md` files route agents to canonical docs instead of duplicating them.
- Quality is checkable: every durable rule should be specific enough for an
  agent, lint, test, quality gate, or reviewer to verify.
- Growth is incremental: add the smallest durable primitive that solves the
  repeated problem without turning one product surface into the whole system.

## Adapter Contract

- `AGENTS.md` is the Codex-compatible root adapter and short repo safety
  checklist.
- `CLAUDE.md` is the Claude-compatible root adapter. It must import
  `AGENTS.md` and link directly to the same canonical routing docs so Claude
  users do not depend on duplicated workflow text.
- Both root adapters must link to `docs/agent/router.md`,
  `docs/agent/workflow.md`, `docs/agent/living-system.md`, and
  `docs/agent/README.md`.
- `AGENTS.md` must also link to `DESIGN.md` because visual work requires the
  portable design routing contract.
- Root and plugin adapters should stay thin. `pnpm docs:lint` enforces the
  adapter references and line budgets.
- Generated plugin context includes the root adapters, `DESIGN.md`, canonical
  docs, package README files, readiness evidence, and evaluation scenarios so
  installed Codex and Claude plugin skills can resolve the same guidance graph.
- Generated and adopted apps must receive the same context under
  `docs/pds/context` plus thin `AGENTS.md`, `CLAUDE.md`, and `DESIGN.md`
  adapters so future LLM work can use PDS routes without relying on chat
  history or the starter transcript.

## Growth Routing

| Need | Smallest durable owner |
| --- | --- |
| Shared color, typography, spacing, layout, motion, or resilience rule | Foundation docs and `packages/tokens/src` |
| Reusable React primitive with stable API, slots, and states | Component contract plus `packages/react` source, styles, tests, exports, and examples |
| Repeated product flow across multiple surfaces | Pattern doc |
| Repeated page-level information architecture or responsive layout | Screen structure doc |
| App installation, migration, or adoption path | Recipe doc |
| Repeated agent command or workflow | Skill workflow under `docs/agent/skills` |
| Agent routing, context loading, or verification behavior | `router.md`, `workflow.md`, or this file |
| Objective-level agent readiness evidence | `readiness-audit.md` plus matching maintenance script |
| Codex or Claude output-quality sampling | `evaluation-scenarios.md` plus matching maintenance script |
| Plugin audit, review, start, or helper script behavior | Plugin skill scripts plus matching skill workflow |
| Package, plugin, or generated context ownership | Architecture docs and maintenance scripts |

Do not add a new component, package, pattern, screen structure, or workflow only
because a single implementation needs local organization. Start with the
current owner, then promote the rule when evidence shows reuse.

## Self-Improvement Loop

1. Capture the trigger: user feedback, design critique, failed review, broken
   generated screen, brittle component API, ambiguous guidance, or repeated
   agent mistake.
2. Reconstruct evidence: inspect the artifact, relevant source, component
   contract, screenshots, tests, or upstream primitive.
3. Classify the gap: missing, failed, ambiguous, conflicting, unowned, missing
   enforcement, implementation shortcut, or premature systemization.
4. Choose the smallest durable owner using the table above.
5. Patch the artifact when a fix is expected now.
6. Patch the owning guidance with a short, checkable rule. Merge with existing
   guidance instead of adding parallel instructions.
7. Add or update enforcement when drift is likely: tests, package contract coverage,
   CSS token lint, docs lint, skill contract coverage, component
   contract coverage, foundation contract coverage, guidance contract coverage,
   agent evaluation scenario coverage, browser-level preview checks, quality
   gates, or plugin context checks.
8. Run `pnpm check`, then run `pnpm clean:workspace` when ignored build/cache
   artifacts should be cleared.

Self-improvement is not complete when the chat answer explains the issue. The
repo should become harder to misuse next time.

## Agent Reliability Bar

A PDS change is agent-reliable when:

- The reading path is obvious from `docs/agent/router.md`.
- The owning doc explains the decision without requiring broad repo reading.
- Public React APIs use stable exports and stable `data-slot` or state
  attributes.
- CSS uses existing PDS variables and does not introduce local token-like names.
- Long content, translated labels, narrow layouts, keyboard focus, and 200%
  zoom are covered by guidance, examples, tests, or quality gates when relevant.
- Plugin context is regenerated after canonical agent-facing docs change.
- Project-local PDS context is installed when starting a new app and can be
  refreshed in existing apps before LLM-driven page, component, review, or
  self-improvement work.
- Package contract coverage keeps publishable exports, install docs, and source
  entrypoints aligned.
- Foundation contract coverage keeps token-backed guidance aligned with
  `packages/tokens/src`.
- Component contract coverage passes for every exported React component source.
- Generated reference coverage keeps TypeScript prop/export docs and the
  supported surface matrix aligned with component source, docs, previews, tests,
  accessibility/focus coverage notes, and known limitations.
- Guidance contract coverage passes for pattern and screen-structure docs.
- Agent evaluation scenario coverage keeps representative Codex and Claude
  outcome checks tied to routes, evidence, scoring rubric, pass conditions,
  quality signals, failure signals, rendered references, and verification
  commands.
- Browser-level component preview checks cover rendered examples at desktop and
  a 200% zoom proxy.
- Plugin skill contract coverage keeps `/pds:*` commands mapped to canonical
  workflows, adapters, and README entries.
- The agent readiness audit passes and covers the current verification floor.
- Plugin helper scripts are linted as part of the root `pnpm lint` path.
- Codex and Claude receive the same canonical guidance through thin adapters.

## Promotion Rules

- Promote a local CSS pattern into foundation guidance only when it is reusable
  across components or screen structures.
- Promote a local composition into a pattern only when it describes a repeated
  product job, not merely a visual arrangement.
- Promote a local page layout into a screen structure only when navigation,
  hierarchy, responsive stacking, or task focus repeats across screens.
- Promote a one-off React primitive into `@pds/react` only when it has a stable
  public API, a component contract, examples, tests, and token-first styles.
- Promote a manual review habit into a quality gate or lint only when it catches
  a recurring or high-risk failure.

## Anti-Drift Rules

- Do not leave durable PDS guidance only in issue comments, PR text, local app
  code, generated examples, or chat transcripts.
- Do not duplicate canonical workflows inside `AGENTS.md`, `CLAUDE.md`,
  `DESIGN.md`, or plugin `SKILL.md` adapters.
- Do not add broad "best practices" docs when an existing component, pattern,
  foundation, screen structure, recipe, or skill doc can own the rule.
- Do not sync plugin context by hand; run `pnpm plugin:context`.
- Do not mark a PDS improvement complete until the verification path has run or
  the skipped check is explicitly justified.
