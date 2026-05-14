# pds

React components for PDS agent-facing product surfaces.

## Owns

- Public React component exports from `pds`.
- The package stylesheet at `pds/styles.css`.
- Component CSS that consumes `@pds/tokens` CSS variables.

## Current Surface

- Button, Badge, Avatar, Surface, Tooltip, Dialog, Input, and Textarea.
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
containers: Button, Badge, Surface, Dialog, and Tooltip allow long labels or user
content to wrap instead of relying on truncation by default. Fixed dimensions are
limited to intentionally fixed affordances such as icon buttons, avatars, avatar
badges, and dialog close controls.

## Component Context

Lightweight per-component guidance lives in
[docs/components](docs/components/README.md). Read the matching component context
before changing component source, `components.css`, examples, tests, or public
APIs.

The package README stays as the package overview. Component context explains
implementation-specific slots, stable `data-*` attributes, accessibility
contracts, content resilience rules, styling hooks, token categories, examples,
and known limitations.

## Product Components

### RunStatus

```tsx
<RunStatus status="running">Running</RunStatus>
```

| Prop | Values | Default |
| --- | --- | --- |
| `status` | `idle`, `queued`, `running`, `success`, `warning`, `error`, `cancelled` | `idle` |
| `asChild` | `boolean` | `false` |

RunStatus is compact run metadata aligned with Badge semantics. It does not
auto-announce status changes; pass `aria-live` when a consuming surface needs a
status update announced.

### Message

```tsx
<Message role="assistant">
  <MessageHeader>
    <MessageAuthor>Agent</MessageAuthor>
    <MessageMeta>12:04</MessageMeta>
    <RunStatus status="success">Done</RunStatus>
  </MessageHeader>
  <MessageContent>Generated answer</MessageContent>
</Message>
```

| Prop | Values | Default |
| --- | --- | --- |
| `role` | `user`, `assistant`, `system`, `tool` | `assistant` |
| `variant` | `default`, `compact` | `default` |

Message owns layout only. It renders an `article` and exports
`MessageAvatar`, `MessageHeader`, `MessageAuthor`, `MessageMeta`,
`MessageContent`, and `MessageActions` slots. It does not parse markdown,
handle streaming, sanitize content, persist messages, or apply product logic.

### Transcript

```tsx
<Transcript aria-label="Conversation" empty="No messages yet">
  <TranscriptList>
    <Message role="user">Hello</Message>
  </TranscriptList>
</Transcript>
```

| Prop | Values | Default |
| --- | --- | --- |
| `density` | `default`, `compact` | `default` |
| `empty` | `React.ReactNode` | `undefined` |

Transcript renders a `section` and owns transcript spacing, empty state, and
accessible section structure. It does not fetch, order, group, auto-scroll,
virtualize, or create live regions.

### Composer

```tsx
<Composer onSubmit={handleSubmit}>
  <ComposerInput aria-label="Message" />
  <ComposerActions>
    <Button type="submit">Send</Button>
  </ComposerActions>
</Composer>
```

| Prop | Values | Default |
| --- | --- | --- |
| `busy` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `invalid` | `boolean` | `false` |

Composer renders a `form`. `busy` maps to `aria-busy="true"` on the form,
`invalid` maps to `aria-invalid` through `ComposerInput`, and `disabled`
disables `ComposerInput`. Submit buttons remain consumer-owned in
`ComposerActions`; Composer does not own submission side effects.

### Product Limitations

- No markdown renderer.
- No streaming logic.
- No virtualization.
- No tool output rendering.
- No form submission side effects.

## Primitive Components

### Button

```tsx
<Button intent="primary" size="md">Run agent</Button>
<Button asChild intent="link"><a href="/runs">View runs</a></Button>
```

| Prop | Values | Default |
| --- | --- | --- |
| `intent` | `primary`, `secondary`, `danger`, `quiet`, `link` | `primary` |
| `size` | `sm`, `md`, `lg`, `icon` | `md` |
| `asChild` | `boolean` | `false` |

Buttons forward refs, preserve `className`, default to `type="button"`, and
pass native disabled attributes through to the rendered button. Disabled buttons
keep their disabled state visually stable and do not receive hover treatments.
Long button labels can wrap.

### Badge

```tsx
<Badge tone="success" emphasis="soft">Live</Badge>
```

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | `neutral`, `accent`, `success`, `warning`, `danger`, `inactive` | `neutral` |
| `emphasis` | `solid`, `soft`, `outline` | `soft` |
| `asChild` | `boolean` | `false` |

