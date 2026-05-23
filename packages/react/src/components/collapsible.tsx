"use client";

import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";

import { cn } from "../utilities";

export const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(function Collapsible({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      className={cn("pds-collapsible", className)}
      data-slot="collapsible"
      {...props}
    />
  );
});

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(function CollapsibleTrigger({ children, className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn("pds-collapsible-trigger", className)}
      data-slot="collapsible-trigger"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="pds-collapsible-chevron" />
    </CollapsiblePrimitive.Trigger>
  );
});

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(function CollapsibleContent({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn("pds-collapsible-content", className)}
      data-slot="collapsible-content"
      {...props}
    />
  );
});
