"use client";

import * as React from "react";

import { cn } from "../utilities";
import { Textarea, type TextareaProps } from "./textarea";

interface ComposerContextValue {
  disabled: boolean;
  invalid: boolean;
}

const ComposerContext = React.createContext<ComposerContextValue>({
  disabled: false,
  invalid: false
});

export interface ComposerProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "aria-busy"> {
  "aria-busy"?: React.AriaAttributes["aria-busy"];
  busy?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

export const Composer = React.forwardRef<HTMLFormElement, ComposerProps>(
  function Composer(
    {
      "aria-busy": ariaBusyProp,
      busy = false,
      children,
      className,
      disabled = false,
      invalid = false,
      ...props
    },
    ref
  ) {
    const ariaBusy = busy || ariaBusyProp;

    return (
      <ComposerContext.Provider value={{ disabled, invalid }}>
        <form
          ref={ref}
          aria-busy={ariaBusy || undefined}
          className={cn("pds-composer", className)}
          data-busy={busy || undefined}
          data-disabled={disabled || undefined}
          data-invalid={invalid || undefined}
          data-slot="composer"
          {...props}
        >
          {children}
        </form>
      </ComposerContext.Provider>
    );
  }
);

export type ComposerInputProps = TextareaProps;

export const ComposerInput = React.forwardRef<
  HTMLTextAreaElement,
  ComposerInputProps
>(function ComposerInput(
  { className, disabled, invalid, ...props },
  ref
) {
  const composer = React.useContext(ComposerContext);
  const resolvedDisabled = disabled ?? composer.disabled;
  const resolvedInvalid = invalid ?? composer.invalid;

  return (
    <Textarea
      ref={ref}
      className={cn("pds-composer-input", className)}
      data-slot="composer-input"
      disabled={resolvedDisabled}
      invalid={resolvedInvalid}
      {...props}
    />
  );
});

export const ComposerActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ComposerActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-composer-actions", className)}
      data-slot="composer-actions"
      {...props}
    />
  );
});

export const ComposerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ComposerFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-composer-footer", className)}
      data-slot="composer-footer"
      {...props}
    />
  );
});
