"use client";

import * as React from "react";

import { cn } from "../utilities";

export type SkeletonShape = "text" | "block" | "circle";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  shape?: SkeletonShape;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { animated = true, className, shape = "block", ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        aria-hidden={props["aria-hidden"] ?? true}
        className={cn("pds-skeleton", className)}
        data-animated={animated}
        data-shape={shape}
        data-slot="skeleton"
        {...props}
      />
    );
  }
);
