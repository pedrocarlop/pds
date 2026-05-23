"use client";

import * as React from "react";
import { Toolbar as ToolbarPrimitive } from "radix-ui";

import { cn } from "../utilities";

export const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(function Toolbar({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Root
      ref={ref}
      className={cn("pds-toolbar", className)}
      data-slot="toolbar"
      {...props}
    />
  );
});

export const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(function ToolbarButton({ className, type = "button", ...props }, ref) {
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      className={cn("pds-toolbar-button", className)}
      data-slot="toolbar-button"
      type={type}
      {...props}
    />
  );
});

export const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(function ToolbarLink({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Link
      ref={ref}
      className={cn("pds-toolbar-link", className)}
      data-slot="toolbar-link"
      {...props}
    />
  );
});

export const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(function ToolbarSeparator(
  { className, decorative = true, ...props },
  ref
) {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn("pds-toolbar-separator", className)}
      data-slot="toolbar-separator"
      decorative={decorative}
      {...props}
    />
  );
});

export const ToolbarToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleGroup>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>(function ToolbarToggleGroup({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleGroup
      ref={ref}
      className={cn("pds-toolbar-toggle-group", className)}
      data-slot="toolbar-toggle-group"
      {...props}
    />
  );
});

export const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(function ToolbarToggleItem({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.ToggleItem
      ref={ref}
      className={cn("pds-toolbar-toggle-item", className)}
      data-slot="toolbar-toggle-item"
      {...props}
    />
  );
});
