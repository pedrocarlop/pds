"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "../utilities";

export type ToggleSize = "sm" | "md" | "lg" | "icon";
export type ToggleVariant = "default" | "outline";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  size?: ToggleSize;
  variant?: ToggleVariant;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(function Toggle(
  { className, size = "md", variant = "default", ...props },
  ref
) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn("pds-toggle", className)}
      data-size={size}
      data-slot="toggle"
      data-variant={variant}
      {...props}
    />
  );
});
