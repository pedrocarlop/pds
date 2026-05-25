"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type SheetSide = "top" | "right" | "bottom" | "left";

export const Sheet = SheetPrimitive.Root;

export const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>
>(function SheetTrigger(props, ref) {
  return (
    <SheetPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />
  );
});

export const SheetPortal = SheetPrimitive.Portal;

export const SheetClose = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>(function SheetClose(props, ref) {
  return <SheetPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />;
});

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(function SheetOverlay({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn("pds-sheet-overlay", className)}
      data-slot="sheet-overlay"
      {...props}
    />
  );
});

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  showCloseButton?: boolean;
  side?: SheetSide;
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(function SheetContent(
  { children, className, showCloseButton = true, side = "right", ...props },
  ref
) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn("pds-sheet-content", className)}
        data-side={side}
        data-slot="sheet-content"
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            aria-label="Close"
            className="pds-sheet-close"
            data-slot="sheet-close"
          >
            <span aria-hidden="true" className="pds-sheet-close-mark" />
            <span className="pds-visually-hidden">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});

export const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SheetHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sheet-header", className)}
      data-slot="sheet-header"
      {...props}
    />
  );
});

export const SheetBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SheetBody({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sheet-body", className)}
      data-slot="sheet-body"
      {...props}
    />
  );
});

export const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SheetFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sheet-footer", className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
});

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(function SheetTitle({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cn("pds-sheet-title", className)}
      data-slot="sheet-title"
      {...props}
    />
  );
});

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(function SheetDescription({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("pds-sheet-description", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
});
