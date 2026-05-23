# PDS React Component Context

These files provide lightweight, implementation-specific context for the React
components exported by `@pds/react`.

Use them with [DESIGN.md](../../../DESIGN.md), not instead of it. `DESIGN.md`
owns the global visual contract and foundation routing. Component context owns
React package behavior: slots, public props, stable `data-*` attributes,
accessibility expectations, content resilience, composition, and known
limitations.

## How Agents Should Use These Files

- Use this index to choose only the component contracts involved in the task,
  then stop.
- Before editing a component, read its component context and source file.
- Before changing `components.css`, read the affected component context plus the
  relevant foundation docs for the visual area being changed.
- Before changing public API, update the component context, exports, and tests
  together.
- Before adding examples or tests, check the documented slots, data attributes,
  state behavior, and limitations.
- Before adding a new component, create its context file from
  [_template.md](_template.md).
- Before handing back a changed public component, ensure the component preview
  passes the browser preview check through `pnpm check`.

## Grouped Navigation

| Purpose | Component contracts |
| --- | --- |
| Actions | [ActionMenu](action-menu.md), [ActionWidget](action-widget.md), [Button](button.md), [ContextMenu](context-menu.md), [Menu](menu.md), [Toggle](toggle.md), [ToggleGroup](toggle-group.md), [Toolbar](toolbar.md) |
| Forms | [Checkbox](checkbox.md), [FilterChip](filter-chip.md), [Form](form.md), [Input](input.md), [Label](label.md), [OneTimePasswordField](one-time-password-field.md), [PasswordToggleField](password-toggle-field.md), [RadioGroup](radio-group.md), [Select](select.md), [Slider](slider.md), [Switch](switch.md), [Textarea](textarea.md) |
| Surfaces | [AlertDialog](alert-dialog.md), [BottomSheet](bottom-sheet.md), [Collapsible](collapsible.md), [Details](details.md), [Dialog](dialog.md), [HoverCard](hover-card.md), [Popover](popover.md), [Surface](surface.md), [Tooltip](tooltip.md) |
| Data | [Accordion](accordion.md), [Amount](amount.md), [AspectRatio](aspect-ratio.md), [Avatar](avatar.md), [Cell](cell.md), [DataList](data-list.md), [ScrollArea](scroll-area.md), [Separator](separator.md), [Table](table.md), [TravelWidget](travel-widget.md) |
| Feedback | [Badge](badge.md), [InlineAlert](inline-alert.md), [Progress](progress.md), [RunStatus](run-status.md), [Skeleton](skeleton.md), [Toast](toast.md) |
| Navigation | [Breadcrumbs](breadcrumbs.md), [Menubar](menubar.md), [NavigationMenu](navigation-menu.md), [PageHeader](page-header.md), [Pagination](pagination.md), [Tabs](tabs.md) |
| Agent-facing | [Composer](composer.md), [Message](message.md), [RunStatus](run-status.md), [Transcript](transcript.md), [VisuallyHidden](visually-hidden.md) |

Choose the matching child doc, then stop expanding this index.

## Complete Index

- [ActionMenu](action-menu.md)
- [ActionWidget](action-widget.md)
- [Accordion](accordion.md)
- [AlertDialog](alert-dialog.md)
- [Amount](amount.md)
- [AspectRatio](aspect-ratio.md)
- [Avatar](avatar.md)
- [Badge](badge.md)
- [Breadcrumbs](breadcrumbs.md)
- [BottomSheet](bottom-sheet.md)
- [Button](button.md)
- [Cell](cell.md)
- [Checkbox](checkbox.md)
- [Collapsible](collapsible.md)
- [ContextMenu](context-menu.md)
- [Surface](surface.md)
- [DataList](data-list.md)
- [Details](details.md)
- [Message](message.md)
- [Composer](composer.md)
- [Dialog](dialog.md)
- [FilterChip](filter-chip.md)
- [Form](form.md)
- [HoverCard](hover-card.md)
- [Icon](icon.md)
- [InlineAlert](inline-alert.md)
- [Input](input.md)
- [Item](item.md)
- [Label](label.md)
- [Menu](menu.md)
- [Menubar](menubar.md)
- [Pagination](pagination.md)
- [NavigationMenu](navigation-menu.md)
- [OneTimePasswordField](one-time-password-field.md)
- [PageHeader](page-header.md)
- [PasswordToggleField](password-toggle-field.md)
- [Popover](popover.md)
- [Progress](progress.md)
- [RadioGroup](radio-group.md)
- [RunStatus](run-status.md)
- [ScrollArea](scroll-area.md)
- [Select](select.md)
- [Separator](separator.md)
- [Skeleton](skeleton.md)
- [Slider](slider.md)
- [Switch](switch.md)
- [Table](table.md)
- [Tabs](tabs.md)
- [Textarea](textarea.md)
- [Toggle](toggle.md)
- [ToggleGroup](toggle-group.md)
- [Toolbar](toolbar.md)
- [Toast](toast.md)
- [Tooltip](tooltip.md)
- [Transcript](transcript.md)
- [TravelWidget](travel-widget.md)
- [VisuallyHidden](visually-hidden.md)

## Validation Expectations

Keep checks lightweight in this phase:

- Every documented component should name its public slots and stable data
  attributes.
- Every React component source file must have a matching component contract,
  source link, component index link, and the required contract sections checked
  by `scripts/check-agent-component-contracts.mjs`.
- Every new component must land with source, component CSS, this docs file,
  example usage in `examples/react`, tests, stable `data-slot` / `data-*`
  attributes, content-resilience notes, and keyboard/focus behavior when
  interactive.
- Component docs should not duplicate token values from `DESIGN.md` or
  `packages/tokens`.
- Component docs should reference current exported component names.
- Add markdown linting or generated doc checks only when the repo already needs
  that tooling.
