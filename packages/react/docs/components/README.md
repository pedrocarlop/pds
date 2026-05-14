# PDS React Component Context

These files provide lightweight, implementation-specific context for the React
components exported by `pds`.

Use them with [DESIGN.md](../../../../DESIGN.md), not instead of it. `DESIGN.md`
owns the global visual contract and foundation routing. Component context owns
React package behavior: slots, public props, stable `data-*` attributes,
accessibility expectations, content resilience, composition, and known
limitations.

## How Agents Should Use These Files

- Before editing a component, read its component context and source file.
- Before changing `components.css`, read the affected component context plus the
  relevant foundation docs.
- Before changing public API, update the component context, package README,
  exports, and tests together.
- Before adding examples or tests, check the documented slots, data attributes,
  state behavior, and limitations.
- Before adding a new component, create its context file from
  [_template.md](_template.md).

## Current Context Files

- [Avatar](avatar.md)
- [Badge](badge.md)
- [Button](button.md)
- [Surface](surface.md)
- [Message](message.md)
- [Composer](composer.md)
- [Dialog](dialog.md)
- [Input](input.md)
- [RunStatus](run-status.md)
- [Textarea](textarea.md)
- [Tooltip](tooltip.md)
- [Transcript](transcript.md)

## Validation Expectations

Keep checks lightweight in this phase:

- Every documented component should name its public slots and stable data
  attributes.
- Component docs should not duplicate token values from `DESIGN.md` or
  `packages/tokens`.
- Component docs should reference current exported component names.
- Add markdown linting or generated doc checks only when the repo already needs
  that tooling.
