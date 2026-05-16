"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "../utilities";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "aria-invalid"
  > {
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox({ children, className, invalid = false, ...props }, ref) {
  const ariaInvalid = invalid || props["aria-invalid"];

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      aria-invalid={ariaInvalid || undefined}
      className={cn("pds-checkbox", className)}
      data-invalid={invalid || undefined}
      data-slot="checkbox"
      {...props}
    >
      {children ?? (
        <CheckboxPrimitive.Indicator
          className="pds-checkbox-indicator"
          data-slot="checkbox-indicator"
        >
          <span aria-hidden="true" className="pds-checkbox-check" />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
});

export const CheckboxIndicator = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>
>(function CheckboxIndicator({ children, className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Indicator
      ref={ref}
      className={cn("pds-checkbox-indicator", className)}
      data-slot="checkbox-indicator"
      {...props}
    >
      {children ?? <span aria-hidden="true" className="pds-checkbox-check" />}
    </CheckboxPrimitive.Indicator>
  );
});
