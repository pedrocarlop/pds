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
- Use the generated [React component API reference](../../reference/react-components.md)
  for the current TypeScript export and prop surface, then return to the
  component contract for behavior, accessibility, and composition guidance.
- Use the generated [supported surface matrix](../../reference/supported-surface-matrix.md)
  when checking maturity, source, docs, preview, tests, a11y/focus coverage, and
  known gaps across the component set.
- Before adding examples or tests, check the documented slots, data attributes,
  state behavior, and limitations.
- Before handing back component documentation, ensure the contract includes the
  generated preview image from `images/<component-id>.png` before `## When To Use`.
- Before adding a new component, create its context file from
  [_template.md](_template.md).
- Before handing back a changed public component, ensure the component preview
  passes the browser preview check through `pnpm check`.

## Grouped Navigation

| Purpose | Component contracts |
| --- | --- |
| Actions | [ActionMenu](action-menu.md), [ActionWidget](action-widget.md), [Button](button.md), [ButtonGroup](button-group.md), [Command](command.md), [ContextMenu](context-menu.md), [DropdownMenu](dropdown-menu.md), [Menu](menu.md), [Menubar](menubar.md) |
| Forms | [Calendar](calendar.md), [Checkbox](checkbox.md), [Combobox](combobox.md), [Field](field.md), [FilterChip](filter-chip.md), [Input](input.md), [InputGroup](input-group.md), [InputOTP](input-otp.md), [Label](label.md), [NativeSelect](native-select.md), [RadioGroup](radio-group.md), [Select](select.md), [Slider](slider.md), [Switch](switch.md), [Textarea](textarea.md), [Toggle](toggle.md), [ToggleGroup](toggle-group.md) |
| Surfaces | [Accordion](accordion.md), [AlertDialog](alert-dialog.md), [BottomSheet](bottom-sheet.md), [Card](card.md), [Collapsible](collapsible.md), [Details](details.md), [Dialog](dialog.md), [Drawer](drawer.md), [HoverCard](hover-card.md), [Popover](popover.md), [ScrollArea](scroll-area.md), [Separator](separator.md), [Sheet](sheet.md), [Surface](surface.md), [Tooltip](tooltip.md) |
| Data | [Amount](amount.md), [AspectRatio](aspect-ratio.md), [Avatar](avatar.md), [Carousel](carousel.md), [Cell](cell.md), [Chart](chart.md), [DataList](data-list.md), [Resizable](resizable.md), [Table](table.md), [TravelWidget](travel-widget.md) |
| Feedback | [Alert](alert.md), [Badge](badge.md), [Empty](empty.md), [InlineAlert](inline-alert.md), [Progress](progress.md), [RunStatus](run-status.md), [Skeleton](skeleton.md), [Spinner](spinner.md), [Toast](toast.md), [Toaster](sonner.md) |
| Navigation | [Breadcrumb](breadcrumb.md), [Breadcrumbs](breadcrumbs.md), [NavigationMenu](navigation-menu.md), [PageHeader](page-header.md), [Pagination](pagination.md), [Sidebar](sidebar.md), [Tabs](tabs.md) |
| Agent-facing | [Composer](composer.md), [Message](message.md), [RunStatus](run-status.md), [Transcript](transcript.md) |
| Utilities | [DirectionProvider](direction.md), [Icon](icon.md), [Kbd](kbd.md) |

Choose the matching child doc, then stop expanding this index.

## Complete Index

- [ActionMenu](action-menu.md)
- [ActionWidget](action-widget.md)
- [Accordion](accordion.md)
- [Alert](alert.md)
- [AlertDialog](alert-dialog.md)
- [Amount](amount.md)
- [AspectRatio](aspect-ratio.md)
- [Avatar](avatar.md)
- [Badge](badge.md)
- [Breadcrumb](breadcrumb.md)
- [Breadcrumbs](breadcrumbs.md)
- [BottomSheet](bottom-sheet.md)
- [Button](button.md)
- [ButtonGroup](button-group.md)
- [Calendar](calendar.md)
- [Card](card.md)
- [Carousel](carousel.md)
- [Cell](cell.md)
- [Chart](chart.md)
- [Checkbox](checkbox.md)
- [Collapsible](collapsible.md)
- [Combobox](combobox.md)
- [Command](command.md)
- [ContextMenu](context-menu.md)
- [Surface](surface.md)
- [DataList](data-list.md)
- [Details](details.md)
- [DirectionProvider](direction.md)
- [Message](message.md)
- [Composer](composer.md)
- [Dialog](dialog.md)
- [Drawer](drawer.md)
- [DropdownMenu](dropdown-menu.md)
- [Empty](empty.md)
- [Field](field.md)
- [FilterChip](filter-chip.md)
- [HoverCard](hover-card.md)
- [Icon](icon.md)
- [InlineAlert](inline-alert.md)
- [Input](input.md)
- [InputGroup](input-group.md)
- [InputOTP](input-otp.md)
- [Item](item.md)
- [Kbd](kbd.md)
- [Label](label.md)
- [Menu](menu.md)
- [Menubar](menubar.md)
- [NativeSelect](native-select.md)
- [NavigationMenu](navigation-menu.md)
- [Pagination](pagination.md)
- [PageHeader](page-header.md)
- [Popover](popover.md)
- [Progress](progress.md)
- [RadioGroup](radio-group.md)
- [Resizable](resizable.md)
- [RunStatus](run-status.md)
- [ScrollArea](scroll-area.md)
- [Select](select.md)
- [Separator](separator.md)
- [Sheet](sheet.md)
- [Sidebar](sidebar.md)
- [Slider](slider.md)
- [Skeleton](skeleton.md)
- [Spinner](spinner.md)
- [Switch](switch.md)
- [Table](table.md)
- [Tabs](tabs.md)
- [Textarea](textarea.md)
- [Toast](toast.md)
- [Toaster](sonner.md)
- [Toggle](toggle.md)
- [ToggleGroup](toggle-group.md)
- [Tooltip](tooltip.md)
- [Transcript](transcript.md)
- [TravelWidget](travel-widget.md)

## Validation Expectations

Keep checks lightweight in this phase:

- Every documented component should name its public slots and stable data
  attributes.
- Every React component source file must have a matching component contract,
  source link, component index link, generated preview image, and the required
  contract sections checked by `scripts/check-agent-component-contracts.mjs`.
- Every new component must land with source, component CSS, this docs file,
  example usage in `examples/react`, generated preview image, tests, stable
  `data-slot` / `data-*` attributes, content-resilience notes, and
  keyboard/focus behavior when interactive.
- Component docs should not duplicate token values from `DESIGN.md` or
  `packages/tokens`.
- Component docs should reference current exported component names.
- Add markdown linting or generated doc checks only when the repo already needs
  that tooling.
