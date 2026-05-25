"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { cn } from "../utilities";
import type { ButtonIntent, ButtonSize } from "./button";

export type AlertDialogSize = "default" | "sm";

export const AlertDialog = AlertDialogPrimitive.Root;

export const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
>(function AlertDialogTrigger(props, ref) {
  return (
    <AlertDialogPrimitive.Trigger
      ref={ref}
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
});

export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(function AlertDialogOverlay({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cn("pds-alert-dialog-overlay", className)}
      data-slot="alert-dialog-overlay"
      {...props}
    />
  );
});

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  size?: AlertDialogSize;
}

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(function AlertDialogContent(
  { className, size = "default", ...props },
  ref
) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn("pds-alert-dialog-content", className)}
        data-size={size}
        data-slot="alert-dialog-content"
        {...props}
      />
    </AlertDialogPortal>
  );
});

export const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function AlertDialogHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-alert-dialog-header", className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
});

export const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function AlertDialogFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-alert-dialog-footer", className)}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
});

export type AlertDialogMediaProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertDialogMedia = React.forwardRef<
  HTMLDivElement,
  AlertDialogMediaProps
>(function AlertDialogMedia({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-alert-dialog-media", className)}
      data-slot="alert-dialog-media"
      {...props}
    />
  );
});

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(function AlertDialogTitle({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("pds-alert-dialog-title", className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
});

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("pds-alert-dialog-description", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
});

export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  intent?: ButtonIntent;
  size?: ButtonSize;
}

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(function AlertDialogAction(
  { className, intent = "danger", size = "md", ...props },
  ref
) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn("pds-button", className)}
      data-intent={intent}
      data-size={size}
      data-slot="alert-dialog-action"
      {...props}
    />
  );
});

export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
  intent?: ButtonIntent;
  size?: ButtonSize;
}

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(function AlertDialogCancel(
  { className, intent = "secondary", size = "md", ...props },
  ref
) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn("pds-button", className)}
      data-intent={intent}
      data-size={size}
      data-slot="alert-dialog-cancel"
      {...props}
    />
  );
});
