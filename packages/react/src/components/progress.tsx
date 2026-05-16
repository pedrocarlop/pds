"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "../utilities";

function getProgressValue(value: number | null | undefined, max: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return undefined;
  }

  const safeMax = typeof max === "number" && max > 0 ? max : 100;
  return Math.min(100, Math.max(0, (value / safeMax) * 100));
}

export type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
>;

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress({ children, className, max, style, value, ...props }, ref) {
  const progressValue = getProgressValue(value, max);
  const progressStyle = {
    "--pds-progress-value":
      progressValue === undefined ? undefined : `${progressValue}%`,
    ...style
  } as React.CSSProperties;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("pds-progress", className)}
      data-indeterminate={progressValue === undefined || undefined}
      data-slot="progress"
      max={max}
      style={progressStyle}
      value={value}
      {...props}
    >
      {children ?? <ProgressIndicator />}
    </ProgressPrimitive.Root>
  );
});

export const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>
>(function ProgressIndicator({ className, ...props }, ref) {
  return (
    <ProgressPrimitive.Indicator
      ref={ref}
      className={cn("pds-progress-indicator", className)}
      data-slot="progress-indicator"
      {...props}
    />
  );
});
