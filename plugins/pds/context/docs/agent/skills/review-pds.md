# Review UI Against PDS

Use this workflow when the user wants a PDS-focused review of a web UI change.
The default output is review findings, not code edits, unless the user explicitly
asks to fix the issues.

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
4. Use [DESIGN.md](../../../DESIGN.md), foundation docs, pattern docs, and
   component contracts as the review source of truth.
5. Return findings first, ordered by severity, with file and line references.
6. If the user pushes back on a design finding or gives component-level feedback,
   switch to [self-improve.md](self-improve.md).

## Review Checklist

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
