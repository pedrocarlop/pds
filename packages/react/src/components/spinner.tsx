"use client";

import * as React from "react";

import { cn } from "../utilities";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  decorative?: boolean;
  label?: string;
  size?: SpinnerSize;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    {
      className,
      decorative = false,
      label = "Loading",
      role,
      size = "md",
      ...props
    },
    ref
  ) {
    return (
      <span
        ref={ref}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : label}
        className={cn("pds-spinner", className)}
        data-size={size}
        data-slot="spinner"
        role={decorative ? undefined : role ?? "status"}
        {...props}
      />
    );
  }
);
