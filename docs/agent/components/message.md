# Message

## Purpose

Message is the PDS layout primitive for a single conversation item in
agent-facing surfaces. It owns message structure, role-based visual treatment,
metadata layout, content wrapping, and optional actions. It does not own message
data, markdown parsing, streaming, or persistence.

## When To Use

- Use inside [Transcript](transcript.md) or another conversation-like surface.
- Use for user, assistant, system, or tool messages that need consistent PDS
  spacing and role treatment.
- Use `variant="compact"` when the surrounding surface needs denser transcript
  spacing.
- Use slots to add avatar, author, metadata, run status, content, and actions.

## When Not To Use

- Do not use Message for arbitrary cards or run summaries.
- Do not use Message as a markdown renderer.
- Do not put tool output viewers, streaming state machines, or persistence logic
  inside the component.
- Do not use role values for permissions or application logic; they are visual
  message roles.

## Anatomy / Slots

```tsx
<Message>
  <MessageAvatar />
  <MessageHeader>
    <MessageAuthor />
    <MessageMeta />
  </MessageHeader>
  <MessageContent />
  <MessageActions />
</Message>
```

`MessageHeader` can include other compact metadata, such as [RunStatus](run-status.md).

## Public API

| Export | Notes |
| --- | --- |
| `Message` | Root `article`; accepts `role` and `variant`. |
| `MessageAvatar` | [Avatar](avatar.md) placement slot. |
| `MessageHeader` | Author and metadata row. |
| `MessageAuthor` | Author label. |
| `MessageMeta` | Timestamp, model, run id, or quiet metadata. |
| `MessageContent` | Message body layout slot. |
| `MessageActions` | Action row for copy, resolve, retry, or similar actions. |

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `role` | `user`, `assistant`, `system`, `tool` | `assistant` | Visual message role. Omitted from native HTML `role`. |
| `variant` | `default`, `compact` | `default` | Density treatment. |

Message forwards refs, preserves `className`, and passes native attributes to
the rendered `article`.

## Data Attributes

| Attribute | Values | Owner |
| --- | --- | --- |
| `data-slot` | `message` | `Message` |
| `data-role` | `user`, `assistant`, `system`, `tool` | `Message` |
| `data-variant` | `default`, `compact` | `Message` |
| `data-slot` | `message-avatar` | `MessageAvatar` |
| `data-slot` | `message-header` | `MessageHeader` |
| `data-slot` | `message-author` | `MessageAuthor` |
| `data-slot` | `message-meta` | `MessageMeta` |
| `data-slot` | `message-content` | `MessageContent` |
| `data-slot` | `message-actions` | `MessageActions` |

## Accessibility Contract

Message renders an `article` to expose each message as a standalone item.
Consumers own transcript labeling, live region behavior, markdown semantics,
code block semantics, and any author or timestamp accessibility details.

`role` is a PDS message role prop and maps to `data-role`; it does not set the
native ARIA `role` attribute.

## Content Resilience Rules

Messages must tolerate translated labels, generated identifiers, pasted logs,
and long user-authored content. Header, metadata, content, and actions wrap by
default with `overflow-wrap: anywhere`.

Consumers should only truncate lower-priority metadata when the full value is
available elsewhere. Do not truncate message body content by default.

## Styling Contract

The root class is `pds-message`; slot classes use the `pds-message-*` prefix.
Styling lives in `packages/react/src/components.css`.

CSS depends on `data-role` for background treatment and `data-variant` for
compact density. The grid assumes avatar in the first column and header,
content, and actions in the second column.

## Token Usage

Message uses PDS surface color, nested radius, spacing, elevation, typography,
and content resilience rules. Role styling should remain semantic and subdued;
do not introduce brand colors or performance colors.

## State Behavior

Message has no internal interactive or async state. Action state belongs to
children. Streaming, loading, retry, and error behavior should be composed with
existing child components such as [RunStatus](run-status.md) or Button until a new component is
explicitly requested.

## Composition Examples

```tsx
import {
  Avatar,
  AvatarFallback,
  Button,
  Message,
  MessageActions,
  MessageAuthor,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageMeta,
  RunStatus
} from "pds";

<Message role="assistant">
  <MessageAvatar>
    <Avatar>
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageHeader>
    <MessageAuthor>Agent</MessageAuthor>
    <MessageMeta>09:43</MessageMeta>
    <RunStatus status="running">Running</RunStatus>
  </MessageHeader>
  <MessageContent>
    <p>Checking message layout and status metadata.</p>
  </MessageContent>
  <MessageActions>
    <Button intent="secondary" size="sm">Copy</Button>
  </MessageActions>
</Message>
```

## Known Limitations

- Message does not parse, sanitize, or render markdown.
- Message does not stream content.
- Message does not render tool output.
- Message does not group consecutive messages.
- Message does not virtualize long transcripts.

## Do / Don't For Agents

Do:

- Preserve `article`, slot exports, `data-role`, and `data-variant`.
- Keep message body content available by default.
- Compose status and actions with existing components.
- Update [Transcript](transcript.md) examples when changing message layout assumptions.

Don't:

- Do not add markdown, streaming, persistence, or tool rendering logic here.
- Do not use native ARIA `role` for the visual message role prop.
- Do not introduce role-specific hard-coded colors.
- Do not force fixed message heights.

## Related Components

- [Composer](composer.md)
- [Surface](surface.md)
- [Transcript](transcript.md)
- [RunStatus](run-status.md)
- [Avatar](avatar.md)
- [Button](button.md)

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [PDS React README](../../../packages/react/README.md)
- [components.css](../../../packages/react/src/components.css)
- [Message source](../../../packages/react/src/components/message.tsx)
