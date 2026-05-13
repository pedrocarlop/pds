"use client";

import * as React from "react";

import { cn } from "../utilities";

export type FieldDensity = "default" | "compact";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "aria-invalid"> {
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  density?: FieldDensity;
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { className, density = "default", invalid = false, type, ...props },
    ref
  ) {
    const ariaInvalid = invalid || props["aria-invalid"];

    return (
      <input
        ref={ref}
        className={cn("pds-input", className)}
        data-density={density}
        data-invalid={invalid || undefined}
        data-slot="input"
        type={type}
        {...props}
        aria-invalid={ariaInvalid || undefined}
      />
    );
  }
);
