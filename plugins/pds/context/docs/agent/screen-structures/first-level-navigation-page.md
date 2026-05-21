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

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Layout types](../../foundations/layout-types.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS patterns](../patterns/README.md)
- [PDS React components](../components/README.md)
