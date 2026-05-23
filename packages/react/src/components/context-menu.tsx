"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";

import { cn } from "../utilities";
import type { MenuItemIntent } from "./menu";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
export const ContextMenuSub = ContextMenuPrimitive.Sub;

export const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>
>(function ContextMenuTrigger({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Trigger
      ref={ref}
      className={cn("pds-context-menu-trigger", className)}
      data-slot="context-menu-trigger"
      {...props}
    />
  );
});

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(function ContextMenuContent({ className, collisionPadding = 16, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn("pds-menu-content", className)}
        collisionPadding={collisionPadding}
        data-slot="context-menu-content"
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
});

export interface ContextMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
  intent?: MenuItemIntent;
  inset?: boolean;
}

export const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(function ContextMenuItem(
  { className, inset = false, intent = "default", ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn("pds-menu-item", className)}
      data-inset={inset || undefined}
      data-intent={intent}
      data-slot="context-menu-item"
      {...props}
    />
  );
});

export interface ContextMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> {
  intent?: MenuItemIntent;
}

export const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(function ContextMenuCheckboxItem(
  { children, className, intent = "default", ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn("pds-menu-item", className)}
      data-intent={intent}
      data-slot="context-menu-checkbox-item"
      {...props}
    >
      <span className="pds-menu-item-indicator" data-slot="context-menu-item-indicator">
        <ContextMenuPrimitive.ItemIndicator>
          <span aria-hidden="true" className="pds-menu-check" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});

export interface ContextMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> {
  intent?: MenuItemIntent;
}

export const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(function ContextMenuRadioItem(
  { children, className, intent = "default", ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn("pds-menu-item", className)}
      data-intent={intent}
      data-slot="context-menu-radio-item"
      {...props}
    >
      <span className="pds-menu-item-indicator" data-slot="context-menu-item-indicator">
        <ContextMenuPrimitive.ItemIndicator>
          <span aria-hidden="true" className="pds-menu-radio-dot" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});

export const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>
>(function ContextMenuLabel({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn("pds-menu-label", className)}
      data-slot="context-menu-label"
      {...props}
    />
  );
});

export const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("pds-menu-separator", className)}
      data-slot="context-menu-separator"
      {...props}
    />
  );
});

export const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>
>(function ContextMenuSubTrigger({ children, className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn("pds-menu-item", "pds-menu-sub-trigger", className)}
      data-slot="context-menu-sub-trigger"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="pds-menu-sub-chevron" />
    </ContextMenuPrimitive.SubTrigger>
  );
});

export const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(function ContextMenuSubContent(
  { className, collisionPadding = 16, sideOffset = 8, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        ref={ref}
        className={cn("pds-menu-content", className)}
        collisionPadding={collisionPadding}
        data-slot="context-menu-sub-content"
        sideOffset={sideOffset}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
});
