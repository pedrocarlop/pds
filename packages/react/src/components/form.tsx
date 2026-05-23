"use client";

import * as React from "react";
import { Form as FormPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type FormProps = React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>;
export type FormFieldProps = React.ComponentPropsWithoutRef<
  typeof FormPrimitive.Field
>;
export type FormLabelProps = React.ComponentPropsWithoutRef<
  typeof FormPrimitive.Label
>;
export type FormControlProps = React.ComponentPropsWithoutRef<
  typeof FormPrimitive.Control
>;
export type FormMessageProps = React.ComponentPropsWithoutRef<
  typeof FormPrimitive.Message
>;
export type FormSubmitProps = React.ComponentPropsWithoutRef<
  typeof FormPrimitive.Submit
>;
export interface FormValidityStateProps {
  children(validity: ValidityState | undefined): React.ReactNode;
  name?: string;
}

export const Form = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  FormProps
>(function Form({ className, ...props }, ref) {
  return (
    <FormPrimitive.Root
      ref={ref}
      className={cn("pds-form", className)}
      data-slot="form"
      {...props}
    />
  );
});

export const FormField = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Field>,
  FormFieldProps
>(function FormField({ className, ...props }, ref) {
  return (
    <FormPrimitive.Field
      ref={ref}
      className={cn("pds-form-field", className)}
      data-slot="form-field"
      {...props}
    />
  );
});

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Label>,
  FormLabelProps
>(function FormLabel({ className, ...props }, ref) {
  return (
    <FormPrimitive.Label
      ref={ref}
      className={cn("pds-label", "pds-form-label", className)}
      data-slot="form-label"
      {...props}
    />
  );
});

export const FormControl = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Control>,
  FormControlProps
>(function FormControl({ className, ...props }, ref) {
  return (
    <FormPrimitive.Control
      ref={ref}
      className={cn("pds-input", "pds-form-control", className)}
      data-slot="form-control"
      {...props}
    />
  );
});

export const FormMessage = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Message>,
  FormMessageProps
>(function FormMessage({ className, ...props }, ref) {
  return (
    <FormPrimitive.Message
      ref={ref}
      className={cn("pds-form-message", className)}
      data-slot="form-message"
      {...props}
    />
  );
});

export function FormValidityState(props: FormValidityStateProps) {
  return <FormPrimitive.ValidityState {...props} />;
}

export const FormSubmit = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Submit>,
  FormSubmitProps
>(function FormSubmit({ className, type = "submit", ...props }, ref) {
  return (
    <FormPrimitive.Submit
      ref={ref}
      className={cn("pds-button", "pds-form-submit", className)}
      data-intent="primary"
      data-size="md"
      data-slot="form-submit"
      type={type}
      {...props}
    />
  );
});
