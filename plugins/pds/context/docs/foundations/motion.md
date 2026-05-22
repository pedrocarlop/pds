# PDS Motion Guidelines

Motion communicates state, hierarchy, and spatial relationships. Use it
purposefully, keep it interruptible, and make it optional.

Sources: [DESIGN.md](../../DESIGN.md) and
[packages/tokens/src/motion.css](../../packages/tokens/src/motion.css).

## Core Rules

- Use documented `--pds-motion-*` duration tokens and `--pds-ease-*` easing tokens for shared UI motion.
- Do not ship competing untokenized CSS transitions for documented motion patterns.
- Product implementations may use `motion/react` for complex spatial transitions when the consuming app already owns that dependency.
- Use motion to support state, hierarchy, or spatial continuity. Do not use it as decoration by default.
- Never use motion as the only way to communicate state.
- Respect `prefers-reduced-motion` for every animated interaction.
- Let users interrupt repeated, frequent, or long-running animations.
- Do not add motion to high-frequency interactions unless it provides useful feedback.

## Patterns

| Pattern | Use | Speeds | Easings |
| --- | --- | --- | --- |
| Transform | Related elements sharing a container, such as card-to-detail expansion, panel movement, drag feedback, and spatial reordering. | `--pds-motion-duration-fast`, `--pds-motion-duration-standard`, `--pds-motion-duration-slow` | `--pds-ease-smooth-swoop`, `--pds-ease-fluid`, `--pds-ease-balanced` |
| Fade Through | Unrelated destinations, such as tab changes, empty-to-loaded states, and non-spatial view replacement. | `--pds-motion-duration-fast`, `--pds-motion-duration-standard`, `--pds-motion-duration-slow` | `--pds-ease-smooth-swoop`, `--pds-ease-harmony` |
| Fade | Elements entering or leaving within the current screen, such as menus, hints, toasts, inline status, and temporary affordances. | `--pds-motion-duration-fast`, `--pds-motion-duration-standard`, `--pds-motion-duration-slow` | `--pds-ease-smooth-swoop`, `--pds-ease-harmony` |

## Duration

- `--pds-motion-duration-fast` (`100ms`): small controls, icons, selections, hover feedback, and compact state changes.
- `--pds-motion-duration-standard` (`250ms`): standard transitions, sheets, expanding chips, menus, popovers, and normal view changes.
- `--pds-motion-duration-slow` (`350ms`): large transitions, screen-scale movement, major panel changes, and strong spatial continuity.
- Exits and collapses should be shorter than entries when the interaction benefits from a directional feel.
- Avoid UI motion below `100ms` or above `400ms` unless a future component contract documents a specific exception.

## Easing

| Name | Token | Use |
| --- | --- | --- |
| SmoothSwoop | `--pds-ease-smooth-swoop` | Default for most transitions. |
| HarmonyEase | `--pds-ease-harmony` | Stylized transitions with emphasis at the end. |
| FluidTransition | `--pds-ease-fluid` | Continuous gliding movement. |
| BalancedEase | `--pds-ease-balanced` | Deliberate, structured movement. |

## Navigation

- Push: drilling deeper into hierarchy. Enter from the trailing edge and return with back navigation.
- Modal: temporary overlay on top of current context. Rise from the bottom and dismiss down or with explicit close.
- Transient overlays such as menus, popovers, and item inspectors should use modal treatment when they sit above the current task instead of replacing it.
- Nested modals must keep stacking, focus order, and dismissal order clear.

## Agent Requirement

Before adding motion, agent designers must classify it as structural, feedback,
or decorative:

| Type | Meaning | Requirement |
| --- | --- | --- |
| Structural | Explains hierarchy, navigation, or spatial continuity. | Preserve the state change without motion under `prefers-reduced-motion`. |
| Feedback | Confirms input, progress, loading, selection, or completion. | Pair motion with text, icon, color, or layout state. |
| Decorative | Adds atmosphere but does not carry meaning. | Treat as optional and remove it cleanly under reduced motion. |

## CSS Recipe

```css
.pds-example-popover {
  transition:
    opacity var(--pds-motion-duration-standard) var(--pds-ease-smooth-swoop),
    transform var(--pds-motion-duration-standard) var(--pds-ease-smooth-swoop);
}

@media (prefers-reduced-motion: reduce) {
  .pds-example-popover {
    transition-duration: 1ms;
  }
}
```

## Rules

- Prefer opacity and transform for animated properties.
- Avoid animating layout-heavy properties when transform or opacity can express the same relationship.
- Keep motion subtle in dense operational UI. PDS should feel responsive and inspectable, not theatrical.
- Do not animate critical text in a way that blocks reading, selection, copying, or screen-reader interpretation.
- Do not tie essential feedback only to animation completion.
