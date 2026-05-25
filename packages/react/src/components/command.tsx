"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "../utilities";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./dialog";
import { Icon } from "./icon";
import { InputGroup, InputGroupAddon } from "./input-group";

export type CommandProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
>;

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(function Command({ className, ...props }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn("pds-command", className)}
      data-slot="command"
      {...props}
    />
  );
});

export interface CommandDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  className?: string;
  description?: string;
  showCloseButton?: boolean;
  title?: string;
}

export function CommandDialog({
  children,
  className,
  description = "Search for a command to run.",
  showCloseButton = false,
  title = "Command palette",
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn("pds-command-dialog-content", className)}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="pds-visually-hidden">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>;

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(function CommandInput({ className, ...props }, ref) {
  return (
    <div className="pds-command-input-wrapper" data-slot="command-input-wrapper">
      <InputGroup className="pds-command-input-group">
        <CommandPrimitive.Input
          ref={ref}
          className={cn(
            "pds-command-input",
            "pds-input-group-control",
            className
          )}
          data-slot="command-input"
          {...props}
        />
        <InputGroupAddon
          align="inline-end"
          className="pds-command-input-addon"
        >
          <Icon className="pds-command-input-icon" name="search" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
});

export type CommandListProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
>;

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(function CommandList({ className, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("pds-command-list", className)}
      data-slot="command-list"
      {...props}
    />
  );
});

export type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(function CommandEmpty({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn("pds-command-empty", className)}
      data-slot="command-empty"
      {...props}
    />
  );
});

export type CommandGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>;

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(function CommandGroup({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn("pds-command-group", className)}
      data-slot="command-group"
      {...props}
    />
  );
});

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("pds-command-separator", className)}
      data-slot="command-separator"
      {...props}
    />
  );
});

export type CommandItemProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>;

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(function CommandItem({ children, className, ...props }, ref) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn("pds-command-item", className)}
      data-slot="command-item"
      {...props}
    >
      {children}
      <Icon
        className="pds-command-item-indicator"
        data-slot="command-item-indicator"
        name="check"
      />
    </CommandPrimitive.Item>
  );
});

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export const CommandShortcut = React.forwardRef<
  HTMLSpanElement,
  CommandShortcutProps
>(function CommandShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-command-shortcut", className)}
      data-slot="command-shortcut"
      {...props}
    />
  );
});
