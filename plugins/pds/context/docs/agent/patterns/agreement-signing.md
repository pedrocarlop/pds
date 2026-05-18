# Agreement Signing

Agreement signing covers flows that present legal, compliance, or product
agreements and capture acceptance.

## Overview

Use this pattern when a product surface needs explicit consent, agreement
review, acceptance capture, or audit-ready confirmation. Pattern guidance
supersedes general component guidance for agreement flows because the user must
understand what they are accepting and the product must preserve recoverable,
auditable state.

Do not build a single agreement-signing component in PDS for this pattern. Client
teams compose PDS primitives and own agreement data, submission, analytics, and
audit storage.

## States

| State | Required behavior |
| --- | --- |
| Locked | The primary CTA is unavailable until required reading, opening, scrolling, or selection is complete. The requirement must be visible near the CTA. |
| Active | The user can accept. The primary CTA uses `Button` primary treatment and document identity remains visible. |
| Loading | Submission is in progress. Preserve the CTA area width, expose busy state with text, and prevent duplicate submission. |
| Success | Confirm completion with visible copy. Use `Toast` only for non-blocking confirmation; keep audit-relevant details available where needed. |
| Error | Keep the user in context, preserve progress, show a visible inline error, and offer retry. |

## Flow Variants

| Flow | Use |
| --- | --- |
| Informational documents | Documents do not require opening or explicit acceptance. Present summaries clearly and keep the primary task available. |
| Bulk acceptance without opening | Multiple documents can be accepted through one explicit consent action. Show document title, version, and jurisdiction before acceptance. |
| Mandatory opening and acceptance | The user must open, review, or scroll required documents before the CTA unlocks. Use only when legal or compliance requirements demand proof of exposure. |

## Document Presentation

Choose the lightest presentation that satisfies the legal and product
requirement:

- Inline summary for short disclosures.
- `Surface` or nested `Surface` document lists for multiple agreements.
- `Dialog` for compact focused review.
- `BottomSheet` for bottom-attached document review, especially when the user
  should stay anchored to the current mobile task.
- Scroll-gated document view only when the requirement is explicit.

Never use a timer as a substitute for scroll position, document opening, or an
explicit user action.

## CTA Behavior

- Locked CTA explains the missing requirement with visible text.
- Active CTA uses the local primary action treatment.
- Loading CTA keeps layout stable and exposes busy copy.
- Success confirms completion.
- Error keeps the user in context and offers retry.

Primary actions, required labels, and error messages must remain visible at
every breakpoint.

## Component Composition

- Use `Button` for accept, cancel, retry, and review actions.
- Use `Surface` for grouped agreement summaries and document identity.
- Use `Dialog` for compact focused review.
- Use `BottomSheet` for bottom-attached review with fixed header/footer and a
  scrollable document body.
- Use `Toast` for non-blocking completion feedback only. Do not use Toast for
  required validation errors, locked-state requirements, or recoverable
  submission failures.
- Use inline visible text for locked-state requirements and errors. Badge or
  status color can support the message but must not be the only signal.

## Accessibility

- Preserve keyboard access to document links, review surfaces, and all CTA
  states.
- Use accessible names for document actions and modal or sheet titles.
- Keep focus inside `Dialog` or `BottomSheet` while open and return focus to the
  trigger on dismissal.
- Expose loading with `aria-busy` or equivalent app-owned state when submission
  is asynchronous.
- Use a polite live region for non-blocking success confirmation when a Toast is
  not enough for the surrounding flow.

## Content Resilience

Agreement flows must survive translated strings, long document titles, version
labels, jurisdiction names, and 200% browser zoom.

- Document title, version, and jurisdiction wrap instead of truncating unless a
  full value is available in the review surface.
- Locked requirements, primary CTA labels, and errors do not truncate.
- `BottomSheetBody` owns scrolling for long documents so header identity and
  footer actions stay reachable.
- At narrow widths, actions wrap and remain visible instead of overflowing.

## Client Responsibilities

Client teams own:

- Supplying document title, version, jurisdiction, and required acceptance mode.
- Tracking required opening, scrolling, or selection state.
- Recording acceptance timestamp and relevant audit metadata.
- Handling network and validation errors without losing user progress.
- Providing analytics for open, unlock, accept, success, and error events when
  required.

## Verification

- Locked CTA cannot submit and explains what is missing.
- Required document identity and version stay visible before acceptance.
- Mandatory-review flows unlock only after the required user action, never from
  a timer alone.
- Loading prevents duplicate submission and preserves layout.
- Submission error keeps review progress and retry in context.
- Success uses inline confirmation or Toast based on whether the feedback is
  required for task completion.
- Dialog and BottomSheet variants are keyboard reachable, named, dismissible,
  and usable at 200% zoom.

## Do's And Don'ts

Do:

- Make the acceptance requirement explicit before the CTA unlocks.
- Keep document identity and version visible.
- Preserve user progress if submission fails.
- Support keyboard and screen-reader navigation through documents and CTA
  states.

Don't:

- Do not hide required legal content behind decorative UI.
- Do not unlock acceptance through time delay alone.
- Do not disable the CTA without explaining why.
- Do not put required errors or audit-relevant state only in Toast.

## Related Sources

- [DESIGN.md](../../../DESIGN.md)
- [Content resilience](../../foundations/content-resilience.md)
- [Dialog](../components/dialog.md)
- [BottomSheet](../components/bottom-sheet.md)
- [Toast](../components/toast.md)
