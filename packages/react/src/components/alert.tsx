"use client";

import * as React from "react";

import { cn } from "../utilities";

export type AlertTone = "neutral" | "success" | "warning" | "danger";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
}

export type AlertTitleProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertDescriptionProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertActionProps = React.HTMLAttributes<HTMLDivElement>;

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert({ className, role = "alert", tone = "neutral", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-alert", className)}
        data-slot="alert"
        data-tone={tone}
        role={role}
        {...props}
      />
    );
  }
);

export const AlertTitle = React.forwardRef<HTMLDivElement, AlertTitleProps>(
  function AlertTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-alert-title", className)}
        data-slot="alert-title"
        {...props}
      />
    );
  }
);

export const AlertDescription = React.forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(function AlertDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-alert-description", className)}
      data-slot="alert-description"
      {...props}
    />
  );
});

export const AlertAction = React.forwardRef<HTMLDivElement, AlertActionProps>(
  function AlertAction({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-alert-action", className)}
        data-slot="alert-action"
        {...props}
      />
    );
  }
);
