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
  warning: "#FF9F0A"
  danger: "#EE4A59"
typography:
  bodyMd:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  titleSm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: 0
  labelSm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0
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
components:
  agent-surface:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.onPrimary}"
    typography: "{typography.bodyMd}"
    rounded: "{rounded.primary}"
    padding: "{spacing.sp-400}"
  agent-message:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.onPrimary}"
    typography: "{typography.bodyMd}"
    rounded: "{rounded.nested}"
    padding: "{spacing.sp-300}"
  agent-tool-call:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.onPrimary}"
    typography: "{typography.bodyMd}"
    rounded: "{rounded.primary}"
    padding: "{spacing.sp-400}"
  agent-composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.onPrimary}"
    typography: "{typography.bodyMd}"
    rounded: "{rounded.primary}"
    padding: "{spacing.sp-400}"
---

## Overview

PDS is a design system for agent-facing product UI: conversations, tool runs,
human controls, status, and inspectable work. The visual language is dark,
layered, direct, and utilitarian. Interfaces should feel calm and precise, not
decorative or marketing-led.

Use this file as the first design source for AI agents. The YAML front matter is
the machine-readable contract; the markdown below explains how to apply it.

## Colors

Choose color tokens by role, not by hue. Use `primary` for root grouped
backgrounds, `surface` and `surfaceRaised` for layered modules, `onPrimary` for
primary readable text, `secondary` for supporting copy, and `muted` for quiet
metadata or disabled affordances.

Use `accent` only for primary actions, active states, links, focus emphasis, and
important interactive feedback. Use semantic colors only for actual success,
warning, or danger states.

Do not invent ad hoc colors in components. Existing CSS variables in
`packages/tokens/src/styles.css` are the implementation source for product code.

## Typography

PDS uses Inter with system fallbacks. Body copy should stay compact and highly
readable. Labels should be small, strong, and direct. Avoid oversized headings
inside operational surfaces.

Use `bodyMd` for regular content, `titleSm` for compact component titles, and
`labelSm` for status labels, metadata labels, and small control labels.

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

## Components

The component tokens in this file describe the intended visual role of the
existing React primitives. They are not a request to add new components.

When composing agent UI, start with the existing primitives in `packages/react`
and import `pds/styles.css`. Keep implementation details aligned with the CSS
tokens rather than copying raw values out of this file.

## Do's and Don'ts

- Do use `DESIGN.md` before making visual choices.
- Do read `AGENTS.md` before changing code structure.
- Do use `docs/foundations/colour.md` and `docs/foundations/spacing.md` for detailed usage rules.
- Do keep package boundaries clear: tokens first, React second.
- Do not create a website, marketing page, or new UI component unless the task explicitly asks for it.
- Do not add one-off hex, rgb, hsl, spacing, or radius values to product components.
- Do not use brand palette colors for normal UI controls, text, surfaces, or states.
