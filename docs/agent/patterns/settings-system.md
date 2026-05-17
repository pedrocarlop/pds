# Settings And System

Settings and system covers product surfaces for configuration, connected
accounts, operational status, and destructive controls.

## Overview

Use this pattern when users manage an agent workspace or system configuration.
The highest-risk mistake is mixing routine settings with destructive actions
without clear hierarchy, state, or confirmation. PDS supplies controls and
surface primitives; client products own validation, persistence, permissions,
and account integrations.

## States

| State | Required behavior |
| --- | --- |
| Default | Show current values, account health, and save/destructive controls. |
| Dirty | Make unsaved changes visible and keep save/reset actions available. |
| Saving | Preserve form layout, prevent duplicate submission, and expose busy state. |
| Saved | Confirm success without hiding changed values. |
| Error | Show field or form errors inline and keep entered values. |
| Destructive | Require explicit confirmation and explain impact before enabling the action. |

## Layout Anatomy

- Configuration region: fields, selects, toggles, and explanatory helper copy.
- Account region: connected account rows, status, and per-account actions.
- System region: operational rows, status, latency, and degraded-service detail.
- Destructive region: separated inline warning, confirmation control, and danger
  action.
- On narrow screens, secondary status regions stack after configuration while
  destructive controls remain visible and labeled.

## Flow Variants

| Flow | Use |
| --- | --- |
| Workspace settings | User changes product defaults and system instructions. |
| Connected accounts | User reconnects, scopes, or removes integrations. |
| System operations | User checks service status and resolves degraded integrations. |
| Destructive action | User deletes, revokes, resets, or disables critical data. |

## Component Composition

Compose `Surface`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`,
`DataList`, `Table`, `Menu`, `RunStatus`, `InlineAlert`, and `Button`.
Destructive actions use visible confirmation plus `Button` danger treatment.

## Accessibility

- Every field and control has a visible label or accessible name.
- Switches and checkboxes are reachable by keyboard and expose checked state.
- Account action menus are named by account.
- Destructive confirmation must be operable without pointer-only interaction.
- Field errors appear inline and are programmatically associated by the client
  when validation is implemented.

## Content Resilience

Field labels, helper copy, account names, connected-account metadata, and status
rows wrap. Destructive warnings and required confirmation labels do not
truncate. Dense operational tables may scroll horizontally only when all values
remain accessible.

## Client Responsibilities

Client products own form validation, dirty-state tracking, save/reset behavior,
account OAuth flows, permission checks, destructive-action confirmation policy,
audit logging, and service monitoring data.

## Verification

- Settings fields, select, checkbox, and switch are keyboard reachable.
- Connected account menu actions are named and reachable.
- Degraded/error account status remains visible without color alone.
- Destructive action stays disabled until explicit confirmation.
- Long account names and helper copy wrap at narrow widths and 200% zoom.

## Do's And Don'ts

Do:

- Separate destructive controls from routine settings.
- Keep current values visible while saving or recovering from errors.
- Show account health next to account actions.

Don't:

- Do not rely on disabled danger buttons without explaining the requirement.
- Do not hide field errors or destructive warnings in toasts.
- Do not bury integration health in unrelated configuration fields.

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [Input](../components/input.md)
- [Select](../components/select.md)
- [Switch](../components/switch.md)
