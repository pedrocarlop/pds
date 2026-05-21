"use client";

import * as React from "react";

import { cn } from "../utilities";
import { Icon } from "./icon";
import { Skeleton, type SkeletonProps } from "./skeleton";

export type TravelWidgetVariant = "large" | "small";
export type TravelWidgetImage = string | string[];

export interface TravelWidgetProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  image?: TravelWidgetImage;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  use?: React.ElementType;
  variant?: TravelWidgetVariant;
}

export type TravelWidgetSlotProps = React.HTMLAttributes<HTMLDivElement>;
export type TravelWidgetSkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: TravelWidgetVariant;
};
export type TravelWidgetSkeletonSlotProps = SkeletonProps;
export type TravelWidgetSkeletonContentProps =
  React.HTMLAttributes<HTMLDivElement>;

interface TravelWidgetContextValue {
  titleId: string;
}

type TravelWidgetMarkedComponent = {
  pdsSlot?: string;
};

type TravelWidgetCompoundComponent = React.ForwardRefExoticComponent<
  TravelWidgetProps & React.RefAttributes<HTMLDivElement>
> & {
  Action: typeof TravelWidgetAction;
  Content: typeof TravelWidgetContent;
  Description: typeof TravelWidgetDescription;
  Details: typeof TravelWidgetDetails;
  Title: typeof TravelWidgetTitle;
};

type TravelWidgetSkeletonCompoundComponent = React.ForwardRefExoticComponent<
  TravelWidgetSkeletonProps & React.RefAttributes<HTMLDivElement>
> & {
  Content: typeof TravelWidgetSkeletonContent;
  Description: typeof TravelWidgetSkeletonDescription;
  Details: typeof TravelWidgetSkeletonDetails;
  Title: typeof TravelWidgetSkeletonTitle;
};

const TravelWidgetContext =
  React.createContext<TravelWidgetContextValue | null>(null);

function normalizeImages(image: TravelWidgetImage | undefined) {
  if (image === undefined) {
    return [];
  }

  return Array.isArray(image) ? image.filter(Boolean) : [image];
}

function getBackgroundImageStyle(image: string) {
  return {
    "--pds-travel-widget-image": `url("${image.replaceAll('"', '\\"')}")`
  } as React.CSSProperties;
}

function getAriaDisabled(
  ariaDisabled: React.AriaAttributes["aria-disabled"],
  disabled: boolean,
  isButton: boolean
) {
  return ariaDisabled ?? (!isButton && disabled ? true : undefined);
}

function isTravelWidgetAction(child: React.ReactNode) {
  if (!React.isValidElement(child)) {
    return false;
  }

  return (
    (child.type as TravelWidgetMarkedComponent).pdsSlot ===
    "travel-widget-action"
  );
}

function partitionTravelWidgetChildren(children: React.ReactNode) {
  const actionChildren: React.ReactNode[] = [];
  const bodyChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (isTravelWidgetAction(child)) {
      actionChildren.push(child);
    } else {
      bodyChildren.push(child);
    }
  });

  return { actionChildren, bodyChildren };
}

function TravelWidgetMedia({ images }: { images: string[] }) {
  const [imageIndex, setImageIndex] = React.useState(0);
  const imageCount = images.length;
  const selectedIndex = imageCount > 0 ? imageIndex % imageCount : 0;
  const selectedImage = images[selectedIndex];

  React.useEffect(() => {
    if (imageIndex > 0 && imageIndex >= imageCount) {
      setImageIndex(0);
    }
  }, [imageCount, imageIndex]);

  if (!selectedImage) {
    return null;
  }

  const showCarousel = imageCount > 1;

  return (
    <div
      className="pds-travel-widget-media"
      data-carousel={showCarousel || undefined}
      data-slot="travel-widget-media"
      style={getBackgroundImageStyle(selectedImage)}
    >
      {showCarousel ? (
        <div
          className="pds-travel-widget-carousel"
          data-slot="travel-widget-carousel"
        >
          <button
            aria-label="Show previous image"
            className="pds-travel-widget-carousel-button"
            data-direction="previous"
            data-slot="travel-widget-carousel-button"
            onClick={() => {
              setImageIndex((currentIndex) =>
                currentIndex === 0 ? imageCount - 1 : currentIndex - 1
              );
            }}
            type="button"
          >
            <Icon name="chevron_left" />
          </button>
          <div
            aria-label={`Image ${selectedIndex + 1} of ${imageCount}`}
            className="pds-travel-widget-carousel-status"
            data-slot="travel-widget-carousel-status"
            role="status"
          >
            {selectedIndex + 1}/{imageCount}
          </div>
          <button
            aria-label="Show next image"
            className="pds-travel-widget-carousel-button"
            data-direction="next"
            data-slot="travel-widget-carousel-button"
            onClick={() => {
              setImageIndex((currentIndex) => (currentIndex + 1) % imageCount);
            }}
            type="button"
          >
            <Icon name="chevron_right" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

const TravelWidgetRoot = React.forwardRef<HTMLDivElement, TravelWidgetProps>(
  function TravelWidget(
    {
      "aria-disabled": ariaDisabled,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
      className,
      disabled = false,
      image,
      role,
      style,
      type = "button",
      use: Comp = "button",
      variant = "large",
      ...props
    },
    ref
  ) {
    const titleId = React.useId();
    const isButton = Comp === "button";
    const images = normalizeImages(image);
    const { actionChildren, bodyChildren } = partitionTravelWidgetChildren(children);
    const labelId =
      ariaLabelledBy ??
      (ariaLabel === undefined && role !== "presentation" ? titleId : undefined);

    return (
      <TravelWidgetContext.Provider value={{ titleId }}>
        <div
          ref={ref}
          className={cn("pds-travel-widget", className)}
          data-disabled={disabled || undefined}
          data-image={images.length > 0}
          data-slot="travel-widget"
          data-variant={variant}
          style={style}
        >
          <TravelWidgetMedia images={images} />
          <Comp
            aria-disabled={getAriaDisabled(ariaDisabled, disabled, isButton)}
            aria-label={ariaLabel}
            aria-labelledby={labelId}
            className="pds-travel-widget-control"
            data-slot="travel-widget-control"
            disabled={isButton ? disabled : undefined}
            role={role}
            type={isButton ? type : undefined}
            {...props}
          >
            <div
              className="pds-travel-widget-body"
              data-slot="travel-widget-body"
            >
              {bodyChildren}
            </div>
          </Comp>
          {actionChildren}
        </div>
      </TravelWidgetContext.Provider>
    );
  }
);

export const TravelWidgetTitle = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSlotProps
>(function TravelWidgetTitle({ className, id, ...props }, ref) {
  const context = React.useContext(TravelWidgetContext);

  return (
    <div
      ref={ref}
      className={cn("pds-travel-widget-title", className)}
      data-slot="travel-widget-title"
      id={id ?? context?.titleId}
      {...props}
    />
  );
});

export const TravelWidgetDetails = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSlotProps
>(function TravelWidgetDetails({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-travel-widget-details", className)}
      data-slot="travel-widget-details"
      {...props}
    />
  );
});

export const TravelWidgetDescription = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSlotProps
>(function TravelWidgetDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-travel-widget-description", className)}
      data-slot="travel-widget-description"
      {...props}
    />
  );
});

export const TravelWidgetContent = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSlotProps
>(function TravelWidgetContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-travel-widget-content", className)}
      data-slot="travel-widget-content"
      {...props}
    />
  );
});

