"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

import { cn } from "../utilities";

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(function ScrollArea({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("pds-scroll-area", className)}
      data-slot="scroll-area"
      {...props}
    />
  );
});

export const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(function ScrollAreaViewport({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      className={cn("pds-scroll-area-viewport", className)}
      data-slot="scroll-area-viewport"
      {...props}
    />
  );
});

export const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(function ScrollAreaScrollbar({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      className={cn("pds-scroll-area-scrollbar", className)}
      data-slot="scroll-area-scrollbar"
      {...props}
    />
  );
});

export const ScrollAreaThumb = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Thumb>
>(function ScrollAreaThumb({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Thumb
      ref={ref}
      className={cn("pds-scroll-area-thumb", className)}
      data-slot="scroll-area-thumb"
      {...props}
    />
  );
});

export const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Corner>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner>
>(function ScrollAreaCorner({ className, ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Corner
      ref={ref}
      className={cn("pds-scroll-area-corner", className)}
      data-slot="scroll-area-corner"
      {...props}
    />
  );
});
