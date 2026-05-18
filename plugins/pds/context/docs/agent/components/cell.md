# Cell

## Purpose

Cell is the base row primitive for simple static, action, disclosure, and
selectable rows. It owns the row shell, density, state styling, and side
affordances without imposing richer item slots.

## When To Use

- Use for simple row content that does not need avatar, description, side, or
  action slots.
- Use for full-row actions, navigation/disclosure rows, selectable rows, and
  compact settings rows.
- Use repeated Cells for dense lists where the row itself is the unit of scan
  and action.

## When Not To Use

- Do not use Cell for rich rows that need multiple named content areas; create
  or use a richer item primitive when that contract exists.
- Do not use `variant="disclosure"` unless the row navigates or reveals more
  content.
- Do not use `variant="choice"` unless selection state is exposed with
  `aria-pressed` or an equivalent consumer-owned state.
- Do not put required form labels only in Cell styling; controls still need
  accessible names.

## Anatomy / Slots

Cell has one public root slot. Children are freeform row content.

```tsx
<Cell>Default cell</Cell>
<Cell use="button">Interactive cell</Cell>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `default`, `disclosure`, `choice`, `compact`, `accent`, `nested` | `default` | Maps to row density, emphasis, or side affordance. |
| `use` | React element type | `div` | Renders the root element. Prefer `button` for full-row actions and `label` for native labelable controls. |
| `disabled` | `boolean` | `false` | Native `disabled` on `button`; `aria-disabled` on non-button roots. |
| `inactive` | `boolean` | `false` | De-emphasises a visible row without removing interaction by itself. |
| `type` | Native button type | `button` | Applied only when `use="button"`. |
| `aria-pressed` | ARIA pressed state | Consumer-owned | Drives selected styling and the `choice` check affordance. |

Cell extends native HTML attributes, forwards refs to the rendered root, and
preserves `className`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `cell` | Component |
| `data-variant` | `default`, `disclosure`, `choice`, `compact`, `accent`, `nested` | Component |
| `data-disabled` | `true` when disabled | Component |
| `data-inactive` | `true` when inactive | Component |

## Accessibility Contract

Cell does not invent interaction semantics. Consumers choose the root element:
use `use="button"` for action rows, anchors or router links for navigation, and
`use="label"` only with native labelable controls. Button cells default to
`type="button"` to avoid accidental form submission.

Selectable button-style cells should expose `aria-pressed`. Disabled button
cells use native `disabled`; disabled non-button cells receive
`aria-disabled="true"`, but consumers still own suppressing activation for
custom interactive roots.

The disclosure chevron and choice check are CSS affordances. They are decorative
state cues and do not replace accessible names, current-state text, or ARIA
state.

## Content Resilience Rules

Cell content wraps by default and aligns row siblings to the tallest item. Keep
simple row labels scannable, but do not truncate user-generated or translated
content inside the primitive.

Side affordances are fixed visual cues; primary row content remains flexible
with `min-width: 0` and `overflow-wrap: anywhere`.

## Styling Contract

The root class is `pds-cell`; styling lives in
`packages/react/src/components.css`.

CSS depends on `data-variant`, `aria-pressed`, `data-inactive`, native
`:disabled`, `[aria-disabled="true"]`, `:hover`, `:active`, and
`:focus-visible`. Preserve the CSS-generated disclosure and choice affordances
when changing row DOM so Cell stays a one-slot primitive.

## Token Usage

Cell uses PDS surface color, state layer, accent, typography, spacing, radius,
focus, disabled opacity, and motion tokens. Do not add hard-coded colors,
spacing, radii, transitions, or one-off divider strokes.

The default Cell surface is widget background, not page/grouped background and
not a custom cell-specific background token. In PDS tokens that maps to
`--pds-color-base-widget-background`.

The default outer row radius is the list/widget radius, currently represented by
`--pds-radius-primary` (`24px`). Do not use nested radius for the root Cell
shape.

The default row padding is `--pds-space-sp-300` vertically and
`--pds-space-sp-400` horizontally. Primary row text uses foreground color and an
`emphasis1` type recipe. Supporting description text inside a Cell should use
`--pds-color-grey-tone-50` with a `body1` type recipe when the consumer provides
that content.

## State Behavior

- Hover and active treatments apply only to interactive roots and are suppressed
  for native disabled and `aria-disabled` rows.
- `aria-pressed="true"` applies selected state styling.
- `variant="choice"` shows the check affordance only when
  `aria-pressed="true"`.
- `inactive` lowers text emphasis without changing semantics.
- `variant="nested"` lowers row contrast for use inside another grouped context.

## Reusable Component Laws

- One primitive owns one structural job; richer slots should move to a richer
  component instead of bloating Cell.
- Semantics come from native elements or explicit ARIA, not from visual
  variants.
- Visual variants must map to behavior or hierarchy: disclosure, choice,
  compact density, accent emphasis, and nested context.
- State styling should read native or ARIA state attributes before adding new
  props.
- Side affordances should be decorative CSS when they do not add semantic
  content.
- Rows should use tokenized surface composition and state layers, not borders or
  hard-coded colors.

## Composition Examples

```tsx
import { Cell } from "@pds/react";

<Cell>Static cell</Cell>

<Cell use="button" onClick={() => startRun()}>
  Run agent
</Cell>

<Cell use="button" variant="disclosure" onClick={() => openDetails()}>
  View details
</Cell>

<Cell
  aria-pressed={selected}
  onClick={() => setSelected(!selected)}
  use="button"
  variant="choice"
>
  Require review
</Cell>

<Cell use="label">
  <input type="checkbox" />
  Enable notifications
</Cell>
```

## Known Limitations

- Cell does not provide avatar, description, side, action, or metadata slots.
- Cell does not manage selection groups or roving focus.
- Cell does not polyfill disabled behavior for custom non-button roots.
- PDS Checkbox and RadioGroup are Radix button-based controls; label them
  directly with ARIA or visible adjacent text instead of assuming an HTML label
  wraps them like native inputs.

## Do / Don't For Agents

Do:

- Preserve `data-slot`, `data-variant`, `aria-pressed`, disabled, and inactive
  selectors.
- Use `use="button"` for full-row actions and pair selection with
  `aria-pressed`.
- Keep Cell one-slot and move richer row structure into a separate component
  contract when needed.

Don't:

- Do not add avatar/content/side/action slots to Cell.
- Do not use disclosure or choice styling without matching behavior/state.
- Do not introduce physical dividers or one-off row colors.

## Related Components

- [Button](button.md)
- [Checkbox](checkbox.md)
- [RadioGroup](radio-group.md)
- [DataList](data-list.md)
- [Surface](surface.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [Spacing and radius](../../foundations/spacing.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Cell source](../../../packages/react/src/components/cell.tsx)
