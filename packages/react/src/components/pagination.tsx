"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";

export const Pagination = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function Pagination({ "aria-label": ariaLabel = "Pagination", className, ...props }, ref) {
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("pds-pagination", className)}
      data-slot="pagination"
      {...props}
    />
  );
});

export const PaginationList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(function PaginationList({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      className={cn("pds-pagination-list", className)}
      data-slot="pagination-list"
      {...props}
    />
  );
});

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function PaginationItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={cn("pds-pagination-item", className)}
      data-slot="pagination-item"
      {...props}
    />
  );
});

export interface PaginationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  isCurrent?: boolean;
}

export const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(function PaginationLink(
  { asChild = false, className, isCurrent = false, ...props },
  ref
) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      ref={ref}
      aria-current={isCurrent ? "page" : props["aria-current"]}
      className={cn("pds-pagination-link", className)}
      data-current={isCurrent || undefined}
      data-slot="pagination-link"
      {...props}
    />
  );
});

export const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(function PaginationPrevious({ children = "Previous", className, ...props }, ref) {
  return (
    <PaginationLink
      ref={ref}
      className={cn("pds-pagination-previous", className)}
      data-slot="pagination-previous"
      {...props}
    >
      <span aria-hidden="true" className="pds-pagination-chevron" data-direction="previous" />
      {children}
    </PaginationLink>
  );
});

export const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(function PaginationNext({ children = "Next", className, ...props }, ref) {
  return (
    <PaginationLink
      ref={ref}
      className={cn("pds-pagination-next", className)}
      data-slot="pagination-next"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="pds-pagination-chevron" />
    </PaginationLink>
  );
});

export const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function PaginationEllipsis(
  { "aria-label": ariaLabel = "More pages", className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      aria-label={ariaLabel}
      className={cn("pds-pagination-ellipsis", className)}
      data-slot="pagination-ellipsis"
      role="img"
      {...props}
    >
      ...
    </span>
  );
});
