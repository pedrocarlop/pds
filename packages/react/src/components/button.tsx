"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";

export type ButtonIntent = "primary" | "secondary" | "danger" | "quiet" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  intent?: ButtonIntent;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      asChild = false,
      className,
      intent = "primary",
      size = "md",
      type = "button",
      ...props
    },
    ref
  ) {
    const Comp = asChild ? Slot.Root : "button";

    return (
      <Comp
        ref={ref}
        className={cn("pds-button", className)}
        data-intent={intent}
        data-size={size}
        data-slot="button"
        type={asChild ? undefined : type}
        {...props}
      />
    );
  }
);
