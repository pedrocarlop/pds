# Item

## Purpose

Item is a rich row primitive for accounts, contacts, transactions, settings,
notifications, menu options, and other list content that needs structured
slots. It builds on Cell for the row shell, surface, focus, disabled, selected,
and disclosure behavior while keeping avatar, content, side, action, value, and
input areas explicit.

## Landing Requirement

Item lands with component source, component CSS, this docs file, example usage
in `examples/react`, tests, stable `data-slot` / `data-*` attributes,
content-resilience notes, and keyboard/focus behavior for interactive rows.

## When To Use

- Use for rich rows that need identity, title, description, side values, actions,
  inputs, or prefix controls.
- Use for accounts, contacts, transactions, notifications, settings rows,
  disclosure rows, and selectable row-style controls.
- Use ItemSkeleton while predictable Item content is loading.

## When Not To Use

- Do not use Item for simple one-slot rows; use [Cell](cell.md).
- Do not use `variant="disclosure"` unless the row navigates or reveals detail.
- Do not use Item as a full form layout by itself; compose form labels,
  validation summaries, and submit actions around it.
- Do not add product-specific data loading, routing, or menu behavior to Item.

## Anatomy / Slots

```tsx
<Item>
  <Item.Prefix />
  <Item.Avatar />
  <Item.Content>
    <Item.Title />
    <Item.Description />
    <Item.Actions />
  </Item.Content>
  <Item.Side>
    <Item.Value />
    <Item.Input />
  </Item.Side>
</Item>
```

Named exports are also available as `ItemPrefix`, `ItemAvatar`, `ItemContent`,
`ItemTitle`, `ItemDescription`, `ItemActions`, `ItemSide`, `ItemValue`, and
`ItemInput`.

ItemSkeleton mirrors the Item slot structure with `ItemSkeleton.Prefix`,
`ItemSkeleton.Avatar`, `ItemSkeleton.Content`, `ItemSkeleton.Title`,
`ItemSkeleton.Description`, `ItemSkeleton.Actions`, `ItemSkeleton.Side`, and
`ItemSkeleton.Value`. Skeleton children are optional and default to avatar,
content, and side-value placeholders. Self-closed `ItemSkeleton.Content`
renders title and description placeholders; self-closed `ItemSkeleton.Side`
renders a value placeholder. Pass explicit children to omit or reshape those
defaults.

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `default`, `disclosure`, `accent`, `nested` | `default` | Reuses Cell row variants that match rich-row behavior. |
| `use` | React element type | `div` | Renders the root element through Cell. Use `button` for full-row actions and `label` for native label composition. |
| `disabled` | `boolean` | `false` | Native disabled on buttons; `aria-disabled` elsewhere through Cell. |
| `inactive` | `boolean` | `false` | De-emphasises the row through Cell. |
| `pending` | `boolean` | `false` | Marks `aria-busy`, disables root interaction, and dims through Cell disabled state. |
| `useIcon` | Material Symbols name, React element, or component |  | Adds a compact leading icon slot without requiring an avatar. |
| `iconTone` | `default`, `muted`, `accent`, `success`, `warning`, `danger`, `inactive` | `muted` | Tokenized icon color role. |
| `type` | Native button type | `button` | Applied only when `use="button"`. |

| Slot | Notes |
| --- | --- |
| `Item.Value.variant` | `primary`, `secondary`; secondary uses supporting text treatment. |
| `Item.Value.tone` | `default`, `muted`, `accent`, `success`, `warning`, `danger`. Use status tones only for status; do not use Item tone as a financial direction API. |
| `Item.Input.type` | `text`, `money`, `money-fractional`; maps to AmountInput formatting. |
| `Item.Input.currency` | Currency code for money formatting. |
| `Item.Input.showSign`, `negative`, `showCurrency` | Forwarded to AmountInput. |

Item extends native HTML attributes, forwards refs to the rendered root, and
preserves `className`. Slot exports forward refs and preserve native div
attributes unless noted. `Item.Input` forwards its ref to the underlying input.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `item`, `item-icon`, `item-prefix`, `item-avatar`, `item-content`, `item-title`, `item-description`, `item-actions`, `item-side`, `item-value`, `item-input` | Component |
| `data-slot` | `item-skeleton`, `item-skeleton-prefix`, `item-skeleton-avatar`, `item-skeleton-content`, `item-skeleton-title`, `item-skeleton-description`, `item-skeleton-actions`, `item-skeleton-action`, `item-skeleton-side`, `item-skeleton-value` | Component |
| `data-variant` | `default`, `disclosure`, `accent`, `nested` | Cell via Item |
| `data-tone` | Item icon and value tone values | Component |
| `data-pending` | `true` when pending | Component |
| `data-disabled` | `true` when disabled or pending | Cell via Item |
| `data-inactive` | `true` when inactive | Cell via Item |

## Accessibility Contract

Item does not invent interaction semantics. Consumers choose the root element:
use `use="button"` for full-row actions, anchors or router links for
navigation, and `use="label"` only with labelable controls. Button Items default
to `type="button"` through Cell.

