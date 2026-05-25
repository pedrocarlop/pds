"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "../utilities";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbLabel?: string;
}

function getThumbCount({
  defaultValue,
  max,
  min,
  value
}: Pick<SliderProps, "defaultValue" | "max" | "min" | "value">) {
  if (Array.isArray(value)) {
    return value.length;
  }

  if (Array.isArray(defaultValue)) {
    return defaultValue.length;
  }

  if (typeof min === "number" && typeof max === "number" && min !== max) {
    return 1;
  }

  return 1;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(
  {
    className,
    defaultValue,
    max = 100,
    min = 0,
    thumbLabel = "Slider thumb",
    value,
    ...props
  },
  ref
) {
  const thumbCount = getThumbCount({ defaultValue, max, min, value });

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("pds-slider", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track
        className="pds-slider-track"
        data-slot="slider-track"
      >
        <SliderPrimitive.Range
          className="pds-slider-range"
          data-slot="slider-range"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, index) => (
        <SliderPrimitive.Thumb
          aria-label={thumbCount > 1 ? `${thumbLabel} ${index + 1}` : thumbLabel}
          className="pds-slider-thumb"
          data-slot="slider-thumb"
          key={index}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
