# pds

React components for PDS agent-facing product surfaces.

## Owns

- Public React component exports from `pds`.
- The package stylesheet at `pds/styles.css`.
- Component CSS that consumes `@pds/tokens` CSS variables.

## Current Surface

- Button, Badge, Avatar, Surface, Tooltip, Dialog, Input, and Textarea.
- `pds/styles.css` imports `@pds/tokens/styles.css` and component styles.
- Components use PDS-specific props and stable `data-*` attributes rather than Tailwind classes.

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

## Related Docs

- [DESIGN.md](../../DESIGN.md) for the portable visual contract.
- [docs/ai/llm-guidelines.md](../../docs/ai/llm-guidelines.md) for agent usage rules.
- [docs/architecture/repository-structure.md](../../docs/architecture/repository-structure.md) for package boundaries.
- [packages/tokens/README.md](../tokens/README.md) for token ownership.
