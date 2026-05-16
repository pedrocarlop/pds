"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "../utilities";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, orientation = "vertical", ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("pds-radio-group", className)}
      data-orientation={orientation}
      data-slot="radio-group"
      orientation={orientation}
      {...props}
    />
  );
});

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ children, className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("pds-radio-group-item", className)}
      data-slot="radio-group-item"
      {...props}
    >
      {children ?? (
        <RadioGroupPrimitive.Indicator
          className="pds-radio-group-indicator"
          data-slot="radio-group-indicator"
        />
      )}
    </RadioGroupPrimitive.Item>
  );
});

export const RadioGroupIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>
>(function RadioGroupIndicator({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Indicator
      ref={ref}
      className={cn("pds-radio-group-indicator", className)}
      data-slot="radio-group-indicator"
      {...props}
    />
  );
});
