"use client";

import * as React from "react";
import { VisuallyHidden as VisuallyHiddenPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type VisuallyHiddenProps = React.ComponentPropsWithoutRef<
  typeof VisuallyHiddenPrimitive.Root
>;

export const VisuallyHidden = React.forwardRef<
  React.ElementRef<typeof VisuallyHiddenPrimitive.Root>,
  VisuallyHiddenProps
>(function VisuallyHidden({ className, ...props }, ref) {
  return (
    <VisuallyHiddenPrimitive.Root
      ref={ref}
      className={cn("pds-visually-hidden", className)}
      data-slot="visually-hidden"
      {...props}
    />
  );
});
