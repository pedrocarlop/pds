---
name: self-improve
description: Internal PDS feedback loop for turning user design feedback, critique, visual corrections, component feedback, or pushback on PDS review findings into durable repo improvements. Use when a user says a generated or reviewed UI is wrong from a design point of view, when feedback targets a PDS React component, or when an agent-created PDS screen reveals missing, ambiguous, conflicting, or failed design-system guidance.
allowed-tools: [Bash, Read, Grep, Glob, Edit, MultiEdit, Write]
---

# Self-Improve From Design Feedback

Use this skill when design feedback should improve PDS itself, not only the
current artifact. Treat the feedback as a small incident review: inspect what
happened, identify the instruction gap, fix the artifact when expected, and
patch the smallest durable guidance owner.

## Workflow

1. Capture the feedback precisely:
   - what the user objected to
   - which component, screen, file, review finding, or visual artifact is involved
   - whether the issue is hierarchy, layout, spacing, density, typography, color,
     contrast, motion, interaction, responsiveness, accessibility, content
     resilience, or component fit

2. Reconstruct the evidence before editing:
   - inspect the current source, diff, generated UI, screenshot, or Figma handoff
   - for component feedback, read `packages/react/README.md`, the matching file in
     `packages/react/docs/components`, the component source, `components.css`,
     and relevant tests
   - for foundation feedback, read `DESIGN.md`, the matching
     `docs/foundations/*` file, and `packages/tokens/src` if tokens are involved
   - for plugin workflow feedback, read the relevant `plugins/pds/skills/*/SKILL.md`

3. Diagnose the root cause:
   - Missing instruction: no durable PDS guidance covered the case.
   - Failed instruction: guidance existed but the agent did not follow it.
   - Ambiguous instruction: guidance was too vague or easy to misapply.
   - Conflicting instruction: two rules pushed toward incompatible outcomes.
   - Missing evidence: the artifact was not inspected in the right viewport,
     state, or context.
   - Implementation shortcut: code or CSS took a faster path that weakened the
     design.
   - Ownership gap: no source clearly owned the rule.

4. Choose the smallest durable owner:
   - Component behavior, styling hooks, slots, accessibility, data attributes,
     state behavior, composition, or examples belong in the matching component
     context doc under `packages/react/docs/components`.
   - Component implementation fixes belong in `packages/react/src/components`,
     `packages/react/src/components.css`, and focused tests.
   - Shared visual usage belongs in the matching foundation doc and token source
     when token values or token names change.
   - Flow-level composition belongs in `docs/patterns`.
   - Agent workflow misses belong in `docs/ai/llm-guidelines.md`,
     `AGENTS.md`, `DESIGN.md` when the portable visual contract changes, or the
     relevant PDS plugin skill.
   - If no better owner exists, improve this skill rather than adding orphan
     notes.

5. Self-improve the guidance:
   - if feedback targets a published PDS component, update that component's
     context doc unless it already contained the exact rule and the miss was only
     failure to read it
   - if the rule already existed, update the failed agent workflow so future
     agents must load and apply the existing rule
   - write rules as short imperatives tied to the root cause
   - merge with existing guidance instead of duplicating it
   - avoid broad global rules for one-off subjective preferences

6. Fix the artifact when the user expects a fix now:
   - make the smallest source change that satisfies the feedback
   - add or update tests when behavior, public API, state selectors, or component
     contracts change
   - keep app or example CSS layout-focused and token-first

7. Verify:
   - run `pnpm check` before handing work back
   - when visible UI changes, also verify the relevant viewport, long-content
     state, and 200% zoom where practical
   - for docs-only skill changes, validate front matter by reading the changed
     skill files and checking for broken links or stale routing

## Response Shape

Return:

- Feedback interpreted.
- Root cause and failed or missing instruction.
- Artifact changes, if any.
- Guidance changes and why that owner was chosen.
- Verification run or skipped with reason.

Do not only defend the previous design decision. If the user feedback is valid,
the PDS guidance should become harder to misuse next time.
