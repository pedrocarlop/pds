"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

import { cn } from "../utilities";

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  viewportProps?: React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.Viewport
  >;
}

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(function ScrollArea(
  { children, className, viewportProps, ...props },
  ref
) {
  const {
    className: viewportClassName,
    ...remainingViewportProps
  } = viewportProps ?? {};

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("pds-scroll-area", className)}
      data-slot="scroll-area"
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn("pds-scroll-area-viewport", viewportClassName)}
        data-slot="scroll-area-viewport"
        {...remainingViewportProps}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner
        className="pds-scroll-area-corner"
        data-slot="scroll-area-corner"
      />
    </ScrollAreaPrimitive.Root>
  );
});

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(function ScrollBar(
  { children, className, orientation = "vertical", ...props },
  ref
) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      className={cn("pds-scroll-area-scrollbar", className)}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      {children ?? (
        <ScrollAreaPrimitive.Thumb
          className="pds-scroll-area-thumb"
          data-slot="scroll-area-thumb"
          forceMount
        />
      )}
    </ScrollAreaPrimitive.Scrollbar>
  );
});
