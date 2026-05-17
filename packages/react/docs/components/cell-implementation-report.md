# Cell Implementation Report

## Scope

This report describes how `Cell` is built from the raw implementation, not from
the public usage docs. It is intended as a guide for future row-like PDS
components that need the same underlying laws: native semantics, state-driven
styling, token-only visuals, and resilient content behavior.

Raw sources inspected:

- [Cell source](../../src/components/cell.tsx)
- [Component CSS](../../src/components.css)
- [Component tests](../../src/components/components.test.tsx)
- [CSS contract tests](../../src/components/css-contract.test.ts)
- [Example section](../../../../examples/react/src/sections/CellsSection.tsx)

## Component Shape

`Cell` is intentionally a one-slot primitive. The root is the component; all row
content is passed through `children`. The source does not define title,
description, side, avatar, action, or metadata slots. That absence is part of
the contract: Cell is a row shell, not a rich item system.

The exported API is small:

```tsx
export type CellVariant =
  | "default"
  | "disclosure"
  | "choice"
  | "compact"
  | "accent"
  | "nested";

export interface CellProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  inactive?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  use?: React.ElementType;
  variant?: CellVariant;
}
```

The main construction rule is: `Cell` owns row structure and styling, while the
consumer owns semantic meaning by choosing the rendered element with `use`.

## Render Model

The component renders `use` as `Comp`, defaulting to `div`. It forwards the ref
to the rendered root and always attaches the same class and stable data
attributes.

Important defaults:

- `use` defaults to `div`.
- `variant` defaults to `default`.
- `disabled` and `inactive` default to `false`.
- `type` defaults to `button`, but is only applied when `use="button"`.

The button-specific guard is deliberate. A Cell used inside a form should not
accidentally submit the form just because it renders as a button.

```tsx
const isButton = Comp === "button";

<Comp
  disabled={isButton ? disabled : undefined}
  type={isButton ? type : undefined}
  {...props}
/>
```

For non-button roots, `disabled` is represented as ARIA state:

```tsx
const resolvedAriaDisabled =
  ariaDisabled ?? (!isButton && disabled ? true : undefined);
```

This preserves native disabled behavior where it exists and avoids pretending
that arbitrary elements support native `disabled`.

## DOM Contract

Every Cell root receives:

- `className="pds-cell"` plus any consumer class.
- `data-slot="cell"`.
- `data-variant` equal to the selected variant.
- `data-disabled="true"` only when disabled.
- `data-inactive="true"` only when inactive.

These attributes are the bridge between TypeScript props, CSS behavior, and
tests. Future components should follow the same pattern: public props should
resolve to stable `data-*` hooks, and CSS should style those hooks instead of
depending on fragile DOM position.

## CSS Architecture

The base Cell rule defines a full-width flexible row:

```css
.pds-cell {
  --pds-cell-background: var(--pds-color-base-nested-background);

  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: 44px;
  align-items: center;
  gap: var(--pds-space-sp-300);
  border: 0;
  border-radius: var(--pds-radius-nested);
  padding: var(--pds-space-sp-300) var(--pds-space-sp-400);
  color: var(--pds-color-foreground);
  background: var(--pds-cell-background);
  font-size: var(--pds-body2);
  font-weight: var(--pds-fw-body);
  line-height: var(--pds-lh-body2);
  text-align: left;
  text-decoration: none;
  outline: none;
  overflow-wrap: anywhere;
  white-space: normal;
}
```

Several laws are embedded here:

- Full-width rows use `width: 100%`.
- Flexible row content uses `display: flex`, `min-width: 0`, and wrapping text.
- The row is boundless by default: it can grow taller when text wraps.
- No physical border is used for normal row structure.
- All visual values come from PDS tokens.

The local CSS variable `--pds-cell-background` is the state composition point.
Variants and selected state change that variable; hover and pressed layers then
compose on top of whatever the current base background is.

## Interaction Gate

Cell only shows pointer and hover/pressed treatments when the rendered root is
interactive by element or role:

```css
.pds-cell:is(button, a, label, [role="button"]) {
  cursor: pointer;
}
```

Hover and active states are gated by the same interactive selector and disabled
exclusion:

```css
.pds-cell:is(button, a, label, [role="button"]):not(:disabled, [aria-disabled="true"]):hover
.pds-cell:is(button, a, label, [role="button"]):not(:disabled, [aria-disabled="true"]):active
```

This prevents static rows from pretending to be clickable and suppresses
interactive feedback for disabled rows. The rule to reuse: visual interactivity
must follow actual semantics or explicit ARIA role, not merely the component
name.

## State Model

Cell state is mostly external and attribute-driven:

| State | Raw signal | Implementation |
| --- | --- | --- |
| Disabled button | `disabled` prop with `use="button"` | Native `disabled`, shared disabled CSS. |
| Disabled non-button | `disabled` prop with non-button `use` | `aria-disabled="true"` plus `data-disabled`. |
| Inactive | `inactive` prop | `data-inactive="true"` lowers text emphasis. |
| Selected/pressed | Consumer `aria-pressed="true"` | Selected background via `--pds-cell-background`. |
| Choice selected | `variant="choice"` plus `aria-pressed="true"` | CSS checkmark becomes visible. |

The implementation does not create internal state. That makes Cell safe as a
primitive: consumers wire selection, navigation, disclosure, or form control
state explicitly.

## Variant Model

Variants are not arbitrary visual skins. Each one maps to a structural or
behavioral reason.

