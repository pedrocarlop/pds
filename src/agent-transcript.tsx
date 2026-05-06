import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

import { cx } from "./classes";

export type AgentTranscriptDensity = "comfortable" | "compact";

export interface AgentTranscriptProps extends HTMLAttributes<HTMLDivElement> {
  density?: AgentTranscriptDensity;
}

export const AgentTranscript = forwardRef<HTMLDivElement, AgentTranscriptProps>(
  ({ children, className, density = "comfortable", ...props }, ref) => {
    return (
      <div
        aria-live="polite"
        className={cx("pds-agent-transcript", className)}
        data-density={density}
        ref={ref}
        role="log"
        {...props}
      >
        {children}
      </div>
    );
  }
);

AgentTranscript.displayName = "AgentTranscript";
