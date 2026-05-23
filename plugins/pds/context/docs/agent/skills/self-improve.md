# Self-Improve From Product Or Implementation Feedback

Use this workflow when product feedback, design critique, UI review findings, or
implementation-quality failures should improve PDS itself, not only the current
artifact. Treat the feedback as a small incident review: inspect what happened,
classify the failure, identify the system gap, fix the artifact when expected,
and patch the smallest durable guidance owner.

## Command

Command: `/pds:self-improve`.

## Minimum Read Path

Use [router.md](../router.md), this workflow,
[living-system.md](../living-system.md), and artifact evidence: source, diff,
generated UI, screenshot, Figma handoff, or upstream primitive when available.
Then choose the smallest durable owner from the router and read only that
owner's source/tests and quality gate. Read `DESIGN.md` only when its portable
routing contract is the suspected failure.

## Failure Classification Framework

When an output is weak, classify the failure before proposing fixes. Mark each
level as primary, secondary, suspected, or not involved, and use the
classification to choose the smallest durable owner.

### 1. Product Reasoning

Ask:

- Did I understand the actual product job?
- Did I identify the user, context, and success criteria?
- Did I infer requirements too quickly?
- Did I miss constraints, permissions, compliance, or technical limitations?
- Did I miss important states or edge cases?
- Did I optimise for visual completion instead of product correctness?

Route product reasoning failures to the product-flow pattern, screen structure,
workflow, recipe, or agent instruction that should have made the product job
clear.

### 2. Flow And Screen Structure

Ask:

- Did I choose the wrong product-flow pattern?
- Did I choose the wrong screen structure?
- Did I create screens that duplicate each other?
- Did I add unnecessary steps?
- Did I miss entry, exit, back, cancel, recovery, or completion paths?
- Did I fail to separate input, review, confirmation, and success states?
- Did I overload one screen with too many jobs?

Route flow and screen-structure failures to the matching pattern or screen
structure before changing components or CSS.

### 3. Component And System Usage

Ask:

- Did I rely on generic UI instead of PDS patterns?
- Did I use components without checking their documented purpose?
- Did I compose primitives in a way that breaks PDS conventions?
- Did I create a new component when an existing component or primitive was
  enough?
- Did I force an existing component into the wrong semantic role?
- Did I miss required component states?
- Did I misuse layout, spacing, surface, elevation, radius, icon, or typography
  tokens?
- Did I create local one-off styling instead of using system primitives?

Route component and system-usage failures to the component contract, React
source, foundation doc, token source, pattern, or primitive rule that should
have prevented the misuse.

### 4. Implementation Quality

Ask:

- Did I create CSS that is too fragile, specific, or hard to reuse?
- Did I use layout rules that break with long content, localisation, zoom, or
  responsive widths?
- Did I hardcode values that should use tokens or primitives?
- Did I duplicate CSS or component logic that should be abstracted?
- Did I introduce inconsistent spacing, alignment, radius, elevation, or
  typography?
- Did I break visual hierarchy through weak CSS structure?
- Did I miss hover, focus, disabled, loading, error, empty, selected, pressed,
  or active states?
- Did I create accessibility issues through poor semantics, labels, contrast,
  keyboard behaviour, or focus handling?
- Did I create components that look correct in one case but fail across
  realistic variants?
- Did I fix the symptom without improving the underlying primitive, component
  rule, CSS convention, or documentation?

Route implementation-quality failures to the underlying CSS convention,
component rule, primitive composition rule, token rule, accessibility rule, test,
or quality gate. Prefer strengthening the shared system rule over adding
one-off CSS patches.

## Correction Priority

Correct failures in this order:

1. Product logic.
2. Flow and screen structure.
3. Layout selection.
4. Component choice.
5. Primitive composition.
6. Tokens and CSS rules.
7. States, accessibility, responsiveness, copy, icons, and polish.
8. Documentation or agent guidance updates.

Do not polish a lower-level implementation symptom until the higher-level
product, flow, layout, and component decisions are sound.

## Ownership Classification Rule

