# @pds/cli

Installer CLI for PDS Codex and Claude plugin setup.

## Owns

- The `pds` binary.
- Codex plugin marketplace install wiring.
- Claude plugin marketplace install wiring.
- Safe Codex config updates that enable `pds@pds` and disable the legacy
  `pds@pds-local` entry.

## Install And Run

Direct Codex install from GitHub:

```sh
codex plugin marketplace add pedrocarlop/pds --ref v0.1.0
codex plugin add pds@pds
```

Run from any folder:

```sh
npx @pds/cli@latest install
```

Install for one tool only:

```sh
npx @pds/cli@latest install --tool codex
npx @pds/cli@latest install --tool claude
```

Preview commands and config edits without mutating local files or agent
configuration:

```sh
npx @pds/cli@latest install --dry-run
```

Use `--scope user|project|local` for Claude plugin scope when needed.

## Behavior

- `--tool all` is the default and attempts Codex and Claude setup.
- If one CLI is missing during an all-tools install, the installer skips that
  tool and continues with the available one.
- Codex setup registers the GitHub marketplace, runs
  `codex plugin add pds@pds`, and enables the plugin in config.
- Codex config changes are backed up before writing.
- Local marketplace paths are supported through `--repo <path>`; local Codex
  installs do not pass `--ref`.

## Related Docs

- [PDS plugin README](../../plugins/pds/README.md) for available `/pds:*`
  skills.
- [docs/agent/skills](../../docs/agent/skills/README.md) for canonical skill
  workflows.
- [docs/agent/readiness-audit.md](../../docs/agent/readiness-audit.md) for
  agent reliability evidence.
