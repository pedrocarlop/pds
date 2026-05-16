---
name: review-pds
description: Review changed or selected web UI code against PDS design guidelines, token usage, component imports, accessibility, content resilience, and agent-facing UX. Use after AI-generated changes, before design handoff, or when the user asks for a PDS design-system review.
allowed-tools: [Bash, Read, Grep, Glob]
---

# Review UI Against PDS

Use this skill when the user wants a PDS-focused review of a web UI change. The
default output is review findings, not code edits, unless the user explicitly
asks to fix the issues.

## Workflow

1. Resolve the review scope from the skill argument, current diff, or current
   project directory.
2. Run the bundled review script for automated hints. With an argument:

```sh
node "${CLAUDE_PLUGIN_ROOT}/skills/review-pds/scripts/review-pds.mjs" --target "$ARGUMENTS"
```

Without an argument:

```sh
node "${CLAUDE_PLUGIN_ROOT}/skills/review-pds/scripts/review-pds.mjs"
```

For Codex, locate this `SKILL.md` file and run:

```sh
node ./scripts/review-pds.mjs
node ./scripts/review-pds.mjs --target <path-or-directory>
```

from `plugins/pds/skills/review-pds`.

3. Inspect the relevant source manually. Treat script output as hints, not final
   findings.
4. When a PDS repo is available through `PDS_REPO_PATH` or the repo-local plugin
   layout, use `DESIGN.md`, foundation docs, pattern docs, and component docs as
   the review source of truth.
5. Return findings first, ordered by severity, with file and line references.

## Review Checklist

- PDS is imported publicly from `pds`; no deep package or source imports.
- `pds/styles.css` is imported once at the app root.
- UI chrome uses PDS tokens instead of hard-coded color, spacing, radius,
  typography, shadow, or motion values.
- Local primitives are not recreating existing PDS components without a product
  reason.
- Layout survives narrow viewports, translated or user-generated content, and
  200% zoom.
- Primary actions, required labels, errors, and state feedback remain visible.
- Loading, empty, error, success, disabled, focused, and active states are
  represented where the flow needs them.
- Interactions have accessible names, keyboard behavior, and visible focus.

## Output Shape

Use this order:

1. Findings with severity and file/line reference.
2. Open questions or assumptions.
3. Short change summary only if useful.
4. Verification gaps, including commands not run and manual visual checks still
   needed.

If there are no issues, say that clearly and still mention residual risks or
test gaps.
