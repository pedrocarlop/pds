---
name: audit
description: Inspect an existing web project and produce a PDS adoption plan covering framework detection, package/style integration, token/component opportunities, risks, and next steps. Use when the user asks to audit, assess, prepare, or plan PDS adoption in an existing app.
allowed-tools: [Bash, Read, Grep, Glob]
---

# Audit A Web Project For PDS

Use this skill when the user wants to understand how an existing web project can
adopt PDS before making changes. This skill is read-only unless the user
separately asks for implementation.

## Workflow

1. Resolve the target project from the skill argument or the current working
   directory.
2. Run the bundled audit script. With an argument:

```sh
node "${CLAUDE_PLUGIN_ROOT}/skills/audit/scripts/audit-web-project.mjs" --target "$ARGUMENTS"
```

Without an argument:

```sh
node "${CLAUDE_PLUGIN_ROOT}/skills/audit/scripts/audit-web-project.mjs"
```

For Codex, locate this `SKILL.md` file and run:

```sh
node ./scripts/audit-web-project.mjs
node ./scripts/audit-web-project.mjs --target <project-path>
```

from `plugins/pds/skills/audit`.

3. Read the target project's package manifest, app entrypoints, root styles, and
   routing/layout files named by the audit report.
4. If a PDS repo is available through `PDS_REPO_PATH` or the repo-local plugin
   layout, use `DESIGN.md`, `docs/ai/llm-guidelines.md`, and the relevant
   recipe from `docs/recipes` as the source of truth.
5. Produce a concise adoption plan. Do not edit files.

## Report Shape

Return:

- Detected stack and whether the current PDS web path fits.
- Current PDS integration status: dependencies, `pds/styles.css`, public
  imports, token usage, and deep-import risks.
- Recommended adoption path: install/wire styles, migrate one screen, or defer
  because the stack is outside the current React focus.
- Specific files likely to change during implementation.
- Verification commands and manual checks, including responsive layout, long
  content, and 200% zoom.

Only ask follow-up questions when the target project cannot be identified or
when multiple equally plausible product surfaces exist and choosing one would
change the adoption plan.
