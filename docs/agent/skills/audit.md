# Audit A Web Project For PDS

Use this workflow when the user wants to understand how an existing web project
can adopt PDS before making changes. This workflow is read-only unless the user
separately asks for implementation.

## Command

Command: `/pds:audit`.

## Minimum Read Path

Use [router.md](../router.md), this workflow, and the target package manifest,
entrypoints, root styles, and routing/layout files. Add
[add-to-existing-react-app.md](../../recipes/add-to-existing-react-app.md) only
for React adoption paths, [start-new-react-app.md](../../recipes/start-new-react-app.md)
only for fresh-app recommendations, and component/foundation docs only for
specific migration candidates named by the audit.

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
