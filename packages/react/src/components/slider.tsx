"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "../utilities";

function getThumbCount({
  defaultValue,
  thumbCount,
  value
}: {
  defaultValue?: number[];
  thumbCount?: number;
  value?: number[];
}) {
  if (typeof thumbCount === "number" && thumbCount > 0) {
    return thumbCount;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value.length;
  }

  if (Array.isArray(defaultValue) && defaultValue.length > 0) {
    return defaultValue.length;
  }

  return 1;
}

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbCount?: number;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(
  {
    "aria-label": ariaLabel,
    children,
    className,
    defaultValue,
    thumbCount,
    value,
    ...props
  },
  ref
) {
  const renderedThumbCount = getThumbCount({ defaultValue, thumbCount, value });

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("pds-slider", className)}
      data-slot="slider"
      aria-label={ariaLabel}
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      {children ?? (
        <>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          {Array.from({ length: renderedThumbCount }, (_, index) => (
            <SliderThumb
              key={index}
              aria-label={
                renderedThumbCount > 1
                  ? `Value ${index + 1}`
                  : ariaLabel ?? "Value"
              }
            />
          ))}
        </>
      )}
    </SliderPrimitive.Root>
  );
});

export const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(function SliderTrack({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Track
      ref={ref}
      className={cn("pds-slider-track", className)}
      data-slot="slider-track"
      {...props}
    />
  );
});

export const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(function SliderRange({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Range
      ref={ref}
      className={cn("pds-slider-range", className)}
      data-slot="slider-range"
      {...props}
    />
  );
});

export const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(function SliderThumb({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={cn("pds-slider-thumb", className)}
      data-slot="slider-thumb"
      {...props}
    />
  );
});
