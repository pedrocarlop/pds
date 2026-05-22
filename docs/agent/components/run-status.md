# RunStatus

## Purpose

RunStatus is the PDS compact run-state primitive. It composes Badge styling with
a constrained status vocabulary and default labels for agent or tool run state.

## When To Use

- Use for compact run, job, queue, or tool execution state.
- Use default labels when the status value is enough for the surrounding UI.
- Pass children when the visible label needs product-specific wording.
- Add `aria-live` from the consuming surface when status changes must be
  announced.

## When Not To Use

- Do not use RunStatus for arbitrary metadata that is not execution state.
- Do not use it as a progress bar, spinner, or detailed error message.
- Do not assume it announces changes automatically.

## Anatomy / Slots

RunStatus has one public root slot.

```tsx
<RunStatus status="running">Running</RunStatus>
```

## Public API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `status` | `idle`, `queued`, `running`, `success`, `warning`, `error`, `cancelled` | `idle` | Execution state. |
| `asChild` | `boolean` | `false` | Renders through Radix `Slot.Root`. |
| `children` | `ReactNode` | Status label | Overrides default visible label. |

RunStatus extends native `span` attributes, forwards refs, and preserves
`className`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `run-status` | Component |
| `data-status` | `idle`, `queued`, `running`, `success`, `warning`, `error`, `cancelled` | Component |
| `data-tone` | Badge tone derived from `status` | Component |
| `data-emphasis` | `soft` | Component |

RunStatus also includes `pds-badge` and `pds-run-status` classes.

## Accessibility Contract

RunStatus renders a neutral `span` by default. It does not set `role="status"`
or `aria-live`; consumers add live-region behavior when updates need
announcement.

Use text that describes the status because color alone is not enough.

## Content Resilience Rules

Default labels are short. Custom children can wrap, but should remain concise so
status metadata does not dominate transcript or panel layouts.

## Styling Contract

RunStatus uses `pds-badge pds-run-status`; styling lives in
`packages/react/src/components.css`.

CSS depends on `data-status`, Badge-compatible `data-tone`, and
`data-emphasis="soft"`. Preserve Badge compatibility when changing visual
treatment.

## Token Usage

RunStatus uses Badge token categories plus PDS semantic status colors. Status
mapping should stay semantic and subdued.

## State Contract

| State | Trigger | Visual treatment | Data attribute / selector | Accessibility notes |
| --- | --- | --- | --- | --- |
| Default | Normal render | RunStatus renders a Badge-like status with derived tone and text. | `data-slot='run-status'`, `data-status`, `data-tone` | Readable text communicates status; color is secondary. |
| Disabled | `disabled` / `aria-disabled` | Cancelled and idle are statuses, not disabled states. | `data-status='cancelled'`, `data-status='idle'` only | Do not use status as disabled semantics. |
| Loading | `loading` prop / `data-busy` | Queued and running statuses use neutral or accent status tones. | `data-status='queued'`, `data-status='running'` | Status text should name the current work state. |
| Error | `data-invalid` / error prop | Error status uses danger tone. | `data-status='error'`, `data-tone='danger'` | Readable text must describe the error state. |
| Success | status / success prop | Success status uses success tone. | `data-status='success'`, `data-tone='success'` | Readable text must describe completion. |

Non-applicable states: Hover, Focus-visible, Active. Use child components or the surrounding region for those states when needed.

## State Behavior

RunStatus has no internal async behavior. It maps `status` to default text and a
Badge tone. `asChild` composes attributes onto a consumer-owned child.

## Composition Examples

```tsx
import { RunStatus } from "@pds/react";

<RunStatus status="queued" />
<RunStatus status="running" aria-live="polite">Working</RunStatus>
<RunStatus asChild status="success">
  <span>Completed</span>
</RunStatus>
```

## Known Limitations

- RunStatus does not announce changes automatically.
- RunStatus does not display progress or elapsed time.
- RunStatus does not own retry, cancellation, or error detail behavior.

## Do / Don't For Agents

Do:

- Preserve the status vocabulary unless an explicit API change is requested.
- Keep Badge-compatible attributes and classes.
- Document and test any changed status-to-tone mapping.

Don't:

- Do not add live-region behavior by default.
- Do not turn RunStatus into a progress component.
- Do not use status color without visible text.

## Related Components

- [Badge](badge.md)
- [Message](message.md)
- [Transcript](transcript.md)

## Related Sources

- Component source: [packages/react/src/components/run-status.tsx](../../../packages/react/src/components/run-status.tsx)
