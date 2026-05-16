"use client";

import * as React from "react";

import { cn } from "../utilities";
import type { TableDensity } from "./table";

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  density?: TableDensity;
}

export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  function DataList({ className, density = "default", ...props }, ref) {
    return (
      <dl
        ref={ref}
        className={cn("pds-data-list", className)}
        data-density={density}
        data-slot="data-list"
        {...props}
      />
    );
  }
);

export const DataListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DataListItem({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-data-list-item", className)}
      data-slot="data-list-item"
      {...props}
    />
  );
});

export const DataListTerm = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function DataListTerm({ className, ...props }, ref) {
  return (
    <dt
      ref={ref}
      className={cn("pds-data-list-term", className)}
      data-slot="data-list-term"
      {...props}
    />
  );
});

export const DataListDescription = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function DataListDescription({ className, ...props }, ref) {
  return (
    <dd
      ref={ref}
      className={cn("pds-data-list-description", className)}
      data-slot="data-list-description"
      {...props}
    />
  );
});
