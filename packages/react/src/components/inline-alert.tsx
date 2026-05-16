"use client";

import * as React from "react";

import { cn } from "../utilities";

export type InlineAlertTone = "neutral" | "success" | "warning" | "danger";

export interface InlineAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: InlineAlertTone;
}

export const InlineAlert = React.forwardRef<HTMLDivElement, InlineAlertProps>(
  function InlineAlert({ className, role, tone = "neutral", ...props }, ref) {
    const defaultRole = tone === "warning" || tone === "danger" ? "alert" : "status";

    return (
      <div
        ref={ref}
        className={cn("pds-inline-alert", className)}
        data-slot="inline-alert"
        data-tone={tone}
        role={role ?? defaultRole}
        {...props}
      />
    );
  }
);

export const InlineAlertTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function InlineAlertTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-inline-alert-title", className)}
      data-slot="inline-alert-title"
      {...props}
    />
  );
});

export const InlineAlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function InlineAlertDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-inline-alert-description", className)}
      data-slot="inline-alert-description"
      {...props}
    />
  );
});

export const InlineAlertActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function InlineAlertActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-inline-alert-actions", className)}
      data-slot="inline-alert-actions"
      {...props}
    />
  );
});
