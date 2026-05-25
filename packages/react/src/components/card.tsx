"use client";

import * as React from "react";

import { cn } from "../utilities";

export type CardSize = "default" | "sm";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLDivElement>;
export type CardDescriptionProps = React.HTMLAttributes<HTMLDivElement>;
export type CardActionProps = React.HTMLAttributes<HTMLDivElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, size = "default", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("pds-card", className)}
      data-size={size}
      data-slot="card"
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-card-header", className)}
        data-slot="card-header"
        {...props}
      />
    );
  }
);

export const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-card-title", className)}
        data-slot="card-title"
        {...props}
      />
    );
  }
);

export const CardDescription = React.forwardRef<
  HTMLDivElement,
  CardDescriptionProps
>(function CardDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-card-description", className)}
      data-slot="card-description"
      {...props}
    />
  );
});

export const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  function CardAction({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-card-action", className)}
        data-slot="card-action"
        {...props}
      />
    );
  }
);

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-card-content", className)}
        data-slot="card-content"
        {...props}
      />
    );
  }
);

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-card-footer", className)}
        data-slot="card-footer"
        {...props}
      />
    );
  }
);
