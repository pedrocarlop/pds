"use client";

import * as React from "react";
import {
  OTPInput as OTPInputPrimitive,
  OTPInputContext,
  type OTPInputProps as OTPInputPrimitiveProps
} from "input-otp";

import { cn } from "../utilities";
import { Icon } from "./icon";

export type InputOTPProps = OTPInputPrimitiveProps & {
  invalid?: boolean;
};

export type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement>;

export interface InputOTPSlotProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

export type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInputPrimitive>,
  InputOTPProps
>(function InputOTP(
  {
    "aria-invalid": ariaInvalidProp,
    className,
    containerClassName,
    invalid = false,
    spellCheck = false,
    ...props
  },
  ref
) {
  const ariaInvalid = invalid || ariaInvalidProp;

  return (
    <OTPInputPrimitive
      ref={ref}
      aria-invalid={ariaInvalid || undefined}
      className={cn("pds-input-otp-control", className)}
      containerClassName={cn("pds-input-otp", containerClassName)}
      data-invalid={invalid || undefined}
      data-slot="input-otp"
      spellCheck={spellCheck}
      {...props}
    />
  );
});

export const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  InputOTPGroupProps
>(function InputOTPGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-input-otp-group", className)}
      data-slot="input-otp-group"
      {...props}
    />
  );
});

export const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  InputOTPSlotProps
>(function InputOTPSlot({ className, index, ...props }, ref) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext?.slots[index];
  const char = slot?.char ?? slot?.placeholderChar;

  return (
    <div
      ref={ref}
      className={cn("pds-input-otp-slot", className)}
      data-active={slot?.isActive || undefined}
      data-filled={slot?.char ? true : undefined}
      data-placeholder-visible={!slot?.char && slot?.placeholderChar ? true : undefined}
      data-slot="input-otp-slot"
      {...props}
    >
      <span className="pds-input-otp-slot-char" data-slot="input-otp-slot-char">
        {char}
      </span>
      {slot?.hasFakeCaret ? (
        <span
          aria-hidden="true"
          className="pds-input-otp-caret"
          data-slot="input-otp-caret"
        />
      ) : null}
    </div>
  );
});

export const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  InputOTPSeparatorProps
>(function InputOTPSeparator({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-input-otp-separator", className)}
      data-slot="input-otp-separator"
      role="separator"
      {...props}
    >
      <Icon name="remove" />
    </div>
  );
});
