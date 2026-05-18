# pds

React components for PDS agent-facing product surfaces.

## Owns

- Public React component exports from `@pds/react`.
- The package stylesheet at `@pds/react/styles.css`.
- Component CSS that consumes `@pds/tokens` CSS variables.

## Install

From a React app folder:

```sh
pnpm add @pds/react@latest
```

Then import the stylesheet once at the app root:

```tsx
import "@pds/react/styles.css";
```

To update an app to the latest published PDS release, run the same install
command again:

```sh
pnpm add @pds/react@latest
```

Codex users can ask from the app folder:

```text
Install the latest PDS package in this React app, import @pds/react/styles.css once,
use public imports from @pds/react, and run the app checks.
```

## Current Surface

- Button, Badge, Avatar, Surface, Cell, Details, Tooltip, Dialog, BottomSheet,
  Toast, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Tabs, Menu, Popover,
  Skeleton, Progress, InlineAlert, Table, DataList, Breadcrumbs, Pagination, and
  ActionMenu.
- Product components: RunStatus, Message, Transcript, and Composer.
- `@pds/react/styles.css` imports `@pds/tokens/styles.css` and component styles.
- Components use PDS-specific props and stable `data-*` attributes rather than Tailwind classes.
- This is a starter component slice, not a full production-maturity component library. APIs, behavior, and styling contracts should harden incrementally as real PDS surfaces need them.
- Browser-level visual, zoom, and focus-trap verification is future work. Current coverage is package-level TypeScript, CSS contract, and jsdom interaction testing.

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

Text-bearing components are designed to keep content available in narrow
containers: Button, Badge, Cell, Surface, Dialog, BottomSheet, Toast, and Tooltip
allow long labels or user content to wrap instead of relying on truncation by
default.
Fixed dimensions are limited to intentionally fixed affordances such as icon
buttons, avatars, avatar badges, and close controls.

## Component Context

Lightweight per-component guidance lives in
[docs/agent/components](../../docs/agent/components/README.md). Read the
matching component contract before changing component source, `components.css`,
examples, tests, or public APIs.

The package README stays as the package overview. Component context explains
implementation-specific slots, stable `data-*` attributes, accessibility
contracts, content resilience rules, styling hooks, token categories, examples,
and known limitations.

## Component Index

Detailed component contracts live in
[docs/agent/components](../../docs/agent/components/README.md).
Use those files before editing source, CSS, examples, tests, or public APIs.

| Component | Context |
| --- | --- |
| ActionMenu | [action-menu.md](../../docs/agent/components/action-menu.md) |
| Avatar | [avatar.md](../../docs/agent/components/avatar.md) |
| Badge | [badge.md](../../docs/agent/components/badge.md) |
| Breadcrumbs | [breadcrumbs.md](../../docs/agent/components/breadcrumbs.md) |
| BottomSheet | [bottom-sheet.md](../../docs/agent/components/bottom-sheet.md) |
| Button | [button.md](../../docs/agent/components/button.md) |
| Cell | [cell.md](../../docs/agent/components/cell.md) |
| Checkbox | [checkbox.md](../../docs/agent/components/checkbox.md) |
| Composer | [composer.md](../../docs/agent/components/composer.md) |
| DataList | [data-list.md](../../docs/agent/components/data-list.md) |
| Details | [details.md](../../docs/agent/components/details.md) |
| Dialog | [dialog.md](../../docs/agent/components/dialog.md) |
| InlineAlert | [inline-alert.md](../../docs/agent/components/inline-alert.md) |
| Input | [input.md](../../docs/agent/components/input.md) |
| Menu | [menu.md](../../docs/agent/components/menu.md) |
| Message | [message.md](../../docs/agent/components/message.md) |
| Pagination | [pagination.md](../../docs/agent/components/pagination.md) |
| Popover | [popover.md](../../docs/agent/components/popover.md) |
| Progress | [progress.md](../../docs/agent/components/progress.md) |
| RadioGroup | [radio-group.md](../../docs/agent/components/radio-group.md) |
| RunStatus | [run-status.md](../../docs/agent/components/run-status.md) |
| Select | [select.md](../../docs/agent/components/select.md) |
| Skeleton | [skeleton.md](../../docs/agent/components/skeleton.md) |
| Surface | [surface.md](../../docs/agent/components/surface.md) |
| Switch | [switch.md](../../docs/agent/components/switch.md) |
| Table | [table.md](../../docs/agent/components/table.md) |
| Tabs | [tabs.md](../../docs/agent/components/tabs.md) |
| Textarea | [textarea.md](../../docs/agent/components/textarea.md) |
| Toast | [toast.md](../../docs/agent/components/toast.md) |
| Tooltip | [tooltip.md](../../docs/agent/components/tooltip.md) |
| Transcript | [transcript.md](../../docs/agent/components/transcript.md) |

## Current Limitations

- No markdown renderer.
- No streaming logic.
- No virtualization.
- No tool output rendering.
- No form submission side effects.
- No browser-level visual, zoom, or focus-trap verification yet.

## Related Docs

- [DESIGN.md](../../DESIGN.md) for the portable visual contract.
- [docs/agent/workflow.md](../../docs/agent/workflow.md) for agent usage rules.
- [docs/architecture/repository-structure.md](../../docs/architecture/repository-structure.md) for package boundaries.
- [docs/agent/components](../../docs/agent/components/README.md) for component context.
- [packages/tokens/README.md](../tokens/README.md) for token ownership.
