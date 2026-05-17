---
name: help
description: Teach users how to use the PDS plugin, choose the right skill, understand what each workflow does, inspect a project for PDS readiness, review generated UI, and troubleshoot common setup or adoption issues. Use when the user asks for help, onboarding, a guide, what this plugin does, how to check things, or how to use PDS from Codex or Claude.
allowed-tools: [Bash, Read, Grep, Glob]
---

# PDS Plugin Help

Use this skill when the user wants orientation, onboarding, or a practical guide
to the PDS plugin. Prefer a tailored guide over a generic command list: inspect
the current folder when useful, then explain the next best workflow.

## What This Plugin Does

PDS helps designers and AI coding agents move from design intent to React web
implementation while staying inside the PDS design system. `/pds:help` is the
onboarding and routing entrypoint. The plugin then supports four delivery jobs
and one internal feedback loop:

- Start a new PDS-backed Vite React app with `/pds:start`.
- Audit an existing React web app for PDS adoption with `/pds:audit`.
- Implement or modify a product screen from a brief, screenshot, or Figma
  handoff with `/pds:implement-screen`.
- Review generated or changed UI against PDS with `/pds:review-pds`.
- Learn from user design feedback with `/pds:self-improve` by fixing the
  artifact when needed and updating the durable PDS guidance that failed.

Use this `/pds:help` skill to explain those jobs, recommend a workflow, and show
the user how to inspect what is happening.

## Fast Skill Picker

- Empty folder and user wants a new app: use `/pds:start`.
- Existing app and user wants to know readiness: use `/pds:audit`.
- User has a brief, screenshot, or Figma URL and wants code: use
  `/pds:implement-screen`.
- User has generated code or a diff and wants design-system feedback: use
  `/pds:review-pds`.
- User corrects a design decision, component treatment, or PDS review finding:
  use `/pds:self-improve`.
- User is unsure what to do: use `/pds:help`, inspect the folder, and recommend
  one of the above.

## How To Teach The Workflow

When answering help requests:

1. Start with the user's likely situation: new app, existing app, screen
   implementation, review, or troubleshooting.
2. If a local project is available, inspect `package.json`, framework config,
   app entrypoints, root styles, and current PDS imports before recommending a
   path.
3. Explain the relevant command, what it will inspect or change, and what the
   user should expect as output.
4. Show one concrete example prompt the user can run next.
5. Include how to verify the result: build/typecheck, responsive viewport, long
   content, loading/empty/error/success states, and 200% zoom.

Keep the explanation practical. Do not recite every detail when the user only
needs the next command.

## Inspecting A Project

For an existing app, teach users to check:

- `package.json`: framework, React version, package manager, and whether `pds`
  is installed.
- Root entrypoints such as `src/main.tsx`, `app/layout.tsx`, or `pages/_app.tsx`:
  whether `pds/styles.css` is imported once.
- Root styles such as `src/index.css`, `app/globals.css`, or imported CSS files:
  whether UI chrome uses PDS tokens instead of hard-coded visual values.
- Screen/component files: whether UI uses public imports from `pds` instead of
  deep imports or local recreations.
- Existing flows and routes: where a bounded first PDS migration should happen.

The audit script automates the first pass:

```sh
node <plugin-root>/skills/audit/scripts/audit-web-project.mjs --target <project-path>
```

The review script gives automated hints for a file or directory:

```sh
node <plugin-root>/skills/review-pds/scripts/review-pds.mjs --target <path>
```

Treat script output as evidence, not final judgment. The agent should still read
the relevant files and PDS docs before making claims.

## Recommended Workflows

### New App

Use:

```sh
/pds:start
```

The current folder must be empty or contain only `.git`, `.gitignore`, or
`.DS_Store`. The skill creates a Vite React TypeScript app, installs local PDS
packages, imports `pds/styles.css`, renders a first PDS screen, and runs a
build.

### Existing App Adoption

Use:

```sh
/pds:audit
```

Expected output: detected framework, package/style integration status, likely
entrypoints, PDS usage signals, risks, files likely to change, and verification
steps. After audit, migrate one bounded screen before attempting broad visual
conversion.

### Implement From Design Intent

Use:

```sh
/pds:implement-screen Build the approval review screen from this brief: ...
```

The skill should inspect the app, load PDS guidance, map the design to public
PDS components, keep app CSS layout-focused, preserve app logic, and verify the
result. If a Figma URL is provided and a Figma connector is available, fetch the
design context first.

### Review Generated UI

Use:

```sh
/pds:review-pds src/App.tsx
```

The review should focus on PDS imports, stylesheet wiring, token usage,
component fit, accessibility, state coverage, content resilience, and whether
the screen holds up under narrow viewports and 200% zoom.

### Learn From Design Feedback

Use:

```sh
/pds:self-improve The Button feedback is that icon-only actions feel ambiguous in this flow
```

The skill should inspect the artifact and relevant PDS docs, identify whether a
rule was missing, failed, ambiguous, conflicting, or unowned, then update the
smallest durable owner. Component feedback should normally self-improve the
matching file in `packages/react/docs/components` and only broaden into
foundation or plugin workflow guidance when the root cause is shared.

## Common Checks To Explain

- PDS package: `pds` should be installed for React component use.
- Stylesheet: `pds/styles.css` should be imported once at the app root.
- Imports: components should come from `pds`, not package source paths.
- Tokens: app visual chrome should use `--pds-*` tokens for color, spacing,
  radius, typography, shadow, and motion.
- Components: avoid rebuilding primitives already covered by PDS unless the
  product needs a local composition.
- Resilience: long text, translated strings, user-generated content, and 200%
  browser zoom should not hide primary actions, labels, errors, or state
  feedback.

## Troubleshooting Guidance

- Components render unstyled: check the single root `pds/styles.css` import.
- Package cannot resolve: for local external apps, install both packed
  `@pds/tokens` and `pds` tarballs until registry publishing exists.
- The app is not React web: explain that current plugin support is centered on
  React web; use the audit to document gaps rather than forcing PDS components.
- The generated screen feels off-system: run `/pds:review-pds`, then fix token
  usage, component selection, state coverage, and layout resilience before
  changing the design system.
- The user gives design feedback after review or implementation: run
  `/pds:self-improve` so the component, foundation, pattern, or plugin guidance
  is updated where the miss originated.
- The user is coming from Figma: explain that PDS implementation translates
  design intent into system components and tokens; it should not blindly copy
  pixels when that would violate PDS guidance.

## Output Shape

For short help, return:

- Recommended command.
- Why that command fits.
- One example prompt.
- What to verify next.

For comprehensive help, return:

- What the plugin does.
- Skill picker.
- Step-by-step workflow for the user's situation.
- Project inspection checklist.
- Verification checklist.
- Troubleshooting notes.
