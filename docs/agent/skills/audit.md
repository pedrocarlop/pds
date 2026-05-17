# Audit A Web Project For PDS

Use this workflow when the user wants to understand how an existing web project
can adopt PDS before making changes. This workflow is read-only unless the user
separately asks for implementation.

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
4. Use [DESIGN.md](../../../DESIGN.md), [workflow.md](../workflow.md), and the
   relevant [recipe](../../recipes/README.md) as the source of truth.
5. Produce a concise adoption plan. Do not edit files.

## Report Shape

- Detected stack and whether the current PDS web path fits.
- Current PDS integration status: dependencies, `pds/styles.css`, public
  imports, token usage, and deep-import risks.
- Recommended adoption path: install/wire styles, migrate one screen, or defer
  because the stack is outside the current React focus.
- Specific files likely to change during implementation.
- Verification commands and manual checks, including responsive layout, long
  content, and 200% zoom.

Only ask follow-up questions when the target project cannot be identified or
when multiple equally plausible product surfaces exist and choosing one would
change the adoption plan.
