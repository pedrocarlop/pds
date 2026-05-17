"use client";

import * as React from "react";

import { cn } from "../utilities";

export type CellVariant =
  | "default"
  | "disclosure"
  | "choice"
  | "compact"
  | "accent"
  | "nested";

export interface CellProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  inactive?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  use?: React.ElementType;
  variant?: CellVariant;
}

export const Cell = React.forwardRef<HTMLElement, CellProps>(function Cell(
  {
    "aria-disabled": ariaDisabled,
    children,
    className,
    disabled = false,
    inactive = false,
    type = "button",
    use: Comp = "div",
    variant = "default",
    ...props
  },
  ref
) {
  const isButton = Comp === "button";
  const resolvedAriaDisabled =
    ariaDisabled ?? (!isButton && disabled ? true : undefined);

  return (
    <Comp
      ref={ref}
      aria-disabled={resolvedAriaDisabled}
      className={cn("pds-cell", className)}
      data-disabled={disabled || undefined}
      data-inactive={inactive || undefined}
      data-slot="cell"
      data-variant={variant}
      disabled={isButton ? disabled : undefined}
      type={isButton ? type : undefined}
      {...props}
    >
      {children}
    </Comp>
  );
});
