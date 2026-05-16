"use client";

import * as React from "react";
import { DropdownMenu as ActionMenuPrimitive } from "radix-ui";

import { cn } from "../utilities";
import type { MenuItemIntent } from "./menu";

export const ActionMenu = ActionMenuPrimitive.Root;
export const ActionMenuGroup = ActionMenuPrimitive.Group;
export const ActionMenuPortal = ActionMenuPrimitive.Portal;

export const ActionMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ActionMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ActionMenuPrimitive.Trigger>
>(function ActionMenuTrigger(props, ref) {
  return (
    <ActionMenuPrimitive.Trigger
      ref={ref}
      data-slot="action-menu-trigger"
      {...props}
    />
  );
});

export const ActionMenuContent = React.forwardRef<
  React.ElementRef<typeof ActionMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ActionMenuPrimitive.Content>
>(function ActionMenuContent(
  { className, collisionPadding = 16, sideOffset = 8, ...props },
  ref
) {
  return (
    <ActionMenuPrimitive.Portal>
      <ActionMenuPrimitive.Content
        ref={ref}
        className={cn("pds-action-menu-content", className)}
        collisionPadding={collisionPadding}
        data-slot="action-menu-content"
        sideOffset={sideOffset}
        {...props}
      />
    </ActionMenuPrimitive.Portal>
  );
});

export interface ActionMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof ActionMenuPrimitive.Item> {
  intent?: MenuItemIntent;
}

export const ActionMenuItem = React.forwardRef<
  React.ElementRef<typeof ActionMenuPrimitive.Item>,
  ActionMenuItemProps
>(function ActionMenuItem(
  { className, intent = "default", ...props },
  ref
) {
  return (
    <ActionMenuPrimitive.Item
      ref={ref}
      className={cn("pds-action-menu-item", className)}
      data-intent={intent}
      data-slot="action-menu-item"
      {...props}
    />
  );
});

export const ActionMenuLabel = React.forwardRef<
  React.ElementRef<typeof ActionMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ActionMenuPrimitive.Label>
>(function ActionMenuLabel({ className, ...props }, ref) {
  return (
    <ActionMenuPrimitive.Label
      ref={ref}
      className={cn("pds-action-menu-label", className)}
      data-slot="action-menu-label"
      {...props}
    />
  );
});

export const ActionMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ActionMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ActionMenuPrimitive.Separator>
>(function ActionMenuSeparator({ className, ...props }, ref) {
  return (
    <ActionMenuPrimitive.Separator
      ref={ref}
      className={cn("pds-action-menu-separator", className)}
      data-slot="action-menu-separator"
      {...props}
    />
  );
});

export const ActionMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function ActionMenuShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-action-menu-shortcut", className)}
      data-slot="action-menu-shortcut"
      {...props}
    />
  );
});
