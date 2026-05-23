"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "../utilities";
import type { ToggleSize, ToggleVariant } from "./toggle";

export type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
>;

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(function ToggleGroup({ className, ...props }, ref) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("pds-toggle-group", className)}
      data-slot="toggle-group"
      {...props}
    />
  );
});

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  size?: ToggleSize;
  variant?: ToggleVariant;
}

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem(
  { className, size = "md", variant = "default", ...props },
  ref
) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn("pds-toggle-group-item", className)}
      data-size={size}
      data-slot="toggle-group-item"
      data-variant={variant}
      {...props}
    />
  );
});
