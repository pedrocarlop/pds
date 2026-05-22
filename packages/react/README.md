# pds

React components for PDS agent-facing product surfaces.

## Owns

- Public React component exports from `@pds/react`.
- The package stylesheet at `@pds/react/styles.css`.
- Component CSS that consumes `@pds/tokens` CSS variables.

## Install

Use the root [install guide](../../README.md#install-in-an-app) for registry,
Codex, update, and local tarball flows. This package requires one app-root
`@pds/react/styles.css` import and uses `@pds/tokens` for CSS variables.

## Current Surface

- Icon, Button, Badge, FilterChip, Avatar, Surface, ActionWidget, Cell, Item, Details, Tooltip, Dialog,
  BottomSheet, Toast, Input, Amount, Textarea, Select, Checkbox, RadioGroup,
  Switch, Tabs, Menu, Popover, Skeleton, Progress, InlineAlert, Table, DataList,
  Breadcrumbs, Pagination, PageHeader, ActionMenu, and TravelWidget.
- Product components: RunStatus, Message, Transcript, and Composer.
- `@pds/react/styles.css` imports `@pds/tokens/styles.css` and component styles.
- Components use PDS-specific props and stable `data-*` attributes rather than Tailwind classes.
- This is a starter component slice, not a full production-maturity component library. APIs, behavior, and styling contracts should harden incrementally as real PDS surfaces need them.
- Browser-level component preview verification covers private Ladle previews at desktop and a 200% zoom proxy. Focus-trap verification remains future work.

## Usage

```tsx
import { Button, Surface, SurfaceContent } from "@pds/react";
import "@pds/react/styles.css";

export function Example() {
  return (
    <Surface>
      <SurfaceContent>
        <Button>Run agent</Button>
      </SurfaceContent>
    </Surface>
  );
}
```

## Styling Contract

Import `@pds/react/styles.css` once in the consuming app. It loads `@pds/tokens/styles.css`
before PDS component CSS.

Component styles are plain CSS built on PDS CSS variables. Do not use Tailwind,
CVA, shadcn aliases, or generated shadcn setup inside this package. Prefer
semantic PDS tokens over one-off values. Component DOM includes stable
`data-slot` attributes and state attributes such as `data-intent`, `data-size`,
`data-tone`, `data-emphasis`, `data-level`, `data-density`, `data-status`,
`data-role`, `data-variant`, `data-busy`, `data-disabled`, and `data-invalid`.

Button labels are fixed-height and single-line, so action copy should stay
concise and supporting context should live in the surrounding surface. Other
text-bearing components are designed to keep content available in narrow
containers: Badge, Cell, Surface, ActionWidget, Dialog, BottomSheet, Toast, and
Tooltip allow long labels or user content to wrap instead of relying on
truncation by default.
Fixed dimensions are limited to intentional affordances such as buttons, icon
buttons, avatars, avatar badges, and close controls.

Icons use Google Material Symbols Rounded through the exported `Icon` component
and the shared `.material-symbols-rounded` class. Use Material Symbols snake-case
names such as `add`, `close`, or `chevron_right`; the package stylesheet fixes
the icon axes to unfilled, weight 400, grade 0, optical size 24.

## Component Context

Lightweight per-component guidance lives in
[docs/agent/components](../../docs/agent/components/README.md). Read the
matching component contract before changing component source, `components.css`,
examples, tests, or public APIs.

The package README stays as the package overview. Component context explains
implementation-specific slots, stable `data-*` attributes, accessibility
contracts, content resilience rules, styling hooks, token categories, examples,
and known limitations.

## Current Limitations

- No markdown renderer.
- No streaming logic.
- No virtualization.
- No tool output rendering.
- No form submission side effects.
- No browser-level focus-trap verification yet.

## Related Docs

- [DESIGN.md](../../DESIGN.md) for the portable visual contract.
- [docs/agent/workflow.md](../../docs/agent/workflow.md) for agent usage rules.
- [docs/architecture/repository-structure.md](../../docs/architecture/repository-structure.md) for package boundaries.
- [docs/agent/components](../../docs/agent/components/README.md) for component context.
- [packages/tokens/README.md](../tokens/README.md) for token ownership.
