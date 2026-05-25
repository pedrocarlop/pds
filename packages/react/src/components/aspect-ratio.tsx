"use client";

import * as React from "react";
import { AspectRatio as AspectRatioPrimitive } from "radix-ui";

import { cn } from "../utilities";

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  fit?: "cover" | "contain";
}

export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(function AspectRatio({ className, fit = "cover", ...props }, ref) {
  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      className={cn("pds-aspect-ratio", className)}
      data-fit={fit}
      data-slot="aspect-ratio"
      {...props}
    />
  );
});
