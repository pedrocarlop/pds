"use client";

import * as React from "react";

import { cn } from "../utilities";
import { Skeleton, type SkeletonProps } from "./skeleton";

export type DetailsVariant = "default" | "compact" | "header";

export interface DetailsProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  indent?: number;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  use?: React.ElementType;
  variant?: DetailsVariant;
}

export type DetailsSlotProps = React.HTMLAttributes<HTMLDivElement>;
export type DetailsCellProps = DetailsProps;
export type DetailsSkeletonProps = DetailsProps;
export type DetailsCellSkeletonProps = DetailsProps;
export type DetailsSkeletonSlotProps = SkeletonProps;

type DetailsCompoundComponent = React.ForwardRefExoticComponent<
  DetailsProps & React.RefAttributes<HTMLElement>
> & {
  Content: typeof DetailsContent;
  Note: typeof DetailsNote;
  Title: typeof DetailsTitle;
};

type DetailsCellCompoundComponent = React.ForwardRefExoticComponent<
  DetailsProps & React.RefAttributes<HTMLElement>
> & {
  Content: typeof DetailsContent;
  Note: typeof DetailsNote;
  Title: typeof DetailsTitle;
};

type DetailsSkeletonCompoundComponent = React.ForwardRefExoticComponent<
  DetailsProps & React.RefAttributes<HTMLElement>
> & {
  Content: typeof DetailsSkeletonContent;
  Note: typeof DetailsSkeletonNote;
  Title: typeof DetailsSkeletonTitle;
};

function getDetailsStyle(indent: number | undefined, style: React.CSSProperties | undefined) {
  if (indent === undefined) {
    return style;
  }

  return {
    "--pds-details-indent": indent,
    ...style
  } as React.CSSProperties;
}

function getAriaDisabled(
  ariaDisabled: React.AriaAttributes["aria-disabled"],
  disabled: boolean,
  isButton: boolean
) {
  return ariaDisabled ?? (!isButton && disabled ? true : undefined);
}

const DetailsRoot = React.forwardRef<HTMLElement, DetailsProps>(
  function Details(
    {
      "aria-disabled": ariaDisabled,
      className,
      disabled = false,
      indent,
      style,
      type = "button",
      use: Comp = "div",
      variant = "default",
      ...props
    },
    ref
  ) {
    const isButton = Comp === "button";

    return (
      <Comp
        ref={ref}
        aria-disabled={getAriaDisabled(ariaDisabled, disabled, isButton)}
        className={cn("pds-details", className)}
        data-disabled={disabled || undefined}
        data-slot="details"
        data-variant={variant}
        disabled={isButton ? disabled : undefined}
        style={getDetailsStyle(indent, style)}
        type={isButton ? type : undefined}
        {...props}
      />
    );
  }
);

export const DetailsTitle = React.forwardRef<HTMLDivElement, DetailsSlotProps>(
  function DetailsTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-details-title", className)}
        data-slot="details-title"
        {...props}
      />
    );
  }
);

export const DetailsContent = React.forwardRef<HTMLDivElement, DetailsSlotProps>(
  function DetailsContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-details-content", className)}
        data-slot="details-content"
        {...props}
      />
    );
  }
);

export const DetailsNote = React.forwardRef<HTMLDivElement, DetailsSlotProps>(
  function DetailsNote({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-details-note", className)}
        data-slot="details-note"
        {...props}
      />
    );
  }
);

const DetailsCellRoot = React.forwardRef<HTMLElement, DetailsProps>(
  function DetailsCell({ className, ...props }, ref) {
    return (
      <DetailsRoot
        ref={ref}
        className={cn("pds-details-cell", className)}
        data-slot="details-cell"
        {...props}
      />
    );
  }
);

export const DetailsSkeletonTitle = React.forwardRef<
  HTMLDivElement,
  DetailsSkeletonSlotProps
>(function DetailsSkeletonTitle({ className, shape = "text", ...props }, ref) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-details-skeleton-title", className)}
      data-slot="details-skeleton-title"
      shape={shape}
      {...props}
    />
  );
});

export const DetailsSkeletonContent = React.forwardRef<
  HTMLDivElement,
  DetailsSkeletonSlotProps
>(function DetailsSkeletonContent({ className, shape = "text", ...props }, ref) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-details-skeleton-content", className)}
      data-slot="details-skeleton-content"
      shape={shape}
      {...props}
    />
  );
});

export const DetailsSkeletonNote = React.forwardRef<
  HTMLDivElement,
  DetailsSkeletonSlotProps
>(function DetailsSkeletonNote({ className, shape = "text", ...props }, ref) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-details-skeleton-note", className)}
      data-slot="details-skeleton-note"
      shape={shape}
      {...props}
    />
  );
});

function DefaultDetailsSkeletonSlots() {
  return (
    <>
      <DetailsSkeletonTitle />
      <DetailsSkeletonContent />
    </>
  );
}

const DetailsSkeletonRoot = React.forwardRef<HTMLElement, DetailsProps>(
  function DetailsSkeleton(
    { "aria-hidden": ariaHidden, children, className, ...props },
    ref
  ) {
    return (
      <DetailsRoot
        ref={ref}
        aria-hidden={ariaHidden ?? true}
        className={cn("pds-details-skeleton", className)}
        data-slot="details-skeleton"
        {...props}
      >
        {children ?? <DefaultDetailsSkeletonSlots />}
      </DetailsRoot>
    );
  }
);

const DetailsCellSkeletonRoot = React.forwardRef<HTMLElement, DetailsProps>(
  function DetailsCellSkeleton(
    { "aria-hidden": ariaHidden, children, className, ...props },
    ref
  ) {
    return (
      <DetailsCellRoot
        ref={ref}
        aria-hidden={ariaHidden ?? true}
        className={cn("pds-details-cell-skeleton", className)}
        data-slot="details-cell-skeleton"
        {...props}
      >
        {children ?? <DefaultDetailsSkeletonSlots />}
      </DetailsCellRoot>
    );
  }
);

export const Details = Object.assign(DetailsRoot, {
  Content: DetailsContent,
  Note: DetailsNote,
  Title: DetailsTitle
}) as DetailsCompoundComponent;

export const DetailsCell = Object.assign(DetailsCellRoot, {
  Content: DetailsContent,
  Note: DetailsNote,
  Title: DetailsTitle
}) as DetailsCellCompoundComponent;

export const DetailsSkeleton = Object.assign(DetailsSkeletonRoot, {
  Content: DetailsSkeletonContent,
  Note: DetailsSkeletonNote,
  Title: DetailsSkeletonTitle
}) as DetailsSkeletonCompoundComponent;

export const DetailsCellSkeleton = Object.assign(DetailsCellSkeletonRoot, {
  Content: DetailsSkeletonContent,
  Note: DetailsSkeletonNote,
  Title: DetailsSkeletonTitle
}) as DetailsSkeletonCompoundComponent;
