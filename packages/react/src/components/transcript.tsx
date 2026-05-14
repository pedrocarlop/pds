"use client";

import * as React from "react";

import { cn } from "../utilities";

export type TranscriptDensity = "default" | "compact";

export interface TranscriptProps
  extends React.HTMLAttributes<HTMLElement> {
  density?: TranscriptDensity;
  empty?: React.ReactNode;
}

export const Transcript = React.forwardRef<HTMLElement, TranscriptProps>(
  function Transcript(
    { children, className, density = "default", empty, ...props },
    ref
  ) {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <section
        ref={ref}
        className={cn("pds-transcript", className)}
        data-density={density}
        data-slot="transcript"
        {...props}
      >
        {hasChildren ? children : empty ? <TranscriptEmpty>{empty}</TranscriptEmpty> : null}
      </section>
    );
  }
);

export const TranscriptList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function TranscriptList({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-transcript-list", className)}
      data-slot="transcript-list"
      {...props}
    />
  );
});

export const TranscriptEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function TranscriptEmpty({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-transcript-empty", className)}
      data-slot="transcript-empty"
      {...props}
    />
  );
});
