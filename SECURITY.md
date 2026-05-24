# Security Policy

PDS is a design-system and agent-workflow repository. Security issues may still
affect package consumers, generated plugin context, dependency setup, or
workflow guidance.

## Supported Versions

| Version | Supported |
| --- | --- |
| `0.x` | Security fixes are handled on the current mainline while APIs are pre-1.0. |

## Reporting A Vulnerability

Do not open a public issue for suspected vulnerabilities. Report privately to
the maintainers with:

- Affected package, script, plugin workflow, or documentation path.
- Reproduction steps or proof of concept.
- Impact, including whether package consumers or agent workflows are affected.
- Suggested fix if known.

Maintainers should acknowledge reports promptly, assess impact, prepare a fix,
and publish advisory or release notes when appropriate.

## Scope

In scope:

- Package code under `packages`.
- Plugin installer or generated plugin context behavior.
- Scripts that run during install, build, checks, or release.
- Guidance that could cause agents to expose secrets, bypass approvals, or make
  unsafe changes.

Out of scope:

- Vulnerabilities in downstream applications that use PDS incorrectly.
- General dependency CVEs without an exploitable PDS path.
