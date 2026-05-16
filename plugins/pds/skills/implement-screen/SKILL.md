---
name: implement-screen
description: Create or modify a web screen from a product brief, design intent, screenshot, or Figma handoff using PDS React components, tokens, recipes, patterns, and existing app conventions. Use when the user asks to implement a screen, flow, page, or UI from design using PDS.
allowed-tools: [Bash, Read, Grep, Glob, Edit, MultiEdit, Write]
---

# Implement A PDS Screen

Use this skill when the user wants a web UI screen or flow built from a product
brief, design intent, screenshot, or Figma handoff. The current implementation
target is React web.

## Inputs

Use the prompt, attached artifacts, and repo context to infer:

- Product job and target audience.
- Target route, page, component, or app shell.
- Required data, states, and actions.
- Source design intent from brief, screenshot, or Figma context.

If a Figma connector is available and the user provided a Figma URL, fetch the
design context first. If no design artifact is available, implement from the
brief and existing product conventions. Ask one concise question only when the
target screen or primary workflow cannot be inferred.

## Workflow

1. Inspect the target app before editing: `package.json`, framework entrypoints,
   root styles, routing/layout files, existing components, and nearby screens.
2. Run the PDS audit script when integration status is unclear:

```sh
node <plugin-root>/skills/audit/scripts/audit-web-project.mjs --target <project-path>
```

3. Load PDS guidance when available through `PDS_REPO_PATH` or the repo-local
   plugin layout:
   - `DESIGN.md`
   - `docs/ai/llm-guidelines.md`
   - `docs/recipes/add-to-existing-react-app.md` or
     `docs/recipes/start-new-react-app.md`
   - relevant `docs/patterns/*`
   - relevant `packages/react/docs/components/*`
4. If PDS is not wired in an existing React app, follow the existing-app recipe:
   install or use the available `pds` package path, import `pds/styles.css`
   once at the app root, and keep app CSS layout-focused.
5. Map the design to PDS primitives before creating local UI:
   `Surface`, `Button`, `Badge`, form controls, overlays, table/data-list,
   navigation primitives, and agent-facing `Message`, `Transcript`,
   `Composer`, or `RunStatus` when the workflow calls for them.
6. Implement the smallest coherent screen or flow. Preserve business logic,
   data loading, routing, analytics, and app-owned state boundaries.
7. Use app CSS only for layout and composition. Use PDS tokens for colors,
   spacing, radius, typography, shadows, and motion. Do not deep-import PDS
   source files.
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

Report the files changed, the PDS components/tokens used, and the verification
commands run. If verification could not run, state the blocker and the command
the user should run next.
