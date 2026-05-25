"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";
import { Icon } from "./icon";

export type BreadcrumbProps = React.HTMLAttributes<HTMLElement>;

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { "aria-label": ariaLabel = "Breadcrumb", className, ...props },
    ref
  ) {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn("pds-breadcrumb", className)}
        data-slot="breadcrumb"
        {...props}
      />
    );
  }
);

export type BreadcrumbListProps =
  React.OlHTMLAttributes<HTMLOListElement>;

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  BreadcrumbListProps
>(function BreadcrumbList({ className, ...props }, ref) {
  return (
    <ol
      ref={ref}
      className={cn("pds-breadcrumb-list", className)}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
});

export type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(function BreadcrumbItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={cn("pds-breadcrumb-item", className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
});

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(function BreadcrumbLink({ asChild = false, className, ...props }, ref) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      ref={ref}
      className={cn("pds-breadcrumb-link", className)}
      data-slot="breadcrumb-link"
      {...props}
    />
  );
});

export type BreadcrumbPageProps =
  React.HTMLAttributes<HTMLSpanElement>;

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbPageProps
>(function BreadcrumbPage({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn("pds-breadcrumb-page", className)}
      data-slot="breadcrumb-page"
      {...props}
    />
  );
});

export type BreadcrumbSeparatorProps =
  React.LiHTMLAttributes<HTMLLIElement>;

export const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator({ children, className, ...props }, ref) {
  return (
    <li
      ref={ref}
      aria-hidden="true"
      className={cn("pds-breadcrumb-separator", className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <Icon className="pds-breadcrumb-separator-icon" name="chevron_right" />}
    </li>
  );
});

export type BreadcrumbEllipsisProps =
  React.HTMLAttributes<HTMLSpanElement>;

export const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis(
  { "aria-label": ariaLabel = "More pages", className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      aria-label={ariaLabel}
      className={cn("pds-breadcrumb-ellipsis", className)}
      data-slot="breadcrumb-ellipsis"
      role="img"
      {...props}
    >
      <Icon name="more_horiz" />
    </span>
  );
});
