# Create A PDS Component

Use this workflow when the user asks to add a new reusable component to the PDS
React library, or pastes unstyled React component code that should become a PDS
component.

## Inputs

Accept either a brief such as "create a banner" or pasted React component code.
Infer the component job, target user, anatomy, states, interaction model,
content resilience requirements, and likely component group. Ask one concise
question only when the component purpose or public API cannot be inferred safely.

## Minimum Read Path

Always read:

- [router.md](../router.md)
- [workflow.md](../workflow.md)
- This workflow
- [packages/react/README.md](../../../packages/react/README.md)
- [components/_template.md](../components/_template.md)
- Nearby component contracts, source, CSS, tests, and previews for similar
  components

Choose one:

- The closest component group in [components/README.md](../components/README.md)
- The closest existing component contract to model API, slots, states, and
  accessibility

Read only if relevant:

- Foundation docs for the visual areas being changed
- [PDS Component Quality Gates](../pds-quality-gates.md) before handoff
- [PDS Screen Quality Gates](../pds-screen-quality-gates.md) when the request is
  really screen composition
- [examples/react/README.md](../../../examples/react/README.md) for Ladle
  preview rules

Do not read:

- Every component contract
- Screen structures or patterns unless deciding that the request is not a
  reusable component

## Pre-build Preview

Before editing files, output:

- Component: name and product job.
- Reusability: why this belongs in PDS rather than app code.
- Anatomy: root, slots, actions, icons, metadata.
- Public API: planned props and exported types.
- States: default, hover, focus-visible, active, disabled, loading, error,
  success.
- Token categories: colour, spacing, radius, typography, motion.
- Preview coverage: normal, long text, narrow container, all states.
- Verification: tests, CSS contract, Ladle preview, `pnpm check`.

## Workflow

1. Decide whether this is truly a reusable PDS component. If it is only a screen
   composition, use existing components instead and apply the
   [PDS Screen Quality Gates](../pds-screen-quality-gates.md).
2. Map the component anatomy before coding: root, slots, optional children,
   actions, icons, status/tone/size variants, disabled/invalid/loading states,
   focus behavior, keyboard behavior, and overflow behavior.
3. If pasted code was provided, preserve useful semantics and structure, but
   replace unstyled or app-specific patterns with PDS package conventions.
4. Create the component contract from `docs/agent/components/_template.md`.
   Document purpose, when to use, API, slots, data attributes, accessibility,
   content resilience, styling contract, token categories, State Matrix, state
   behavior, examples, limitations, and related sources.
5. Implement source in `packages/react/src/components/<component-id>.tsx`. Use
   public React patterns already present in nearby components: forwarded refs
   where appropriate, explicit TypeScript props, stable `data-slot` and state
   attributes, `className` merging through local utilities, and no Tailwind, CVA,
   shadcn, or deep imports.
6. Add styles to `packages/react/src/components.css`. Use existing PDS CSS
   variables from `packages/tokens/src`; do not hard-code colors, invent local
   token names, or duplicate token values. Prefer surfaces, spacing, radius, and
   state-layer tokens over borders.
7. Export the component and public types from
   `packages/react/src/components/index.ts`.
8. Update package contract tests when the public export surface changes.
9. Add focused tests in `packages/react/src/components/components.test.tsx`.
   Cover render contract, data attributes, classes, refs, accessibility, and
   interaction behavior if interactive.
10. Update CSS contract tests when the component adds required selectors,
    resilience selectors, state hooks, or token constraints.
11. Add a Ladle preview module at
    `examples/react/src/component-previews/<component-id>.preview.tsx`. Import
    PDS components only from `@pds/react`. Include representative states, long
    text, narrow layout where relevant, and real product-like content.
12. Run `pnpm examples:previews:sync` after adding the preview.
13. Update `packages/react/README.md` and
    `docs/agent/components/README.md` indexes if the component is public.
14. Run `pnpm check`. Run `pnpm clean:workspace` afterward only when ignored
    build/cache artifacts should be cleared.

## Defaults

- Keep package boundaries explicit: tokens own values, React owns components and
  component CSS, examples own Ladle previews.
- Use semantic PDS tokens by role, not visual preference.
- Keep components resilient to translation, user content, narrow containers, and
  200% zoom.
- Every new interactive component must complete the State Matrix in its
  component contract. If a state is not applicable, state why.
- Avoid fixed dimensions except for intentional affordances.
- Use Material Symbols through the exported `Icon` component when an icon is
  needed.
- Do not create docs sites, demos outside `examples/react`, or generated `dist/`
  output.

## Completion Message

Report the component name, public exports, docs added, tests/previews added, and
verification commands run. If `pnpm check` could not run, state the blocker and
the exact command to run next.
