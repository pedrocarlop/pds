# Implement A PDS Screen

Use this workflow when the user wants a React web UI screen or flow built from a
brief, design intent, screenshot, or Figma handoff.

## Command

Command: `/pds:implement-screen`.

## Inputs

Infer the product job, target audience, target route or component, required
data/states/actions, and source design intent. If a Figma connector is available
and the user provided a Figma URL, fetch design context first. Ask one concise
question only when the target screen or primary workflow cannot be inferred.

## Minimum Read Path

Use [router.md](../router.md), [workflow.md](../workflow.md), this workflow,
target app source, routing/layout files, root styles, and nearby screens. Choose
one [screen structure](../screen-structures/README.md), add one
[pattern](../patterns/README.md) only for a documented repeated flow, and read
only the component contracts, foundations, [docs/recipes](../../recipes), and
[PDS Screen Quality Gates](../pds-screen-quality-gates.md) needed by the
selected screen.

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

## Pre-build Preview

Before editing files, output a PDS implementation preview:

- Job: user goal in one sentence
- Structure: chosen screen structure
- Route / target: file or screen being changed
- PDS components: components planned for composition
- Local CSS: layout-only responsibilities
- States: loading, empty, error, success, disabled, focus, active
- Resilience: narrow viewport, 40% longer text, 200% zoom
- Verification: commands to run

Use this format:

```md
PDS implementation preview:
- Job: let the merchant review and complete business information
- Structure: Focus Layout
- Target: src/routes/business-info.tsx
- PDS components: Surface, Input, Select, Checkbox, InlineAlert, Button
- Local CSS: centered 628px focus shell and vertical section spacing
- States: loading, validation error, saving, saved, disabled submit
- Resilience: long labels, translated helper text, 200% zoom
- Verification: pnpm check
```

This gives the user a chance to redirect before the agent creates the wrong
shape.

## Workflow

1. Inspect the target app before editing: `package.json`, framework entrypoints,
   root styles, routing/layout files, existing components, and nearby screens.
2. Run the audit script when integration status is unclear:

```sh
node <plugin-root>/skills/audit/scripts/audit-web-project.mjs --target <project-path>
```

3. Load PDS guidance through the [Minimum Read Path](#minimum-read-path). Use
   indexes to choose matching structure, pattern, and component docs, then stop.
4. Complete [Structure Selection](#structure-selection) and output the
   [Pre-build Preview](#pre-build-preview) before making code changes.
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
   200% zoom where practical. Do not hand back until the
   [PDS Screen Quality Gates](../pds-screen-quality-gates.md) pass.

## Defaults

- Prefer modifying the existing screen over creating a parallel demo.
- Prefer public imports from `@pds/react` over local equivalents.
- Keep generated UI operational, dense, inspectable, and product-focused.
- Do not create marketing pages, docs sites, Storybook, or new PDS components
  unless the user explicitly asks.

## Completion Message

Report files changed, PDS components/tokens used, and verification commands run.
If verification could not run, state the blocker and command to run next.
