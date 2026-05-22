# PDS Typography Guidelines

Typography roles are recipes. Every text style combines four token groups:
family, size, line-height, and weight.

Sources: [DESIGN.md](../../DESIGN.md) and
[packages/tokens/src/typography.css](../../packages/tokens/src/typography.css).

## Families

| Token | Typeface | Use |
| --- | --- | --- |
| `--pds-font-sans` | Inter | Product UI, navigation, forms, dense data, and body copy. |
| `--pds-font-marketing` | Aeonik Pro, falling back to Inter until licensed | Marketing pages and public campaign headings only. |
| `--pds-font-tabular` | Inter with tabular behavior | Numeric columns, balances, ledgers, and tables. |

Aeonik Pro is licensed and is not a Google Fonts substitute. Do not use
`--pds-font-marketing` in product chrome.

## Weights

Only four weights are available: `--pds-fw-regular`, `--pds-fw-medium`,
`--pds-fw-semibold`, and `--pds-fw-bold`. Prefer role aliases when possible:

- `--pds-fw-display` and `--pds-fw-heading` for headings.
- `--pds-fw-emphasis` and `--pds-fw-emphasis-strong` for labels, chips, badges, and compact emphasis.
- `--pds-fw-body` for running text.

## Role Scale

- Core: `--pds-display1/2`, `--pds-heading1/2/3`, `--pds-emphasis1..4`, and `--pds-body1/2/3`.
- Each size role pairs with its matching line-height token, such as
  `--pds-body1` with `--pds-lh-body1`.
- Marketing: `--pds-marketing-display1/2/3` and `--pds-marketing-heading3`.
- Tabular: `--pds-tabular-*` mirrors the core scale for aligned numbers.

## Recipe

```tsx
<span
  style={{
    fontFamily: "var(--pds-font-sans)",
    fontSize: "var(--pds-emphasis1)",
    lineHeight: "var(--pds-lh-emphasis1)",
    fontWeight: "var(--pds-fw-emphasis)",
  }}
>
  Action
</span>
```

## Rules

- Always bind size with its matching `--pds-lh-*` line-height.
- Do not mix core size tokens with tabular line-height tokens.
- Use tabular numerals only for aligned numeric data, never for prose. Apply `.pds-tabular` when a CSS class is more appropriate than inline numeric font features.
- Do not use Tailwind `text-*`, `font-*`, or `leading-*` utilities for system typography.
- Do not scale rendered text below 14px.
