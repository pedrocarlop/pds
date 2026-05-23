# PDS Screen Quality Gates

A screen should not be handed back until these pass:

1. A screen structure has been selected.
2. The primary job is clear.
3. The primary action is visible or easy to reach.
4. Existing PDS components are used before local primitives.
5. App CSS is layout-focused only.
6. No hard-coded visual values are introduced.
7. No fake browser, phone, or app chrome is drawn.
8. No invented metrics, fake logs, fake users, fake testimonials, or fake proof.
9. No landing-page filler, decorative card grids, or oversized hero treatment is
   used unless the task explicitly asks for a marketing page.
10. Every major region maps to the primary job, a user decision, a required
    state, or a reachable action.
11. Loading, empty, error, success, disabled, focus, and active states are represented where needed.
12. Long text, translated labels, and user-generated content do not break the layout.
13. The screen works at narrow viewport sizes.
14. The screen remains usable at 200% zoom.
15. Primary actions, required labels, errors, and state feedback do not truncate.
16. Navigation, tabs, and page actions keep separate roles.
17. The layout matches the selected screen structure.
18. The selected screen structure's Quality Gates pass.
19. If the screen was criticized as generic, decorative, or off-task, score it
    with the [evaluation-scenarios](evaluation-scenarios.md) rubric and revise
    until Task Fitness, Token And Visual Fidelity, and Resilience And
    Accessibility each score 2.
