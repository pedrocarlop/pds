"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "../utilities";
import { Button, type ButtonProps } from "./button";
import { Icon } from "./icon";
import { Input, type InputProps } from "./input";
import { Separator, type SeparatorProps } from "./separator";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarState = "collapsed" | "expanded";

type SidebarContextProps = {
  isMobile: boolean;
  open: boolean;
  openMobile: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  state: SidebarState;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export interface SidebarProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function SidebarProvider({
  children,
  className,
  defaultOpen = true,
  onOpenChange,
  open: openProp,
  style,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (value) => {
      const nextOpen = typeof value === "function" ? value(open) : value;

      if (onOpenChange) {
        onOpenChange(nextOpen);
      } else {
        _setOpen(nextOpen);
      }

      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${nextOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    },
    [onOpenChange, open]
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((currentOpen) => !currentOpen);
    } else {
      setOpen((currentOpen) => !currentOpen);
    }
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state: SidebarState = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      isMobile,
      open,
      openMobile,
      setOpen,
      setOpenMobile,
      state,
      toggleSidebar
    }),
    [isMobile, open, openMobile, setOpen, state, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          className={cn("pds-sidebar-wrapper", className)}
          data-slot="sidebar-wrapper"
          style={style}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: "icon" | "none" | "offcanvas";
  side?: "left" | "right";
  variant?: "floating" | "inset" | "sidebar";
}

export function Sidebar({
  children,
  className,
  collapsible = "offcanvas",
  side = "left",
  variant = "sidebar",
  ...props
}: SidebarProps) {
  const { isMobile, openMobile, setOpenMobile, state } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn("pds-sidebar pds-sidebar-static", className)}
        data-slot="sidebar"
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          className={cn("pds-sidebar-mobile", className)}
          data-mobile="true"
          data-sidebar="sidebar"
          data-slot="sidebar"
          showCloseButton={false}
          side={side}
        >
          <SheetHeader className="pds-visually-hidden">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <SheetBody className="pds-sidebar-mobile-body">{children}</SheetBody>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="pds-sidebar-shell"
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-side={side}
      data-slot="sidebar"
      data-state={state}
      data-variant={variant}
    >
      <div className="pds-sidebar-gap" data-slot="sidebar-gap" />
      <div
        className={cn("pds-sidebar-container", className)}
        data-side={side}
        data-slot="sidebar-container"
        {...props}
      >
        <div
          className="pds-sidebar"
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export type SidebarTriggerProps = ButtonProps;

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(function SidebarTrigger({ children, className, onClick, ...props }, ref) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      className={cn("pds-sidebar-trigger", className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      intent="quiet"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      size="icon"
      {...props}
    >
      {children ?? (
        <>
          <Icon name="dock_to_left" />
          <span className="pds-visually-hidden">Toggle Sidebar</span>
        </>
      )}
    </Button>
  );
});

export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SidebarRail({ className, ...props }, ref) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      aria-label="Toggle Sidebar"
      className={cn("pds-sidebar-rail", className)}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle Sidebar"
      type="button"
      {...props}
    />
  );
});

export const SidebarInset = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function SidebarInset({ className, ...props }, ref) {
  return (
    <main
      ref={ref}
      className={cn("pds-sidebar-inset", className)}
      data-slot="sidebar-inset"
      {...props}
    />
  );
});

export type SidebarInputProps = InputProps;

export const SidebarInput = React.forwardRef<HTMLInputElement, SidebarInputProps>(
  function SidebarInput({ className, ...props }, ref) {
    return (
      <Input
        ref={ref}
        className={cn("pds-sidebar-input", className)}
        data-sidebar="input"
        data-slot="sidebar-input"
        {...props}
      />
    );
  }
);

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sidebar-header", className)}
      data-sidebar="header"
      data-slot="sidebar-header"
      {...props}
    />
  );
});

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sidebar-footer", className)}
      data-sidebar="footer"
      data-slot="sidebar-footer"
      {...props}
    />
  );
});

export type SidebarSeparatorProps = SeparatorProps;

export const SidebarSeparator: React.ForwardRefExoticComponent<
  SidebarSeparatorProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, SidebarSeparatorProps>(function SidebarSeparator(
  { className, ...props },
  ref
) {
  return (
    <Separator
      ref={ref}
      className={cn("pds-sidebar-separator", className)}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  );
});

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sidebar-content", className)}
      data-sidebar="content"
      data-slot="sidebar-content"
      {...props}
    />
  );
});

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sidebar-group", className)}
      data-sidebar="group"
      data-slot="sidebar-group"
      {...props}
    />
  );
});

