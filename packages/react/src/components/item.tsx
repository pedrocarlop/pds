"use client";

import * as React from "react";

import { cn } from "../utilities";
import { AmountInput, AmountInputType, type AmountInputProps } from "./amount";
import { Cell, type CellProps } from "./cell";
import { Icon } from "./icon";
import { Skeleton, type SkeletonProps } from "./skeleton";

export type ItemVariant = "default" | "disclosure" | "accent" | "nested";
export type ItemIconTone =
  | "accent"
  | "danger"
  | "default"
  | "inactive"
  | "muted"
  | "success"
  | "warning";
export type ItemValueVariant = "primary" | "secondary";
export type ItemValueTone =
  | "accent"
  | "danger"
  | "default"
  | "muted"
  | "success"
  | "warning";
export type ItemInputType = "money" | "money-fractional" | "text";
export type ItemIconSource =
  | React.ComponentType
  | React.ReactElement
  | string;

export interface ItemProps extends Omit<CellProps, "variant"> {
  iconTone?: ItemIconTone;
  pending?: boolean;
  useIcon?: ItemIconSource;
  variant?: ItemVariant;
}

export type ItemSlotProps = React.HTMLAttributes<HTMLDivElement>;

export interface ItemValueProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: ItemValueTone;
  variant?: ItemValueVariant;
}

export interface ItemInputProps
  extends Omit<
    AmountInputProps,
    "className" | "description" | "errorMessage" | "type"
  > {
  className?: string;
  controlClassName?: string;
  type?: ItemInputType;
}

export type ItemSkeletonProps = Omit<
  ItemProps,
  "disabled" | "inactive" | "pending"
>;

export type ItemSkeletonSlotProps = SkeletonProps;
export type ItemSkeletonContainerProps = React.HTMLAttributes<HTMLDivElement>;

type ItemCompoundComponent = React.ForwardRefExoticComponent<
  ItemProps & React.RefAttributes<HTMLElement>
> & {
  Actions: typeof ItemActions;
  Avatar: typeof ItemAvatar;
  Content: typeof ItemContent;
  Description: typeof ItemDescription;
  Input: typeof ItemInput;
  Prefix: typeof ItemPrefix;
  Side: typeof ItemSide;
  Title: typeof ItemTitle;
  Value: typeof ItemValue;
};

type ItemSkeletonCompoundComponent = React.ForwardRefExoticComponent<
  ItemSkeletonProps & React.RefAttributes<HTMLElement>
> & {
  Actions: typeof ItemSkeletonActions;
  Avatar: typeof ItemSkeletonAvatar;
  Content: typeof ItemSkeletonContent;
  Description: typeof ItemSkeletonDescription;
  Prefix: typeof ItemSkeletonPrefix;
  Side: typeof ItemSkeletonSide;
  Title: typeof ItemSkeletonTitle;
  Value: typeof ItemSkeletonValue;
};

const itemInputTypeMap: Record<ItemInputType, AmountInputType> = {
  money: AmountInputType.MONEY,
  "money-fractional": AmountInputType.MONEY_FRACTIONAL,
  text: AmountInputType.TEXT
};

function renderItemIcon(useIcon: ItemIconSource) {
  if (typeof useIcon === "string") {
    return <Icon name={useIcon} />;
  }

  if (React.isValidElement(useIcon)) {
    return useIcon;
  }

  const IconComponent = useIcon;

  return <IconComponent />;
}

const ItemRoot = React.forwardRef<HTMLElement, ItemProps>(function Item(
  {
    "aria-busy": ariaBusy,
    children,
    className,
    disabled = false,
    iconTone = "muted",
    pending = false,
    useIcon,
    variant = "default",
    ...props
  },
  ref
) {
  const disabledState = disabled || pending;

  return (
    <Cell
      ref={ref}
      aria-busy={ariaBusy ?? (pending ? true : undefined)}
      className={cn("pds-item", className)}
      data-pending={pending || undefined}
      data-slot="item"
      disabled={disabledState}
      variant={variant}
      {...props}
    >
      {useIcon ? (
        <span className="pds-item-icon" data-slot="item-icon" data-tone={iconTone}>
          {renderItemIcon(useIcon)}
        </span>
      ) : null}
      {children}
    </Cell>
  );
});

export const ItemPrefix = React.forwardRef<HTMLDivElement, ItemSlotProps>(
  function ItemPrefix({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-prefix", className)}
        data-slot="item-prefix"
        {...props}
      />
    );
  }
);

export const ItemAvatar = React.forwardRef<HTMLDivElement, ItemSlotProps>(
  function ItemAvatar({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-avatar", className)}
        data-slot="item-avatar"
        {...props}
      />
    );
  }
);

export const ItemContent = React.forwardRef<HTMLDivElement, ItemSlotProps>(
  function ItemContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-content", className)}
        data-slot="item-content"
        {...props}
      />
    );
  }
);

export const ItemTitle = React.forwardRef<HTMLDivElement, ItemSlotProps>(
  function ItemTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-title", className)}
        data-slot="item-title"
        {...props}
      />
    );
  }
);

export const ItemDescription = React.forwardRef<HTMLDivElement, ItemSlotProps>(
  function ItemDescription({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-description", className)}
        data-slot="item-description"
        {...props}
      />
    );
  }
);

export const ItemActions = React.forwardRef<HTMLDivElement, ItemSlotProps>(
  function ItemActions({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-actions", className)}
        data-slot="item-actions"
        {...props}
      />
    );
  }
);

