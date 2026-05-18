import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const packageStyles = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");
const componentStyles = readFileSync(
  resolve(process.cwd(), "src/components.css"),
  "utf8"
);
const tokenColours = readFileSync(
  resolve(process.cwd(), "../tokens/src/colour.css"),
  "utf8"
);
const tokenElevation = readFileSync(
  resolve(process.cwd(), "../tokens/src/elevation.css"),
  "utf8"
);

describe("PDS CSS contract", () => {
  function escapeSelector(selector: string) {
    return selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  it("loads token CSS before component CSS through @pds/react/styles.css", () => {
    expect(packageStyles.trim().split(/\n+/)).toEqual([
      '@import "@pds/tokens/styles.css";',
      '@import "./components.css";'
    ]);
  });

  it("contains required starter component selectors and data-state hooks", () => {
    const requiredSelectors = [
      ".pds-button",
      '.pds-button[data-size="sm"]',
      '.pds-button[data-intent="primary"]',
      '.pds-button[data-intent="danger"]',
      ".pds-action-menu-content",
      ".pds-action-menu-item",
      '.pds-action-menu-item[data-intent="danger"]',
      ".pds-badge",
      '.pds-badge[data-tone="success"]',
      '.pds-badge[data-emphasis="outline"]',
      ".pds-breadcrumbs",
      ".pds-breadcrumbs-link",
      ".pds-cell",
      '.pds-cell[data-variant="disclosure"]',
      '.pds-cell[data-variant="choice"]',
      '.pds-cell[data-variant="choice"][aria-pressed="true"]::after',
      '.pds-cell[data-variant="compact"]',
      '.pds-cell[data-variant="accent"]',
      '.pds-cell[data-variant="nested"]',
      '.pds-cell[aria-pressed="true"]',
      '.pds-cell[data-inactive="true"]',
      ".pds-avatar",
      '.pds-avatar[data-size="lg"]',
      ".pds-avatar-group-count",
      ".pds-checkbox",
      '.pds-checkbox[data-state="checked"]',
      '.pds-checkbox[aria-invalid="true"]',
      ".pds-data-list",
      ".pds-data-list-item",
      ".pds-surface",
      '.pds-surface[data-level="nested"]',
      ".pds-inline-alert",
      '.pds-inline-alert[data-tone="danger"]',
      ".pds-menu-content",
      ".pds-menu-item",
      '.pds-menu-item[data-intent="danger"]',
      ".pds-pagination",
      ".pds-pagination-link",
      '.pds-pagination-link[data-current="true"]',
      ".pds-popover-content",
      ".pds-progress",
      ".pds-progress-indicator",
      '.pds-progress[data-indeterminate="true"] .pds-progress-indicator',
      ".pds-radio-group",
      ".pds-radio-group-item",
      '.pds-radio-group-item[data-state="checked"]',
      ".pds-run-status",
      ".pds-select-trigger",
      '.pds-select-trigger[data-density="compact"]',
      ".pds-select-content",
      ".pds-select-item",
      '.pds-select-item[data-state="checked"]',
      ".pds-skeleton",
      '.pds-skeleton[data-shape="text"]',
      ".pds-switch",
      '.pds-switch[data-state="checked"]',
      ".pds-table",
      ".pds-table-container",
      ".pds-tabs",
      ".pds-tabs-list",
      '.pds-tabs-list[data-variant="segmented"]',
      ".pds-tabs-trigger",
      '.pds-tabs-trigger[data-state="active"]',
      ".pds-message",
      '.pds-message[data-role="user"]',
      '.pds-message[data-role="system"]',
      '.pds-message[data-variant="compact"]',
      ".pds-message-avatar",
      ".pds-message-header",
      ".pds-message-author",
      ".pds-message-meta",
      ".pds-message-content",
      ".pds-message-actions",
      ".pds-transcript",
      '.pds-transcript[data-density="compact"]',
      ".pds-transcript-list",
      ".pds-transcript-empty",
      ".pds-composer",
      '.pds-composer[data-busy="true"]',
      '.pds-composer[data-disabled="true"]',
      '.pds-composer[data-invalid="true"]',
      ".pds-composer-input",
      ".pds-composer-actions",
      ".pds-composer-footer",
      ".pds-tooltip-content",
      ".pds-toast-viewport",
      ".pds-toast",
      '.pds-toast[data-tone="success"]',
      '.pds-toast[data-tone="warning"]',
      '.pds-toast[data-tone="danger"]',
      '.pds-toast[data-state="open"]',
      '.pds-toast[data-swipe="move"]',
      ".pds-toast-title",
      ".pds-toast-description",
      ".pds-toast-action",
      ".pds-toast-close",
      ".pds-dialog-overlay",
      ".pds-dialog-content",
      ".pds-bottom-sheet-overlay",
      ".pds-bottom-sheet-content",
      ".pds-bottom-sheet-header",
      ".pds-bottom-sheet-body",
      ".pds-bottom-sheet-footer",
      ".pds-bottom-sheet-title",
      ".pds-bottom-sheet-description",
      ".pds-input",
      '.pds-input[data-density="compact"]',
      ".pds-textarea",
      '.pds-textarea[data-density="compact"]',
      '.pds-input[aria-invalid="true"]',
      '.pds-textarea[aria-invalid="true"]',
      '.pds-input[aria-invalid="true"]:focus-visible',
      '.pds-textarea[aria-invalid="true"]:focus-visible',
      "@media (prefers-reduced-motion: reduce)",
      "@media (max-width: 480px)"
    ];

    for (const selector of requiredSelectors) {
      expect(componentStyles).toContain(selector);
    }
  });

  it("uses shared state tokens for control states", () => {
    const requiredStateTokens = [
      "--pds-color-state-layer-hover:",
      "--pds-color-state-layer-pressed:",
      "--pds-color-state-layer-selected:",
      "--pds-color-state-layer-on-solid-hover:",
      "--pds-color-state-layer-on-solid-pressed:",
      "--pds-color-state-focus-ring:",
      "--pds-color-state-invalid-ring:",
      "--pds-state-disabled-opacity:"
    ];

    for (const token of requiredStateTokens) {
      expect(tokenColours).toContain(token);
    }

    expect(tokenElevation).toContain("var(--pds-color-state-focus-ring)");
    expect(componentStyles).toContain("var(--pds-color-state-layer-hover)");
    expect(componentStyles).toContain("var(--pds-color-state-layer-pressed)");
    expect(componentStyles).toContain(
      "var(--pds-color-state-layer-on-solid-hover)"
    );
    expect(componentStyles).toContain(
      "var(--pds-color-state-layer-on-solid-pressed)"
    );
    expect(componentStyles).toContain("var(--pds-color-state-invalid-ring)");
    expect(componentStyles).toContain("var(--pds-state-disabled-opacity)");
    expect(componentStyles).not.toContain("var(--pds-color-accent-hover)");
    expect(componentStyles).not.toContain("var(--pds-color-status-danger-hover)");
  });

  it("does not use brand or performance colors in component CSS", () => {
    expect(componentStyles).not.toMatch(/--pds-color-brand-/);
    expect(componentStyles).not.toMatch(/--pds-color-performance-/);
  });

  it("does not introduce Tailwind, CVA, or shadcn styling hooks", () => {
    expect(componentStyles).not.toMatch(/\btailwind\b/i);
    expect(componentStyles).not.toMatch(/\bcva\b/i);
    expect(componentStyles).not.toMatch(/\bshadcn\b/i);
  });

  it("keeps text-bearing components resilient in narrow containers", () => {
    const resilientSelectors = [
      ".pds-button",
      ".pds-badge",
      ".pds-action-menu-content",
      ".pds-action-menu-item",
      ".pds-breadcrumbs",
      ".pds-breadcrumbs-link",
      ".pds-breadcrumbs-page",
      ".pds-cell",
      ".pds-data-list",
      ".pds-data-list-item",
      ".pds-data-list-term",
      ".pds-data-list-description",
      ".pds-surface",
      ".pds-surface-title",
      ".pds-surface-description",
      ".pds-surface-content",
      ".pds-run-status",
      ".pds-message",
      ".pds-message-header",
      ".pds-message-author",
      ".pds-message-meta",
      ".pds-message-content",
      ".pds-message-actions",
      ".pds-transcript",
      ".pds-transcript-list",
      ".pds-transcript-empty",
      ".pds-composer",
      ".pds-composer-actions",
      ".pds-composer-footer",
      ".pds-inline-alert",
      ".pds-inline-alert-title",
      ".pds-inline-alert-description",
      ".pds-inline-alert-actions",
      ".pds-menu-content",
      ".pds-menu-item",
      ".pds-pagination",
      ".pds-pagination-link",
      ".pds-popover-content",
      ".pds-radio-group",
      ".pds-select-trigger",
      ".pds-select-content",
      ".pds-select-item",
      ".pds-table",
      ".pds-table-caption",
      ".pds-table-head",
      ".pds-table-cell",
      ".pds-tabs",
      ".pds-tabs-trigger",
      ".pds-tabs-content",
      ".pds-tooltip-content",
      ".pds-toast",
      ".pds-toast-title",
      ".pds-toast-description",
      ".pds-toast-action",
      ".pds-dialog-content",
      ".pds-dialog-title",
      ".pds-dialog-description",
      ".pds-bottom-sheet-content",
      ".pds-bottom-sheet-header",
      ".pds-bottom-sheet-body",
      ".pds-bottom-sheet-footer",
      ".pds-bottom-sheet-title",
      ".pds-bottom-sheet-description"
    ];

    for (const selector of resilientSelectors) {
      expect(componentStyles).toMatch(
        new RegExp(`${escapeSelector(selector)}\\s*{[^}]*overflow-wrap: anywhere;`)
      );
    }
  });

  it("does not impose fixed transcript height", () => {
    const transcriptBlock = componentStyles.match(/\.pds-transcript\s*{[^}]*}/)?.[0];

    expect(transcriptBlock).toBeDefined();
    expect(transcriptBlock).not.toMatch(/(^|\s)height:/);
    expect(transcriptBlock).not.toMatch(/max-height:/);
  });

  it("does not apply hover treatments to disabled controls", () => {
    expect(componentStyles).toContain(
      '.pds-button[data-intent="primary"]:not(:disabled, [aria-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      '.pds-button[data-intent="primary"]:not(:disabled, [aria-disabled="true"]):active'
    );
    expect(componentStyles).toContain(
      '.pds-cell:is(button, a, label, [role="button"]):not(:disabled, [aria-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      '.pds-cell:is(button, a, label, [role="button"]):not(:disabled, [aria-disabled="true"]):active'
    );
    expect(componentStyles).not.toContain("--pds-cell-background");
    expect(componentStyles).toContain(".pds-input:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-textarea:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-select-trigger:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-checkbox:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-radio-group-item:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-switch:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-tabs-trigger:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-dialog-close:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-dialog-close:not(:disabled):active");
    expect(componentStyles).toContain(".pds-toast-action:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-toast-close:not(:disabled):hover");
    expect(componentStyles).toContain(
      ".pds-bottom-sheet-close:not(:disabled):hover"
    );
  });
});
