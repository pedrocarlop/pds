"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(function Avatar({ className, size = "md", ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("pds-avatar", className)}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
});

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("pds-avatar-image", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
});

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn("pds-avatar-fallback", className)}
      data-slot="avatar-fallback"
      {...props}
    />
  );
});

export const AvatarBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function AvatarBadge({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-avatar-badge", className)}
      data-slot="avatar-badge"
      {...props}
    />
  );
});

export const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function AvatarGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-avatar-group", className)}
      data-slot="avatar-group"
      {...props}
    />
  );
});

export const AvatarGroupCount = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function AvatarGroupCount({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-avatar-group-count", className)}
      data-slot="avatar-group-count"
      {...props}
    />
  );
});
