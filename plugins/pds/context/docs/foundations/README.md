# PDS Foundations

Foundations explain how agents and contributors should use PDS visual tokens.
Start with [tokens.md](tokens.md) for ownership rules, then read only the
foundation needed for the visual decision.

## Index

- [tokens.md](tokens.md): token source, ownership, naming, outputs, and update
  rules.
- [colour.md](colour.md): semantic color, surfaces, overlays, states, and brand
  palette usage.
- [typography.md](typography.md): type families, weights, role scale, recipes,
  and text rules.
- [spacing.md](spacing.md): spacing scale, radius, divider philosophy, and
  layout rhythm.
- [layout-types.md](layout-types.md): shared viewport breakpoints and layout
  dimensions.
- [elevation.md](elevation.md): shadows, surface depth, and focus ring usage.
- [motion.md](motion.md): motion duration, easing, reduced-motion, and
  animation rules.
- [content-resilience.md](content-resilience.md): translated text, generated
  content, overflow, and 200% zoom behavior.

## Authoring Rules

- Token-backed foundation docs must link to their source CSS file in
  `packages/tokens/src`.
- Foundation docs must link back to [DESIGN.md](../../DESIGN.md).
- Add or update foundation guidance when a token source changes, when a visual
  rule becomes reusable, or when agent output reveals a recurring ambiguity.
- Do not put component API, screen IA, or product-flow requirements here when a
  component contract, screen structure, or pattern can own the narrower rule.

