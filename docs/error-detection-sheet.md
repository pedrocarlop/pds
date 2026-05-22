# Token Usage Error-Detection Sheet

Date: 2026-05-22

This sheet captures repository documentation findings from a full Markdown-family
document audit focused on token usage, redundancy, and preserving agent
effectiveness.

## Scope

- Documents inspected: 186 Markdown-family files outside `node_modules`, `dist`,
  and `coverage`.
- Canonical or hand-authored documents: 98 files, 10,599 lines.
- Generated plugin context documents: 88 files, 10,317 lines.
- Generated plugin context files under `plugins/pds/context` were verified as
  byte-for-byte copies of canonical source files.
- Legal notices were read but are not treated as optimization candidates because
  license text should not be shortened casually.

## Resolution Status

Applied on 2026-05-22.

- F-001: Resolved by pruning source-repo-only readiness/evaluation docs and
  human orientation docs from generated plugin context, adding a source-repo rule
  to avoid reading `plugins/pds/context`, and regenerating context. Generated
  context is now 91 files / 536K instead of 96 files / 600K.
- F-002: Resolved by replacing full component State Matrix sections with
  shorter State Contract sections that list applicable states and summarize
  omitted states.
- F-003: Resolved by reducing per-component Related Sources to the component
  source link and relying on surrounding contract sections for shared package
  and style references.
- F-004: Resolved by removing the duplicated per-component table from
  `packages/react/README.md`; `docs/agent/components/README.md` remains the
  canonical component index.
- F-005: Resolved by making the root README the canonical install/update guide
  and converting package/recipe duplicates into links plus scenario-specific
  steps.
- F-006: Resolved by compacting skill Minimum Read Path sections into route
  deltas that defer universal stop rules to `docs/agent/router.md`.
- F-007 and F-008: Resolved by shortening plugin skill adapters, plugin README
  skill descriptions, and root adapters while keeping required discovery links.
- F-009: Resolved by replacing repeated ownership maps with links to the router,
  living-system model, and architecture doc as the durable owners.
- F-010: Reduced by keeping verification detail in `docs/agent/workflow.md` and
  readiness evidence, while adapters and skill docs now reference the minimum
  needed commands.
- F-011: Resolved by moving shared App CSS boundary rules to the screen
  structures index and keeping child structures focused on their deltas.
- F-012: Resolved by shortening repeated foundation source boilerplate to compact
  source lines.
- F-013: Resolved by replacing the plugin README's prose skill index with a
  compact command table.
- F-014: Resolved by removing per-component Landing Requirement sections and
  keeping landing requirements in the create-component workflow and component
  index validation expectations.

Verification target: `pnpm check`, followed by `pnpm clean:workspace`.

## Findings

### F-001: Generated plugin context duplicates almost the full guidance corpus

Location:

- `plugins/pds/context/**`: 88 generated Markdown files, 10,317 lines.
- `scripts/sync-plugin-context.mjs:25-39`: copies root adapters, `DESIGN.md`,
  `README.md`, selected docs, all of `docs/agent`, all of `docs/foundations`,
  all of `docs/recipes`, package READMEs, and token source.
- `plugins/pds/README.md:11-14`: documents that the plugin ships a generated
  context copy.
- `docs/agent/living-system.md:47-49` and
  `docs/agent/readiness-audit.md:27`: require plugin context to include the same
  guidance graph.

What is happening:

The repository stores canonical documents and a generated installed-plugin copy
of most of the same documents. This is intentional for installed Codex and
Claude plugins, but it nearly doubles the Markdown footprint in the repo.

Why it matters:

For normal local repo work, reading both source docs and generated context is
pure redundancy. For plugin runtime work, the copied context may be necessary,
but the current generation model is all-or-broad-directory rather than
task-sliced. Any broad context load pays for copied docs that are not relevant
to the current skill.

Optimization direction:

Keep generated context if the installed plugin needs offline docs, but add an
explicit "do not audit/read generated context when canonical source is present"
rule for repo work. Then evaluate whether the plugin can ship a smaller
manifest plus only the docs each `SKILL.md` route needs.

### F-002: Component State Matrix sections repeat many non-applicable rows

Location:

- `docs/agent/components/_template.md:73-84`: requires an eight-row State
  Matrix for every component.
- `docs/agent/skills/create-component.md:116-117`: requires every new
  interactive component to complete the State Matrix.
