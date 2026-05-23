"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "../utilities";

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
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
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
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

export const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(function AccordionHeader({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      className={cn("pds-accordion-header", className)}
      data-slot="accordion-header"
      {...props}
    />
  );
});

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ children, className, ...props }, ref) {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn("pds-accordion-trigger", className)}
      data-slot="accordion-trigger"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="pds-accordion-chevron" />
    </AccordionPrimitive.Trigger>
  );
});

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ children, className, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("pds-accordion-content", className)}
      data-slot="accordion-content"
      {...props}
    >
      <div className="pds-accordion-content-inner" data-slot="accordion-content-inner">
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
