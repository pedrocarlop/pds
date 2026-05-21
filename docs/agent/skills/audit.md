# Audit A Web Project For PDS

Use this workflow when the user wants to understand how an existing web project
can adopt PDS before making changes. This workflow is read-only unless the user
separately asks for implementation.

## Minimum Read Path

Always read:

- [router.md](../router.md)
- This workflow
- Target project package manifest, app entrypoints, root styles, and
  routing/layout files named by the audit report

Choose one:

- [add-to-existing-react-app.md](../../recipes/add-to-existing-react-app.md) for
  React apps that can adopt `@pds/react`
- No recipe when the target stack is outside the current React focus

Read only if relevant:

- [start-new-react-app.md](../../recipes/start-new-react-app.md) when the audit
  result is to create a fresh app instead
- Component contracts only for a specific migration candidate
- Foundation docs only when token or visual migration risk is being assessed

Do not read:

- Every component contract
- Screen structures or patterns unless the audit names a specific screen or flow
- Architecture docs unless package ownership or file moves are part of the plan

## Workflow

1. Resolve the target project from the skill argument or the current working
   directory.
2. Run the bundled audit script from `plugins/pds/skills/audit`:

```sh
node ./scripts/audit-web-project.mjs
node ./scripts/audit-web-project.mjs --target <project-path>
```

3. Read the target project's package manifest, app entrypoints, root styles, and
   routing/layout files named by the audit report.
4. Use the [Minimum Read Path](#minimum-read-path) as the source of truth.
5. Produce a concise adoption plan. Do not edit files.

## Report Shape

- Detected stack and whether the current PDS web path fits.
- Current PDS integration status: dependencies, `@pds/react/styles.css`, public
  imports, token usage, and deep-import risks.
- Recommended adoption path: install/wire styles, migrate one screen, or defer
  because the stack is outside the current React focus.
- Specific files likely to change during implementation.
- Verification commands and manual checks, including responsive layout, long
  content, and 200% zoom.

Only ask follow-up questions when the target project cannot be identified or
when multiple equally plausible product surfaces exist and choosing one would
change the adoption plan.