- `docs/agent/components/action-widget.md:120-131`,
  `docs/agent/components/data-list.md:60-71`, and
  `docs/agent/components/surface.md:108-119`: examples where most rows state
  that the state is not applicable.
- Corpus metric: 39 component/template State Matrix sections and 150
  occurrences of "Not applicable" in component contracts.

What is happening:

The matrix is useful for interactive components, but every component pays for
the same full state table even when the component is static, structural, or
purely decorative. Static contracts repeat long "not applicable" explanations
instead of surfacing only meaningful states.

Why it matters:

Component contracts are the largest canonical document group: component docs
alone account for 6,011 lines. Repeated state tables dominate many short
contracts and can bury the actionable state information agents need.

Optimization direction:

Move common state expectations to the component template or component index.
Let individual component docs list only applicable states plus a concise
`Non-applicable states` line when needed. Preserve full matrices for components
with real interaction or async state.

### F-003: Component Related Sources blocks repeat the same links everywhere

Location:

- `docs/agent/components/_template.md:117-122`: common Related Sources block.
- Repeated lines across component docs:
  - `PDS React README` appears in 39 component/template files.
  - `components.css` appears in 38 component/template files.
  - `Content resilience` appears in 25 component files.
- Example blocks:
  - `docs/agent/components/data-list.md:109-114`
  - `docs/agent/components/surface.md:186-192`
  - `docs/agent/components/action-widget.md:194-200`

What is happening:

Every component contract repeats the same package README and stylesheet links,
then adds the component source link. Some newer files use compact "Component
source:" text while others use linked source labels, so the repetition is also
not fully consistent.

Why it matters:

The links are useful, but the common part is boilerplate. Repeating it in every
component burns tokens and creates a small consistency maintenance burden.

Optimization direction:

Keep direct component source links because they help agents jump to the owning
implementation. Move common package/styling source rules to
`docs/agent/components/README.md`, and either make per-component Related Sources
one compact line or update the checker to accept a shorter standard.

### F-004: Component indexes are duplicated in package and agent docs

Location:

- `docs/agent/components/README.md:28-81`: grouped navigation plus a complete
  alphabetical index.
- `packages/react/README.md:39-49`: current surface list.
- `packages/react/README.md:106-151`: full component index linking to every
  component contract.
- `docs/agent/components/README.md:87-91`: checks require package README and
  component index links.

What is happening:

Component names and contract links are maintained in multiple places. The
package README, component index, and validation rules all repeat the public
component surface.

Why it matters:

This is useful for package consumers, but it is high-drift and high-token
content for agents. An agent that only needs one component can load repeated
index material before reaching the actual contract.

Optimization direction:

Make `docs/agent/components/README.md` the canonical component navigation
surface. Keep `packages/react/README.md` to a compact package summary plus one
link to the component index, or generate its component index from the source of
truth during checks.

### F-005: Install and update instructions are repeated across many docs

Location:

- `README.md:16-175`: plugin install, app install, update, Codex prompt, local
  tarball install.
- `docs/recipes/add-to-existing-react-app.md:12-77`: repeats published install,
  equivalent package managers, Codex prompt, local tarball install, and style
  import.
- `docs/recipes/start-new-react-app.md:33-99`: repeats registry install,
  equivalent package managers, update command, Codex prompt, local tarball
  install, and style import.
- `packages/react/README.md:11-37`: repeats published install, update, style
  import, and Codex prompt.
- `packages/README.md:14-29`, `packages/cli/README.md:18-35`, and
  `plugins/pds/README.md:68-113`: repeat package/plugin install commands.

What is happening:

The same `pnpm add @pds/react@latest`, equivalent package manager commands,
`@pds/react/styles.css` import rule, Codex prompt, and local tarball workflow are
copied across root, recipes, package READMEs, and plugin docs.

Why it matters:

Install docs are important, but this amount of repetition is costly and
drift-prone. It also makes agents read setup details even when they only need a
package boundary or component contract.

Optimization direction:

Make the root `README.md` the human install source and recipes the procedural
source. Package READMEs should keep only package-specific install deltas and
link to the canonical recipe. Keep one copy of the multi-package-manager block.

### F-006: Skill workflow read-path boilerplate repeats router rules

Location:

