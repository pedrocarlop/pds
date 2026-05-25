"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "../utilities";

export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>;
export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>;
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;
export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(function Accordion({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn("pds-accordion", className)}
      data-slot="accordion"
      {...props}
    />
  );
});

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("pds-accordion-item", className)}
      data-slot="accordion-item"
      {...props}
    />
  );
});

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(function AccordionTrigger({ children, className, ...props }, ref) {
  return (
    <AccordionPrimitive.Header
      className="pds-accordion-header"
      data-slot="accordion-header"
    >
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn("pds-accordion-trigger", className)}
        data-slot="accordion-trigger"
        {...props}
      >
        <span className="pds-accordion-trigger-label">{children}</span>
        <span
          aria-hidden="true"
          className="pds-accordion-trigger-icon"
          data-slot="accordion-trigger-icon"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(function AccordionContent({ children, className, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("pds-accordion-content", className)}
      data-slot="accordion-content"
      {...props}
    >
      <div className="pds-accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  );
});
