"use client";

import * as React from "react";
import {
  Toaster as SonnerToaster,
  toast,
  useSonner,
  type ToastClassnames,
  type ToasterProps as SonnerToasterProps
} from "sonner";

import { cn } from "../utilities";
import { Icon } from "./icon";

export type ToasterProps = SonnerToasterProps;

function mergeSonnerClassNames(
  classNames?: ToastClassnames
): ToastClassnames {
  return {
    actionButton: cn("pds-sonner-action-button", classNames?.actionButton),
    cancelButton: cn("pds-sonner-cancel-button", classNames?.cancelButton),
    closeButton: cn("pds-sonner-close-button", classNames?.closeButton),
    content: cn("pds-sonner-content", classNames?.content),
    description: cn("pds-sonner-description", classNames?.description),
    error: cn("pds-sonner-error", classNames?.error),
    icon: cn("pds-sonner-icon", classNames?.icon),
    info: cn("pds-sonner-info", classNames?.info),
    loader: cn("pds-sonner-loader", classNames?.loader),
    loading: cn("pds-sonner-loading", classNames?.loading),
    success: cn("pds-sonner-success", classNames?.success),
    title: cn("pds-sonner-title", classNames?.title),
    toast: cn("pds-sonner-toast", classNames?.toast),
    warning: cn("pds-sonner-warning", classNames?.warning)
  };
}

export const Toaster = React.forwardRef<
  React.ElementRef<typeof SonnerToaster>,
  ToasterProps
>(function Toaster(
  {
    className,
    closeButton = true,
    icons,
    position = "bottom-right",
    style,
    theme = "light",
    toastOptions,
    ...props
  },
  ref
) {
  return (
    <SonnerToaster
      ref={ref}
      className={cn("pds-toaster", className)}
      closeButton={closeButton}
      icons={{
        error: <Icon name="error" />,
        info: <Icon name="info" />,
        loading: <Icon className="pds-sonner-loading-icon" name="progress_activity" />,
        success: <Icon name="check_circle" />,
        warning: <Icon name="warning" />,
        ...icons
      }}
      position={position}
      style={
        {
          "--border-radius": "var(--pds-radius-nested)",
          "--normal-bg": "var(--pds-color-base-popover-background)",
          "--normal-border": "var(--pds-color-grey-tone-8)",
          "--normal-text": "var(--pds-color-foreground)",
          ...style
        } as React.CSSProperties
      }
      theme={theme}
      toastOptions={{
        ...toastOptions,
        classNames: mergeSonnerClassNames(toastOptions?.classNames)
      }}
      {...props}
    />
  );
});

export { toast, useSonner };
