import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import { cx } from "./classes";

export type AgentToolCallStatus = "pending" | "running" | "success" | "error";

export interface AgentToolCallProps extends HTMLAttributes<HTMLElement> {
  description?: ReactNode;
  input?: unknown;
  output?: unknown;
  status?: AgentToolCallStatus;
  toolName: ReactNode;
}

export const AgentToolCall = forwardRef<HTMLElement, AgentToolCallProps>(
  (
    {
      children,
      className,
      description,
      input,
      output,
      status = "pending",
      toolName,
      ...props
    },
    ref
  ) => {
    return (
      <section
        aria-busy={status === "running" || undefined}
        className={cx("pds-agent-tool-call", className)}
        data-status={status}
        ref={ref}
        {...props}
      >
        <header className="pds-agent-tool-call__header">
          <span className="pds-agent-tool-call__status" aria-hidden="true" />
          <div className="pds-agent-tool-call__title">
            <span className="pds-agent-tool-call__name">{toolName}</span>
            {description ? (
              <span className="pds-agent-tool-call__description">
                {description}
              </span>
            ) : null}
          </div>
          <span className="pds-agent-tool-call__label">
            {getStatusLabel(status)}
          </span>
        </header>
        {children ? (
          <div className="pds-agent-tool-call__content">{children}</div>
        ) : null}
        {input !== undefined || output !== undefined ? (
          <div className="pds-agent-tool-call__io">
            {input !== undefined ? (
              <AgentToolCallBlock label="Input" value={input} />
            ) : null}
            {output !== undefined ? (
              <AgentToolCallBlock label="Output" value={output} />
            ) : null}
          </div>
        ) : null}
      </section>
    );
  }
);

AgentToolCall.displayName = "AgentToolCall";

interface AgentToolCallBlockProps {
  label: string;
  value: unknown;
}

function AgentToolCallBlock({ label, value }: AgentToolCallBlockProps) {
  return (
    <div className="pds-agent-tool-call__block">
      <span className="pds-agent-tool-call__block-label">{label}</span>
      <pre className="pds-agent-tool-call__code">
        <code>{formatInspectableValue(value)}</code>
      </pre>
    </div>
  );
}

function formatInspectableValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function getStatusLabel(status: AgentToolCallStatus) {
  switch (status) {
    case "pending":
      return "Pending";
    case "running":
      return "Running";
    case "success":
      return "Done";
    case "error":
      return "Error";
  }
}
