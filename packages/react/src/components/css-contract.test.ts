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
      ".pds-icon",
      ".material-symbols-rounded",
      '.pds-button[data-size="sm"]',
      '.pds-button[data-intent="primary"]',
      '.pds-button[data-intent="danger"]',
      ".pds-action-menu-content",
      ".pds-action-menu-item",
      '.pds-action-menu-item[data-intent="danger"]',
      ".pds-action-widget",
      ".pds-action-widget-title",
      ".pds-action-widget-avatar",
      ".pds-action-widget-content",
      ".pds-action-widget-actions",
      '.pds-action-widget-actions[data-justify="center"]',
      ".pds-travel-widget",
      '.pds-travel-widget[data-variant="small"]',
      '.pds-travel-widget[data-variant="small"]:has(.pds-travel-widget-action) .pds-travel-widget-body',
      ".pds-travel-widget-control",
      ".pds-travel-widget-media",
      ".pds-travel-widget-body",
      ".pds-travel-widget-title",
      ".pds-travel-widget-details",
      ".pds-travel-widget-description",
      ".pds-travel-widget-content",
      ".pds-travel-widget-action",
      ".pds-travel-widget-carousel",
      ".pds-travel-widget-carousel-button",
      ".pds-travel-widget-carousel-status",
      ".pds-travel-widget-skeleton-media",
      ".pds-travel-widget-skeleton-title",
      ".pds-travel-widget-skeleton-content",
      ".pds-badge",
      '.pds-badge[data-tone="success"]',
      '.pds-badge[data-emphasis="outline"]',
      ".pds-filter-chip",
      '.pds-filter-chip[data-active="true"]',
      ".pds-filter-chip-action",
      ".pds-filter-chip-icon",
      ".pds-filter-chip-label",
      ".pds-filter-chip-separator",
      ".pds-filter-chip-count",
      ".pds-filter-chip-remove",
      ".pds-filter-chip-notification",
      ".pds-breadcrumbs",
      ".pds-breadcrumbs-link",
      ".pds-page-header",
      ".pds-page-header-breadcrumbs",
      ".pds-page-header-content",
      ".pds-page-header-text",
      ".pds-page-header-title",
      ".pds-page-header-description",
      ".pds-page-header-meta",
      ".pds-page-header-actions",
      ".pds-cell",
      '.pds-cell[data-variant="disclosure"]',
      '.pds-cell[data-variant="choice"]',
      '.pds-cell[data-variant="choice"][aria-pressed="true"]::after',
      '.pds-cell[data-variant="compact"]',
      '.pds-cell[data-variant="accent"]',
      '.pds-cell[data-variant="nested"]',
      '.pds-cell[aria-pressed="true"]',
      '.pds-cell[data-inactive="true"]',
      ".pds-item",
      ".pds-item-icon",
      '.pds-item-icon[data-tone="accent"]',
      ".pds-item-content",
      ".pds-item-title",
      ".pds-item-description",
      ".pds-item-actions",
      ".pds-item-side",
      ".pds-item-value",
      '.pds-item-value[data-variant="secondary"]',
      '.pds-item-value[data-tone="success"]',
      ".pds-item-input",
      ".pds-item-skeleton-avatar",
      ".pds-item-skeleton-title",
      ".pds-item-skeleton-description",
      ".pds-item-skeleton-value",
      ".pds-avatar",
      '.pds-avatar[data-size="lg"]',
      ".pds-avatar-group-count",
      ".pds-amount",
      ".pds-amount-currency.pds-cell",
      '.pds-amount-currency[aria-invalid="true"]',
      ".pds-amount-input",
      '.pds-amount-input[data-invalid="true"]',
      ".pds-amount-input-control.pds-input",
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

  it("uses Google Material Symbols Rounded for PDS icons", () => {
    expect(componentStyles).toContain("Material+Symbols+Rounded");
    expect(componentStyles).toContain(".material-symbols-rounded");
    expect(componentStyles).toContain(".pds-icon");
    expect(componentStyles).toContain('"FILL" 0');
    expect(componentStyles).toContain('"wght" 400');
    expect(componentStyles).toContain('"GRAD" 0');
    expect(componentStyles).toContain('"opsz" 24');
  });

  it("keeps Button fixed-height and single-line", () => {
    const buttonBlock = componentStyles.match(/\.pds-button\s*{[^}]*}/)?.[0];
    const smallBlock = componentStyles.match(
      /\.pds-button\[data-size="sm"\]\s*{[^}]*}/
    )?.[0];
    const mediumBlock = componentStyles.match(
      /\.pds-button\[data-size="md"\]\s*{[^}]*}/
    )?.[0];
    const largeBlock = componentStyles.match(
      /\.pds-button\[data-size="lg"\]\s*{[^}]*}/
    )?.[0];

    expect(buttonBlock).toBeDefined();
    expect(buttonBlock).toContain("box-sizing: border-box;");
    expect(buttonBlock).toContain("white-space: nowrap;");
    expect(buttonBlock).toContain("text-overflow: ellipsis;");
    expect(buttonBlock).not.toContain("white-space: normal;");

    expect(smallBlock).toContain("height: 32px;");
    expect(mediumBlock).toContain("height: 36px;");
    expect(largeBlock).toContain("height: 44px;");
    expect(smallBlock).not.toContain("min-height:");
    expect(mediumBlock).not.toContain("min-height:");
    expect(largeBlock).not.toContain("min-height:");
  });

  it("keeps text-bearing components resilient in narrow containers", () => {
    const resilientSelectors = [
      ".pds-badge",
      ".pds-filter-chip",
      ".pds-filter-chip-action",
      ".pds-filter-chip-label",
      ".pds-action-menu-content",
      ".pds-action-menu-item",
      ".pds-action-widget",
      ".pds-action-widget-title",
      ".pds-action-widget-avatar",
      ".pds-action-widget-content",
      ".pds-action-widget-actions",
      ".pds-travel-widget",
      ".pds-travel-widget-control",
      ".pds-travel-widget-media",
      ".pds-travel-widget-body",
      ".pds-travel-widget-title",
      ".pds-travel-widget-details",
      ".pds-travel-widget-description",
      ".pds-travel-widget-content",
      ".pds-travel-widget-action",
      ".pds-travel-widget-carousel",
      ".pds-travel-widget-carousel-status",
      ".pds-travel-widget-skeleton-content",
      ".pds-breadcrumbs",
      ".pds-breadcrumbs-link",
      ".pds-breadcrumbs-page",
      ".pds-cell",
      ".pds-item",
      ".pds-item-icon",
      ".pds-item-prefix",
      ".pds-item-avatar",
      ".pds-item-content",
      ".pds-item-title",
      ".pds-item-description",
      ".pds-item-actions",
      ".pds-item-side",
      ".pds-item-value",
      ".pds-item-input",
      ".pds-item-skeleton-content",
      ".pds-item-skeleton-side",
      ".pds-item-skeleton-actions",
      ".pds-amount",
      ".pds-amount-currency.pds-cell",
      ".pds-amount-currency-body",
      ".pds-amount-currency-value",
      ".pds-amount-currency-description",
      ".pds-amount-currency-error",
      ".pds-amount-input",
      ".pds-amount-input-description",
      ".pds-amount-input-error",
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

  it("keeps structural widgets filling their available container width", () => {
    const actionWidgetBlock = componentStyles.match(
      /\.pds-action-widget\s*{[^}]*}/
    )?.[0];
    const travelWidgetBlock = componentStyles.match(
      /\.pds-travel-widget\s*{[^}]*}/
    )?.[0];

    expect(actionWidgetBlock).toBeDefined();
    expect(actionWidgetBlock).toContain("width: 100%;");
    expect(travelWidgetBlock).toBeDefined();
    expect(travelWidgetBlock).toContain("width: 100%;");
  });

  it("does not apply hover treatments to disabled controls", () => {
    expect(componentStyles).toContain(
      '.pds-button[data-intent="primary"]:not(:disabled, [aria-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      '.pds-button[data-intent="primary"]:not(:disabled, [aria-disabled="true"]):active'
    );
    expect(componentStyles).toContain(
      '.pds-filter-chip:not([data-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      '.pds-filter-chip:not([data-disabled="true"]):active'
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
    expect(componentStyles).toContain(
      '.pds-amount-currency.pds-cell:is(button, a, label, [role="button"]):not(:disabled, [aria-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      '.pds-amount-input:not([data-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      '.pds-travel-widget:has(.pds-travel-widget-control:is(button, a, [role="button"]):not(:disabled, [aria-disabled="true"]):hover)'
    );
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
