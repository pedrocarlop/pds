"use client";

import * as React from "react";

import { cn } from "../utilities";
import { Label, type LabelProps } from "./label";
import { Separator } from "./separator";

export type FieldOrientation = "vertical" | "horizontal" | "responsive";
export type FieldLegendVariant = "legend" | "label";

export type FieldSetProps =
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export interface FieldLegendProps
  extends React.HTMLAttributes<HTMLLegendElement> {
  variant?: FieldLegendVariant;
}

export type FieldGroupProps = React.ComponentPropsWithoutRef<"div">;

export interface FieldProps extends React.ComponentPropsWithoutRef<"div"> {
  disabled?: boolean;
  invalid?: boolean;
  orientation?: FieldOrientation;
}

export type FieldContentProps = React.ComponentPropsWithoutRef<"div">;
export type FieldLabelProps = LabelProps;
export type FieldTitleProps = React.ComponentPropsWithoutRef<"div">;
export type FieldDescriptionProps = React.ComponentPropsWithoutRef<"p">;

export interface FieldSeparatorProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
}

export interface FieldErrorMessage {
  message?: string;
}

export interface FieldErrorProps extends React.ComponentPropsWithoutRef<"div"> {
  errors?: Array<FieldErrorMessage | undefined>;
}

export const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>(
  function FieldSet({ className, ...props }, ref) {
    return (
      <fieldset
        ref={ref}
        className={cn("pds-field-set", className)}
        data-slot="field-set"
        {...props}
      />
    );
  }
);

export const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  FieldLegendProps
>(function FieldLegend({ className, variant = "legend", ...props }, ref) {
  return (
    <legend
      ref={ref}
      className={cn("pds-field-legend", className)}
      data-slot="field-legend"
      data-variant={variant}
      {...props}
    />
  );
});

export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  function FieldGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-field-group", className)}
        data-slot="field-group"
        {...props}
      />
    );
  }
);

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(
    {
      className,
      disabled = false,
      invalid = false,
      orientation = "vertical",
      role = "group",
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        className={cn("pds-field", className)}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        data-orientation={orientation}
        data-slot="field"
        role={role}
        {...props}
      />
    );
  }
);

export const FieldContent = React.forwardRef<
  HTMLDivElement,
  FieldContentProps
>(function FieldContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-field-content", className)}
      data-slot="field-content"
      {...props}
    />
  );
});

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel({ className, ...props }, ref) {
    return (
      <Label
        ref={ref}
        className={cn("pds-field-label", className)}
        data-slot="field-label"
        {...props}
      />
    );
  }
);

export const FieldTitle = React.forwardRef<HTMLDivElement, FieldTitleProps>(
  function FieldTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-field-title", className)}
        data-slot="field-title"
        {...props}
      />
    );
  }
);

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(function FieldDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("pds-field-description", className)}
      data-slot="field-description"
      {...props}
    />
  );
});

export const FieldSeparator = React.forwardRef<
  HTMLDivElement,
  FieldSeparatorProps
>(function FieldSeparator({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-field-separator", className)}
      data-content={Boolean(children) || undefined}
      data-slot="field-separator"
      {...props}
    >
      <Separator className="pds-field-separator-rule" />
      {children ? (
        <span
          className="pds-field-separator-content"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      ) : null}
    </div>
  );
});

export const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  function FieldError(
    { children, className, errors, role = "alert", ...props },
    ref
  ) {
    const content = React.useMemo(() => {
      if (children) {
        return children;
      }

      if (!errors?.length) {
        return null;
      }

      const uniqueErrors = [
        ...new Map(errors.map((error) => [error?.message, error])).values()
      ].filter((error): error is FieldErrorMessage => Boolean(error?.message));

      if (uniqueErrors.length === 0) {
        return null;
      }

      if (uniqueErrors.length === 1) {
        return uniqueErrors[0].message;
      }

      return (
        <ul className="pds-field-error-list" data-slot="field-error-list">
          {uniqueErrors.map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      );
    }, [children, errors]);

    if (!content) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn("pds-field-error", className)}
        data-slot="field-error"
        role={role}
        {...props}
      >
        {content}
      </div>
    );
  }
);
