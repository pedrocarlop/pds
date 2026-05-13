"use client";

import * as React from "react";

import { cn } from "../utilities";
import type { FieldDensity } from "./input";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "aria-invalid"> {
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  density?: FieldDensity;
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, density = "default", invalid = false, ...props },
    ref
  ) {
    const ariaInvalid = invalid || props["aria-invalid"];

    return (
      <textarea
        ref={ref}
        className={cn("pds-textarea", className)}
        data-density={density}
        data-invalid={invalid || undefined}
        data-slot="textarea"
        {...props}
        aria-invalid={ariaInvalid || undefined}
      />
    );
  }
);
