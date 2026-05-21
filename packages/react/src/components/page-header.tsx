"use client";

import * as React from "react";

import { cn } from "../utilities";

export const PageHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function PageHeader({ className, ...props }, ref) {
  return (
    <header
      ref={ref}
      className={cn("pds-page-header", className)}
      data-slot="page-header"
      {...props}
    />
  );
});

export const PageHeaderBreadcrumbs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function PageHeaderBreadcrumbs({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-page-header-breadcrumbs", className)}
      data-slot="page-header-breadcrumbs"
      {...props}
    />
  );
});

export const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function PageHeaderContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-page-header-content", className)}
      data-slot="page-header-content"
      {...props}
    />
  );
});

export const PageHeaderText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function PageHeaderText({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-page-header-text", className)}
      data-slot="page-header-text"
      {...props}
    />
  );
});

export const PageHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function PageHeaderTitle({ className, ...props }, ref) {
  return (
    <h1
      ref={ref}
      className={cn("pds-page-header-title", className)}
      data-slot="page-header-title"
      {...props}
    />
  );
});

export const PageHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function PageHeaderDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("pds-page-header-description", className)}
      data-slot="page-header-description"
      {...props}
    />
  );
});

export const PageHeaderMeta = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function PageHeaderMeta({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-page-header-meta", className)}
      data-slot="page-header-meta"
      {...props}
    />
  );
});

export const PageHeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function PageHeaderActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-page-header-actions", className)}
      data-slot="page-header-actions"
      {...props}
    />
  );
});
