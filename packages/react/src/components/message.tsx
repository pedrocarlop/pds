"use client";

import * as React from "react";

import { cn } from "../utilities";

export type MessageRole = "user" | "assistant" | "system" | "tool";
export type MessageVariant = "default" | "compact";

export interface MessageProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "role"> {
  role?: MessageRole;
  variant?: MessageVariant;
}

export const Message = React.forwardRef<HTMLElement, MessageProps>(
  function Message(
    {
      className,
      role = "assistant",
      variant = "default",
      ...props
    },
    ref
  ) {
    return (
      <article
        ref={ref}
        className={cn("pds-message", className)}
        data-role={role}
        data-slot="message"
        data-variant={variant}
        {...props}
      />
    );
  }
);

export const MessageAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function MessageAvatar({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-message-avatar", className)}
      data-slot="message-avatar"
      {...props}
    />
  );
});

export const MessageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function MessageHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-message-header", className)}
      data-slot="message-header"
      {...props}
    />
  );
});

export const MessageAuthor = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function MessageAuthor({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-message-author", className)}
      data-slot="message-author"
      {...props}
    />
  );
});

export const MessageMeta = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function MessageMeta({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn("pds-message-meta", className)}
      data-slot="message-meta"
      {...props}
    />
  );
});

export const MessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function MessageContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-message-content", className)}
      data-slot="message-content"
      {...props}
    />
  );
});

export const MessageActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function MessageActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("pds-message-actions", className)}
      data-slot="message-actions"
      {...props}
    />
  );
});
