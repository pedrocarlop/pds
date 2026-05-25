"use client";

import * as React from "react";

import { cn } from "../utilities";

export type EmptyMediaVariant = "default" | "icon";

export type EmptyProps = React.ComponentPropsWithoutRef<"div">;
export type EmptyHeaderProps = React.ComponentPropsWithoutRef<"div">;
export type EmptyTitleProps = React.ComponentPropsWithoutRef<"div">;
export type EmptyDescriptionProps = React.ComponentPropsWithoutRef<"p">;
export type EmptyContentProps = React.ComponentPropsWithoutRef<"div">;

export interface EmptyMediaProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: EmptyMediaVariant;
}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  function Empty({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-empty", className)}
        data-slot="empty"
        {...props}
      />
    );
  }
);

export const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  EmptyHeaderProps
>(function EmptyHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-empty-header", className)}
      data-slot="empty-header"
      {...props}
    />
  );
});

export const EmptyMedia = React.forwardRef<HTMLDivElement, EmptyMediaProps>(
  function EmptyMedia({ className, variant = "default", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-empty-media", className)}
        data-slot="empty-media"
        data-variant={variant}
        {...props}
      />
    );
  }
);

export const EmptyTitle = React.forwardRef<HTMLDivElement, EmptyTitleProps>(
  function EmptyTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-empty-title", className)}
        data-slot="empty-title"
        {...props}
      />
    );
  }
);

export const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  EmptyDescriptionProps
>(function EmptyDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("pds-empty-description", className)}
      data-slot="empty-description"
      {...props}
    />
  );
});

export const EmptyContent = React.forwardRef<
  HTMLDivElement,
  EmptyContentProps
>(function EmptyContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-empty-content", className)}
      data-slot="empty-content"
      {...props}
    />
  );
});