Do not only say what is wrong with the UI. Identify whether the failure belongs
to the product workflow, screen pattern, layout structure, component choice,
primitive composition, CSS implementation, token usage, state model,
accessibility model, or documentation itself.

When the failure is implementation-related, improve the most reusable system
rule that could have prevented it:

- If multiple components have inconsistent spacing, improve the spacing
  primitive or component composition rule.
- If a component breaks with long labels, improve the component resilience rule
  and add regression checks for long content.
- If hover or focus states are repeatedly missing, improve the state coverage
  rule.
- If layouts rely on hardcoded widths, improve the responsive layout rule.
- If one-off CSS overrides keep appearing, improve the primitive or token usage
  guidance.
- If the same visual bug appears across variants, improve the shared component
  rule rather than patching each variant separately.

## Workflow

1. Capture the feedback precisely: what the user objected to, which artifact is
   involved, and whether the issue is product logic, flow, screen structure,
   hierarchy, layout, component choice, primitive composition, spacing, density,
   typography, color, contrast, motion, interaction, responsiveness,
   accessibility, content resilience, component fit, or CSS quality.
2. Reconstruct evidence before editing: inspect the current source, diff,
   generated UI, screenshot, or Figma handoff. If feedback mentions an original
   component or upstream primitive, inspect that source when available and
   separate original construction laws from the PDS mapping.
   For component anatomy mismatches, explicitly compare root elements,
   sibling/child structure, visible affordances, states, and displayed data
   before changing docs or code.
3. Classify the failure across the four levels above before proposing fixes.
   Identify the highest-priority level involved and the concrete owner category:
   product workflow, screen pattern, layout structure, component choice,
   primitive composition, CSS implementation, token usage, state model,
   accessibility model, or documentation.
4. Diagnose the root cause as missing, failed, ambiguous, conflicting, or
   unowned guidance; missing evidence; implementation shortcut; weak CSS
   convention; token misuse; missing state or accessibility model; missing
   enforcement; or premature systemization.
5. Choose the smallest durable owner using
   [living-system.md](../living-system.md):
   - Component contracts: [components](../components/README.md).
   - Component source, CSS, and tests: `packages/react`.
   - Shared visual usage: foundation docs and `packages/tokens/src`.
   - Flow-level composition: [patterns](../patterns/README.md).
   - Screen-level structure: [screen structures](../screen-structures/README.md).
   - Agent workflow misses: [workflow.md](../workflow.md), this skill workflow,
     or the relevant fixed-location adapter.
6. Self-improve the guidance by writing short, checkable rules tied to the root
   cause. Merge with existing guidance instead of duplicating it.
7. Fix the artifact when the user expects a fix now. Keep CSS layout-focused,
   resilient to long content, localisation, zoom, and responsive widths, and
   token-first. Do not add local token-like names for missing component
   concepts.
8. Add or update regression checks when drift is likely: states, variants,
   content lengths, viewport sizes, zoom, keyboard behavior, focus handling,
   labels, contrast, token use, and shared component variants.
9. Verify with `pnpm check` before handing work back. For docs-only skill
   changes, validate frontmatter, links, and stale routing.

## Response Shape

When performing self-improvement, use this structure:

```md
## Failure classification
- Product reasoning:
- Flow / screen structure:
- Component / system usage:
- Implementation quality:

## Root cause
Explain which decision, missing rule, weak pattern, or implementation choice
caused the issue.

## Immediate fix
Describe the fix needed in the current output.

## System improvement
Describe what should be added or changed in the relevant PDS guidance,
primitive rule, component rule, CSS convention, token rule, accessibility rule,
or agent instruction so the same mistake is less likely to happen again.

## Regression check
List the states, variants, content lengths, viewport sizes, interaction
behaviours, and accessibility behaviours that should be checked after the fix.
```

Also state which durable owner was chosen, which artifact changes were made if
any, and which verification command ran or was skipped with reason.

Do not only defend the previous design decision. If the feedback is valid, PDS
guidance should become harder to misuse next time.
