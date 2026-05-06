import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

import { cx } from "./classes";

export type AgentSurfaceProps = HTMLAttributes<HTMLDivElement>;

export const AgentSurface = forwardRef<HTMLDivElement, AgentSurfaceProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={cx("pds-agent-surface", className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

AgentSurface.displayName = "AgentSurface";
