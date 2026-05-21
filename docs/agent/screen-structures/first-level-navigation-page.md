# First Level Navigation Page

Use this structure for first-level product pages where the user is entering a
product area.

## Use When

- Product area home.
- People.
- Orders.
- Invoices.
- Customers.
- Transactions.
- Settings overview.
- Section reached from main product navigation.

## Do Not Use When

- The user is completing a task end to end.
- The page is a detail page.
- The page is a wizard.
- The page is a modal flow.
- The user should be focused on one action only.

## Structure

```text
Product shell
+-- Product navigation
+-- Page header
|   +-- Back affordance, optional
|   +-- Title
|   +-- Subtitle, optional
|   +-- Page actions
+-- Horizontal menu tabs
+-- Main content area
|   +-- Primary region
|   +-- Secondary region
+-- Mobile stacked equivalent
```

## Rules

- Product navigation is visible on desktop.
- Header owns title, subtitle, and page actions.
- Menu tabs sit below the header.
- Primary content region is dominant.
- Secondary modules support the main task.
- Mobile keeps the same content priority, but stacks sections.
- Mobile does not become a different IA.

## PDS Component Mapping

- Use `Surface` for secondary modules and contained content groups.
- Use `Tabs` when menu tabs control local page content.
- Use `Table`, `DataList`, `Cell`, or `Item` for the primary region.
- Use `Button`, `ActionMenu`, or `Popover` for page actions.
- Use `Badge`, `InlineAlert`, `Progress`, or `RunStatus` for status.
- Use app CSS only for shell, columns, header placement, and responsive
  stacking.

## App CSS Responsibilities

App CSS may own:

- Product shell layout.
- Header, tab, primary, and secondary region placement.
- Column widths and responsive stacking.
- Page padding and section spacing.
- Sticky or reachable page action placement when required.

App CSS must not own:

- Component colors.
- Component radius.
- Component typography.
- Component state styling.
- Replacement versions of existing PDS components.

## State Placement

- Loading state belongs to the primary content region first.
- Empty state should explain what is missing and provide the next action.
- Error state should appear near the affected region, not only as a global
  toast.
- Success state should preserve page context and update the relevant region.

## Example

Task: People section overview.

- Structure: First Level Navigation Page.
- Header: "People", invite action, filters action.
- Tabs: Team, Roles, Invites.
- Primary region: people table.
- Secondary region: role summary, pending invites, recent changes.
- Mobile: table or list first, summary modules below.

## Quality Gates

- Product navigation is visible on desktop when the app shell supports it.
- Page title, subtitle, and actions are grouped in the header.
- Menu tabs are visually separate from global navigation.
- The primary content area is dominant.
- Secondary modules support, not compete with, the main task.
- Mobile preserves the same content priority as desktop.
- Tabs can scroll horizontally without causing page-level overflow.
- Primary action remains visible or easy to reach on mobile.
- Loading, empty, error, and success states exist for the primary content
  region.
- Long titles, translated tab labels, and 200% zoom do not break the header.

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Layout types](../../foundations/layout-types.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS patterns](../patterns/README.md)
- [PDS React components](../components/README.md)
