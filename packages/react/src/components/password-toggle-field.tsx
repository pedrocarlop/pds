"use client";

import * as React from "react";
import { unstable_PasswordToggleField as PasswordToggleFieldPrimitive } from "radix-ui";

import { cn } from "../utilities";

export interface PasswordToggleFieldProps
  extends React.ComponentProps<typeof PasswordToggleFieldPrimitive.Root> {
  className?: string;
}

export type PasswordToggleFieldInputProps = React.ComponentPropsWithoutRef<
  typeof PasswordToggleFieldPrimitive.Input
>;
export type PasswordToggleFieldToggleProps = React.ComponentPropsWithoutRef<
  typeof PasswordToggleFieldPrimitive.Toggle
>;
export type PasswordToggleFieldSlotProps = React.ComponentProps<
  typeof PasswordToggleFieldPrimitive.Slot
>;
export type PasswordToggleFieldIconProps = React.ComponentPropsWithoutRef<
  typeof PasswordToggleFieldPrimitive.Icon
>;

export const PasswordToggleField = React.forwardRef<
  HTMLDivElement,
  PasswordToggleFieldProps
>(function PasswordToggleField({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-password-toggle-field", className)}
      data-slot="password-toggle-field"
    >
      <PasswordToggleFieldPrimitive.Root {...props}>
        {children}
      </PasswordToggleFieldPrimitive.Root>
    </div>
  );
});

export const PasswordToggleFieldInput = React.forwardRef<
  React.ElementRef<typeof PasswordToggleFieldPrimitive.Input>,
  PasswordToggleFieldInputProps
>(function PasswordToggleFieldInput({ className, ...props }, ref) {
  return (
    <PasswordToggleFieldPrimitive.Input
      ref={ref}
      className={cn("pds-input", "pds-password-toggle-field-input", className)}
      data-slot="password-toggle-field-input"
      {...props}
    />
  );
});

export const PasswordToggleFieldToggle = React.forwardRef<
  React.ElementRef<typeof PasswordToggleFieldPrimitive.Toggle>,
  PasswordToggleFieldToggleProps
>(function PasswordToggleFieldToggle({ className, ...props }, ref) {
  return (
    <PasswordToggleFieldPrimitive.Toggle
      ref={ref}
      className={cn("pds-password-toggle-field-toggle", className)}
      data-slot="password-toggle-field-toggle"
      {...props}
    />
  );
});

export const PasswordToggleFieldSlot = PasswordToggleFieldPrimitive.Slot;

export const PasswordToggleFieldIcon = React.forwardRef<
  React.ElementRef<typeof PasswordToggleFieldPrimitive.Icon>,
  PasswordToggleFieldIconProps
>(function PasswordToggleFieldIcon({ className, ...props }, ref) {
  return (
    <PasswordToggleFieldPrimitive.Icon
      ref={ref}
      className={cn("pds-password-toggle-field-icon", className)}
      data-slot="password-toggle-field-icon"
      {...props}
    />
  );
});
