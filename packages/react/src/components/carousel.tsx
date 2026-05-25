"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType
} from "embla-carousel-react";

import { cn } from "../utilities";
import { Button, type ButtonProps } from "./button";
import { Icon } from "./icon";

export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions;
  orientation?: "horizontal" | "vertical";
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  api: CarouselApi;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
} & Pick<CarouselProps, "opts" | "orientation">;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      children,
      className,
      opts,
      orientation = "horizontal",
      plugins,
      setApi,
      ...props
    },
    ref
  ) {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);

    const onSelect = React.useCallback((nextApi: CarouselApi) => {
      if (!nextApi) {
        return;
      }

      setCanScrollPrev(nextApi.canScrollPrev());
      setCanScrollNext(nextApi.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollNext, scrollPrev]
    );

    React.useEffect(() => {
      if (api && setApi) {
        setApi(api);
      }
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          api,
          canScrollNext,
          canScrollPrev,
          carouselRef,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollNext,
          scrollPrev
        }}
      >
        <div
          ref={ref}
          aria-roledescription="carousel"
          className={cn("pds-carousel", className)}
          data-orientation={orientation}
          data-slot="carousel"
          onKeyDownCapture={handleKeyDown}
          role="region"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);

export type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CarouselContentProps
>(function CarouselContent({ className, ...props }, ref) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="pds-carousel-viewport"
    >
      <div
        ref={ref}
        className={cn("pds-carousel-content", className)}
        data-orientation={orientation}
        data-slot="carousel-content"
        {...props}
      />
    </div>
  );
});

export type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  function CarouselItem({ className, ...props }, ref) {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        aria-roledescription="slide"
        className={cn("pds-carousel-item", className)}
        data-orientation={orientation}
        data-slot="carousel-item"
        role="group"
        {...props}
      />
    );
  }
);

export type CarouselButtonProps = ButtonProps;

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselButtonProps
>(function CarouselPrevious(
  { children, className, intent = "secondary", size = "icon", ...props },
  ref
) {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      className={cn("pds-carousel-button pds-carousel-previous", className)}
      data-orientation={orientation}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      intent={intent}
      onClick={scrollPrev}
      size={size}
      {...props}
    >
      {children ?? (
        <>
          <Icon name="chevron_left" />
          <span className="pds-visually-hidden">Previous slide</span>
        </>
      )}
    </Button>
  );
});

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  CarouselButtonProps
>(function CarouselNext(
  { children, className, intent = "secondary", size = "icon", ...props },
  ref
) {
  const { canScrollNext, orientation, scrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      className={cn("pds-carousel-button pds-carousel-next", className)}
      data-orientation={orientation}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      intent={intent}
      onClick={scrollNext}
      size={size}
      {...props}
    >
      {children ?? (
        <>
          <Icon name="chevron_right" />
          <span className="pds-visually-hidden">Next slide</span>
        </>
      )}
    </Button>
  );
});
