"use client";

import * as React from "react";

import { cn } from "../utilities";
import {
  Surface,
  SurfaceDescription,
  SurfaceFooter,
  SurfaceTitle
} from "./surface";
import type { SurfaceLevel, SurfaceProps } from "./surface";

export type ActionWidgetLevel = SurfaceLevel;
export type ActionWidgetActionsJustify = "start" | "center" | "end";

export interface ActionWidgetProps extends SurfaceProps {
  level?: ActionWidgetLevel;
}

export interface ActionWidgetActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  justify?: ActionWidgetActionsJustify;
}

const ActionWidgetRoot = React.forwardRef<HTMLDivElement, ActionWidgetProps>(
  function ActionWidget({ className, level = "base", ...props }, ref) {
    return (
      <Surface
        ref={ref}
        className={cn("pds-action-widget", className)}
        data-slot="action-widget"
        level={level}
        {...props}
      />
    );
  }
);

export const ActionWidgetTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ActionWidgetTitle({ className, ...props }, ref) {
  return (
    <SurfaceTitle
      ref={ref}
      className={cn("pds-action-widget-title", className)}
      data-slot="action-widget-title"
      {...props}
    />
  );
});

export const ActionWidgetAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ActionWidgetAvatar({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-action-widget-avatar", className)}
      data-slot="action-widget-avatar"
      {...props}
    />
  );
});

export const ActionWidgetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ActionWidgetContent({ className, ...props }, ref) {
  return (
    <SurfaceDescription
      ref={ref}
      className={cn("pds-action-widget-content", className)}
      data-slot="action-widget-content"
      {...props}
    />
  );
});

export const ActionWidgetActions = React.forwardRef<
  HTMLDivElement,
  ActionWidgetActionsProps
>(function ActionWidgetActions(
  { className, justify = "end", ...props },
  ref
) {
  return (
    <SurfaceFooter
      ref={ref}
      className={cn("pds-action-widget-actions", className)}
      data-justify={justify}
      data-slot="action-widget-actions"
      {...props}
    />
  );
});

export const ActionWidget = Object.assign(ActionWidgetRoot, {
  Actions: ActionWidgetActions,
  Avatar: ActionWidgetAvatar,
  Content: ActionWidgetContent,
  Title: ActionWidgetTitle
});
