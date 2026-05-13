---
version: alpha
name: PDS
description: Agent-facing product surfaces with dark layered depth, restrained color, and token-first composition.
colors:
  primary: "#000000"
  onPrimary: "#F4F4F4"
  secondary: "#999999"
  muted: "#616161"
  surface: "#1A1A1A"
  surfaceRaised: "#242424"
  accent: "#4F55F1"
  onAccent: "#FFFFFF"
  success: "#1AC097"
  danger: "#EE4A59"
typography:
  families:
    sans: Inter
    marketing: Aeonik Pro
    tabular: Inter
  weights:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
  roleWeights:
    display: "{typography.weights.semibold}"
    heading: "{typography.weights.semibold}"
    emphasis: "{typography.weights.medium}"
    emphasisStrong: "{typography.weights.semibold}"
    body: "{typography.weights.regular}"
  core:
    display1:
      fontFamily: "{typography.families.sans}"
      fontSize: 56px
      lineHeight: 64px
      fontWeight: "{typography.roleWeights.display}"
    display2:
      fontFamily: "{typography.families.sans}"
      fontSize: 44px
      lineHeight: 52px
      fontWeight: "{typography.roleWeights.display}"
    heading1:
      fontFamily: "{typography.families.sans}"
      fontSize: 32px
      lineHeight: 40px
      fontWeight: "{typography.roleWeights.heading}"
    heading2:
      fontFamily: "{typography.families.sans}"
      fontSize: 24px
      lineHeight: 32px
      fontWeight: "{typography.roleWeights.heading}"
    heading3:
      fontFamily: "{typography.families.sans}"
      fontSize: 20px
      lineHeight: 28px
      fontWeight: "{typography.roleWeights.heading}"
    emphasis1:
      fontFamily: "{typography.families.sans}"
      fontSize: 16px
      lineHeight: 20px
      fontWeight: "{typography.roleWeights.emphasis}"
    emphasis2:
      fontFamily: "{typography.families.sans}"
      fontSize: 14px
      lineHeight: 20px
      fontWeight: "{typography.roleWeights.emphasis}"
    emphasis3:
      fontFamily: "{typography.families.sans}"
      fontSize: 12px
      lineHeight: 16px
      fontWeight: "{typography.roleWeights.emphasis}"
    emphasis4:
      fontFamily: "{typography.families.sans}"
      fontSize: 11px
      lineHeight: 14px
      fontWeight: "{typography.roleWeights.emphasisStrong}"
    body1:
      fontFamily: "{typography.families.sans}"
      fontSize: 16px
      lineHeight: 24px
      fontWeight: "{typography.roleWeights.body}"
    body2:
      fontFamily: "{typography.families.sans}"
      fontSize: 14px
      lineHeight: 20px
      fontWeight: "{typography.roleWeights.body}"
    body3:
      fontFamily: "{typography.families.sans}"
      fontSize: 12px
      lineHeight: 16px
      fontWeight: "{typography.roleWeights.body}"
  marketing:
    display1:
      fontFamily: "{typography.families.marketing}"
      fontSize: 56px
      lineHeight: 64px
      fontWeight: "{typography.roleWeights.display}"
    display2:
      fontFamily: "{typography.families.marketing}"
      fontSize: 40px
      lineHeight: 48px
      fontWeight: "{typography.roleWeights.display}"
    display3:
      fontFamily: "{typography.families.marketing}"
      fontSize: 32px
      lineHeight: 40px
      fontWeight: "{typography.roleWeights.display}"
    heading3:
      fontFamily: "{typography.families.marketing}"
      fontSize: 20px
      lineHeight: 28px
      fontWeight: "{typography.roleWeights.heading}"
  tabular:
    mirrors: "{typography.core}"
    fontFamily: "{typography.families.tabular}"
  minimumRenderedSize: 14px
rounded:
  primary: 24px
  nested: 20px
  divider: 2px
  full: 999px
spacing:
  sp-50: 2px
  sp-100: 4px
  sp-200: 8px
  sp-300: 12px
  sp-400: 16px
  sp-500: 20px
  sp-600: 24px
  sp-800: 32px
  sp-1000: 40px
motion:
  durations:
    fast: 100ms
    standard: 250ms
    slow: 350ms
  easings:
    smoothSwoop: "cubic-bezier(0.35, 0, 0, 1)"
    harmony: "cubic-bezier(0.35, 0.7, 0, 1)"
    fluid: "cubic-bezier(0.64, 0.06, 0.12, 0.93)"
    balanced: "cubic-bezier(0.85, 0, 0.15, 1)"
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
- Use [docs/foundations/motion.md](docs/foundations/motion.md) for detailed motion decisions.
- Use [docs/foundations/content-resilience.md](docs/foundations/content-resilience.md) for translation, zoom, and overflow behavior.
- Use [docs/architecture/repository-structure.md](docs/architecture/repository-structure.md) before moving files or adding packages.
- Use the foundation CSS files in [packages/tokens/src](packages/tokens/src), bundled by [packages/tokens/src/styles.css](packages/tokens/src/styles.css), as the implementation source for CSS variables.
- Use [packages/react](packages/react) for the PDS React component package and package stylesheet.

## Colors

Choose color tokens by role, not by hue. Use `primary` for root grouped
backgrounds, `surface` and `surfaceRaised` for layered modules, `onPrimary` for
primary readable text, `secondary` for supporting copy, and `muted` for quiet
metadata or disabled affordances.

Use `accent` only for primary actions, active states, links, focus emphasis, and
important interactive feedback. Use semantic colors only for actual success,
warning, or danger states. The front matter includes the portable color contract;
the full semantic palette lives in [docs/foundations/colour.md](docs/foundations/colour.md) and
[packages/tokens/src/colour.css](packages/tokens/src/colour.css).

Do not invent ad hoc colors in components. Existing CSS variables in
the foundation CSS files in [packages/tokens/src](packages/tokens/src) are the
implementation source for product code.

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

PDS publishes a first React component slice from `pds`: Button, Badge, Avatar,
Surface, Tooltip, Dialog, Input, and Textarea. Product code using those
components should import `pds/styles.css` once, which loads PDS tokens and
component styles. Token-only consumers can still use `@pds/tokens/styles.css` or
scoped token imports from `@pds/tokens/colour.css`,
`@pds/tokens/typography.css`, `@pds/tokens/spacing.css`,
`@pds/tokens/elevation.css`, and `@pds/tokens/motion.css`.

## Do's and Don'ts

- Do use [DESIGN.md](DESIGN.md) before making visual choices.
- Do read [AGENTS.md](AGENTS.md) before changing code structure.
- Do use [docs/foundations/colour.md](docs/foundations/colour.md), [docs/foundations/typography.md](docs/foundations/typography.md), [docs/foundations/spacing.md](docs/foundations/spacing.md), [docs/foundations/motion.md](docs/foundations/motion.md), and [docs/foundations/content-resilience.md](docs/foundations/content-resilience.md) for detailed usage rules.
- Do update linked foundation docs when changing the front matter contract.
- Do keep `DESIGN.md`, `AGENTS.md`, and `docs/ai/llm-guidelines.md` in sync when agent workflow changes.
- Do keep package boundaries clear: tokens first, React second.
- Do not create a website, marketing page, or new UI component unless the task explicitly asks for it.
- Do not add one-off hex, rgb, hsl, spacing, or radius values to product components.
- Do not add untokenized transition durations or easing curves for documented motion patterns.
- Do not use brand palette colors for normal UI controls, text, surfaces, or states.
- Do not truncate primary actions, required form labels, error messages, or state feedback.
