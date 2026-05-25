"use client";

import * as React from "react";

import { cn } from "../utilities";

export type KbdProps = React.ComponentPropsWithoutRef<"kbd">;
export type KbdGroupProps = React.ComponentPropsWithoutRef<"div">;

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  function Kbd({ className, ...props }, ref) {
    return (
      <kbd
        ref={ref}
        className={cn("pds-kbd", className)}
        data-slot="kbd"
        {...props}
      />
    );
  }
);

export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  function KbdGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-kbd-group", className)}
        data-slot="kbd-group"
        {...props}
      />
    );
  }
);
