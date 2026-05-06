# 0001 Repository Structure

## Status

Accepted

## Context

PDS needs to scale from a small React package into a design system without
turning every concern into one folder. It also needs to be readable by LLM coding
agents through markdown guidance, similar to the `DESIGN.md` format from Google
Stitch.

## Decision

Use a pnpm workspace with clear package boundaries:

- `packages/tokens` for framework-agnostic design tokens.
- `packages/react` for React primitives.
- `docs` for human and LLM guidance.
- `DESIGN.md` for the portable design contract.
- `AGENTS.md` for agent navigation and working rules.

Reserve `apps` for future runnable experiences, but do not add one until there
is a real need.

## Consequences

- The repo can grow into docs, MCP, Figma, or platform packages later without
moving the current code again.
- LLMs have a deterministic read path before editing code.
- The first phase remains lightweight and avoids building a website or new UI.
