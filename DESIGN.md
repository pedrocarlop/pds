---
version: alpha
name: PDS
description: Agent-facing design system.
---

## Overview

PDS is a design system for agent-facing product UI: conversations, tool runs,
human controls, status, and inspectable work. The visual language is dark,
layered, direct, and utilitarian. Interfaces should feel calm and precise, not
decorative or marketing-led.

Use this file as the first design source for AI agents, but do not treat it as a
standalone manual. The YAML front matter is the portable contract used by
`design.md` tooling; the linked markdown files below are the detailed operating
rules for this repo.

### Source Map

- Start with [AGENTS.md](AGENTS.md) for agent workflow and repo rules.
- Use [docs/start-here.md](docs/start-here.md) as the human-readable repository index.
- Use [docs/ai/llm-guidelines.md](docs/ai/llm-guidelines.md) for LLM-specific read order and edit rules.
- Use [docs/foundations/tokens.md](docs/foundations/tokens.md) to understand token ownership and outputs.
- Use [docs/foundations/colour.md](docs/foundations/colour.md) for detailed color decisions.
- Use [docs/foundations/typography.md](docs/foundations/typography.md) for detailed typography decisions.
- Use [docs/foundations/spacing.md](docs/foundations/spacing.md) for detailed spacing and radius decisions.
- Use [docs/foundations/layout-types.md](docs/foundations/layout-types.md) for shared layout dimensions and breakpoints.
- Use [docs/foundations/motion.md](docs/foundations/motion.md) for detailed motion decisions.
- Use [docs/foundations/content-resilience.md](docs/foundations/content-resilience.md) for translation, zoom, and overflow behavior.
- Use [docs/recipes](docs/recipes) for practical React app setup and PDS adoption paths.
- Use [docs/patterns](docs/patterns) for repeatable product flow guidance that composes foundations and components.
- Use [docs/architecture/repository-structure.md](docs/architecture/repository-structure.md) before moving files or adding packages.
- Use the foundation CSS files in [packages/tokens/src](packages/tokens/src), bundled by [packages/tokens/src/styles.css](packages/tokens/src/styles.css), as the implementation source for CSS variables.
- Use [packages/react](packages/react) for the PDS React component package and package stylesheet.
- Use [packages/react/docs/components](packages/react/docs/components) before editing component source, CSS, examples, tests, or public APIs.

## Colors

Choose color tokens by role, not by hue. Use `primary` for root grouped
backgrounds, `surface` and `surfaceRaised` for layered modules, `onPrimary` for
primary readable text, `secondary` for supporting copy, and `muted` for quiet
metadata or disabled affordances.

Use `accent` only for primary actions, active states, links, focus emphasis, and
important interactive feedback. Use semantic colors only for actual success,
warning, or danger states. Interaction feedback uses reusable state layer tokens
for hover, pressed, selected, focus, disabled, and invalid treatment instead of
new per-intent hover colors. The front matter includes the portable color
contract; the full semantic palette lives in
[docs/foundations/colour.md](docs/foundations/colour.md) and
[packages/tokens/src/colour.css](packages/tokens/src/colour.css).

Do not hard-code colors in product UI, examples, components, inline SVGs, data
URI assets, or local CSS. Existing CSS variables in the foundation CSS files in
[packages/tokens/src](packages/tokens/src) are the implementation source for
product code.

## Typography

PDS typography is a recipe made from family, size, line-height, and weight
tokens. Use Inter for product UI, `--pds-font-tabular` for aligned numeric data,
and reserve `--pds-font-marketing` for public campaign headings after Aeonik Pro
is loaded through the font pipeline.

Use core roles for product surfaces: `display1/2`, `heading1/2/3`,
`emphasis1..4`, and `body1/2/3`. Always pair each size token with its matching
`--pds-lh-*` line-height token and a role weight token. The full scale and rules
live in [docs/foundations/typography.md](docs/foundations/typography.md).

## Content Resilience

PDS surfaces must survive translated strings, user-generated content,
accessibility text settings, and browser zoom. Assume translated English text can
be 40% longer and verify critical product flows at 200% browser zoom.

Components should be boundless by default, growing with content when their layout
role allows it. Use line growth, static line growth, font downscaling for
display or heading text only, and truncation for lower-priority or expandable
content where the full value is available elsewhere. Never scale rendered text
below 14px. The detailed rules live in
[docs/foundations/content-resilience.md](docs/foundations/content-resilience.md).

