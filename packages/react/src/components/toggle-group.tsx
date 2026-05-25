"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "../utilities";
import type { ToggleSize, ToggleVariant } from "./toggle";

export type ToggleGroupSpacing = "joined" | "separated";

interface ToggleGroupContextValue {
  size: ToggleSize;
  spacing: ToggleGroupSpacing;
  variant: ToggleVariant;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "md",
  spacing: "joined",
  variant: "default"
});

export type ToggleGroupProps =
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    size?: ToggleSize;
    spacing?: ToggleGroupSpacing;
    variant?: ToggleVariant;
  };

export type ToggleGroupItemProps =
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    size?: ToggleSize;
    variant?: ToggleVariant;
  };

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(function ToggleGroup(
  {
    children,
    className,
    size = "md",
    spacing = "joined",
    variant = "default",
    ...props
  },
  ref
) {
  const context = React.useMemo(
    () => ({ size, spacing, variant }),
    [size, spacing, variant]
  );

  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("pds-toggle-group", className)}
      data-size={size}
      data-slot="toggle-group"
      data-spacing={spacing}
      data-variant={variant}
      {...props}
    >
      <ToggleGroupContext.Provider value={context}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem(
  { className, size, variant, ...props },
  ref
) {
  const context = React.useContext(ToggleGroupContext);
  const resolvedSize = size ?? context.size;
  const resolvedVariant = variant ?? context.variant;

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn("pds-toggle pds-toggle-group-item", className)}
      data-size={resolvedSize}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={resolvedVariant}
      {...props}
    />
  );
});
