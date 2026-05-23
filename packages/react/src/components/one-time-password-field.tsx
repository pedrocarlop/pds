"use client";

import * as React from "react";
import { unstable_OneTimePasswordField as OneTimePasswordFieldPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type OneTimePasswordFieldProps = React.ComponentPropsWithoutRef<
  typeof OneTimePasswordFieldPrimitive.Root
>;
export type OneTimePasswordFieldInputProps = React.ComponentPropsWithoutRef<
  typeof OneTimePasswordFieldPrimitive.Input
>;
export type OneTimePasswordFieldHiddenInputProps =
  React.ComponentPropsWithoutRef<
    typeof OneTimePasswordFieldPrimitive.HiddenInput
  >;

export const OneTimePasswordField = React.forwardRef<
  React.ElementRef<typeof OneTimePasswordFieldPrimitive.Root>,
  OneTimePasswordFieldProps
>(function OneTimePasswordField({ className, ...props }, ref) {
  return (
    <OneTimePasswordFieldPrimitive.Root
      ref={ref}
      className={cn("pds-one-time-password-field", className)}
      data-slot="one-time-password-field"
      {...props}
    />
  );
});

export const OneTimePasswordFieldInput = React.forwardRef<
  React.ElementRef<typeof OneTimePasswordFieldPrimitive.Input>,
  OneTimePasswordFieldInputProps
>(function OneTimePasswordFieldInput({ className, ...props }, ref) {
  return (
    <OneTimePasswordFieldPrimitive.Input
      ref={ref}
      className={cn("pds-one-time-password-field-input", className)}
      data-slot="one-time-password-field-input"
      {...props}
    />
  );
});

export const OneTimePasswordFieldHiddenInput = React.forwardRef<
  React.ElementRef<typeof OneTimePasswordFieldPrimitive.HiddenInput>,
  OneTimePasswordFieldHiddenInputProps
>(function OneTimePasswordFieldHiddenInput({ className, ...props }, ref) {
  return (
    <OneTimePasswordFieldPrimitive.HiddenInput
      ref={ref}
      className={cn("pds-visually-hidden", className)}
      data-slot="one-time-password-field-hidden-input"
      {...props}
    />
  );
});