export interface SidebarSlotDivProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  SidebarSlotDivProps
>(function SidebarGroupLabel({ asChild = false, className, ...props }, ref) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      ref={ref}
      className={cn("pds-sidebar-group-label", className)}
      data-sidebar="group-label"
      data-slot="sidebar-group-label"
      {...props}
    />
  );
});

export interface SidebarGroupActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(function SidebarGroupAction({ asChild = false, className, ...props }, ref) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      ref={ref}
      className={cn("pds-sidebar-group-action", className)}
      data-sidebar="group-action"
      data-slot="sidebar-group-action"
      type={asChild ? undefined : "button"}
      {...props}
    />
  );
});

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarGroupContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sidebar-group-content", className)}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...props}
    />
  );
});

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(function SidebarMenu({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      className={cn("pds-sidebar-menu", className)}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...props}
    />
  );
});

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function SidebarMenuItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={cn("pds-sidebar-menu-item", className)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
});

export type SidebarMenuButtonVariant = "default" | "outline";
export type SidebarMenuButtonSize = "default" | "lg" | "sm";

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
  size?: SidebarMenuButtonSize;
  tooltip?: React.ComponentProps<typeof TooltipContent> | string;
  variant?: SidebarMenuButtonVariant;
}

function sidebarMenuButtonClassName(
  variant: SidebarMenuButtonVariant,
  size: SidebarMenuButtonSize
) {
  return cn(
    "pds-sidebar-menu-button",
    variant === "outline" && "pds-sidebar-menu-button-outline",
    size === "sm" && "pds-sidebar-menu-button-sm",
    size === "lg" && "pds-sidebar-menu-button-lg"
  );
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(function SidebarMenuButton(
  {
    asChild = false,
    className,
    isActive = false,
    size = "default",
    tooltip,
    variant = "default",
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot.Root : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      className={cn(sidebarMenuButtonClassName(variant, size), className)}
      data-active={isActive}
      data-sidebar="menu-button"
      data-size={size}
      data-slot="sidebar-menu-button"
      type={asChild ? undefined : "button"}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        align="center"
        hidden={state !== "collapsed" || isMobile}
        side="right"
        {...tooltipProps}
      />
    </Tooltip>
  );
});

export interface SidebarMenuActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  showOnHover?: boolean;
}

export const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuActionProps
>(function SidebarMenuAction(
  { asChild = false, className, showOnHover = false, ...props },
  ref
) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      ref={ref}
      className={cn(
        "pds-sidebar-menu-action",
        showOnHover && "pds-sidebar-menu-action-hover",
        className
      )}
      data-sidebar="menu-action"
      data-slot="sidebar-menu-action"
      type={asChild ? undefined : "button"}
      {...props}
    />
  );
});

export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarMenuBadge({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-sidebar-menu-badge", className)}
      data-sidebar="menu-badge"
      data-slot="sidebar-menu-badge"
      {...props}
    />
  );
});

export interface SidebarMenuSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean;
}

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps) {
  const [width] = React.useState(() => `${Math.floor(Math.random() * 40) + 50}%`);

  return (
    <div
      className={cn("pds-sidebar-menu-skeleton", className)}
      data-sidebar="menu-skeleton"
      data-slot="sidebar-menu-skeleton"
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="pds-sidebar-menu-skeleton-icon"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="pds-sidebar-menu-skeleton-text"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--pds-sidebar-skeleton-width": width
          } as React.CSSProperties
        }
      />
    </div>
  );
}

export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(function SidebarMenuSub({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      className={cn("pds-sidebar-menu-sub", className)}
      data-sidebar="menu-sub"
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
});

export const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function SidebarMenuSubItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      className={cn("pds-sidebar-menu-sub-item", className)}
      data-sidebar="menu-sub-item"
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
});

export interface SidebarMenuSubButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  isActive?: boolean;
  size?: "md" | "sm";
}

export const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  SidebarMenuSubButtonProps
>(function SidebarMenuSubButton(
  { asChild = false, className, isActive = false, size = "md", ...props },
  ref
) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      ref={ref}
      className={cn("pds-sidebar-menu-sub-button", className)}
      data-active={isActive}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-slot="sidebar-menu-sub-button"
      {...props}
    />
  );
});
