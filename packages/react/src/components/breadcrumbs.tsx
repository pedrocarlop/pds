"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";

export const Breadcrumbs = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function Breadcrumbs({ "aria-label": ariaLabel = "Breadcrumb", className, ...props }, ref) {
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("pds-breadcrumbs", className)}
      data-slot="breadcrumbs"
      {...props}
    />
  );
});

export const BreadcrumbsList = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(function BreadcrumbsList({ className, ...props }, ref) {
  return (
    <ol
      ref={ref}
      className={cn("pds-breadcrumbs-list", className)}
      data-slot="breadcrumbs-list"
      {...props}
    />
  );
});

export const BreadcrumbsItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function BreadcrumbsItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={cn("pds-breadcrumbs-item", className)}
      data-slot="breadcrumbs-item"
      {...props}
    />
  );
});

export interface BreadcrumbsLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export const BreadcrumbsLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbsLinkProps
>(function BreadcrumbsLink({ asChild = false, className, ...props }, ref) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      ref={ref}
      className={cn("pds-breadcrumbs-link", className)}
      data-slot="breadcrumbs-link"
      {...props}
    />
  );
});

export const BreadcrumbsPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function BreadcrumbsPage({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn("pds-breadcrumbs-page", className)}
      data-slot="breadcrumbs-page"
      {...props}
    />
  );
});

export const BreadcrumbsSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function BreadcrumbsSeparator({ children, className, ...props }, ref) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("pds-breadcrumbs-separator", className)}
      data-slot="breadcrumbs-separator"
      {...props}
    >
      {children ?? "/"}
    </span>
  );
});

export const BreadcrumbsEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function BreadcrumbsEllipsis(
  { "aria-label": ariaLabel = "More pages", className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      aria-label={ariaLabel}
      className={cn("pds-breadcrumbs-ellipsis", className)}
      data-slot="breadcrumbs-ellipsis"
      role="img"
      {...props}
    >
      ...
    </span>
  );
});
