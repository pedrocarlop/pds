# AI Agent Readiness Audit

This document owns the objective-level readiness floor for PDS as an
agent-facing design system. Use it when checking whether the repository still
supports reliable Codex and Claude work after changes to docs, packages,
plugins, or verification.

Passing this audit is not proof that PDS is complete. It proves the current
workspace still has the minimum source, guidance, generated context, and
verification wiring needed for agents to produce high-quality results from the
system that exists today.

## Requirement Evidence

| Requirement | Evidence | Enforced by |
| --- | --- | --- |
| Codex and Claude use the same canonical guidance | `AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, `docs/agent/router.md`, `docs/agent/workflow.md`, and `docs/agent/living-system.md` link to one guidance graph | `scripts/lint-agent-docs.mjs` and `scripts/check-agent-readiness.mjs` |
| PDS growth has a durable owner | [living-system.md](living-system.md), this audit, and the self-improve workflow define promotion, anti-drift, and verification behavior | `pnpm docs:lint` |
| Plugin skill workflows are discoverable and structured | Every `/pds:*` skill has a canonical workflow, command section, minimum read path, plugin adapter, skills index entry, and plugin README entry | `scripts/check-agent-skill-contracts.mjs` |
| Package exports and install docs are stable | Public package manifests, export maps, published files, package READMEs, token scoped CSS exports, and CLI install docs stay aligned | `scripts/check-package-contracts.mjs` |
| Foundation rules match token source | Token-backed foundation docs link to their source CSS, package README entries, scoped imports, and docs index entries | `scripts/check-agent-foundation-contracts.mjs` |
| Public React components are agent-addressable | Every `packages/react/src/components/*.tsx` component has a matching contract under `docs/agent/components`, source link, component index link, generated preview image, and preview file | `scripts/check-agent-component-contracts.mjs` and `scripts/check-react-component-previews.mjs` |
| Screen and flow guidance is agent-addressable | Pattern and screen-structure docs keep required sections, related source links, and index links | `scripts/check-agent-guidance-contracts.mjs` |
| Agent outcomes have named quality scenarios | Representative Codex and Claude tasks define route, prompt, evidence, scoring rubric, pass conditions, quality signals, failure signals, rendered reference coverage, and verification | `scripts/check-agent-evaluation-scenarios.mjs` and `pnpm examples:visual:check` |
| Component rendering is verified, not only documented | Component previews build through the private React consumer and render in browser checks at desktop and a 200% zoom proxy | `pnpm examples:visual:build` and `pnpm examples:visual:check` |
| Visual decisions stay token-first | Package CSS, examples, and generated guidance use `--pds-` tokens instead of hard-coded local visual values | `scripts/lint-component-css-tokens.mjs` |
| Installed plugin skills can resolve the same context | Plugin context includes root adapters plus runtime guidance for skills, components, foundations, recipes, package READMEs, and token source; source-repo-only audit docs stay canonical | `scripts/sync-plugin-context.mjs` and `pnpm plugin:context:check` |
| Agent helper scripts are not unreviewed shell blobs | Workspace scripts and plugin helper scripts run through the root lint path | `pnpm lint` |
| The full local quality gate is one command | `pnpm check` runs lint, docs lint, CSS token lint, typecheck, tests, preview sync, builds, browser preview checks, and `DESIGN.md` lint | `package.json` and `scripts/check-agent-readiness.mjs` |

## Automated Readiness Floor

`scripts/check-agent-readiness.mjs` verifies the wiring that makes the evidence
above checkable:

- Required root adapters, canonical agent docs, package entrypoints, plugin
  context files, and maintenance scripts exist.
- `package.json` keeps the expected lint, docs, package-contract, CSS,
  typecheck, test, preview, build, browser, plugin-context, and `DESIGN.md`
  gates in `pnpm check`.
- `docs:lint` includes the agent-doc linter, skill-contract check,
  component-contract check, guidance-contract check, foundation-contract check,
  evaluation-scenario check, readiness audit, and plugin-context sync check.
- Component source files, preview files, and generated documentation images
  remain in one-to-one coverage.
- Browser preview verification keeps the desktop and 200% zoom proxy viewports
  and targets component preview stories plus rendered agent scenario stories.
- `scripts/capture-component-doc-images.mjs` captures component documentation
  images from the built Ladle preview shell when images need regeneration.
- The living-system, router, workflow, and indexes link to this audit so agents
  can find the readiness model.
- Evaluation scenarios remain linked from the agent indexes and checked by
  `pnpm docs:lint` so outcome sampling cannot silently disappear.

## Not Completion Proof

Do not use this audit as the only evidence that the full design-system objective
is finished. Before marking the broader goal complete, inspect current source,
rendered behavior, docs, package coverage, plugin behavior, quality gates, and
known gaps against the full objective.

Use this audit as a floor. If the objective expands, add the new durable owner
and then update this file and `scripts/check-agent-readiness.mjs` so the floor
cannot drift backward.
