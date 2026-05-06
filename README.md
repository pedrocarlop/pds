# pds

A bare React and TypeScript UI library skeleton designed from the ground up for LLM agents.

This repository is intentionally small. Components, source guides, docs, and publishing workflows can be added step by step.

## Design guidance

- [Colour guidelines](./colour.md) define the canonical PDS colour tokens and how LLMs should apply them.
- [Spacing and radius guidelines](./spacing.md) define layout rhythm, concentricity, and curvature rules.

## Product spine

PDS should make agent behavior visible, inspectable, and easy to compose. The kit should focus on primitives that regular design systems do not usually cover:

- **Conversation surfaces:** transcripts, messages, streaming states, citations, attachments, and empty states.
- **Tool execution:** tool call cards, inputs and outputs, progress, retries, errors, and traces.
- **Human control:** approval cards, interruption controls, permissions, review diffs, and confirmation states.
- **Artifacts:** previews for generated files, code, tables, charts, images, and links.
- **Agent runtime context:** memory panels, model/provider metadata, token or cost summaries, run timelines, and handoffs.
- **Composition contracts:** typed props, stable class names, CSS tokens, and examples that coding agents can reuse safely.

## MCP server?

Not for the first package. The React UI kit should not need an MCP server at runtime.

An MCP server is a strong companion later, especially because this is a UI kit for LLM agents. It can expose the component catalog to coding agents with tools such as `list_components`, `get_component_api`, `get_theme_tokens`, and `compose_agent_screen`. That makes agents better at generating correct PDS usage, but it should live as an optional package rather than inside the core UI runtime.

Suggested package path when the kit is ready:

```txt
packages/react   # core UI primitives
packages/mcp     # optional agent-readable component/catalog server
apps/docs        # examples, recipes, and visual QA
```

## Install

After the package is published to npm:

```sh
pnpm add pds
```

For now, clone this repository and install dependencies locally:

```sh
pnpm install
```

## Use

```tsx
import {
  AgentComposer,
  AgentMessage,
  AgentSurface,
  AgentToolCall,
  AgentTranscript
} from "pds";
import "pds/styles.css";

export function Example() {
  return (
    <AgentSurface>
      <AgentTranscript>
        <AgentMessage from="user">Find the source of this failing check.</AgentMessage>
        <AgentMessage from="assistant" meta="streaming">
          I will inspect the CI logs and summarize the likely fix.
        </AgentMessage>
        <AgentToolCall
          description="Reading the latest build output"
          output={{ failedStep: "typecheck", file: "src/index.ts" }}
          status="success"
          toolName="github.get_check_logs"
        />
      </AgentTranscript>
      <AgentComposer onSubmitMessage={(message) => console.log(message)} />
    </AgentSurface>
  );
}
```

## Develop

```sh
pnpm install
pnpm check
```

## Scripts

- `pnpm typecheck` checks TypeScript.
- `pnpm lint` runs ESLint.
- `pnpm build` builds the library.
- `pnpm check` runs typecheck, lint, and build.
