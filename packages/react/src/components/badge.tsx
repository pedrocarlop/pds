"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";

export type BadgeTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "inactive";
export type BadgeEmphasis = "solid" | "soft" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  emphasis?: BadgeEmphasis;
  tone?: BadgeTone;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      asChild = false,
      className,
      emphasis = "soft",
      tone = "neutral",
      ...props
    },
    ref
  ) {
    const Comp = asChild ? Slot.Root : "span";

    return (
      <Comp
        ref={ref}
        className={cn("pds-badge", className)}
        data-emphasis={emphasis}
        data-slot="badge"
        data-tone={tone}
        {...props}
      />
    );
  }
);
