# PDS Component Quality Gates

A component should not be handed back until these pass:

1. The component belongs in PDS, not only in one app screen.
2. Public API is explicit and typed.
3. Stable `data-slot` and state attributes are present.
4. CSS uses existing PDS tokens only.
5. No hard-coded colors, spacing, radius, duration, or easing.
6. No local token-like names are invented.
7. No Tailwind, CVA, shadcn, or deep imports are introduced.
8. Default, hover, focus-visible, active, disabled, loading, error, and success states are covered when applicable.
9. Focus-visible is visible and not replaced by hover styling.
10. Disabled state does not rely on colour alone.
11. Long content and translated text remain available.
12. Primary actions, required labels, errors, and state feedback do not truncate.
13. Preview includes normal, long text, narrow layout, and relevant states.
14. Tests cover render contract, refs, classes, data attributes, accessibility, and interaction behaviour.
15. CSS contract tests cover required selectors and token constraints.
