"use client";

import * as React from "react";

import { cn } from "../utilities";

export type NativeSelectSize = "default" | "sm";

export interface NativeSelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "aria-invalid" | "size"
  > {
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  invalid?: boolean;
  size?: NativeSelectSize;
  wrapperClassName?: string;
}

export type NativeSelectOptionProps =
  React.OptionHTMLAttributes<HTMLOptionElement>;
export type NativeSelectOptGroupProps =
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>;

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps
>(function NativeSelect(
  {
    className,
    disabled,
    invalid = false,
    size = "default",
    wrapperClassName,
    ...props
  },
  ref
) {
  const ariaInvalid = invalid || props["aria-invalid"];

  return (
    <span
      className={cn("pds-native-select-wrapper", wrapperClassName)}
      data-disabled={disabled || undefined}
      data-slot="native-select-wrapper"
    >
      <select
        ref={ref}
        aria-invalid={ariaInvalid || undefined}
        className={cn("pds-native-select", className)}
        data-invalid={invalid || undefined}
        data-size={size}
        data-slot="native-select"
        disabled={disabled}
        {...props}
      />
      <span
        aria-hidden="true"
        className="pds-native-select-icon"
        data-slot="native-select-icon"
      />
    </span>
  );
});

export const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  NativeSelectOptionProps
>(function NativeSelectOption({ className, ...props }, ref) {
  return (
    <option
      ref={ref}
      className={cn("pds-native-select-option", className)}
      data-slot="native-select-option"
      {...props}
    />
  );
});

export const NativeSelectOptGroup = React.forwardRef<
  HTMLOptGroupElement,
  NativeSelectOptGroupProps
>(function NativeSelectOptGroup({ className, ...props }, ref) {
  return (
    <optgroup
      ref={ref}
      className={cn("pds-native-select-optgroup", className)}
      data-slot="native-select-optgroup"
      {...props}
    />
  );
});
