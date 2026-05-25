"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "../utilities";

export type ToggleSize = "sm" | "md" | "lg" | "icon";
export type ToggleVariant = "default" | "outline";

export interface ToggleProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    "aria-invalid"
  > {
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  invalid?: boolean;
  size?: ToggleSize;
  variant?: ToggleVariant;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(function Toggle(
  {
    className,
    invalid = false,
    size = "md",
    variant = "default",
    ...props
  },
  ref
) {
  const ariaInvalid = invalid || props["aria-invalid"];

  return (
    <TogglePrimitive.Root
      ref={ref}
      aria-invalid={ariaInvalid || undefined}
      className={cn("pds-toggle", className)}
      data-invalid={invalid || undefined}
      data-size={size}
      data-slot="toggle"
      data-variant={variant}
      {...props}
    />
  );
});
