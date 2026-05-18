# ComponentName

## Purpose

Describe the component's job in PDS product surfaces. Keep this about the
component contract, not a general design-system essay.

## Landing Requirement

Before a new component lands, the change must include component source,
component CSS, this docs file, example usage in `examples/react`, tests, stable
`data-slot` / `data-*` attributes, content-resilience notes, and keyboard/focus
behavior when the component is interactive.

## When To Use

- Use when ...

## When Not To Use

- Do not use when ...

## Anatomy / Slots

List exported parts and the intended hierarchy.

```tsx
<ComponentName>
  <ComponentSlot />
</ComponentName>
```

## Public API

Summarize public props, default values, and exported types. The TypeScript source
remains canonical.

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `prop` | `value` | `default` | Notes. |

## Data Attributes

List stable `data-*` attributes used by CSS, tests, and agent-authored
composition.

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `component-name` | Component |

## Accessibility Contract

State what the component owns and what consumers must provide. Include native
semantics, labels, roles, live regions, focus behavior, and keyboard behavior
where relevant.

## Content Resilience Rules

Explain wrapping, growth, overflow, zoom, translation, and user-generated
content expectations. Reference
`../../foundations/content-resilience.md` for global rules.

## Styling Contract

Describe the CSS class hooks and what belongs in `packages/react/src/components.css`.
Call out behavior agents must preserve before changing selectors.

## Token Usage

Reference token categories instead of duplicating values. Use names such as
color, spacing, radius, elevation, typography, and motion.

## State Behavior

Describe props, native states, `aria-*` states, Radix states, and CSS state
selectors that affect behavior.

## Composition Examples

Use short examples that import from `@pds/react` only.

```tsx
import { ComponentName } from "@pds/react";
```

## Known Limitations

- This component does not ...

## Do / Don't For Agents

Do:

- Preserve ...

Don't:

- Do not ...

## Related Components

- RelatedComponent (replace with a real component link before landing)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- Component source: `packages/react/src/components/component-name.tsx`
