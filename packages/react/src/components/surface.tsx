"use client";

import * as React from "react";

import { cn } from "../utilities";

export type SurfaceLevel = "base" | "nested" | "elevated";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: SurfaceLevel;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface({ className, level = "base", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-surface", className)}
        data-level={level}
        data-slot="surface"
        {...props}
      />
    );
  }
);

export const SurfaceHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-surface-header", className)}
      data-slot="surface-header"
      {...props}
    />
  );
});

export const SurfaceTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-surface-title", className)}
      data-slot="surface-title"
      {...props}
    />
  );
});

export const SurfaceDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-surface-description", className)}
      data-slot="surface-description"
      {...props}
    />
  );
});

export const SurfaceAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceAction({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-surface-action", className)}
      data-slot="surface-action"
      {...props}
    />
  );
});

export const SurfaceContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-surface-content", className)}
      data-slot="surface-content"
      {...props}
    />
  );
});

export const SurfaceFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-surface-footer", className)}
      data-slot="surface-footer"
      {...props}
    />
  );
});
