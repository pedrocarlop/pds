"use client";

import * as React from "react";

import { cn } from "../utilities";
import { Icon } from "./icon";

export interface FilterChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  active?: boolean;
  children?: never;
  count?: React.ReactNode;
  icon?: string;
  iconOnly?: boolean;
  label?: React.ReactNode;
  notification?: boolean;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  removeLabel?: string;
}

function getTextLabel(label: React.ReactNode) {
  if (typeof label === "string" || typeof label === "number") {
    return String(label);
  }

  return undefined;
}

export const FilterChip = React.forwardRef<HTMLSpanElement, FilterChipProps>(
  function FilterChip(
    {
      active = false,
      "aria-label": ariaLabel,
      "aria-pressed": ariaPressed,
      className,
      count,
      disabled,
      icon,
      iconOnly = false,
      label,
      notification = false,
      onRemove,
      removeLabel,
      type = "button",
      ...props
    },
    ref
  ) {
    const textLabel = getTextLabel(label);
    const resolvedAriaLabel = iconOnly ? ariaLabel ?? textLabel : ariaLabel;
    const resolvedAriaPressed = ariaPressed ?? (active ? true : undefined);
    const hasVisibleLabel = !iconOnly && label !== undefined && label !== null;
    const hasCount = !iconOnly && count !== undefined && count !== null;
    const resolvedRemoveLabel =
      removeLabel ?? `Remove ${textLabel ?? "filter"}`;

    return (
      <span
        ref={ref}
        className={cn("pds-filter-chip", className)}
        data-active={active || undefined}
        data-disabled={disabled || undefined}
        data-icon-only={iconOnly || undefined}
        data-removable={onRemove ? true : undefined}
        data-slot="filter-chip"
      >
        <button
          aria-label={resolvedAriaLabel}
          aria-pressed={resolvedAriaPressed}
          className="pds-filter-chip-action"
          data-slot="filter-chip-action"
          disabled={disabled}
          type={type}
          {...props}
        >
          {icon ? (
            <Icon
              className="pds-filter-chip-icon"
              data-slot="filter-chip-icon"
              name={icon}
            />
          ) : null}
          {hasVisibleLabel ? (
            <span
              className="pds-filter-chip-label"
              data-slot="filter-chip-label"
            >
              {label}
            </span>
          ) : null}
          {iconOnly && !resolvedAriaLabel && label ? (
            <span className="pds-visually-hidden">{label}</span>
          ) : null}
          {hasVisibleLabel && hasCount ? (
            <span
              aria-hidden="true"
              className="pds-filter-chip-separator"
              data-slot="filter-chip-separator"
            >
              ·
            </span>
          ) : null}
          {hasCount ? (
            <span
              className="pds-filter-chip-count"
              data-slot="filter-chip-count"
            >
              {count}
            </span>
          ) : null}
          {notification ? (
            <span
              aria-hidden="true"
              className="pds-filter-chip-notification"
              data-slot="filter-chip-notification"
            />
          ) : null}
        </button>
        {onRemove ? (
          <button
            aria-label={resolvedRemoveLabel}
            className="pds-filter-chip-remove"
            data-slot="filter-chip-remove"
            disabled={disabled}
            onClick={onRemove}
            type="button"
          >
            <Icon name="close" />
          </button>
        ) : null}
      </span>
    );
  }
);