Badges are compact status or metadata elements. They forward refs, preserve
`className`, and support `asChild` for link-like composition when the consumer
owns the semantics. Long badge content can wrap, but consumers should keep badge
copy short when possible.

### Avatar

```tsx
<Avatar size="md">
  <AvatarImage alt="Pedro" src="/avatar.png" />
  <AvatarFallback>PC</AvatarFallback>
  <AvatarBadge aria-label="Online" />
</Avatar>
```

| Export | Notes |
| --- | --- |
| `Avatar` | Root with `size`: `sm`, `md`, or `lg`. |
| `AvatarImage` | Radix image primitive. Provide meaningful `alt` text. |
| `AvatarFallback` | Fallback initials or label. |
| `AvatarBadge` | Small status marker. Add an accessible label if meaningful. |
| `AvatarGroup`, `AvatarGroupCount` | Grouped avatar presentation and overflow count. |

Avatar behavior is based on Radix Avatar primitives. Fallback and group-count
text is constrained inside the fixed avatar shape.

### Surface

```tsx
<Surface level="elevated">
  <SurfaceHeader>
    <SurfaceTitle>Transcript</SurfaceTitle>
    <SurfaceDescription>Recent agent messages</SurfaceDescription>
    <SurfaceAction><Button>Refresh</Button></SurfaceAction>
  </SurfaceHeader>
  <SurfaceContent>Messages</SurfaceContent>
  <SurfaceFooter>Footer actions</SurfaceFooter>
</Surface>
```

| Export | Notes |
| --- | --- |
| `Surface` | Root with `level`: `base`, `nested`, or `elevated`. |
| `SurfaceHeader`, `SurfaceContent`, `SurfaceFooter` | Layout slots. |
| `SurfaceTitle`, `SurfaceDescription`, `SurfaceAction` | Header content slots. |

Surface is a structural composition primitive. Consumers choose landmark roles
or headings where the surrounding application requires them. Surface text slots
wrap long content, and the action/footer layout adapts for narrow containers.

### Dialog

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Confirm run</DialogTitle>
    <DialogDescription>Start this agent run?</DialogDescription>
  </DialogContent>
</Dialog>
```

Dialog wraps Radix Dialog primitives and exports `Dialog`, `DialogTrigger`,
`DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`,
`DialogFooter`, `DialogTitle`, `DialogDescription`, and `DialogClose`.

`DialogContent` renders an overlay, content surface, and a close button by
default. Pass `showCloseButton={false}` only when another visible close or
cancel action exists. Radix provides focus management, Escape dismissal,
accessible dialog roles, and title/description wiring. Dialog content scrolls
inside the viewport when content is taller than the available space.

### Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Details</TooltipTrigger>
    <TooltipContent>Agent status</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

Tooltip wraps Radix Tooltip primitives and exports `TooltipProvider`, `Tooltip`,
`TooltipTrigger`, and `TooltipContent`. `TooltipContent` accepts
`showArrow?: boolean` and defaults `sideOffset` to `8`.

Use tooltips for supplemental labels or descriptions, not required information.
Radix provides accessible tooltip roles and trigger behavior, including keyboard
focus opening. Tooltip content wraps long text within its viewport-constrained
width.

### Input And Textarea

```tsx
<Input aria-label="Prompt" density="compact" invalid />
<Textarea aria-label="Message" density="default" />
```

| Prop | Values | Default |
| --- | --- | --- |
| `density` | `default`, `compact` | `default` |
| `invalid` | `boolean` | `false` |

`Input` and `Textarea` preserve native attributes, forward refs, and map
`invalid` to `aria-invalid="true"` plus `data-invalid="true"`. Explicit
`aria-invalid` values such as `grammar` or `spelling` are preserved. Invalid
focused fields keep both invalid and focus indication. Required labels, helper
text, and error text are owned by the consuming surface until field wrapper
components exist.

## Related Docs

- [DESIGN.md](../../DESIGN.md) for the portable visual contract.
- [docs/ai/llm-guidelines.md](../../docs/ai/llm-guidelines.md) for agent usage rules.
- [docs/architecture/repository-structure.md](../../docs/architecture/repository-structure.md) for package boundaries.
- [packages/react/docs/components](docs/components/README.md) for component context.
- [packages/tokens/README.md](../tokens/README.md) for token ownership.
