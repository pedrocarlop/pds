"use client";

import * as React from "react";
import { AspectRatio as AspectRatioPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type AspectRatioProps = React.ComponentPropsWithoutRef<
  typeof AspectRatioPrimitive.Root
>;

export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(function AspectRatio({ className, ...props }, ref) {
  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      className={cn("pds-aspect-ratio", className)}
      data-slot="aspect-ratio"
      {...props}
    />
  );
});
