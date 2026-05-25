"use client";

import * as React from "react";

import { cn } from "../utilities";
import { Button, type ButtonIntent, type ButtonProps } from "./button";
import { Input, type InputProps } from "./input";
import { Textarea, type TextareaProps } from "./textarea";

export type InputGroupAddonAlign =
  | "inline-start"
  | "inline-end"
  | "block-start"
  | "block-end";
export type InputGroupButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: InputGroupAddonAlign;
}

export interface InputGroupButtonProps extends Omit<ButtonProps, "size"> {
  intent?: ButtonIntent;
  size?: InputGroupButtonSize;
}

export type InputGroupTextProps = React.HTMLAttributes<HTMLSpanElement>;
export type InputGroupInputProps = InputProps;
export type InputGroupTextareaProps = TextareaProps;

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    { className, disabled = false, role = "group", ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        aria-disabled={disabled || undefined}
        className={cn("pds-input-group", className)}
        data-disabled={disabled || undefined}
        data-slot="input-group"
        role={role}
        {...props}
      />
    );
  }
);

export const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  InputGroupAddonProps
>(function InputGroupAddon(
  { align = "inline-start", className, onClick, role = "group", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("pds-input-group-addon", className)}
      data-align={align}
      data-slot="input-group-addon"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (
          (event.target as HTMLElement).closest(
            "button, a, input, textarea, select"
          )
        ) {
          return;
        }

        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>(
            '[data-slot="input-group-control"], .pds-input-group-control'
          )
          ?.focus();
      }}
      role={role}
      {...props}
    />
  );
});

export const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  InputGroupButtonProps
>(function InputGroupButton(
  {
    className,
    intent = "quiet",
    size = "xs",
    type = "button",
    ...props
  },
  ref
) {
  return (
    <Button
      ref={ref}
      className={cn("pds-input-group-button", className)}
      data-input-group-size={size}
      data-slot="input-group-button"
      intent={intent}
      size={size === "icon-xs" || size === "icon-sm" ? "icon" : "sm"}
      type={type}
      {...props}
    />
  );
});

export const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  InputGroupTextProps
>(function InputGroupText({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-input-group-text", className)}
      data-slot="input-group-text"
      {...props}
    />
  );
});

export const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(function InputGroupInput({ className, ...props }, ref) {
  return (
    <Input
      ref={ref}
      className={cn("pds-input-group-control pds-input-group-input", className)}
      data-slot="input-group-control"
      {...props}
    />
  );
});

export const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(function InputGroupTextarea({ className, ...props }, ref) {
  return (
    <Textarea
      ref={ref}
      className={cn(
        "pds-input-group-control pds-input-group-textarea",
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
});