## Layout

Use spacing as a role-based rhythm. `sp-400` is the default component padding and
the default gap between major internal groups. Smaller values exist for icon and
label relationships, dense inline groups, and optical balance. Larger values are
reserved for section-level separation.

Prefer spatial separation, surface contrast, and radius relationships before
adding borders or dividers.

Use shared layout tokens for reusable page widths, readable measures,
side-panel minimums, and breakpoints. The detailed rules live in
[docs/foundations/layout-types.md](docs/foundations/layout-types.md), with
implementation values in [packages/tokens/src/layout.css](packages/tokens/src/layout.css).

## Elevation & Depth

Depth comes from layered surfaces and subtle shadows, not heavy outlines.
Root surfaces should sit on `primary`; elevated or inspectable surfaces should
move to `surface` or `surfaceRaised` only when the hierarchy needs it.

## Shapes

Use `primary` radius for grouped containers and modules, `nested` for surfaces
inside grouped containers, `divider` for the fake divider pattern, and `full` for
controls that should read as pills.

## Motion

Use motion to communicate state, hierarchy, and spatial relationships. Keep it
purposeful, interruptible, and optional. Shared UI motion must use
`--pds-motion-duration-fast`, `--pds-motion-duration-standard`,
`--pds-motion-duration-slow`, and the documented `--pds-ease-*` curves.

Respect `prefers-reduced-motion`, never rely on animation as the only state
signal, and classify new motion as structural, feedback, or decorative before
adding it. The detailed rules live in [docs/foundations/motion.md](docs/foundations/motion.md).

## Components

PDS publishes a React component slice from `pds`: Button, Badge, Avatar,
Surface, Cell, Details, Tooltip, Dialog, Input, Textarea, Select, Checkbox,
RadioGroup,
Switch, Tabs, Menu, Popover, Skeleton, Progress, InlineAlert, Table, DataList,
Breadcrumbs, Pagination, ActionMenu, RunStatus, Message, Transcript, and
Composer, plus feedback and overlay primitives Toast and BottomSheet. Product
code using those components should import `pds/styles.css` once, which loads PDS
tokens and component styles. Token-only consumers can still use
`@pds/tokens/styles.css` or scoped token imports from `@pds/tokens/colour.css`,
`@pds/tokens/typography.css`, `@pds/tokens/spacing.css`,
`@pds/tokens/layout.css`, `@pds/tokens/elevation.css`, and
`@pds/tokens/motion.css`.

## Do's and Don'ts

- Do use [DESIGN.md](DESIGN.md) before making visual choices.
- Do read [AGENTS.md](AGENTS.md) before changing code structure.
- Do use [docs/foundations/colour.md](docs/foundations/colour.md), [docs/foundations/typography.md](docs/foundations/typography.md), [docs/foundations/spacing.md](docs/foundations/spacing.md), [docs/foundations/layout-types.md](docs/foundations/layout-types.md), [docs/foundations/motion.md](docs/foundations/motion.md), and [docs/foundations/content-resilience.md](docs/foundations/content-resilience.md) for detailed usage rules.
- Do use [docs/recipes](docs/recipes) when installing PDS into a React app or starting a React app with PDS.
- Do use [docs/patterns](docs/patterns) when a request maps to a documented product flow.
- Do use the repo-local PDS self-improvement skill when user design feedback
  reveals a missing, failed, ambiguous, conflicting, or unowned instruction.
- Do update linked foundation docs when changing the front matter contract.
- Do keep `DESIGN.md`, `AGENTS.md`, and `docs/ai/llm-guidelines.md` in sync when agent workflow changes.
- Do keep package boundaries clear: tokens first, React second.
- Do not create a website, marketing page, or new UI component unless the task explicitly asks for it.
- Do not add one-off hex, rgb, hsl, named color, inline SVG color, data URI color, spacing, radius, layout breakpoint, or shared layout dimension values to product components or examples.
- Do not add untokenized transition durations or easing curves for documented motion patterns.
- Do not use brand palette colors for normal UI controls, text, surfaces, or states.
- Do not truncate primary actions, required form labels, error messages, or state feedback.
