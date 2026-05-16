import "@testing-library/jest-dom/vitest";

import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuShortcut,
  ActionMenuTrigger,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetOverlay,
  BottomSheetPortal,
  BottomSheetTitle,
  BottomSheetTrigger,
  Button,
  Checkbox,
  CheckboxIndicator,
  Composer,
  ComposerActions,
  ComposerFooter,
  ComposerInput,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  InlineAlert,
  InlineAlertActions,
  InlineAlertDescription,
  InlineAlertTitle,
  Input,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
  Message,
  MessageActions,
  MessageAuthor,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageMeta,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressIndicator,
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
  RunStatus,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceFooter,
  SurfaceHeader,
  SurfaceTitle,
  Switch,
  SwitchThumb,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Transcript,
  TranscriptEmpty,
  TranscriptList
} from "../index";

describe("PDS starter components", () => {
  it("renders Button with PDS data attributes, disabled state, and forwarded refs", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <Button
        ref={ref}
        className="custom-button"
        disabled
        intent="secondary"
        size="lg"
      >
        Run
      </Button>
    );

    const button = screen.getByRole("button", { name: "Run" });
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("data-intent", "secondary");
    expect(button).toHaveAttribute("data-size", "lg");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("pds-button", "custom-button");
    expect(ref.current).toBe(button);
  });

  it("supports Button asChild composition", () => {
    render(
      <Button asChild>
        <a href="/runs">Runs</a>
      </Button>
    );

    expect(screen.getByRole("link", { name: "Runs" })).toHaveAttribute(
      "data-slot",
      "button"
    );
  });

  it("keeps Button long labels accessible to assistive technology", () => {
    const label =
      "Run the extremely long agent handoff workflow without truncating the action label";

    render(<Button>{label}</Button>);

    expect(screen.getByRole("button", { name: label })).toHaveTextContent(label);
  });

  it("renders Badge with tone, emphasis, className, and forwarded refs", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <Badge
        ref={ref}
        className="custom-badge"
        emphasis="outline"
        tone="success"
      >
        Live
      </Badge>
    );

    const badge = screen.getByText("Live");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-tone", "success");
    expect(badge).toHaveAttribute("data-emphasis", "outline");
    expect(badge).toHaveClass("pds-badge", "custom-badge");
    expect(ref.current).toBe(badge);
  });

  it("supports Badge asChild composition", () => {
    render(
      <Badge asChild tone="accent">
        <a href="/runs">Queued</a>
      </Badge>
    );

    const link = screen.getByRole("link", { name: "Queued" });
    expect(link).toHaveAttribute("data-slot", "badge");
    expect(link).toHaveAttribute("data-tone", "accent");
  });

  it("renders Avatar primitives with size, className, and forwarded refs", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <Avatar ref={ref} className="custom-avatar" size="lg">
        <AvatarImage alt="Pedro" src="/missing.png" />
        <AvatarFallback>PC</AvatarFallback>
        <AvatarBadge aria-label="Online" />
      </Avatar>
    );

    const avatar = screen.getByText("PC").closest('[data-slot="avatar"]');
    expect(avatar).toHaveAttribute("data-size", "lg");
    expect(avatar).toHaveClass("pds-avatar", "custom-avatar");
    expect(ref.current).toBe(avatar);
    expect(screen.getByText("PC")).toHaveAttribute(
      "data-slot",
      "avatar-fallback"
    );
    expect(screen.getByLabelText("Online")).toHaveAttribute(
      "data-slot",
      "avatar-badge"
    );
  });

  it("renders AvatarGroup and count slots", () => {
    render(
      <AvatarGroup className="custom-group">
        <Avatar>
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    );

    expect(screen.getByText("+3")).toHaveAttribute(
      "data-slot",
      "avatar-group-count"
    );
    expect(screen.getByText("PC").closest('[data-slot="avatar-group"]')).toHaveClass(
      "pds-avatar-group",
      "custom-group"
    );
  });

  it("renders Surface composition with slots, className, and forwarded refs", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Surface ref={ref} className="custom-surface" level="elevated">
        <SurfaceHeader>
          <SurfaceTitle>Transcript</SurfaceTitle>
          <SurfaceDescription>Recent agent messages</SurfaceDescription>
          <SurfaceAction>
            <Button>Refresh</Button>
          </SurfaceAction>
        </SurfaceHeader>
        <SurfaceContent>Messages</SurfaceContent>
        <SurfaceFooter>Footer actions</SurfaceFooter>
      </Surface>
    );

    const surface = screen.getByText("Transcript").closest('[data-slot="surface"]');
    expect(surface).toHaveAttribute("data-level", "elevated");
    expect(surface).toHaveClass("pds-surface", "custom-surface");
    expect(ref.current).toBe(surface);
    expect(screen.getByText("Transcript")).toHaveAttribute(
      "data-slot",
      "surface-title"
    );
    expect(screen.getByText("Recent agent messages")).toHaveAttribute(
      "data-slot",
      "surface-description"
    );
    expect(screen.getByText("Messages")).toHaveAttribute(
      "data-slot",
      "surface-content"
    );
    expect(screen.getByText("Footer actions")).toHaveAttribute(
      "data-slot",
      "surface-footer"
    );
  });

  it("renders RunStatus statuses with badge-compatible attributes", () => {
    const statuses = [
      "idle",
      "queued",
      "running",
      "success",
      "warning",
      "error",
      "cancelled"
    ] as const;

    render(
      <div>
        {statuses.map((status) => (
          <RunStatus key={status} status={status} />
        ))}
      </div>
    );

    for (const status of statuses) {
      const label = status === "error" ? "Error" : status[0].toUpperCase() + status.slice(1);
      const runStatus = screen.getByText(label);
      expect(runStatus).toHaveAttribute("data-slot", "run-status");
      expect(runStatus).toHaveAttribute("data-status", status);
      expect(runStatus).toHaveAttribute("data-emphasis", "soft");
      expect(runStatus).toHaveClass("pds-badge", "pds-run-status");
    }
  });

  it("supports RunStatus asChild and consumer-owned live region behavior", () => {
    render(
      <RunStatus asChild aria-live="polite" status="running">
        <span>Working</span>
      </RunStatus>
    );

    const status = screen.getByText("Working");
    expect(status).toHaveAttribute("data-slot", "run-status");
    expect(status).toHaveAttribute("data-status", "running");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("renders Message layout slots with data attributes, className, and refs", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Message
        ref={ref}
        aria-label="Assistant message"
        className="custom-message"
        role="assistant"
        variant="compact"
      >
        <MessageAvatar>Avatar</MessageAvatar>
        <MessageHeader>
          <MessageAuthor>Agent</MessageAuthor>
          <MessageMeta>12:04</MessageMeta>
          <RunStatus status="success">Done</RunStatus>
        </MessageHeader>
        <MessageContent>Generated answer</MessageContent>
        <MessageActions>
          <Button size="sm">Copy</Button>
        </MessageActions>
      </Message>
    );

    const message = screen.getByRole("article", { name: "Assistant message" });
    expect(message).toHaveAttribute("data-slot", "message");
    expect(message).toHaveAttribute("data-role", "assistant");
    expect(message).toHaveAttribute("data-variant", "compact");
    expect(message).toHaveClass("pds-message", "custom-message");
    expect(ref.current).toBe(message);
    expect(screen.getByText("Avatar")).toHaveAttribute(
      "data-slot",
      "message-avatar"
    );
    expect(screen.getByText("Agent")).toHaveAttribute(
      "data-slot",
      "message-author"
    );
    expect(screen.getByText("12:04")).toHaveAttribute(
      "data-slot",
      "message-meta"
    );
    expect(screen.getByText("Generated answer")).toHaveAttribute(
      "data-slot",
      "message-content"
    );
    expect(screen.getByRole("button", { name: "Copy" }).closest(
      '[data-slot="message-actions"]'
    )).toHaveClass("pds-message-actions");
  });

  it("renders Transcript list and empty states", () => {
    const ref = React.createRef<HTMLElement>();

    const { rerender } = render(
      <Transcript
        ref={ref}
        aria-label="Conversation"
        className="custom-transcript"
        density="compact"
      >
        <TranscriptList className="custom-list">
          <Message role="user">Hello</Message>
        </TranscriptList>
      </Transcript>
    );

    const transcript = screen.getByRole("region", { name: "Conversation" });
    expect(transcript).toHaveAttribute("data-slot", "transcript");
    expect(transcript).toHaveAttribute("data-density", "compact");
    expect(transcript).toHaveClass("pds-transcript", "custom-transcript");
    expect(ref.current).toBe(transcript);
    expect(screen.getByText("Hello").closest('[data-slot="transcript-list"]')).toHaveClass(
      "pds-transcript-list",
      "custom-list"
    );

    rerender(
      <Transcript aria-label="Empty conversation" empty="No messages yet" />
    );

    expect(screen.getByText("No messages yet")).toHaveAttribute(
      "data-slot",
      "transcript-empty"
    );
  });

  it("supports explicit TranscriptEmpty composition", () => {
    render(
      <Transcript aria-label="Conversation">
        <TranscriptEmpty className="custom-empty">Nothing here</TranscriptEmpty>
      </Transcript>
    );

    expect(screen.getByText("Nothing here")).toHaveClass(
      "pds-transcript-empty",
      "custom-empty"
    );
  });

  it("maps Composer state to form and input accessibility attributes", () => {
    const ref = React.createRef<HTMLFormElement>();
    const inputRef = React.createRef<HTMLTextAreaElement>();

    render(
      <Composer
        ref={ref}
        aria-label="Message composer"
        busy
        className="custom-composer"
        disabled
        invalid
      >
        <ComposerInput ref={inputRef} aria-label="Message" />
        <ComposerActions>
          <Button type="submit">Send</Button>
        </ComposerActions>
        <ComposerFooter>Review before sending.</ComposerFooter>
      </Composer>
    );

    const composer = screen.getByRole("form", { name: "Message composer" });
    expect(composer).toHaveAttribute("aria-busy", "true");
    expect(composer).toHaveAttribute("data-slot", "composer");
    expect(composer).toHaveAttribute("data-busy", "true");
    expect(composer).toHaveAttribute("data-disabled", "true");
    expect(composer).toHaveAttribute("data-invalid", "true");
    expect(composer).toHaveClass("pds-composer", "custom-composer");
    expect(ref.current).toBe(composer);

    const input = screen.getByLabelText("Message");
    expect(input).toHaveAttribute("data-slot", "composer-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("pds-textarea", "pds-composer-input");
    expect(inputRef.current).toBe(input);
    expect(screen.getByRole("button", { name: "Send" }).closest(
      '[data-slot="composer-actions"]'
    )).toHaveClass("pds-composer-actions");
    expect(screen.getByText("Review before sending.")).toHaveAttribute(
      "data-slot",
      "composer-footer"
    );
  });

  it("submits Composer through consumer-owned submit controls", () => {
    const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    render(
      <Composer aria-label="Message composer" onSubmit={handleSubmit}>
        <ComposerInput aria-label="Message" defaultValue="Ship it" />
        <ComposerActions>
          <Button type="submit">Send</Button>
        </ComposerActions>
      </Composer>
    );

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("maps Input invalid and disabled states to accessibility attributes", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <Input
        ref={ref}
        className="custom-input"
        disabled
        invalid
        density="compact"
        aria-label="Prompt"
      />
    );

    const input = screen.getByLabelText("Prompt");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveAttribute("data-density", "compact");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("pds-input", "custom-input");
    expect(ref.current).toBe(input);
  });

  it("preserves explicit Input aria-invalid values", () => {
    render(<Input aria-invalid="grammar" aria-label="Prompt" />);

    expect(screen.getByLabelText("Prompt")).toHaveAttribute(
      "aria-invalid",
      "grammar"
    );
  });

  it("maps Textarea invalid state, className, and refs", () => {
    const ref = React.createRef<HTMLTextAreaElement>();

    render(
      <Textarea
        ref={ref}
        className="custom-textarea"
        invalid
        density="compact"
        aria-label="Message"
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("data-invalid", "true");
    expect(textarea).toHaveAttribute("data-density", "compact");
    expect(textarea).toHaveClass("pds-textarea", "custom-textarea");
    expect(ref.current).toBe(textarea);
  });

  it("preserves explicit Textarea aria-invalid values", () => {
    render(<Textarea aria-invalid="spelling" aria-label="Message" />);

    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "aria-invalid",
      "spelling"
    );
  });

  it("wires Dialog primitives and accessible content", () => {
    render(
      <Dialog open>
        <DialogContent className="custom-dialog">
          <DialogTitle>Confirm run</DialogTitle>
          <DialogDescription>Start this agent run?</DialogDescription>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole("dialog", { name: "Confirm run" });
    expect(dialog).toHaveAttribute("data-slot", "dialog-content");
    expect(dialog).toHaveClass("pds-dialog-content", "custom-dialog");
    expect(dialog).toHaveAccessibleDescription("Start this agent run?");
    expect(screen.getByText("Confirm run")).toHaveAttribute(
      "data-slot",
      "dialog-title"
    );
    expect(screen.getByText("Start this agent run?")).toHaveAttribute(
      "data-slot",
      "dialog-description"
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "dialog-close"
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute(
      "data-slot",
      "dialog-close"
    );
  });

  it("opens and dismisses Dialog through Radix trigger and keyboard behavior", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm run</DialogTitle>
            <DialogDescription>Start this agent run?</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Confirm run");

    fireEvent.keyDown(dialog, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes Dialog through the default close button", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm run</DialogTitle>
          <DialogDescription>Start this agent run?</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("allows explicit Dialog portal and overlay composition", () => {
    render(
      <Dialog open>
        <DialogPortal>
          <DialogOverlay className="custom-overlay" />
          <DialogContent showCloseButton={false}>
            <DialogTitle>Inspect run</DialogTitle>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );

    expect(document.querySelector('[data-slot="dialog-overlay"]')).toHaveClass(
      "pds-dialog-overlay",
      "custom-overlay"
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("renders Toast feedback with tone, slots, action, close, and viewport", () => {
    render(
      <ToastProvider swipeDirection="right">
        <ToastViewport className="custom-viewport" />
        <Toast className="custom-toast" open tone="success">
          <ToastTitle>Agreement signed</ToastTitle>
          <ToastDescription>We saved the acceptance timestamp.</ToastDescription>
          <ToastAction altText="Review agreement details">Review</ToastAction>
          <ToastClose />
        </Toast>
      </ToastProvider>
    );

    expect(document.querySelector('[data-slot="toast-viewport"]')).toHaveClass(
      "pds-toast-viewport",
      "custom-viewport"
    );

    const toast = screen.getByText("Agreement signed").closest('[data-slot="toast"]');
    expect(toast).toHaveAttribute("data-tone", "success");
    expect(toast).toHaveClass("pds-toast", "custom-toast");
    expect(screen.getByText("Agreement signed")).toHaveAttribute(
      "data-slot",
      "toast-title"
    );
    expect(screen.getByText("We saved the acceptance timestamp.")).toHaveAttribute(
      "data-slot",
      "toast-description"
    );
    expect(screen.getByRole("button", { name: "Review" })).toHaveAttribute(
      "data-slot",
      "toast-action"
    );
    expect(screen.getByRole("button", { name: "Dismiss notification" })).toHaveAttribute(
      "data-slot",
      "toast-close"
    );
  });

  it("defaults Toast tone to neutral and supports custom close content", () => {
    render(
      <ToastProvider>
        <ToastViewport />
        <Toast open>
          <ToastTitle>Saved</ToastTitle>
          <ToastClose>Dismiss</ToastClose>
        </Toast>
      </ToastProvider>
    );

    expect(screen.getByText("Saved").closest('[data-slot="toast"]')).toHaveAttribute(
      "data-tone",
      "neutral"
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toHaveAttribute(
      "data-slot",
      "toast-close"
    );
  });

  it("wires BottomSheet primitives and accessible content", () => {
    render(
      <BottomSheet open>
        <BottomSheetContent className="custom-sheet">
          <BottomSheetHeader>
            <BottomSheetTitle>Review agreement</BottomSheetTitle>
            <BottomSheetDescription>
              Open the document before accepting.
            </BottomSheetDescription>
          </BottomSheetHeader>
          <BottomSheetBody>Document body</BottomSheetBody>
          <BottomSheetFooter>
            <BottomSheetClose>Cancel</BottomSheetClose>
            <Button>Accept</Button>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    );

    const sheet = screen.getByRole("dialog", { name: "Review agreement" });
    expect(sheet).toHaveAttribute("data-slot", "bottom-sheet-content");
    expect(sheet).toHaveClass("pds-bottom-sheet-content", "custom-sheet");
    expect(sheet).toHaveAccessibleDescription("Open the document before accepting.");
    expect(screen.getByText("Review agreement")).toHaveAttribute(
      "data-slot",
      "bottom-sheet-title"
    );
    expect(screen.getByText("Open the document before accepting.")).toHaveAttribute(
      "data-slot",
      "bottom-sheet-description"
    );
    expect(screen.getByText("Document body")).toHaveAttribute(
      "data-slot",
      "bottom-sheet-body"
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "bottom-sheet-close"
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute(
      "data-slot",
      "bottom-sheet-close"
    );
    expect(screen.getByRole("button", { name: "Accept" }).closest(
      '[data-slot="bottom-sheet-footer"]'
    )).toHaveClass("pds-bottom-sheet-footer");
  });

  it("opens and dismisses BottomSheet through Radix trigger and keyboard behavior", async () => {
    render(
      <BottomSheet>
        <BottomSheetTrigger>Open sheet</BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Agreement details</BottomSheetTitle>
            <BottomSheetDescription>Read the summary.</BottomSheetDescription>
          </BottomSheetHeader>
          <BottomSheetBody>Summary</BottomSheetBody>
        </BottomSheetContent>
      </BottomSheet>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open sheet" }));

    const sheet = await screen.findByRole("dialog");
    expect(sheet).toHaveTextContent("Agreement details");

    fireEvent.keyDown(sheet, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("allows explicit BottomSheet portal and overlay composition", () => {
    render(
      <BottomSheet open>
        <BottomSheetPortal>
          <BottomSheetOverlay className="custom-sheet-overlay" />
          <BottomSheetContent showCloseButton={false}>
            <BottomSheetTitle>Inspect agreement</BottomSheetTitle>
          </BottomSheetContent>
        </BottomSheetPortal>
      </BottomSheet>
    );

    expect(document.querySelector('[data-slot="bottom-sheet-overlay"]')).toHaveClass(
      "pds-bottom-sheet-overlay",
      "custom-sheet-overlay"
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("wires Tooltip primitives with accessible content and className", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Details</TooltipTrigger>
          <TooltipContent className="custom-tooltip">Agent status</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByText("Details")).toHaveAttribute(
      "data-slot",
      "tooltip-trigger"
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("Agent status");
    const tooltipContent = document.querySelector(
      '[data-slot="tooltip-content"]'
    );
    expect(tooltipContent).toHaveClass(
      "pds-tooltip-content",
      "custom-tooltip"
    );
    expect(tooltipContent).toHaveTextContent("Agent status");
    expect(document.querySelector('[data-slot="tooltip-arrow"]')).toBeInTheDocument();
  });

  it("keeps Tooltip trigger keyboard focusable", () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Details</TooltipTrigger>
          <TooltipContent showArrow={false}>Agent status</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText("Details");
    trigger.focus();

    expect(trigger).toHaveFocus();
    expect(document.querySelector('[data-slot="tooltip-arrow"]')).not.toBeInTheDocument();
  });

  it("opens Tooltip content from keyboard focus", async () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Details</TooltipTrigger>
          <TooltipContent>Agent status</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    fireEvent.focus(screen.getByRole("button", { name: "Details" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Agent status"
    );
  });

  it("renders Select slots with density, invalid state, and item content", () => {
    render(
      <Select defaultValue="running" open>
        <SelectTrigger
          aria-label="Run status"
          className="custom-select"
          density="compact"
          invalid
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent showScrollButtons={false}>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectSeparator />
            <SelectItem value="running">Running</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = document.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    expect(trigger).toHaveAttribute("data-density", "compact");
    expect(trigger).toHaveAttribute("data-invalid", "true");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveClass("pds-select-trigger", "custom-select");
    expect(document.querySelector('[data-slot="select-content"]')).toHaveClass(
      "pds-select-content"
    );
    expect(screen.getByText("Status")).toHaveAttribute(
      "data-slot",
      "select-label"
    );
    expect(screen.getByText("Queued").closest('[data-slot="select-item"]')).toHaveClass(
      "pds-select-item"
    );
  });

  it("renders Checkbox with default and custom indicators", () => {
    const ref = React.createRef<HTMLButtonElement>();

    const { container: defaultContainer } = render(
      <Checkbox
        ref={ref}
        aria-label="Include archived"
        checked="indeterminate"
        className="custom-checkbox"
        invalid
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Include archived" });
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveClass("pds-checkbox", "custom-checkbox");
    expect(ref.current).toBe(checkbox);
    expect(defaultContainer.querySelector('[data-slot="checkbox-indicator"]')).toHaveClass(
      "pds-checkbox-indicator"
    );

    const { container: customContainer } = render(
      <Checkbox aria-label="Custom checkbox" checked>
        <CheckboxIndicator className="custom-indicator" />
      </Checkbox>
    );

    expect(customContainer.querySelector('[data-slot="checkbox-indicator"]')).toHaveClass(
      "pds-checkbox-indicator",
      "custom-indicator"
    );
  });

  it("renders RadioGroup, Switch, and Tabs primitives with state attributes", () => {
    render(
      <>
        <RadioGroup aria-label="Run mode" defaultValue="safe" orientation="horizontal">
          <RadioGroupItem value="safe" aria-label="Safe" />
          <RadioGroupItem value="fast" aria-label="Fast">
            <RadioGroupIndicator className="custom-radio-indicator" />
          </RadioGroupItem>
        </RadioGroup>
        <Switch aria-label="Enable automation" defaultChecked>
          <SwitchThumb className="custom-switch-thumb" />
        </Switch>
        <Tabs defaultValue="runs">
          <TabsList variant="segmented">
            <TabsTrigger value="runs">Runs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="runs">Recent runs</TabsContent>
          <TabsContent value="settings">Settings panel</TabsContent>
        </Tabs>
      </>
    );

    const group = screen.getByRole("radiogroup", { name: "Run mode" });
    expect(group).toHaveAttribute("data-slot", "radio-group");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(screen.getByRole("radio", { name: "Safe" })).toHaveAttribute(
      "data-state",
      "checked"
    );
    expect(document.querySelector('[data-slot="radio-group-indicator"]')).toHaveClass(
      "pds-radio-group-indicator"
    );

    const switchControl = screen.getByRole("switch", {
      name: "Enable automation"
    });
    expect(switchControl).toHaveAttribute("data-slot", "switch");
    expect(switchControl).toHaveAttribute("data-state", "checked");
    expect(document.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      "pds-switch-thumb",
      "custom-switch-thumb"
    );

    expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "segmented");
    expect(screen.getByRole("tab", { name: "Runs" })).toHaveAttribute(
      "data-state",
      "active"
    );
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "data-slot",
      "tabs-content"
    );
  });

  it("renders Menu, Popover, and ActionMenu overlay primitives", () => {
    render(
      <>
        <Menu open>
          <MenuTrigger>Open menu</MenuTrigger>
          <MenuContent>
            <MenuLabel>Run actions</MenuLabel>
            <MenuItem>
              Copy <MenuShortcut>⌘C</MenuShortcut>
            </MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem checked>Show archived</MenuCheckboxItem>
            <MenuRadioGroup value="safe">
              <MenuRadioItem value="safe">Safe mode</MenuRadioItem>
            </MenuRadioGroup>
            <MenuItem intent="danger">Delete</MenuItem>
          </MenuContent>
        </Menu>
        <Popover open>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent>
            Popover body
            <PopoverClose>Close popover</PopoverClose>
          </PopoverContent>
        </Popover>
        <ActionMenu open>
          <ActionMenuTrigger>Open actions</ActionMenuTrigger>
          <ActionMenuContent>
            <ActionMenuItem>
              Duplicate <ActionMenuShortcut>D</ActionMenuShortcut>
            </ActionMenuItem>
            <ActionMenuItem intent="danger">Remove</ActionMenuItem>
          </ActionMenuContent>
        </ActionMenu>
      </>
    );

    expect(screen.getByText("Open menu")).toHaveAttribute(
      "data-slot",
      "menu-trigger"
    );
    expect(document.querySelector('[data-slot="menu-content"]')).toHaveClass(
      "pds-menu-content"
    );
    expect(screen.getByText("Copy").closest('[data-slot="menu-item"]')).toHaveAttribute(
      "data-intent",
      "default"
    );
    expect(screen.getByText("⌘C")).toHaveAttribute("data-slot", "menu-shortcut");
    expect(screen.getByText("Show archived")).toHaveAttribute(
      "data-slot",
      "menu-checkbox-item"
    );
    expect(screen.getByText("Safe mode")).toHaveAttribute(
      "data-slot",
      "menu-radio-item"
    );
    expect(screen.getByText("Delete")).toHaveAttribute("data-intent", "danger");

    expect(screen.getByText("Open popover")).toHaveAttribute(
      "data-slot",
      "popover-trigger"
    );
    expect(screen.getByText("Popover body")).toHaveAttribute(
      "data-slot",
      "popover-content"
    );
    expect(screen.getByText("Close popover")).toHaveAttribute(
      "data-slot",
      "popover-close"
    );
    expect(document.querySelector('[data-slot="popover-arrow"]')).toBeInTheDocument();

    expect(screen.getByText("Open actions")).toHaveAttribute(
      "data-slot",
      "action-menu-trigger"
    );
    expect(screen.getByText("Duplicate").closest(
      '[data-slot="action-menu-item"]'
    )).toHaveClass("pds-action-menu-item");
    expect(screen.getByText("D")).toHaveAttribute(
      "data-slot",
      "action-menu-shortcut"
    );
    expect(screen.getByText("Remove")).toHaveAttribute("data-intent", "danger");
  });

  it("renders Skeleton, Progress, and InlineAlert feedback primitives", () => {
    render(
      <>
        <Skeleton className="custom-skeleton" shape="text" />
        <Progress aria-label="Run progress" value={40}>
          <ProgressIndicator className="custom-progress-indicator" />
        </Progress>
        <InlineAlert className="custom-alert" tone="danger">
          <InlineAlertTitle>Run failed</InlineAlertTitle>
          <InlineAlertDescription>Credentials expired.</InlineAlertDescription>
          <InlineAlertActions>
            <Button>Reconnect</Button>
          </InlineAlertActions>
        </InlineAlert>
      </>
    );

    expect(document.querySelector('[data-slot="skeleton"]')).toHaveAttribute(
      "data-shape",
      "text"
    );
    expect(document.querySelector('[data-slot="skeleton"]')).toHaveClass(
      "pds-skeleton",
      "custom-skeleton"
    );

    const progress = screen.getByRole("progressbar", { name: "Run progress" });
    expect(progress).toHaveAttribute("data-slot", "progress");
    expect(progress).toHaveStyle({ "--pds-progress-value": "40%" });
    expect(document.querySelector('[data-slot="progress-indicator"]')).toHaveClass(
      "pds-progress-indicator",
      "custom-progress-indicator"
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-tone", "danger");
    expect(alert).toHaveClass("pds-inline-alert", "custom-alert");
    expect(screen.getByText("Run failed")).toHaveAttribute(
      "data-slot",
      "inline-alert-title"
    );
    expect(screen.getByText("Credentials expired.")).toHaveAttribute(
      "data-slot",
      "inline-alert-description"
    );
    expect(screen.getByRole("button", { name: "Reconnect" }).closest(
      '[data-slot="inline-alert-actions"]'
    )).toHaveClass("pds-inline-alert-actions");
  });

  it("renders Table and DataList semantic data primitives", () => {
    render(
      <>
        <TableContainer className="custom-table-container">
          <Table density="compact">
            <TableCaption>Runs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Running</TableCell>
                <TableCell>Agent</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DataList density="compact">
          <DataListItem>
            <DataListTerm>Run ID</DataListTerm>
            <DataListDescription>run_123</DataListDescription>
          </DataListItem>
        </DataList>
      </>
    );

    expect(screen.getByText("Runs")).toHaveAttribute("data-slot", "table-caption");
    expect(screen.getByRole("table")).toHaveAttribute("data-density", "compact");
    expect(screen.getByText("Status")).toHaveAttribute("data-slot", "table-head");
    expect(screen.getByText("Running")).toHaveAttribute("data-slot", "table-cell");
    expect(document.querySelector('[data-slot="table-container"]')).toHaveClass(
      "pds-table-container",
      "custom-table-container"
    );

    expect(screen.getByText("Run ID")).toHaveAttribute(
      "data-slot",
      "data-list-term"
    );
    expect(screen.getByText("run_123")).toHaveAttribute(
      "data-slot",
      "data-list-description"
    );
    expect(document.querySelector('[data-slot="data-list"]')).toHaveAttribute(
      "data-density",
      "compact"
    );
  });

  it("renders Breadcrumbs and Pagination navigation primitives", () => {
    render(
      <>
        <Breadcrumbs>
          <BreadcrumbsList>
            <BreadcrumbsItem>
              <BreadcrumbsLink href="/runs">Runs</BreadcrumbsLink>
              <BreadcrumbsSeparator />
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbsEllipsis />
              <BreadcrumbsSeparator />
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbsPage>Run 123</BreadcrumbsPage>
            </BreadcrumbsItem>
          </BreadcrumbsList>
        </Breadcrumbs>
        <Pagination>
          <PaginationList>
            <PaginationItem>
              <PaginationPrevious href="?page=1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=2" isCurrent>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="?page=3" />
            </PaginationItem>
          </PaginationList>
        </Pagination>
      </>
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveAttribute(
      "data-slot",
      "breadcrumbs"
    );
    expect(screen.getByRole("link", { name: "Runs" })).toHaveAttribute(
      "data-slot",
      "breadcrumbs-link"
    );
    expect(screen.getByText("Run 123")).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByLabelText("More pages")[0]).toHaveAttribute(
      "data-slot",
      "breadcrumbs-ellipsis"
    );

    expect(screen.getByRole("navigation", { name: "Pagination" })).toHaveAttribute(
      "data-slot",
      "pagination"
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "data-slot",
      "pagination-previous"
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "data-slot",
      "pagination-next"
    );
  });
});
