"use client";

import * as React from "react";

import { cn } from "../utilities";

export type TableDensity = "default" | "compact";

export type TableContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  TableContainerProps
>(function TableContainer({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-table-container", className)}
      data-slot="table-container"
      {...props}
    />
  );
});

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  function Table({ className, density = "default", ...props }, ref) {
    return (
      <table
        ref={ref}
        className={cn("pds-table", className)}
        data-density={density}
        data-slot="table"
        {...props}
      />
    );
  }
);

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader({ className, ...props }, ref) {
  return (
    <thead
      ref={ref}
      className={cn("pds-table-header", className)}
      data-slot="table-header"
      {...props}
    />
  );
});

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...props }, ref) {
  return (
    <tbody
      ref={ref}
      className={cn("pds-table-body", className)}
      data-slot="table-body"
      {...props}
    />
  );
});

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn("pds-table-footer", className)}
      data-slot="table-footer"
      {...props}
    />
  );
});

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn("pds-table-row", className)}
      data-slot="table-row"
      {...props}
    />
  );
});

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(function TableHead({ className, scope = "col", ...props }, ref) {
  return (
    <th
      ref={ref}
      className={cn("pds-table-head", className)}
      data-slot="table-head"
      scope={scope}
      {...props}
    />
  );
});

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(function TableCell({ className, ...props }, ref) {
  return (
    <td
      ref={ref}
      className={cn("pds-table-cell", className)}
      data-slot="table-cell"
      {...props}
    />
  );
});

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      className={cn("pds-table-caption", className)}
      data-slot="table-caption"
      {...props}
    />
  );
});
