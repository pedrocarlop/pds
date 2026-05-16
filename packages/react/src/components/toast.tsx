"use client";

import * as React from "react";
import { Toast as ToastPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type ToastTone = "neutral" | "success" | "warning" | "danger";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn("pds-toast-viewport", className)}
      data-slot="toast-viewport"
      {...props}
    />
  );
});

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  tone?: ToastTone;
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(function Toast({ className, tone = "neutral", ...props }, ref) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn("pds-toast", className)}
      data-slot="toast"
      data-tone={tone}
      {...props}
    />
  );
});

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(function ToastTitle({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn("pds-toast-title", className)}
      data-slot="toast-title"
      {...props}
    />
  );
});

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn("pds-toast-description", className)}
      data-slot="toast-description"
      {...props}
    />
  );
});

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(function ToastAction({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      className={cn("pds-toast-action", className)}
      data-slot="toast-action"
      {...props}
    />
  );
});

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(function ToastClose(
  { "aria-label": ariaLabel, children, className, ...props },
  ref
) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      aria-label={children ? ariaLabel : ariaLabel ?? "Dismiss notification"}
      className={cn("pds-toast-close", className)}
      data-slot="toast-close"
      {...props}
    >
      {children ?? (
        <>
          <span aria-hidden="true" className="pds-toast-close-mark" />
          <span className="pds-visually-hidden">Dismiss notification</span>
        </>
      )}
    </ToastPrimitive.Close>
  );
});
