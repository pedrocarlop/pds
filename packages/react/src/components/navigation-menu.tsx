"use client";

import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";

import { cn } from "../utilities";

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(function NavigationMenu({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn("pds-navigation-menu", className)}
      data-slot="navigation-menu"
      {...props}
    />
  );
});

export const NavigationMenuSub = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Sub>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Sub>
>(function NavigationMenuSub({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Sub
      ref={ref}
      className={cn("pds-navigation-menu-sub", className)}
      data-slot="navigation-menu-sub"
      {...props}
    />
  );
});

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
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

export const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
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

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(function NavigationMenuTrigger({ children, className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn("pds-navigation-menu-trigger", className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="pds-navigation-menu-chevron" />
    </NavigationMenuPrimitive.Trigger>
  );
});

export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
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

export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(function NavigationMenuIndicator({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn("pds-navigation-menu-indicator", className)}
      data-slot="navigation-menu-indicator"
      {...props}
    />
  );
});

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
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

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(function NavigationMenuViewport({ className, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn("pds-navigation-menu-viewport", className)}
      data-slot="navigation-menu-viewport"
      {...props}
    />
  );
});