- `docs/agent/router.md:14-24` and `docs/agent/router.md:56-79`: global minimum
  routes, stop rules, and navigation anti-patterns.
- `docs/agent/skills/create-component.md:18-49`,
  `docs/agent/skills/implement-screen.md:17-43`, and
  `docs/agent/skills/review-pds.md:11-38`: repeated `Always read`, `Choose
  one`, `Read only if relevant`, and `Do not read` structures.
- Same pattern appears in every canonical skill workflow:
  `audit.md`, `help.md`, `self-improve.md`, and `start.md`.

What is happening:

Each skill workflow restates the same routing philosophy from the router, then
adds task-specific route details.

Why it matters:

Skill docs are frequently read at runtime. Repeating broad route doctrine inside
every skill consumes tokens that could be used for the task-specific workflow.

Optimization direction:

Keep the router as the routing source. In each skill workflow, replace repeated
route boilerplate with a compact `Route delta` that names only task-specific
required docs and exceptions.

### F-007: Plugin `SKILL.md` descriptions are verbose for discovery metadata

Location:

- `plugins/pds/skills/audit/SKILL.md:1-4`
- `plugins/pds/skills/create-component/SKILL.md:1-4`
- `plugins/pds/skills/help/SKILL.md:1-4`
- `plugins/pds/skills/implement-screen/SKILL.md:1-4`
- `plugins/pds/skills/review-pds/SKILL.md:1-4`
- `plugins/pds/skills/self-improve/SKILL.md:1-4`
- `plugins/pds/skills/start/SKILL.md:1-6`
- `plugins/pds/skills/*/SKILL.md:9-13`: repeated adapter text.

What is happening:

The discovery adapters are intentionally thin, but their YAML descriptions are
long and include detailed workflow outcomes that are already in canonical skill
docs and the plugin README.

Why it matters:

Skill metadata is likely to be surfaced before the task-specific workflow is
chosen. Long descriptions are paid early and repeatedly, even when the selected
skill then reads the canonical workflow.

Optimization direction:

Shorten every `description` to a single trigger-oriented sentence and keep
details in the canonical workflow. Keep the adapter pointer, but reduce repeated
adapter prose to a shorter standard sentence if the plugin contract allows it.

### F-008: Thin adapters still repeat the same start route

Location:

- `AGENTS.md:15-23`: start route list.
- `CLAUDE.md:3-18`: imports `AGENTS.md` and repeats the same route list.
- `DESIGN.md:17-35`: repeats routing for router, foundations, React components,
  and screen/flow work.
- `docs/agent/README.md:10-28`: repeats entry points and "do not read every"
  guidance.
- `docs/agent/workflow.md:7-36` and `docs/agent/router.md:3-5`: repeat
  context-loading rules.

What is happening:

The adapter model is correct, but several adapter and index files repeat the
same first-step route instead of being only pointers.

Why it matters:

Adapters are often auto-loaded by coding agents. Repeating route lists in
auto-loaded files adds baseline token cost before the agent reaches the narrow
owner.

Optimization direction:

Keep required references enforced by `scripts/lint-agent-docs.mjs`, but collapse
duplicated route prose. `CLAUDE.md` can remain a very thin import plus required
links. `DESIGN.md` can keep the design-tool warning and link to the router
instead of enumerating the same branches.

### F-009: Repository ownership maps repeat across orientation, architecture, router, and growth docs

Location:

- `docs/start-here.md:18-39`: repository map.
- `docs/architecture/repository-structure.md:7-75`: top-level map, package
  ownership, documentation ownership, and plugin ownership.
- `DESIGN.md:51-59`: source ownership.
- `docs/agent/router.md:26-54`: source-of-truth and durable owner routing.
- `docs/agent/living-system.md:51-69`: growth routing.

What is happening:

The repo map, source ownership, and durable owner routing are repeated in
several variants for different readers.

Why it matters:

The redundancy is understandable, but it creates drift risk around package and
guidance ownership. Agents may read multiple ownership maps before editing and
have to reconcile overlapping wording.

Optimization direction:

Make `docs/architecture/repository-structure.md` own physical repo structure and
`docs/agent/router.md` or `docs/agent/living-system.md` own durable guidance
routing. Other files should link to those owners and keep only audience-specific
exceptions.

### F-010: Verification and cleanup instructions are repeated across guidance surfaces

Location:

