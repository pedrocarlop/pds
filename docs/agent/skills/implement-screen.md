# Implement A PDS Screen

Use this workflow when the user wants a React web UI screen or flow built from a
brief, design intent, screenshot, or Figma handoff.

## Inputs

Infer the product job, target audience, target route or component, required
data/states/actions, and source design intent. If a Figma connector is available
and the user provided a Figma URL, fetch design context first. Ask one concise
question only when the target screen or primary workflow cannot be inferred.

## Workflow

1. Inspect the target app before editing: `package.json`, framework entrypoints,
   root styles, routing/layout files, existing components, and nearby screens.
2. Run the audit script when integration status is unclear:

```sh
node <plugin-root>/skills/audit/scripts/audit-web-project.mjs --target <project-path>
```

3. Load PDS guidance: [DESIGN.md](../../../DESIGN.md),
   [workflow.md](../workflow.md), the relevant [recipe](../../recipes/README.md),
   relevant [patterns](../patterns/README.md), and relevant
   [component contracts](../components/README.md).
4. If PDS is not wired in an existing React app, follow the existing-app recipe:
   install or use the available `pds` package path, import `pds/styles.css`
   once at the app root, and keep app CSS layout-focused.
5. Map the design to PDS primitives before creating local UI: surfaces,
   buttons, badges, form controls, overlays, table/data-list, navigation, and
   agent-facing `Message`, `Transcript`, `Composer`, or `RunStatus` when the
   workflow calls for them.
6. Implement the smallest coherent screen or flow. Preserve business logic,
   data loading, routing, analytics, and app-owned state boundaries.
7. Use app CSS only for layout and composition. Use PDS tokens for visuals and
   do not deep-import PDS source files.
8. Verify with the app's normal typecheck/build/test command. For visible UI,
   check narrow viewport, long text, loading/empty/error/success states, and
   200% zoom where practical.

## Defaults

- Prefer modifying the existing screen over creating a parallel demo.
- Prefer public imports from `pds` over local equivalents.
- Keep generated UI operational, dense, inspectable, and product-focused.
- Do not create marketing pages, docs sites, Storybook, or new PDS components
  unless the user explicitly asks.

## Completion Message

Report files changed, PDS components/tokens used, and verification commands run.
If verification could not run, state the blocker and command to run next.
