# PDS Elevation Guidelines

Elevation creates hierarchy with shadow only when spacing, surface contrast, and
layout position are not enough. Use it sparingly so dense product UI stays calm,
inspectable, and token-first.

Sources: [DESIGN.md](../../DESIGN.md) and
[packages/tokens/src/elevation.css](../../packages/tokens/src/elevation.css).

## Core Rules

- Use elevation to clarify layer order, focused interaction, or overlay depth.
- Prefer surface tokens, spacing, and layout hierarchy before adding shadow.
- Keep elevation subtle in operational UI. Shadows should not become decorative
  lighting effects.
- Do not invent one-off `box-shadow` values in components, examples, product UI,
  inline styles, or local CSS. Add or use a PDS token instead.

## Tokens

- `--pds-shadow-surface`: subtle surface lift for grouped modules, popovers,
  sheets, and panels that need separation from the grouped background.
- `--pds-shadow-focus`: keyboard focus emphasis. It is built from
  `--pds-color-state-focus-ring` and should remain visibly tied to the color
  state system.

## Usage

- Use `--pds-shadow-surface` only on surfaces that need extra hierarchy beyond
  background contrast.
- Pair shadow with existing PDS surface and radius tokens. Do not use shadow to
  compensate for missing spacing, unclear information architecture, or weak
  component anatomy.
- Avoid stacking multiple shadows on nested surfaces. Nested hierarchy should
  usually come from `--pds-color-base-nested-background`,
  `--pds-radius-nested`, and spacing.
- Do not use elevation as a replacement for borders, dividers, validation
  states, disabled states, or selection states.

## Focus

- Use `--pds-shadow-focus` for focus-visible affordances on interactive
  elements unless the component contract defines a more specific focus pattern.
- Focus treatment must remain visible on dark surfaces and should not be
  replaced by hover, active, selected, or disabled styling.
- Invalid focus can combine the component's focus treatment with invalid color
  guidance from [colour.md](colour.md) when the component contract requires it.

## Do Not

- Do not hard-code shadow offsets, blur, spread, or color values.
- Do not add decorative atmospheric shadows to dense product UI.
- Do not use elevation to communicate semantic status, risk, success, warning,
  danger, or performance direction.
- Do not hide required state feedback behind shadow changes alone.
