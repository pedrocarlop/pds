# Focus Layout

Use this structure for end-to-end task completion.

## Use When

- Create flow.
- Edit flow.
- Onboarding step.
- Setup task.
- Review and confirm.
- Connect account.
- Submit request.
- Any task where the user should stay focused until completion.

## Do Not Use When

- The page is a dashboard.
- The page is a first-level product overview.
- The main job is browsing or scanning.
- The screen needs multiple competing content areas.
- The user needs persistent product navigation.

## Structure

```text
Focus layout
+-- Main navigation hidden
+-- Focus header
|   +-- Back action
|   +-- Title
|   +-- Optional subtitle / progress
+-- Optional local tabs or steps
+-- Single-column content area
+-- Action area
```

## Rules

- Main nav is hidden or suppressed.
- Content is a single column.
- The single-column content area maxes out at `--pds-layout-focus-max`
  (`628px`).
- `--pds-layout-focus-max` is not a page breakpoint; the page breakpoint can be
  chosen by the product surface.
- When the page is narrower than the focus column, keep standard page side
  padding of `--pds-space-sp-400`.
- Supporting guidance is inline, not in side widgets.
- Primary action is obvious.
- Mobile keeps the same order and task hierarchy.

## PDS Component Mapping

- Use `Surface` for form, review, or setup sections.
- Use `Input`, `Select`, `Textarea`, `Checkbox`, `RadioGroup`, or `Switch` for
  data entry.
- Use `InlineAlert` for guidance, warnings, and validation summaries.
- Use `Progress` only when progress is meaningful to task completion.
- Use `Button` for primary and secondary actions.
- Use app CSS only for the centered focus shell, vertical rhythm, and action
  placement.

## App CSS Responsibilities

App CSS may own:

- Focus shell centering.
- `--pds-layout-focus-max` application.
- Page padding.
- Vertical spacing between sections.
- Sticky or bottom action placement when required.

App CSS must not own:

- Component colors.
- Component radius.
- Component typography.
- Component state styling.
- Replacement versions of existing PDS components.

## State Placement

- Validation errors appear inline with fields and in a summary when needed.
- Saving state belongs to the primary action and affected section.
- Blocking errors appear inside the focus column.
- Success can be inline confirmation, completion screen, or redirect depending
  on the task.

## Example

Task: Connect Invopop account.

- Structure: Focus Layout.
- Header: back action, "Connect Invopop".
- Content: one `Surface` with setup explanation, business info review, and
  consent checkbox.
- Actions: primary "Continue to Invopop", secondary "Cancel".
- States: loading connection status, expired connection error, reconnect
  success.

## Quality Gates

- Main product navigation is hidden or suppressed.
- The task is contained in a single column.
- Desktop content width does not exceed `--pds-layout-focus-max` (`628px`).
- The page title clearly states the task.
- Primary action is obvious and easy to reach.
- Supporting content is inline, not in side columns.
- Long labels, translated text, and validation messages do not break the layout.
- Loading, error, success, saving, and disabled states exist where needed.
- The layout remains usable at 200% zoom.
- Mobile preserves the same task order and action hierarchy.

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Layout types](../../foundations/layout-types.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS patterns](../patterns/README.md)
- [PDS React components](../components/README.md)
