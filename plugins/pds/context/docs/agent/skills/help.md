# PDS Plugin Help

Use this workflow when the user wants orientation, onboarding, or a practical
guide to the PDS plugin. Prefer a tailored guide over a generic command list:
inspect the current folder when useful, then recommend the next best workflow.

## Skill Picker

- Empty folder and user wants a new app: `/pds:start`.
- Existing app and user wants readiness: `/pds:audit`.
- Brief, screenshot, or Figma URL and user wants code: `/pds:implement-screen`.
- Generated code or a diff and user wants design-system feedback:
  `/pds:review-pds`.
- User corrects a design decision, component treatment, or PDS review finding:
  `/pds:self-improve`.
- User is unsure: inspect the folder and recommend one of the above.

## Teaching Flow

1. Identify the user's likely situation: new app, existing app, screen
   implementation, review, feedback loop, or troubleshooting.
2. For existing apps, inspect `package.json`, framework config, app entrypoints,
   root styles, and current PDS imports before recommending a path.
3. Explain the relevant command, what it will inspect or change, and what output
   to expect.
4. Show one concrete example prompt the user can run next.
5. Include verification: build/typecheck, responsive viewport, long content,
   loading/empty/error/success states, and 200% zoom.

## Common Checks

- `@pds/react` is installed for React component use.
- `@pds/react/styles.css` is imported once at the app root.
- Components come from public `@pds/react` imports, not package source paths.
- Visual chrome uses `--pds-*` tokens for colors, spacing, radius, layout
  dimensions, typography, shadow, and motion.
- Local primitives do not rebuild existing PDS components without a product
  reason.
- Long text, translated strings, user-generated content, and 200% zoom do not
  hide primary actions, labels, errors, or state feedback.

## Output Shape

For short help, return the recommended command, why it fits, one example prompt,
and what to verify next. For comprehensive help, include the plugin purpose,
skill picker, project inspection checklist, verification checklist, and relevant
troubleshooting notes.
