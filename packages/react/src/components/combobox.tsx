"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";

import { cn } from "../utilities";
import { Button } from "./button";
import { Icon } from "./icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "./input-group";

type BaseUIClassName<State> =
  | string
  | ((state: State) => string | undefined)
  | undefined;

function composeBaseUIClassName<State>(
  baseClassName: string,
  className: BaseUIClassName<State>
) {
  if (typeof className === "function") {
    return (state: State) => cn(baseClassName, className(state));
  }

  return cn(baseClassName, className);
}

export const Combobox = ComboboxPrimitive.Root;
export type ComboboxProps<
  Value = unknown,
  Multiple extends boolean | undefined = false
> = ComboboxPrimitive.Root.Props<Value, Multiple>;

export type ComboboxValueProps = ComboboxPrimitive.Value.Props;

export function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;

export const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(function ComboboxTrigger({ children, className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Trigger.State
      >("pds-combobox-trigger", className)}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <Icon className="pds-combobox-trigger-icon" name="keyboard_arrow_down" />
    </ComboboxPrimitive.Trigger>
  );
});

export interface ComboboxClearProps extends ComboboxPrimitive.Clear.Props {
  label?: string;
}

export const ComboboxClear = React.forwardRef<
  HTMLButtonElement,
  ComboboxClearProps
>(function ComboboxClear(
  { "aria-label": ariaLabel, children, className, label = "Clear selection", ...props },
  ref
) {
  return (
    <ComboboxPrimitive.Clear
      ref={ref}
      aria-label={ariaLabel ?? label}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Clear.State
      >("pds-combobox-clear", className)}
      data-slot="combobox-clear"
      render={<InputGroupButton intent="quiet" size="icon-xs" />}
      {...props}
    >
      {children ?? <Icon name="close" />}
    </ComboboxPrimitive.Clear>
  );
});

export interface ComboboxInputProps
  extends Omit<ComboboxPrimitive.Input.Props, "className"> {
  className?: string;
  disabled?: boolean;
  showClear?: boolean;
  showTrigger?: boolean;
}

export const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  ComboboxInputProps
>(function ComboboxInput(
  {
    children,
    className,
    disabled = false,
    showClear = false,
    showTrigger = true,
    ...props
  },
  ref
) {
  return (
    <InputGroup className={cn("pds-combobox-input-group", className)}>
      <ComboboxPrimitive.Input
        ref={ref}
        data-slot="combobox-input"
        render={<InputGroupInput className="pds-combobox-input" disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon
        align="inline-end"
        className="pds-combobox-input-addon"
      >
        {showTrigger && (
          <InputGroupButton
            asChild
            className="pds-combobox-input-trigger"
            disabled={disabled}
            intent="quiet"
            size="icon-xs"
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
});

export interface ComboboxContentProps
  extends ComboboxPrimitive.Popup.Props,
    Pick<
      ComboboxPrimitive.Positioner.Props,
      "align" | "alignOffset" | "anchor" | "side" | "sideOffset"
    > {}

export const ComboboxContent = React.forwardRef<
  HTMLDivElement,
  ComboboxContentProps
>(function ComboboxContent(
  {
    align = "start",
    alignOffset = 0,
    anchor,
    className,
    side = "bottom",
    sideOffset = 8,
    ...props
  },
  ref
) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="pds-combobox-positioner"
        data-slot="combobox-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          ref={ref}
          className={composeBaseUIClassName<
            ComboboxPrimitive.Popup.State
          >("pds-combobox-content", className)}
          data-chips={anchor ? "true" : undefined}
          data-slot="combobox-content"
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
});

export type ComboboxListProps = ComboboxPrimitive.List.Props;

export const ComboboxList = React.forwardRef<
  HTMLDivElement,
  ComboboxListProps
>(function ComboboxList({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.List.State
      >("pds-combobox-list", className)}
      data-slot="combobox-list"
      {...props}
    />
  );
});

export type ComboboxItemProps = ComboboxPrimitive.Item.Props;

export const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  ComboboxItemProps
>(function ComboboxItem({ children, className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Item.State
      >("pds-combobox-item", className)}
      data-slot="combobox-item"
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        className="pds-combobox-item-indicator"
        data-slot="combobox-item-indicator"
      >
        <Icon name="check" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
});

export type ComboboxGroupProps = ComboboxPrimitive.Group.Props;

export const ComboboxGroup = React.forwardRef<
  HTMLDivElement,
  ComboboxGroupProps
>(function ComboboxGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Group
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Group.State
      >("pds-combobox-group", className)}
      data-slot="combobox-group"
      {...props}
    />
  );
});

export type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;

export const ComboboxLabel = React.forwardRef<
  HTMLDivElement,
  ComboboxLabelProps
>(function ComboboxLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.GroupLabel
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.GroupLabel.State
      >("pds-combobox-label", className)}
      data-slot="combobox-label"
      {...props}
    />
  );
});

export type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;

export function ComboboxCollection(props: ComboboxCollectionProps) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;

export const ComboboxEmpty = React.forwardRef<
  HTMLDivElement,
  ComboboxEmptyProps
>(function ComboboxEmpty({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Empty.State
      >("pds-combobox-empty", className)}
      data-slot="combobox-empty"
      {...props}
    />
  );
});

export type ComboboxSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.Separator
>;

export const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Separator>,
  ComboboxSeparatorProps
>(function ComboboxSeparator({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Separator
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Separator.State
      >("pds-combobox-separator", className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
});

export type ComboboxChipsProps = ComboboxPrimitive.Chips.Props;

export const ComboboxChips = React.forwardRef<
  HTMLDivElement,
  ComboboxChipsProps
>(function ComboboxChips({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Chips
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Chips.State
      >("pds-combobox-chips", className)}
      data-slot="combobox-chips"
      {...props}
    />
  );
});

export interface ComboboxChipProps extends ComboboxPrimitive.Chip.Props {
  removeLabel?: string;
  showRemove?: boolean;
}

export const ComboboxChip = React.forwardRef<
  HTMLDivElement,
  ComboboxChipProps
>(function ComboboxChip(
  {
    children,
    className,
    removeLabel = "Remove selection",
    showRemove = true,
    ...props
  },
  ref
) {
  return (
    <ComboboxPrimitive.Chip
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Chip.State
      >("pds-combobox-chip", className)}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          aria-label={removeLabel}
          className="pds-combobox-chip-remove"
          data-slot="combobox-chip-remove"
          render={<Button intent="quiet" size="icon" />}
        >
          <Icon name="close" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
});

export type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;

export const ComboboxChipsInput = React.forwardRef<
  HTMLInputElement,
  ComboboxChipsInputProps
>(function ComboboxChipsInput({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      className={composeBaseUIClassName<
        ComboboxPrimitive.Input.State
      >("pds-combobox-chip-input", className)}
      data-slot="combobox-chip-input"
      {...props}
    />
  );
});

export function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}
