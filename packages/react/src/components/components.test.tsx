import "@testing-library/jest-dom/vitest";

import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Input,
  Surface,
  SurfaceContent,
  SurfaceHeader,
  SurfaceTitle,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../index";

describe("PDS starter components", () => {
  it("renders Button with PDS data attributes and forwards refs", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <Button ref={ref} className="custom-button" intent="secondary" size="lg">
        Run
      </Button>
    );

    const button = screen.getByRole("button", { name: "Run" });
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("data-intent", "secondary");
    expect(button).toHaveAttribute("data-size", "lg");
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

  it("renders Badge with tone and emphasis", () => {
    render(
      <Badge emphasis="outline" tone="success">
        Live
      </Badge>
    );

    const badge = screen.getByText("Live");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-tone", "success");
    expect(badge).toHaveAttribute("data-emphasis", "outline");
  });

  it("renders Avatar primitives", () => {
    render(
      <Avatar size="lg">
        <AvatarFallback>PC</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByText("PC").closest('[data-slot="avatar"]');
    expect(avatar).toHaveAttribute("data-size", "lg");
    expect(screen.getByText("PC")).toHaveAttribute(
      "data-slot",
      "avatar-fallback"
    );
  });

  it("renders Surface composition", () => {
    render(
      <Surface level="elevated">
        <SurfaceHeader>
          <SurfaceTitle>Transcript</SurfaceTitle>
        </SurfaceHeader>
        <SurfaceContent>Messages</SurfaceContent>
      </Surface>
    );

    expect(screen.getByText("Transcript")).toHaveAttribute(
      "data-slot",
      "surface-title"
    );
    expect(screen.getByText("Messages")).toHaveAttribute(
      "data-slot",
      "surface-content"
    );
  });

  it("maps Input invalid state to accessibility attributes", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} invalid density="compact" aria-label="Prompt" />);

    const input = screen.getByLabelText("Prompt");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveAttribute("data-density", "compact");
    expect(ref.current).toBe(input);
  });

  it("maps Textarea invalid state to accessibility attributes", () => {
    render(<Textarea invalid aria-label="Message" />);

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("data-invalid", "true");
  });

  it("wires Dialog primitives", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Confirm run</DialogTitle>
          <DialogDescription>Start this agent run?</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toHaveAttribute(
      "data-slot",
      "dialog-content"
    );
    expect(screen.getByText("Confirm run")).toHaveAttribute(
      "data-slot",
      "dialog-title"
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "dialog-close"
    );
  });

  it("wires Tooltip primitives", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Details</TooltipTrigger>
          <TooltipContent>Agent status</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByText("Details")).toHaveAttribute(
      "data-slot",
      "tooltip-trigger"
    );
    expect(document.querySelector('[data-slot="tooltip-content"]')).toHaveTextContent(
      "Agent status"
    );
  });
});
