# Self-Improve From Design Feedback

Use this workflow when design feedback should improve PDS itself, not only the
current artifact. Treat the feedback as a small incident review: inspect what
happened, identify the instruction gap, fix the artifact when expected, and
patch the smallest durable guidance owner.

## Workflow

1. Capture the feedback precisely: what the user objected to, which artifact is
   involved, and whether the issue is hierarchy, layout, spacing, density,
   typography, color, contrast, motion, interaction, responsiveness,
   accessibility, content resilience, or component fit.
2. Reconstruct evidence before editing: inspect the current source, diff,
   generated UI, screenshot, or Figma handoff. If feedback mentions an original
   component or upstream primitive, inspect that source when available and
   separate original construction laws from the PDS mapping.
3. Diagnose the root cause as missing, failed, ambiguous, conflicting, or
   unowned guidance; missing evidence; implementation shortcut; missing
   enforcement; or premature systemization.
4. Choose the smallest durable owner:
   - Component contracts: [components](../components/README.md).
   - Component source, CSS, and tests: `packages/react`.
   - Shared visual usage: foundation docs and `packages/tokens/src`.
   - Flow-level composition: [patterns](../patterns/README.md).
   - Agent workflow misses: [workflow.md](../workflow.md), this skill workflow,
     or the relevant fixed-location adapter.
5. Self-improve the guidance by writing short, checkable rules tied to the root
   cause. Merge with existing guidance instead of duplicating it.
6. Fix the artifact when the user expects a fix now. Keep CSS layout-focused and
   token-first, and do not add local token-like names for missing component
   concepts.
7. Verify with `pnpm check` before handing work back. For docs-only skill
   changes, validate frontmatter, links, and stale routing.

## Response Shape

Return the feedback interpreted, root cause, artifact changes if any, guidance
changes and why that owner was chosen, and verification run or skipped with
reason.

Do not only defend the previous design decision. If the feedback is valid, PDS
guidance should become harder to misuse next time.