| Variant | Raw CSS behavior | Intended meaning |
| --- | --- | --- |
| `default` | Base row background, default height and padding. | Plain static or interactive row. |
| `disclosure` | Adds right padding and a CSS chevron. | Row leads somewhere or reveals another surface. |
| `choice` | Adds right padding and a hidden CSS checkmark. | Selectable row with visible selected affordance. |
| `compact` | Lower minimum height and smaller padding. | Dense row in compact sections. |
| `accent` | Uses action background token as base. | Row needs accent-backed emphasis. |
| `nested` | Uses quieter background and divider radius. | Row sits inside another grouped context. |

The guide for future components: every variant should answer "what job does
this variant perform?" If the answer is only "it looks different", the variant
does not belong in the primitive.

## Side Affordances

Disclosure and choice indicators are generated with pseudo-elements:

```css
.pds-cell[data-variant="disclosure"]::after
.pds-cell[data-variant="choice"]::after
```

This keeps the DOM one-slot and avoids adding decorative icons to the React
source. The chevron and checkmark are CSS affordances, not semantic content.

The choice check stays hidden until selection is expressed through ARIA:

```css
.pds-cell[data-variant="choice"]::after {
  opacity: 0;
}

.pds-cell[data-variant="choice"][aria-pressed="true"]::after {
  color: var(--pds-color-accent);
  opacity: 1;
}
```

The reusable law: decorative state cues can be CSS-only, but they must be tied
to real state attributes.

## Accessibility Contract From Code

The raw implementation does not create roles or labels. It only preserves and
maps native/ARIA attributes:

- Consumers choose `use="button"` for full-row actions.
- Consumers choose links or router link elements for navigation.
- Consumers choose `use="label"` for native labelable controls.
- Consumers pass `aria-pressed` for selected button-like rows.
- The component maps disabled non-buttons to `aria-disabled`, but does not
  suppress custom click handlers for non-button elements.

That last point is important: non-button disabled behavior is a visual and ARIA
signal only. If a future component supports arbitrary interactive roots, either
document that activation remains consumer-owned or add a deliberate activation
guard.

## Content Resilience

Cell is built to keep content available:

- `min-width: 0` allows flex children to shrink instead of forcing overflow.
- `overflow-wrap: anywhere` allows long user-generated strings to break.
- `white-space: normal` allows row labels to wrap.
- No fixed height is used; only minimum heights are set.
- Side affordances use `margin-left: auto`, so the main content keeps the
  flexible space.

This is the row-level pattern to reuse for translated content and generated
labels: allow height growth before considering truncation.

## Motion And Reduced Motion

Cell uses tokenized fast transitions for background, color, shadow, opacity, and
choice-check opacity. The reduced-motion block includes both `.pds-cell` and the
choice pseudo-element so state feedback remains effectively immediate for users
who reduce motion.

The guide for future components: every transition added for component feedback
must be listed in the reduced-motion block or otherwise have an explicit reason
not to animate.

## Verification Coverage

The component tests assert the core React contract:

- Stable `data-slot`, `data-variant`, class merging, and forwarded ref.
- Native disabled button behavior and default `type="button"`.
- `aria-pressed` is preserved for selected rows.
- Non-button disabled rows receive `aria-disabled`.

The CSS contract tests assert:

- Required Cell selectors and variant/state hooks exist.
- Cell is included in content-resilience selector checks.
- Disabled rows are excluded from hover and active selectors.

The example section exercises:

- Static default row.
- Button row.
- Inactive row.
- Disabled button row.
- Disclosure row.
- Choice rows driven by React state and `aria-pressed`.
- Compact, accent, and nested variants.
- Native checkbox label composition.
- PDS Checkbox adjacent-control composition.

## Laws For Future Components

Use these as implementation laws when building similar primitives:

1. One primitive should own one structural job.
2. Use native elements first; use ARIA only to represent state or semantics that
   native elements do not provide.
3. Public props should resolve to stable `data-*` attributes.
4. Visual state should read native/ARIA attributes before adding local state.
5. Decorative affordances should stay out of the DOM when CSS can express them.
6. Variants must map to behavior, density, emphasis, or hierarchy.
7. Hover and pressed feedback must be gated to actually interactive roots.
8. Disabled selectors must suppress hover and active feedback.
9. Rows should be token-first: no raw colors, spacing, radius, or motion values.
10. Prefer flexible layout and wrapping over fixed heights or truncation.
11. Use local CSS variables as state-composition points when variants and states
    need to layer together.
12. Tests should cover both React behavior and CSS selector contracts.

## Implementation Checklist For A Similar Primitive

Before adding another row-like primitive, verify:

- The component has a clear reason not to be `Cell`.
- Rich structure is represented as explicit slots only when the use case needs
  them.
- The default root is non-interactive unless the component is always a control.
- Interactive roots receive safe defaults, such as `type="button"`.
- Disabled behavior is native where possible and documented where it is only
  ARIA.
- The component exposes stable `data-slot` and state/variant attributes.
- CSS gates hover/active styles behind semantic interactivity.
- Text can wrap and grow without clipping.
- Decorative icons are either CSS affordances or child content with clear
  accessibility treatment.
- Tests cover refs, attributes, disabled behavior, state attributes, and CSS
  hooks.

## Current Constraints

- `use?: React.ElementType` is flexible but broad. It allows custom components,
  but the runtime only detects native button behavior when `use === "button"`.
- Non-button disabled rows are not activation-proof. Consumers must not attach
  active handlers to an `aria-disabled` custom root unless they guard the
  handler.
- PDS Radix controls such as `Checkbox` do not become native labelable controls
  simply by sitting inside `use="label"`. The example handles the PDS Checkbox
  as adjacent content with its own accessible label.
- The one-slot model is intentional. If future needs require title/content/side
  slots, that should become a richer component rather than expanding Cell.
