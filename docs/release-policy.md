# Release Policy

PDS is currently pre-1.0. Releases should optimize for stable agent guidance,
clear migration notes, and package consumers who can update safely.

## Versioning

- Patch releases: documentation fixes, tests, internal scripts, and compatible
  component fixes.
- Minor releases while pre-1.0: new components, new props, behavior changes,
  package export changes, or significant guidance additions.
- Breaking changes before 1.0: allowed only with changelog notes and migration
  guidance.

## Release Checklist

1. Update `CHANGELOG.md`.
2. Run `pnpm docs:reference:sync` when public React component APIs or support
   matrix inputs changed.
3. Run `pnpm check`.
4. Confirm `dist/` output is not committed.
5. Pack or publish packages from `packages/tokens`, `packages/react`, and
   `packages/cli` according to the release scope.
6. Tag the release and include migration notes for any changed component API,
   token, plugin workflow, or verification expectation.

## Stable API Bar

Before considering a component API stable, it needs:

- Source, component contract, generated API reference, preview, tests, and
  supported-surface matrix coverage.
- Documented accessibility, focus, interaction, content resilience, and known
  limitations.
- At least one rendered scenario or real product use when the component is
  workflow-critical.

## Deferred Design-Tool Output

Token export, design kit, and Figma mapping should ship only after component
APIs and token names are stable enough that external design assets will not
lock in avoidable churn.
