"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "../utilities";

export const BottomSheet = DialogPrimitive.Root;

export const BottomSheetTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(function BottomSheetTrigger(props, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      data-slot="bottom-sheet-trigger"
      {...props}
    />
  );
});

export const BottomSheetPortal = DialogPrimitive.Portal;

export const BottomSheetClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(function BottomSheetClose(props, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      data-slot="bottom-sheet-close"
      {...props}
    />
  );
});

export const BottomSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function BottomSheetOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("pds-bottom-sheet-overlay", className)}
      data-slot="bottom-sheet-overlay"
      {...props}
    />
  );
});

export interface BottomSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}

export const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  BottomSheetContentProps
>(function BottomSheetContent(
  { children, className, showCloseButton = true, ...props },
  ref
) {
  return (
    <BottomSheetPortal>
      <BottomSheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn("pds-bottom-sheet-content", className)}
        data-slot="bottom-sheet-content"
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            aria-label="Close"
            className="pds-bottom-sheet-close"
            data-slot="bottom-sheet-close"
          >
            <span aria-hidden="true" className="pds-bottom-sheet-close-mark" />
            <span className="pds-visually-hidden">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </BottomSheetPortal>
  );
});

export const BottomSheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BottomSheetHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-bottom-sheet-header", className)}
      data-slot="bottom-sheet-header"
      {...props}
    />
  );
});

export const BottomSheetBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BottomSheetBody({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-bottom-sheet-body", className)}
      data-slot="bottom-sheet-body"
      {...props}
    />
  );
});

export const BottomSheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function BottomSheetFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-bottom-sheet-footer", className)}
      data-slot="bottom-sheet-footer"
      {...props}
    />
  );
});

export const BottomSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function BottomSheetTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("pds-bottom-sheet-title", className)}
      data-slot="bottom-sheet-title"
      {...props}
    />
  );
});

export const BottomSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function BottomSheetDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("pds-bottom-sheet-description", className)}
      data-slot="bottom-sheet-description"
      {...props}
    />
  );
});