export const ItemSide = React.forwardRef<HTMLDivElement, ItemSlotProps>(
  function ItemSide({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-side", className)}
        data-slot="item-side"
        {...props}
      />
    );
  }
);

export const ItemValue = React.forwardRef<HTMLDivElement, ItemValueProps>(
  function ItemValue(
    { className, tone = "default", variant = "primary", ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn("pds-item-value", className)}
        data-slot="item-value"
        data-tone={tone}
        data-variant={variant}
        {...props}
      />
    );
  }
);

export const ItemInput = React.forwardRef<HTMLInputElement, ItemInputProps>(
  function ItemInput(
    {
      className,
      controlClassName,
      density = "compact",
      type = "text",
      ...props
    },
    ref
  ) {
    return (
      <div className={cn("pds-item-input", className)} data-slot="item-input">
        <AmountInput
          ref={ref}
          className={cn("pds-item-input-control", controlClassName)}
          density={density}
          type={itemInputTypeMap[type]}
          {...props}
        />
      </div>
    );
  }
);

export const ItemSkeletonPrefix = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonSlotProps
>(function ItemSkeletonPrefix({ className, shape = "circle", ...props }, ref) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-item-skeleton-prefix", className)}
      data-slot="item-skeleton-prefix"
      shape={shape}
      {...props}
    />
  );
});

export const ItemSkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonSlotProps
>(function ItemSkeletonAvatar({ className, shape = "circle", ...props }, ref) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-item-skeleton-avatar", className)}
      data-slot="item-skeleton-avatar"
      shape={shape}
      {...props}
    />
  );
});

export const ItemSkeletonContent = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonContainerProps
>(function ItemSkeletonContent({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-item-content", "pds-item-skeleton-content", className)}
      data-slot="item-skeleton-content"
      {...props}
    >
      {children ?? (
        <>
          <ItemSkeletonTitle />
          <ItemSkeletonDescription />
        </>
      )}
    </div>
  );
});

export const ItemSkeletonTitle = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonSlotProps
>(function ItemSkeletonTitle({ className, shape = "text", ...props }, ref) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-item-skeleton-title", className)}
      data-slot="item-skeleton-title"
      shape={shape}
      {...props}
    />
  );
});

export const ItemSkeletonDescription = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonSlotProps
>(function ItemSkeletonDescription(
  { className, shape = "text", ...props },
  ref
) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-item-skeleton-description", className)}
      data-slot="item-skeleton-description"
      shape={shape}
      {...props}
    />
  );
});

export const ItemSkeletonActions = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonContainerProps
>(function ItemSkeletonActions({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-item-actions", "pds-item-skeleton-actions", className)}
      data-slot="item-skeleton-actions"
      {...props}
    >
      {children ?? (
        <>
          <Skeleton
            className="pds-item-skeleton-action"
            data-slot="item-skeleton-action"
            shape="text"
          />
          <Skeleton
            className="pds-item-skeleton-action"
            data-slot="item-skeleton-action"
            shape="text"
          />
        </>
      )}
    </div>
  );
});

export const ItemSkeletonSide = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonContainerProps
>(function ItemSkeletonSide({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-item-side", "pds-item-skeleton-side", className)}
      data-slot="item-skeleton-side"
      {...props}
    >
      {children ?? <ItemSkeletonValue />}
    </div>
  );
});

export const ItemSkeletonValue = React.forwardRef<
  HTMLDivElement,
  ItemSkeletonSlotProps
>(function ItemSkeletonValue({ className, shape = "text", ...props }, ref) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-item-skeleton-value", className)}
      data-slot="item-skeleton-value"
      shape={shape}
      {...props}
    />
  );
});

function DefaultItemSkeletonSlots({ hasIcon }: { hasIcon: boolean }) {
  return (
    <>
      {hasIcon ? null : <ItemSkeletonAvatar />}
      <ItemSkeletonContent>
        <ItemSkeletonTitle />
        <ItemSkeletonDescription />
      </ItemSkeletonContent>
      <ItemSkeletonSide>
        <ItemSkeletonValue />
      </ItemSkeletonSide>
    </>
  );
}

const ItemSkeletonRoot = React.forwardRef<HTMLElement, ItemSkeletonProps>(
  function ItemSkeleton(
    { "aria-hidden": ariaHidden, children, className, useIcon, ...props },
    ref
  ) {
    return (
      <ItemRoot
        ref={ref}
        aria-hidden={ariaHidden ?? true}
        className={cn("pds-item-skeleton", className)}
        data-slot="item-skeleton"
        useIcon={useIcon}
        {...props}
      >
        {children ?? <DefaultItemSkeletonSlots hasIcon={useIcon !== undefined} />}
      </ItemRoot>
    );
  }
);

export const Item = Object.assign(ItemRoot, {
  Actions: ItemActions,
  Avatar: ItemAvatar,
  Content: ItemContent,
  Description: ItemDescription,
  Input: ItemInput,
  Prefix: ItemPrefix,
  Side: ItemSide,
  Title: ItemTitle,
  Value: ItemValue
}) as ItemCompoundComponent;

export const ItemSkeleton = Object.assign(ItemSkeletonRoot, {
  Actions: ItemSkeletonActions,
  Avatar: ItemSkeletonAvatar,
  Content: ItemSkeletonContent,
  Description: ItemSkeletonDescription,
  Prefix: ItemSkeletonPrefix,
  Side: ItemSkeletonSide,
  Title: ItemSkeletonTitle,
  Value: ItemSkeletonValue
}) as ItemSkeletonCompoundComponent;
