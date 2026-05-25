"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../utilities";

export const Drawer: typeof DrawerPrimitive.Root = DrawerPrimitive.Root;
export const DrawerNestedRoot: typeof DrawerPrimitive.NestedRoot =
  DrawerPrimitive.NestedRoot;

export type DrawerTriggerProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Trigger
>;

export const DrawerTrigger: React.ForwardRefExoticComponent<
  DrawerTriggerProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  function DrawerTrigger(props, ref) {
  return (
    <DrawerPrimitive.Trigger ref={ref} data-slot="drawer-trigger" {...props} />
  );
});

export const DrawerPortal: typeof DrawerPrimitive.Portal = DrawerPrimitive.Portal;

export type DrawerCloseProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Close
>;

export const DrawerClose: React.ForwardRefExoticComponent<
  DrawerCloseProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose(props, ref) {
  return <DrawerPrimitive.Close ref={ref} data-slot="drawer-close" {...props} />;
});

export type DrawerOverlayProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Overlay
>;

export const DrawerOverlay: React.ForwardRefExoticComponent<
  DrawerOverlayProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  function DrawerOverlay({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("pds-drawer-overlay", className)}
      data-slot="drawer-overlay"
      {...props}
    />
  );
});

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  showCloseButton?: boolean;
  showHandle?: boolean;
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(
  { children, className, showCloseButton = true, showHandle = true, ...props },
  ref
) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn("pds-drawer-content", className)}
        data-slot="drawer-content"
        {...props}
      >
        {showHandle && <DrawerHandle />}
        {children}
        {showCloseButton && (
          <DrawerPrimitive.Close
            aria-label="Close"
            className="pds-drawer-close"
            data-slot="drawer-close"
          >
            <span aria-hidden="true" className="pds-drawer-close-mark" />
            <span className="pds-visually-hidden">Close</span>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});

export type DrawerHandleProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Handle
>;

export const DrawerHandle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Handle>,
  DrawerHandleProps
>(function DrawerHandle({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Handle
      ref={ref}
      className={cn("pds-drawer-handle", className)}
      data-slot="drawer-handle"
      {...props}
    />
  );
});

export const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DrawerHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-drawer-header", className)}
      data-slot="drawer-header"
      {...props}
    />
  );
});

export const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DrawerBody({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-drawer-body", className)}
      data-slot="drawer-body"
      {...props}
    />
  );
});

export const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DrawerFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-drawer-footer", className)}
      data-slot="drawer-footer"
      {...props}
    />
  );
});

export type DrawerTitleProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Title
>;

export const DrawerTitle: React.ForwardRefExoticComponent<
  DrawerTitleProps & React.RefAttributes<HTMLHeadingElement>
> = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn("pds-drawer-title", className)}
      data-slot="drawer-title"
      {...props}
    />
  );
});

export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Description
>;

export const DrawerDescription: React.ForwardRefExoticComponent<
  DrawerDescriptionProps & React.RefAttributes<HTMLParagraphElement>
> = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  function DrawerDescription({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("pds-drawer-description", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
});