Use `aria-pressed` for selected button-style rows. Use `variant="disclosure"`
only when the row navigates or reveals content, and ensure the row has a clear
accessible name. Prefix controls such as Checkbox, RadioGroup, and Switch must
have accessible names or be connected to `Item.Title` and `Item.Description`
with `aria-labelledby` and `aria-describedby`.

`pending` sets `aria-busy="true"` and disables the Item root. For unavailable
rows that contain a still-interactive nested control, use `aria-disabled` on the
row and keep the nested control's state explicit.

ItemSkeleton defaults to `aria-hidden="true"`. Expose loading state on the
owning region when needed.

## Content Resilience Rules

Item is boundless by default. Titles, descriptions, values, and actions wrap
instead of truncating. Side content is allowed to wrap and the row can grow to
the tallest sibling. At compact viewport widths, the row wraps so side content
does not crush the primary title or description.

Do not truncate required labels, primary actions, error messages, or state
feedback. Put long identity text in `Item.Title` or `Item.Description`, not in
`Item.Avatar` or `Item.Prefix`.

## Styling Contract

The root classes are `pds-cell pds-item`; slot classes use the `pds-item-*`
prefix. Styling lives in `packages/react/src/components.css`.

Item depends on Cell selectors for `data-variant`, `aria-pressed`,
`data-inactive`, disabled state, hover, pressed, focus-visible, and disclosure
affordances. Preserve that composition instead of duplicating Cell state
behavior inside Item.

`Item.Input` composes AmountInput and keeps its wrapper at `data-slot="item-input"`.
Preserve this wrapper so side-slot field styling remains separate from the
Amount component contract.

## Token Usage

Item uses PDS surface color, state layers, status color roles, typography,
spacing, radius, focus, disabled opacity, and motion tokens through Cell and
slot CSS. Do not add hard-coded colors, spacing, radii, transitions, performance
color roles, or local component-specific token names.

## State Behavior

- Hover and active row treatment come from Cell and apply only to interactive
  roots that are not disabled.
- `aria-pressed="true"` applies selected row styling through Cell.
- `pending` disables root interaction and sets `aria-busy`.
- `inactive` de-emphasises the row visually through Cell.
- `variant="disclosure"` uses Cell's decorative chevron.
- `variant="accent"` uses Cell's accent action surface.
- `Item.Value.tone` uses tokenized status roles and must not be used as a
  financial or performance direction API.

## Composition Examples

```tsx
import { Avatar, AvatarFallback, Button, Item, ItemSkeleton } from "@pds/react";

<Item>
  <Item.Avatar>
    <Avatar>
      <AvatarFallback>GB</AvatarFallback>
    </Avatar>
  </Item.Avatar>
  <Item.Content>
    <Item.Title>British Pound</Item.Title>
    <Item.Description>Personal account</Item.Description>
  </Item.Content>
  <Item.Side>
    <Item.Value>GBP 1,235</Item.Value>
    <Item.Value variant="secondary">Available</Item.Value>
  </Item.Side>
</Item>;

<Item use="button" useIcon="bolt" variant="disclosure">
  <Item.Content>
    <Item.Title>Instant transfer</Item.Title>
    <Item.Description>Send money in seconds</Item.Description>
  </Item.Content>
</Item>;

<Item use="label">
  <Item.Content>
    <Item.Title>Round up payments</Item.Title>
    <Item.Description>Send spare change to savings</Item.Description>
  </Item.Content>
  <Item.Side>
    <Item.Input aria-label="Round-up amount" currency="GBP" type="money" />
  </Item.Side>
</Item>;

<Item variant="accent">
  <Item.Content>
    <Item.Title>Cashback boost</Item.Title>
    <Item.Description>Earn rewards on card spend</Item.Description>
    <Item.Actions>
      <Button>Activate</Button>
      <Button intent="secondary">Later</Button>
    </Item.Actions>
  </Item.Content>
</Item>;

<ItemSkeleton>
  <ItemSkeleton.Content />
  <ItemSkeleton.Side />
</ItemSkeleton>;
```

## Known Limitations

- Item does not manage grouped lists, virtualization, menus, or nested route
  behavior.
- Item does not parse money input text; AmountInput owns display formatting and
  consumers own validation and submission.
- Item does not enforce one primary action or one side value.
- Item does not provide line-clamp behavior; consumers must add a separate
  overflow mechanism when product content truly needs truncation.

## Do / Don't For Agents

Do:

- Preserve Cell composition and Item slot data attributes.
- Use PDS primitives inside slots.
- Pair prefix controls with explicit accessible labels.
- Keep rich row content wrapping and inspectable in narrow containers.

Don't:

- Do not add avatar, side, or action slots back into Cell.
- Do not use disclosure styling for non-navigational rows.
- Do not hard-code upstream design-system colors, remote brand assets, or row
  separators.
- Do not use status tones for financial direction or add performance color
  roles to generic Item CSS.

## Related Components

- [Cell](cell.md)
- [Avatar](avatar.md)
- [Amount](amount.md)
- [Button](button.md)
- [Checkbox](checkbox.md)
- [Switch](switch.md)
- [Skeleton](skeleton.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [Spacing and radius](../../foundations/spacing.md)
- [Colour guidelines](../../foundations/colour.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Item source](../../../packages/react/src/components/item.tsx)
