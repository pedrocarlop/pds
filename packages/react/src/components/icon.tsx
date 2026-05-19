"use client";

import * as React from "react";

import { cn } from "../utilities";

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  label?: string;
  name: string;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  {
    "aria-hidden": ariaHidden,
    "aria-label": ariaLabel,
    className,
    label,
    name,
    role,
    ...props
  },
  ref
) {
  const accessibleLabel = label ?? ariaLabel;

  return (
    <span
      ref={ref}
      aria-hidden={accessibleLabel ? undefined : ariaHidden ?? true}
      aria-label={accessibleLabel}
      className={cn("pds-icon", "material-symbols-rounded", className)}
      data-icon=""
      data-slot="icon"
      role={accessibleLabel ? role ?? "img" : role}
      {...props}
    >
      {name}
    </span>
  );
});