- `AGENTS.md:38-42`: `pnpm check` and `pnpm clean:workspace`.
- `README.md:198-207`: work-on-this-repo checks and cleanup.
- `docs/agent/workflow.md:27-36`: full `pnpm check` and cleanup coverage.
- `docs/agent/living-system.md:89-90`: run `pnpm check`, then cleanup.
- `docs/agent/readiness-audit.md:29-43`: full quality gate evidence.
- `docs/agent/evaluation-scenarios.md:101-213`: scenario-specific verification
  lines.
- Skill workflows repeat verification expectations, for example
  `docs/agent/skills/create-component.md:101-107` and
  `docs/agent/skills/implement-screen.md:126-129`.

What is happening:

The same verification floor appears in root adapters, human README, agent
workflow, readiness audit, evaluation scenarios, and skill workflows.

Why it matters:

Verification is important enough to remain visible, but repeated long coverage
lists add token cost and can drift as `pnpm check` changes.

Optimization direction:

Let `docs/agent/workflow.md` and `docs/agent/readiness-audit.md` own the full
verification floor. Other docs should state only the command or task-specific
additional checks.

### F-011: Screen structure docs duplicate shared app CSS boundary rules

Location:

- `docs/agent/screen-structures/first-level-navigation-page.md:50-67`
- `docs/agent/screen-structures/focus-layout.md:50-67`
- Both docs also repeat the same Related Sources list at
  `first-level-navigation-page.md:115-120` and `focus-layout.md:116-121`.

What is happening:

Both screen structures repeat the same "App CSS may own" and "App CSS must not
own" boundary with only small contextual differences.

Why it matters:

There are only two screen structures today, so the cost is small now. If more
structures are added, this will scale linearly and produce duplicated rules
about app CSS ownership.

Optimization direction:

Move shared app CSS ownership rules to the screen-structures index or screen
quality gate. Keep only structure-specific CSS responsibilities in each child
doc.

### F-012: Foundation docs repeat source-link boilerplate

Location:

- `docs/foundations/README.md:25-33`: authoring rule requiring token-backed docs
  to link source CSS and `DESIGN.md`.
- `docs/foundations/colour.md:6-8`, `docs/foundations/motion.md:6-8`, and
  `docs/foundations/spacing.md:8-10`: repeated "Related sources" boilerplate.
- Same pattern appears in `typography.md`, `layout-types.md`, `elevation.md`,
  and `content-resilience.md`.

What is happening:

Every token-backed foundation doc repeats the same source-link sentence with
only the CSS file changed.

Why it matters:

This is low-severity, but it is a simple repeated pattern. The useful
information is the specific source CSS file, not the repeated sentence.

Optimization direction:

Use a compact one-line `Source: packages/tokens/src/<file>.css` format in each
foundation doc, with the index owning the rule that foundation docs link
`DESIGN.md`.

### F-013: Plugin README duplicates the skill workflow index

Location:

- `plugins/pds/README.md:16-35`: command list with detailed descriptions.
- `docs/agent/skills/README.md:10-43`: decision table and skill list covering
  the same commands.

What is happening:

The plugin README and canonical skills index both explain the same `/pds:*`
commands. The plugin README needs a public overview, but the detailed command
behavior lives in the canonical skill workflows.

Why it matters:

The plugin README is included in plugin context and likely read during setup or
help tasks. Duplicating skill detail there increases token cost and raises drift
risk when a workflow changes.

Optimization direction:

Keep a compact command list in `plugins/pds/README.md` and link to
`docs/agent/skills/README.md` for detailed selection. The canonical skills index
should own command behavior summaries.

### F-014: Recently added component contracts repeat Landing Requirement text inconsistently

Location:

- Template source: `docs/agent/components/_template.md:8-13`.
- Shared validation source: `docs/agent/components/README.md:87-95`.
- Repeated in some component docs only:
  - `docs/agent/components/action-widget.md:10-14`
  - `docs/agent/components/amount.md:10-14`
  - `docs/agent/components/filter-chip.md:9-13`
  - `docs/agent/components/item.md:11-15`
  - `docs/agent/components/page-header.md:9-13`
  - `docs/agent/components/travel-widget.md:10-14`

What is happening:

Landing requirements are documented globally and in the template, but also
copied into only some component contracts. Older component docs omit the
section.

Why it matters:

