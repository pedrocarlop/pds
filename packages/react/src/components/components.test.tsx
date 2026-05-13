import "@testing-library/jest-dom/vitest";

import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Button,
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
  Input,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceFooter,
  SurfaceHeader,
  SurfaceTitle,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
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
});
