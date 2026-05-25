"use client";

import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";

import { cn } from "../utilities";
import { Icon } from "./icon";

export interface NavigationMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  viewport?: boolean;
}

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(function NavigationMenu(
  { children, className, viewport = true, ...props },
  ref
) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn("pds-navigation-menu", className)}
      data-slot="navigation-menu"
      data-viewport={viewport}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
});

export type NavigationMenuListProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.List
>;

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(function NavigationMenuList({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn("pds-navigation-menu-list", className)}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
});

export type NavigationMenuItemProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Item
>;

export const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  NavigationMenuItemProps
>(function NavigationMenuItem({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Item
      ref={ref}
      className={cn("pds-navigation-menu-item", className)}
      data-slot="navigation-menu-item"
      {...props}
    />
  );
});

export function navigationMenuTriggerStyle(className?: string) {
  return cn("pds-navigation-menu-trigger", className);
}

export type NavigationMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Trigger
>;

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(function NavigationMenuTrigger({ children, className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={navigationMenuTriggerStyle(className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <Icon
        className="pds-navigation-menu-trigger-icon"
        name="keyboard_arrow_down"
      />
    </NavigationMenuPrimitive.Trigger>
  );
});

export type NavigationMenuContentProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Content
>;

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(function NavigationMenuContent({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn("pds-navigation-menu-content", className)}
      data-slot="navigation-menu-content"
      {...props}
    />
  );
});

export type NavigationMenuViewportProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
>;

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(function NavigationMenuViewport({ className, ...props }, ref) {
  return (
    <div
      className="pds-navigation-menu-viewport-positioner"
      data-slot="navigation-menu-viewport-positioner"
    >
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn("pds-navigation-menu-viewport", className)}
        data-slot="navigation-menu-viewport"
        {...props}
      />
    </div>
  );
});

export type NavigationMenuLinkProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Link
>;

export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(function NavigationMenuLink({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn("pds-navigation-menu-link", className)}
      data-slot="navigation-menu-link"
      {...props}
    />
  );
});

export type NavigationMenuIndicatorProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
>;

export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(function NavigationMenuIndicator({ children, className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn("pds-navigation-menu-indicator", className)}
      data-slot="navigation-menu-indicator"
      {...props}
    >
      {children ?? (
        <span
          aria-hidden="true"
          className="pds-navigation-menu-indicator-arrow"
        />
      )}
    </NavigationMenuPrimitive.Indicator>
  );
});
