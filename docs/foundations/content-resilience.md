# PDS Content Resilience Guidelines

PDS interfaces must survive translated strings, user-generated content,
accessibility text settings, and browser zoom. Assume translated English text can
be 40% longer, and verify critical product flows at 200% browser zoom.

Sources: [DESIGN.md](../../DESIGN.md), [typography.md](typography.md), and
[spacing.md](spacing.md).

## Boundless By Default

PDS components and generated product surfaces should grow naturally with content
whenever their layout role allows it. Introduce fixed width or fixed height only
when the component identity, data density, or container contract requires it.

Prefer responsive constraints such as `max-width`, `min-width`, `min-height`,
flex wrapping, grid tracks, and token-based spacing before clipping content.

## Overflow Mechanisms

| Mechanism | Use |
| --- | --- |
| Line upscaling | Flexible components that can grow in height. Allow line count to increase by up to 50%, then truncate only if the content still overflows. |
| Static line upscaling | Fixed-size components that can absorb extra lines inside existing spacing without changing outer dimensions. |
| Font downscaling | Display or heading text that cannot grow. Reduce up to 40%, but never below the PDS minimum rendered text size of 14px. |
| Truncation | Lower-priority, repeated, or expandable content where the full text is available elsewhere. |

## Priority

When multiple text elements compete for space, allocate lines and readable size
to higher-priority content first:

1. Primary label, title, or current task.
2. Supporting label, subtitle, or selected value.
3. Secondary body copy, helper text, or description.
4. Metadata, timestamps, counters, and badges.

## Component Spec Requirement

Any future PDS component, pattern, or generated UI contract that is not fully
boundless must document:

- Text element name.
- Standard English max lines or characters.
- Expanded allowance after 40% growth.
- Overflow mechanism.
- Priority and minimum size rules.

## Rules

- Do not truncate primary actions, error messages, required form labels, or state feedback.
- Do not apply font downscaling to body copy, helper text, metadata, or small emphasis text.
- Define maximum width before applying line upscaling to short labels.
- Align row siblings to the tallest item unless the component contract states otherwise.
- Preserve PDS token recipes when resizing text: keep font family, line-height, and weight tied to the selected role.
- Use token-based spacing and surface hierarchy to absorb larger content before adding borders, dividers, or one-off layout values.
