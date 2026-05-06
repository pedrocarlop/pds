import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import { cx } from "../../utilities/classes";

export type AgentMessageFrom = "assistant" | "user" | "system" | "tool";

export interface AgentMessageProps extends HTMLAttributes<HTMLElement> {
  avatar?: ReactNode;
  from?: AgentMessageFrom;
  meta?: ReactNode;
  name?: ReactNode;
}

export const AgentMessage = forwardRef<HTMLElement, AgentMessageProps>(
  (
    {
      avatar,
      children,
      className,
      from = "assistant",
      meta,
      name,
      ...props
    },
    ref
  ) => {
    const fallbackName = name ?? getDefaultName(from);

    return (
      <article
        className={cx("pds-agent-message", className)}
        data-from={from}
        ref={ref}
        {...props}
      >
        <div className="pds-agent-message__avatar" aria-hidden="true">
          {avatar ?? getInitial(from)}
        </div>
        <div className="pds-agent-message__body">
          <div className="pds-agent-message__header">
            <span className="pds-agent-message__name">{fallbackName}</span>
            {meta ? <span className="pds-agent-message__meta">{meta}</span> : null}
          </div>
          <div className="pds-agent-message__content">{children}</div>
        </div>
      </article>
    );
  }
);

AgentMessage.displayName = "AgentMessage";

function getDefaultName(from: AgentMessageFrom) {
  switch (from) {
    case "assistant":
      return "Assistant";
    case "user":
      return "You";
    case "system":
      return "System";
    case "tool":
      return "Tool";
  }
}

function getInitial(from: AgentMessageFrom) {
  switch (from) {
    case "assistant":
      return "A";
    case "user":
      return "Y";
    case "system":
      return "S";
    case "tool":
      return "T";
  }
}
