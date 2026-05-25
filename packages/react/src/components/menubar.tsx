"use client";

import * as React from "react";
import { Menubar as MenubarPrimitive } from "radix-ui";

import { cn } from "../utilities";
import type { MenuItemIntent } from "./menu";

export const MenubarMenu: typeof MenubarPrimitive.Menu = MenubarPrimitive.Menu;
export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
export const MenubarSub = MenubarPrimitive.Sub;

export const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(function Menubar({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn("pds-menubar", className)}
      data-slot="menubar"
      {...props}
    />
  );
});

export const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(function MenubarTrigger({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn("pds-menubar-trigger", className)}
      data-slot="menubar-trigger"
      {...props}
    />
  );
});

export type MenubarContentProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Content
>;

export const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(function MenubarContent(
  {
    align = "start",
    alignOffset = -4,
    className,
    collisionPadding = 16,
    sideOffset = 8,
    ...props
  },
  ref
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        className={cn("pds-menubar-content", className)}
        collisionPadding={collisionPadding}
        data-slot="menubar-content"
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});

export interface MenubarItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  inset?: boolean;
  intent?: MenuItemIntent;
}

export const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(function MenubarItem(
  { className, inset = false, intent = "default", ...props },
  ref
) {
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn("pds-menubar-item", className)}
      data-inset={inset || undefined}
      data-intent={intent}
      data-slot="menubar-item"
      {...props}
    />
  );
});

export interface MenubarCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> {
  inset?: boolean;
  intent?: MenuItemIntent;
}

export const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(function MenubarCheckboxItem(
  { children, className, inset = false, intent = "default", ...props },
  ref
) {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn("pds-menubar-item", className)}
      data-inset={inset || undefined}
      data-intent={intent}
      data-slot="menubar-checkbox-item"
      {...props}
    >
      <span
        className="pds-menubar-item-indicator"
        data-slot="menubar-item-indicator"
      >
        <MenubarPrimitive.ItemIndicator>
          <span aria-hidden="true" className="pds-menubar-check" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
});

export interface MenubarRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> {
  inset?: boolean;
  intent?: MenuItemIntent;
}

export const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(function MenubarRadioItem(
  { children, className, inset = false, intent = "default", ...props },
  ref
) {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn("pds-menubar-item", className)}
      data-inset={inset || undefined}
      data-intent={intent}
      data-slot="menubar-radio-item"
      {...props}
    >
      <span
        className="pds-menubar-item-indicator"
        data-slot="menubar-item-indicator"
      >
        <MenubarPrimitive.ItemIndicator>
          <span aria-hidden="true" className="pds-menubar-radio-dot" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
});

export const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>
>(function MenubarLabel({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn("pds-menubar-label", className)}
      data-slot="menubar-label"
      {...props}
    />
  );
});

export const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(function MenubarSeparator({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn("pds-menubar-separator", className)}
      data-slot="menubar-separator"
      {...props}
    />
  );
});

export const MenubarShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function MenubarShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-menubar-shortcut", className)}
      data-slot="menubar-shortcut"
      {...props}
    />
  );
});

export const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger>
>(function MenubarSubTrigger({ children, className, ...props }, ref) {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn("pds-menubar-item", "pds-menubar-sub-trigger", className)}
      data-slot="menubar-sub-trigger"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="pds-menubar-sub-chevron" />
    </MenubarPrimitive.SubTrigger>
  );
});

export const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(function MenubarSubContent(
  { className, collisionPadding = 16, sideOffset = 8, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        ref={ref}
        className={cn("pds-menubar-content", className)}
        collisionPadding={collisionPadding}
        data-slot="menubar-sub-content"
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});
