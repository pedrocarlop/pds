"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "../utilities";
import type { FieldDensity } from "./input";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectPortal = SelectPrimitive.Portal;

export interface SelectTriggerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    "aria-invalid"
  > {
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  density?: FieldDensity;
  invalid?: boolean;
}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(function SelectTrigger(
  { children, className, density = "default", invalid = false, ...props },
  ref
) {
  const ariaInvalid = invalid || props["aria-invalid"];

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      aria-invalid={ariaInvalid || undefined}
      className={cn("pds-select-trigger", className)}
      data-density={density}
      data-invalid={invalid || undefined}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="pds-select-icon" data-slot="select-icon">
        <span aria-hidden="true" className="pds-select-chevron" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  showScrollButtons?: boolean;
}

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(function SelectContent(
  {
    children,
    className,
    position = "popper",
    showScrollButtons = true,
    sideOffset = 8,
    ...props
  },
  ref
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn("pds-select-content", className)}
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        {showScrollButtons && (
          <SelectPrimitive.ScrollUpButton
            className="pds-select-scroll-button"
            data-slot="select-scroll-up"
          >
            <span aria-hidden="true" className="pds-select-chevron" data-direction="up" />
          </SelectPrimitive.ScrollUpButton>
        )}
        <SelectPrimitive.Viewport
          className="pds-select-viewport"
          data-slot="select-viewport"
        >
          {children}
        </SelectPrimitive.Viewport>
        {showScrollButtons && (
          <SelectPrimitive.ScrollDownButton
            className="pds-select-scroll-button"
            data-slot="select-scroll-down"
          >
            <span aria-hidden="true" className="pds-select-chevron" />
          </SelectPrimitive.ScrollDownButton>
        )}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("pds-select-label", className)}
      data-slot="select-label"
      {...props}
    />
  );
});

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ children, className, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn("pds-select-item", className)}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemIndicator
        className="pds-select-item-indicator"
        data-slot="select-item-indicator"
      >
        <span aria-hidden="true" className="pds-select-check" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("pds-select-separator", className)}
      data-slot="select-separator"
      {...props}
    />
  );
});