This is both redundant and inconsistent. Agents may infer that only the newer
components have landing requirements, even though the component index says the
expectation applies to every new component.

Optimization direction:

Remove per-component Landing Requirement sections and keep the rule in the
template and component index. If a specific component needs additional landing
requirements, name only the exception.

## Resolution Plan

The safest path is to reduce runtime-loaded and frequently edited docs first,
then adjust automated checks to preserve the useful contract while allowing
shorter documents.

### Phase 1: Low-risk adapter and metadata compaction

Targets: F-007, F-008, F-013.

1. Shorten `plugins/pds/skills/*/SKILL.md` descriptions to single trigger
   sentences.
2. Shorten repeated adapter prose in each `SKILL.md` while keeping the required
   generated-context link.
3. Compact `CLAUDE.md` so it imports `AGENTS.md`, includes required links, and
   removes the duplicate start-route list.
4. Compact the plugin README skill list to one-line commands and delegate
   selection detail to `docs/agent/skills/README.md`.
5. Run `pnpm docs:lint` and `pnpm plugin:context` if canonical copied context
   files changed.

### Phase 2: Component contract structure cleanup

Targets: F-002, F-003, F-014.

1. Update `docs/agent/components/_template.md` with a shorter state contract:
   required rows only for applicable component-owned states, plus a compact
   non-applicable-state note.
2. Update `scripts/check-agent-component-contracts.mjs` to accept the shorter
   state format.
3. Remove per-component Landing Requirement sections and keep the global rule in
   the template and component index.
4. Compact repeated Related Sources blocks while preserving direct source links.
5. Migrate component docs in batches: static/display components first, then
   structural components, then interactive/Radix components.
6. Run `pnpm docs:lint`, component tests if source contracts changed, and full
   `pnpm check` at the end of the phase.

### Phase 3: Index and install-doc deduplication

Targets: F-004, F-005.

1. Choose one canonical component index. Prefer
   `docs/agent/components/README.md` for component contract navigation.
2. Make `packages/react/README.md` a package overview with a compact link to the
   canonical component index, unless package contract checks require generated
   per-component links.
3. Update package contract checks to accept the chosen canonical index or
   generate the repeated package README table.
4. Choose one canonical install/update source for humans and one procedural
   recipe source for agents.
5. Replace repeated package-manager and local-tarball command blocks in package
   READMEs with links or compact deltas.
6. Run `pnpm packages:check`, `pnpm docs:lint`, and `pnpm check`.

### Phase 4: Routing, ownership, and verification consolidation

Targets: F-006, F-009, F-010, F-011, F-012.

1. Convert skill workflow read paths into route deltas that reference the router
   instead of restating broad route rules.
2. Make physical repository ownership live in
   `docs/architecture/repository-structure.md`.
3. Make durable agent-routing ownership live in `docs/agent/router.md` and
   `docs/agent/living-system.md`; other docs should link instead of restating
   tables.
4. Move common screen-structure app CSS boundaries to
   `docs/agent/screen-structures/README.md` or the screen quality gate.
5. Compact foundation source pointers to one-line source declarations.
6. Keep `docs/agent/workflow.md` and `docs/agent/readiness-audit.md` as the full
   verification owners; leave other docs with only command names and
   task-specific additions.
7. Run `pnpm docs:lint` and full `pnpm check`.

### Phase 5: Generated plugin context footprint review

Target: F-001.

1. Measure which generated context files each `/pds:*` skill actually needs in
   normal tasks.
2. Decide whether installed plugin context must remain a full offline mirror or
   can become a smaller skill-routed bundle.
3. If pruning is safe, update `scripts/sync-plugin-context.mjs` to copy only the
   required context graph per skill or to generate a manifest that discourages
   broad reads.
4. Update `docs/agent/readiness-audit.md` and
   `scripts/check-agent-readiness.mjs` so plugin context remains aligned after
   pruning.
5. Run `pnpm plugin:context`, `pnpm plugin:context:check`, `pnpm docs:lint`, and
   full `pnpm check`.

## Guardrails

- Do not remove source links that are required for agent verification until the
  corresponding check script accepts the new compact form.
- Do not shorten legal notices.
- Do not optimize by hiding required accessibility, state, or verification
  guidance. Prefer moving shared rules to one canonical owner and linking to it.
- After any canonical agent-facing doc change, regenerate or check plugin
  context as required by the current sync model.
