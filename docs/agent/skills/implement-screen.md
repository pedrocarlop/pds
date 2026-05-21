# Implement A PDS Screen

Use this workflow when the user wants a React web UI screen or flow built from a
brief, design intent, screenshot, or Figma handoff.

## Inputs

Infer the product job, target audience, target route or component, required
data/states/actions, and source design intent. If a Figma connector is available
and the user provided a Figma URL, fetch design context first. Ask one concise
question only when the target screen or primary workflow cannot be inferred.

## Structure Selection

Before editing, choose one screen structure from
[docs/agent/screen-structures](../screen-structures/README.md). State:

- Product job
- Chosen structure
- Why this structure fits
- Primary action
- Secondary actions
- Main content region
- Supporting content regions
- Required states
- Mobile stacking order

Do not start implementation until the structure is clear.

Use [First Level Navigation Page](../screen-structures/first-level-navigation-page.md)
when the screen is a top-level product area.

Use [Focus Layout](../screen-structures/focus-layout.md) when the screen is a
single-task flow where the user completes an action from beginning to end.

If neither fits, state the closest structure and document the missing structure
as a possible future addition.

## Workflow

1. Inspect the target app before editing: `package.json`, framework entrypoints,
   root styles, routing/layout files, existing components, and nearby screens.
2. Run the audit script when integration status is unclear:

```sh
node <plugin-root>/skills/audit/scripts/audit-web-project.mjs --target <project-path>
```

3. Load PDS guidance: [DESIGN.md](../../../DESIGN.md),
   [workflow.md](../workflow.md), the relevant [recipe](../../recipes/README.md),
   relevant [screen structure](../screen-structures/README.md), relevant
   [patterns](../patterns/README.md), and relevant
   [component contracts](../components/README.md).
4. Complete [Structure Selection](#structure-selection) before making code
   changes.
5. If PDS is not wired in an existing React app, follow the existing-app recipe:
   install or use the available `@pds/react` package path, import `@pds/react/styles.css`
   once at the app root, and keep app CSS layout-focused.
6. Map the design to PDS primitives before creating local UI: surfaces,
   buttons, badges, form controls, overlays, table/data-list, navigation, and
   agent-facing `Message`, `Transcript`, `Composer`, or `RunStatus` when the
   workflow calls for them.
7. Implement the smallest coherent screen or flow. Preserve business logic,
   data loading, routing, analytics, and app-owned state boundaries.
8. Use app CSS only for layout and composition. Use PDS tokens for visuals and
   do not deep-import PDS source files.
9. Verify with the app's normal typecheck/build/test command. For visible UI,
   check narrow viewport, long text, loading/empty/error/success states, and
   200% zoom where practical.

## Defaults

- Prefer modifying the existing screen over creating a parallel demo.
- Prefer public imports from `@pds/react` over local equivalents.
- Keep generated UI operational, dense, inspectable, and product-focused.
- Do not create marketing pages, docs sites, Storybook, or new PDS components
  unless the user explicitly asks.

## Completion Message

Report files changed, PDS components/tokens used, and verification commands run.
If verification could not run, state the blocker and command to run next.
