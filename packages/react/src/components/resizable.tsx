"use client";

import * as React from "react";
import {
  Group as ResizableGroup,
  Panel as ResizablePanelPrimitive,
  Separator as ResizableSeparator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps
} from "react-resizable-panels";

import { cn } from "../utilities";

export type ResizablePanelGroupProps = GroupProps;
export type ResizablePanelProps = PanelProps;

export interface ResizableHandleProps extends SeparatorProps {
  withHandle?: boolean;
}

function composeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) {
        continue;
      }

      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };
}

export const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(function ResizablePanelGroup(
  { className, elementRef, orientation = "horizontal", ...props },
  ref
) {
  return (
    <ResizableGroup
      className={cn("pds-resizable-panel-group", className)}
      data-orientation={orientation}
      data-slot="resizable-panel-group"
      elementRef={composeRefs(ref, elementRef)}
      orientation={orientation}
      {...props}
    />
  );
});

export const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  ResizablePanelProps
>(function ResizablePanel({ className, elementRef, ...props }, ref) {
  return (
    <ResizablePanelPrimitive
      className={cn("pds-resizable-panel", className)}
      data-slot="resizable-panel"
      elementRef={composeRefs(ref, elementRef)}
      {...props}
    />
  );
});

export const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  ResizableHandleProps
>(function ResizableHandle(
  { children, className, elementRef, withHandle = false, ...props },
  ref
) {
  return (
    <ResizableSeparator
      className={cn("pds-resizable-handle", className)}
      data-slot="resizable-handle"
      elementRef={composeRefs(ref, elementRef)}
      {...props}
    >
      {children ??
        (withHandle ? (
          <span
            aria-hidden="true"
            className="pds-resizable-handle-grip"
            data-slot="resizable-handle-grip"
          />
        ) : null)}
    </ResizableSeparator>
  );
});
