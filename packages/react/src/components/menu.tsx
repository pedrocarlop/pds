"use client";

import * as React from "react";
import { DropdownMenu as MenuPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type MenuItemIntent = "default" | "danger";

export const Menu = MenuPrimitive.Root;
export const MenuGroup = MenuPrimitive.Group;
export const MenuPortal = MenuPrimitive.Portal;
export const MenuRadioGroup = MenuPrimitive.RadioGroup;
export const MenuSub = MenuPrimitive.Sub;

export const MenuTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>
>(function MenuTrigger(props, ref) {
  return <MenuPrimitive.Trigger ref={ref} data-slot="menu-trigger" {...props} />;
});

export type MenuContentProps = React.ComponentPropsWithoutRef<
  typeof MenuPrimitive.Content
>;

export const MenuContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  MenuContentProps
>(function MenuContent(
  { className, sideOffset = 8, collisionPadding = 16, ...props },
  ref
) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        ref={ref}
        className={cn("pds-menu-content", className)}
        collisionPadding={collisionPadding}
        data-slot="menu-content"
        sideOffset={sideOffset}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
});

export interface MenuItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> {
  intent?: MenuItemIntent;
  inset?: boolean;
}

export const MenuItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Item>,
  MenuItemProps
>(function MenuItem(
  { className, inset = false, intent = "default", ...props },
  ref
) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      className={cn("pds-menu-item", className)}
      data-inset={inset || undefined}
      data-intent={intent}
      data-slot="menu-item"
      {...props}
    />
  );
});

export interface MenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem> {
  intent?: MenuItemIntent;
}

export const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  MenuCheckboxItemProps
>(function MenuCheckboxItem(
  { children, className, intent = "default", ...props },
  ref
) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      className={cn("pds-menu-item", className)}
      data-intent={intent}
      data-slot="menu-checkbox-item"
      {...props}
    >
      <span className="pds-menu-item-indicator" data-slot="menu-item-indicator">
        <MenuPrimitive.ItemIndicator>
          <span aria-hidden="true" className="pds-menu-check" />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
});

export interface MenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem> {
  intent?: MenuItemIntent;
}

export const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  MenuRadioItemProps
>(function MenuRadioItem(
  { children, className, intent = "default", ...props },
  ref
) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={cn("pds-menu-item", className)}
      data-intent={intent}
      data-slot="menu-radio-item"
      {...props}
    >
      <span className="pds-menu-item-indicator" data-slot="menu-item-indicator">
        <MenuPrimitive.ItemIndicator>
          <span aria-hidden="true" className="pds-menu-radio-dot" />
        </MenuPrimitive.ItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
});

export const MenuLabel = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label>
>(function MenuLabel({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Label
      ref={ref}
      className={cn("pds-menu-label", className)}
      data-slot="menu-label"
      {...props}
    />
  );
});

export const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(function MenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={cn("pds-menu-separator", className)}
      data-slot="menu-separator"
      {...props}
    />
  );
});

export const MenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function MenuShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-menu-shortcut", className)}
      data-slot="menu-shortcut"
      {...props}
    />
  );
});

export const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger>
>(function MenuSubTrigger({ children, className, ...props }, ref) {
  return (
    <MenuPrimitive.SubTrigger
      ref={ref}
      className={cn("pds-menu-item", "pds-menu-sub-trigger", className)}
      data-slot="menu-sub-trigger"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="pds-menu-sub-chevron" />
    </MenuPrimitive.SubTrigger>
  );
});

export const MenuSubContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>
>(function MenuSubContent(
  { className, collisionPadding = 16, sideOffset = 8, ...props },
  ref
) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.SubContent
        ref={ref}
        className={cn("pds-menu-content", className)}
        collisionPadding={collisionPadding}
        data-slot="menu-sub-content"
        sideOffset={sideOffset}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
});
