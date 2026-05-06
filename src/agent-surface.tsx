import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export type AgentSurfaceProps = HTMLAttributes<HTMLDivElement>;

export const AgentSurface = forwardRef<HTMLDivElement, AgentSurfaceProps>(
  ({ children, className, ...props }, ref) => {
    const classes = ["pds-agent-surface", className].filter(Boolean).join(" ");

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

AgentSurface.displayName = "AgentSurface";
