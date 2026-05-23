"use client";

import * as React from "react";
import { HoverCard as HoverCardPrimitive } from "radix-ui";

import { cn } from "../utilities";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardPortal = HoverCardPrimitive.Portal;

export const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>(function HoverCardTrigger(props, ref) {
  return (
    <HoverCardPrimitive.Trigger
      ref={ref}
      data-slot="hover-card-trigger"
      {...props}
    />
  );
});

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  showArrow?: boolean;
}

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(function HoverCardContent(
  {
    children,
    className,
    collisionPadding = 16,
    showArrow = true,
    sideOffset = 8,
    ...props
  },
  ref
) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        className={cn("pds-hover-card-content", className)}
        collisionPadding={collisionPadding}
        data-slot="hover-card-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        {showArrow && (
          <HoverCardPrimitive.Arrow
            className="pds-hover-card-arrow"
            data-slot="hover-card-arrow"
          />
        )}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
});
