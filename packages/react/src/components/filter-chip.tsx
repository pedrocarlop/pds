"use client";

import * as React from "react";

import { cn } from "../utilities";

export interface FilterChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: React.ReactNode;
}

type FilterChipCompoundComponent = React.ForwardRefExoticComponent<
  FilterChipProps & React.RefAttributes<HTMLButtonElement>
> & {
  Value: typeof FilterChipValue;
};

const FilterChipRoot = React.forwardRef<
  HTMLButtonElement,
  FilterChipProps
>(function FilterChip(
  {
    active = false,
    children,
    className,
    disabled,
    label,
    type = "button",
    "aria-pressed": ariaPressed,
    ...props
  },
  ref
) {
  const resolvedAriaPressed = ariaPressed ?? (active ? true : undefined);

  return (
    <button
      ref={ref}
      aria-pressed={resolvedAriaPressed}
      className={cn("pds-filter-chip", className)}
      data-active={active || undefined}
      data-disabled={disabled || undefined}
      data-slot="filter-chip"
      disabled={disabled}
      type={type}
      {...props}
    >
      <span className="pds-filter-chip-label" data-slot="filter-chip-label">
        {label}
      </span>
      {children ? (
        <span className="pds-filter-chip-values" data-slot="filter-chip-values">
          {children}
        </span>
      ) : null}
    </button>
  );
});

export const FilterChipValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function FilterChipValue({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-filter-chip-value", className)}
      data-slot="filter-chip-value"
      {...props}
    />
  );
});

export const FilterChip = Object.assign(FilterChipRoot, {
  Value: FilterChipValue
}) as FilterChipCompoundComponent;
