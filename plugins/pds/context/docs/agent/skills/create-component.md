# Create A PDS Component

Use this workflow when the user asks to add a new reusable component to the PDS
React library, or pastes unstyled React component code that should become a PDS
component.

## Inputs

Accept either a brief such as "create a banner" or pasted React component code.
Infer the component job, target user, anatomy, states, interaction model,
content resilience requirements, and likely component group. Ask one concise
question only when the component purpose or public API cannot be inferred safely.

## Required Reading

Before editing, read:

1. [AGENTS.md](../../../AGENTS.md), [DESIGN.md](../../../DESIGN.md), and
   [workflow.md](../workflow.md).
2. Relevant foundation docs in [docs/foundations](../../foundations), especially
   tokens, colour, typography, spacing, motion, and content resilience.
3. [packages/react/README.md](../../../packages/react/README.md).
4. [components/README.md](../components/README.md) and
   [components/_template.md](../components/_template.md).
5. [PDS Component Quality Gates](../pds-quality-gates.md), plus
   [PDS Screen Quality Gates](../pds-screen-quality-gates.md) when the request
   may be screen composition rather than a reusable component.
6. Nearby component contracts, source, CSS, tests, and previews for similar
   components.
7. [examples/react/README.md](../../../examples/react/README.md) for Ladle
   preview rules.

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
   content resilience, styling contract, token categories, states, examples,
   limitations, and related sources.
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
- Avoid fixed dimensions except for intentional affordances.
- Use Material Symbols through the exported `Icon` component when an icon is
  needed.
- Do not create docs sites, demos outside `examples/react`, or generated `dist/`
  output.

## Completion Message

Report the component name, public exports, docs added, tests/previews added, and
verification commands run. If `pnpm check` could not run, state the blocker and
the exact command to run next.
