# pds

React components for PDS agent-facing product surfaces.

## Owns

- Public React component exports from `pds`.
- The package stylesheet at `pds/styles.css`.
- Component CSS that consumes `@pds/tokens` CSS variables.

## Current Surface

- Button, Badge, Avatar, Surface, Tooltip, Dialog, BottomSheet, Toast, Input,
  and Textarea.
- Product components: RunStatus, Message, Transcript, and Composer.
- `pds/styles.css` imports `@pds/tokens/styles.css` and component styles.
- Components use PDS-specific props and stable `data-*` attributes rather than Tailwind classes.
- This is a starter component slice, not a full production-maturity component library. APIs, behavior, and styling contracts should harden incrementally as real PDS surfaces need them.
- Browser-level visual, zoom, and focus-trap verification is future work. Current coverage is package-level TypeScript, CSS contract, and jsdom interaction testing.

## Usage

```tsx
import { Button, Surface, SurfaceContent } from "pds";
import "pds/styles.css";

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

Import `pds/styles.css` once in the consuming app. It loads `@pds/tokens/styles.css`
before PDS component CSS.

Component styles are plain CSS built on PDS CSS variables. Do not use Tailwind,
CVA, shadcn aliases, or generated shadcn setup inside this package. Prefer
semantic PDS tokens over one-off values. Component DOM includes stable
`data-slot` attributes and state attributes such as `data-intent`, `data-size`,
`data-tone`, `data-emphasis`, `data-level`, `data-density`, `data-status`,
`data-role`, `data-variant`, `data-busy`, `data-disabled`, and `data-invalid`.

Text-bearing components are designed to keep content available in narrow
containers: Button, Badge, Surface, Dialog, BottomSheet, Toast, and Tooltip allow
long labels or user content to wrap instead of relying on truncation by default.
Fixed dimensions are limited to intentionally fixed affordances such as icon
buttons, avatars, avatar badges, and close controls.

## Component Context

Lightweight per-component guidance lives in
[docs/components](docs/components/README.md). Read the matching component context
before changing component source, `components.css`, examples, tests, or public
APIs.

The package README stays as the package overview. Component context explains
implementation-specific slots, stable `data-*` attributes, accessibility
contracts, content resilience rules, styling hooks, token categories, examples,
and known limitations.

## Component Index

Detailed component contracts live in [docs/components](docs/components/README.md).
Use those files before editing source, CSS, examples, tests, or public APIs.

| Component | Context |
| --- | --- |
| Avatar | [avatar.md](docs/components/avatar.md) |
| Badge | [badge.md](docs/components/badge.md) |
| BottomSheet | [bottom-sheet.md](docs/components/bottom-sheet.md) |
| Button | [button.md](docs/components/button.md) |
| Composer | [composer.md](docs/components/composer.md) |
| Dialog | [dialog.md](docs/components/dialog.md) |
| Input | [input.md](docs/components/input.md) |
| Message | [message.md](docs/components/message.md) |
| RunStatus | [run-status.md](docs/components/run-status.md) |
| Surface | [surface.md](docs/components/surface.md) |
| Textarea | [textarea.md](docs/components/textarea.md) |
| Toast | [toast.md](docs/components/toast.md) |
| Tooltip | [tooltip.md](docs/components/tooltip.md) |
| Transcript | [transcript.md](docs/components/transcript.md) |

## Current Limitations

- No markdown renderer.
- No streaming logic.
- No virtualization.
- No tool output rendering.
- No form submission side effects.
- No browser-level visual, zoom, or focus-trap verification yet.

## Related Docs

- [DESIGN.md](../../DESIGN.md) for the portable visual contract.
- [docs/ai/llm-guidelines.md](../../docs/ai/llm-guidelines.md) for agent usage rules.
- [docs/architecture/repository-structure.md](../../docs/architecture/repository-structure.md) for package boundaries.
- [packages/react/docs/components](docs/components/README.md) for component context.
- [packages/tokens/README.md](../tokens/README.md) for token ownership.
