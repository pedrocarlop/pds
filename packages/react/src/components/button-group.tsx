"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";
import { Separator } from "./separator";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
}

export interface ButtonGroupTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface ButtonGroupSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
  orientation?: "horizontal" | "vertical";
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    { className, orientation = "horizontal", role = "group", ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn("pds-button-group", className)}
        data-orientation={orientation}
        data-slot="button-group"
        role={role}
        {...props}
      />
    );
  }
);

export const ButtonGroupText = React.forwardRef<
  HTMLDivElement,
  ButtonGroupTextProps
>(function ButtonGroupText({ asChild = false, className, ...props }, ref) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      ref={ref}
      className={cn("pds-button-group-text", className)}
      data-slot="button-group-text"
      {...props}
    />
  );
});

export const ButtonGroupSeparator: React.ForwardRefExoticComponent<
  ButtonGroupSeparatorProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, ButtonGroupSeparatorProps>(
  function ButtonGroupSeparator(
    { className, orientation = "vertical", ...props },
    ref
  ) {
    return (
      <Separator
        ref={ref}
        className={cn("pds-button-group-separator", className)}
        data-slot="button-group-separator"
        orientation={orientation}
        {...props}
      />
    );
  }
);
