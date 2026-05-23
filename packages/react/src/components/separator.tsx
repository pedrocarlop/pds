"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type SeparatorProps = React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
>;

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  { className, decorative = true, orientation = "horizontal", ...props },
  ref
) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      className={cn("pds-separator", className)}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
});
