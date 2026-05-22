# Review UI Against PDS

Use this workflow when the user wants a PDS-focused review of a web UI change.
The default output is review findings, not code edits, unless the user explicitly
asks to fix the issues.

## Command

Command: `/pds:review-pds`.

## Minimum Read Path

Use [router.md](../router.md), this workflow, changed UI files, nearby source,
and relevant tests. Add the matching
[screen structure](../screen-structures/README.md) for page-level reviews,
component contracts for reviewed components, foundation/pattern docs only for
findings in those owners, and the matching screen or component quality gate.

## Workflow

1. Resolve the review scope from the skill argument, current diff, or current
   project directory.
2. Run the bundled review script from `plugins/pds/skills/review-pds`:

```sh
node ./scripts/review-pds.mjs
node ./scripts/review-pds.mjs --target <path-or-directory>
```

3. Inspect the relevant source manually. Treat script output as hints, not final
   findings.
4. Use the [Minimum Read Path](#minimum-read-path) as the review source of
   truth. Select only the matching structure, pattern, foundation, and component
   docs.
5. Before component-level findings, check that the selected screen structure
   fits the actual product job, navigation model, content priority, state
   placement, and responsive stacking.
6. Return findings first, ordered by severity, with file and line references.
7. If the user pushes back on a design finding or gives component-level feedback,
   switch to [self-improve.md](self-improve.md).

## Review Checklist

- Screen-level findings map to
  [PDS Screen Quality Gates](../pds-screen-quality-gates.md).
- The selected [screen structure](../screen-structures/README.md) fits the
  screen's product job before component-level guidance is applied.
- The selected structure's component mapping, app CSS responsibilities, state
  placement, and quality gates are followed.
- PDS is imported publicly from `@pds/react`; no deep package or source imports.
- `@pds/react/styles.css` is imported once at the app root.
- UI chrome uses PDS tokens instead of hard-coded visual values.
- Inline SVGs, data URI assets, and example fixtures do not contain hard-coded
  color values.
- Local primitives are not recreating existing PDS components without a product
  reason.
- Layout survives narrow viewports, translated or user-generated content, and
  200% zoom.
- Primary actions, required labels, errors, and state feedback remain visible.
- Loading, empty, error, success, disabled, focused, and active states are
  represented where the flow needs them.
- Interactions have accessible names, keyboard behavior, and visible focus.

## Output Shape

Use findings first, then open questions or assumptions, then a short change
summary only if useful, then verification gaps. If there are no issues, say so
clearly and still mention residual risks or test gaps.
