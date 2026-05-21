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
- Desktop max width uses `--pds-layout-focus-max` (`628px`).
- Supporting guidance is inline, not in side widgets.
- Primary action is obvious.
- Mobile keeps the same order and task hierarchy.

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Layout types](../../foundations/layout-types.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS patterns](../patterns/README.md)
- [PDS React components](../components/README.md)
