"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";

export type RunStatusStatus =
  | "idle"
  | "queued"
  | "running"
  | "success"
  | "warning"
  | "error"
  | "cancelled";

export interface RunStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  status?: RunStatusStatus;
}

const statusLabels: Record<RunStatusStatus, string> = {
  idle: "Idle",
  queued: "Queued",
  running: "Running",
  success: "Success",
  warning: "Warning",
  error: "Error",
  cancelled: "Cancelled"
};

const statusTones: Record<RunStatusStatus, string> = {
  idle: "inactive",
  queued: "neutral",
  running: "accent",
  success: "success",
  warning: "warning",
  error: "danger",
  cancelled: "inactive"
};

export const RunStatus = React.forwardRef<HTMLSpanElement, RunStatusProps>(
  function RunStatus(
    { asChild = false, children, className, status = "idle", ...props },
    ref
  ) {
    const Comp = asChild ? Slot.Root : "span";

    return (
      <Comp
        ref={ref}
        className={cn("pds-badge pds-run-status", className)}
        data-emphasis="soft"
        data-slot="run-status"
        data-status={status}
        data-tone={statusTones[status]}
        {...props}
      >
        {children ?? statusLabels[status]}
      </Comp>
    );
  }
);