export const TravelWidgetAction = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSlotProps
>(function TravelWidgetAction({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-travel-widget-action", className)}
      data-slot="travel-widget-action"
      {...props}
    />
  );
});

(TravelWidgetAction as TravelWidgetMarkedComponent).pdsSlot =
  "travel-widget-action";

export const TravelWidgetSkeletonTitle = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSkeletonSlotProps
>(function TravelWidgetSkeletonTitle(
  { className, shape = "text", ...props },
  ref
) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-travel-widget-skeleton-title", className)}
      data-slot="travel-widget-skeleton-title"
      shape={shape}
      {...props}
    />
  );
});

export const TravelWidgetSkeletonDetails = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSkeletonSlotProps
>(function TravelWidgetSkeletonDetails(
  { className, shape = "text", ...props },
  ref
) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-travel-widget-skeleton-details", className)}
      data-slot="travel-widget-skeleton-details"
      shape={shape}
      {...props}
    />
  );
});

export const TravelWidgetSkeletonDescription = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSkeletonSlotProps
>(function TravelWidgetSkeletonDescription(
  { className, shape = "text", ...props },
  ref
) {
  return (
    <Skeleton
      ref={ref}
      className={cn("pds-travel-widget-skeleton-description", className)}
      data-slot="travel-widget-skeleton-description"
      shape={shape}
      {...props}
    />
  );
});

export const TravelWidgetSkeletonContent = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSkeletonContentProps
>(function TravelWidgetSkeletonContent({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "pds-travel-widget-content",
        "pds-travel-widget-skeleton-content",
        className
      )}
      data-slot="travel-widget-skeleton-content"
      {...props}
    >
      {children ?? (
        <>
          <Skeleton
            className="pds-travel-widget-skeleton-content-line"
            data-slot="travel-widget-skeleton-content-line"
            shape="text"
          />
          <Skeleton
            className="pds-travel-widget-skeleton-content-value"
            data-slot="travel-widget-skeleton-content-value"
            shape="text"
          />
        </>
      )}
    </div>
  );
});

function DefaultTravelWidgetSkeletonSlots({
  variant
}: {
  variant: TravelWidgetVariant;
}) {
  return (
    <>
      <TravelWidgetSkeletonTitle />
      <TravelWidgetSkeletonDetails />
      {variant === "large" ? <TravelWidgetSkeletonDescription /> : null}
      <TravelWidgetSkeletonContent />
    </>
  );
}

const TravelWidgetSkeletonRoot = React.forwardRef<
  HTMLDivElement,
  TravelWidgetSkeletonProps
>(function TravelWidgetSkeleton(
  { "aria-hidden": ariaHidden, children, className, variant = "large", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden ?? true}
      className={cn(
        "pds-travel-widget",
        "pds-travel-widget-skeleton",
        className
      )}
      data-slot="travel-widget-skeleton"
      data-variant={variant}
      {...props}
    >
      <Skeleton
        className="pds-travel-widget-media pds-travel-widget-skeleton-media"
        data-slot="travel-widget-skeleton-media"
        shape="block"
      />
      <div className="pds-travel-widget-body" data-slot="travel-widget-skeleton-body">
        {children ?? <DefaultTravelWidgetSkeletonSlots variant={variant} />}
      </div>
    </div>
  );
});

export const TravelWidget = Object.assign(TravelWidgetRoot, {
  Action: TravelWidgetAction,
  Content: TravelWidgetContent,
  Description: TravelWidgetDescription,
  Details: TravelWidgetDetails,
  Title: TravelWidgetTitle
}) as TravelWidgetCompoundComponent;

export const TravelWidgetSkeleton = Object.assign(TravelWidgetSkeletonRoot, {
  Content: TravelWidgetSkeletonContent,
  Description: TravelWidgetSkeletonDescription,
  Details: TravelWidgetSkeletonDetails,
  Title: TravelWidgetSkeletonTitle
}) as TravelWidgetSkeletonCompoundComponent;
