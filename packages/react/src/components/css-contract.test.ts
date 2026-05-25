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
      ".pds-button-group",
      '.pds-button-group[data-orientation="vertical"]',
      ".pds-button-group-text",
      '.pds-button-group-separator.pds-separator[data-orientation="vertical"]',
      ".pds-calendar",
      ".pds-calendar-nav-button",
      ".pds-calendar-day-button",
      '.pds-calendar-day-button[data-selected-single="true"]',
      ".pds-calendar-range-middle",
      ".pds-card",
      '.pds-card[data-size="sm"]',
      ".pds-card-header",
      ".pds-card-title",
      ".pds-card-description",
      ".pds-card-action",
      ".pds-card-content",
      ".pds-card-footer",
      ".pds-carousel",
      ".pds-carousel-content",
      ".pds-carousel-item",
      ".pds-carousel-button",
      '.pds-carousel-content[data-orientation="vertical"]',
      ".pds-chart",
      ".pds-chart-tooltip",
      ".pds-chart-tooltip-indicator",
      '.pds-chart-tooltip-indicator[data-indicator="dashed"]',
      ".pds-chart-legend",
      ".pds-command",
      ".pds-command-dialog-content.pds-dialog-content",
      ".pds-command-input-wrapper",
      ".pds-command-input",
      ".pds-command-list",
      ".pds-command-empty",
      ".pds-command-group",
      ".pds-command-group [cmdk-group-heading]",
      ".pds-command-item",
      '.pds-command-item[data-selected="true"]',
      '.pds-command-item[data-checked="true"]',
      ".pds-command-item-indicator",
      ".pds-command-shortcut",
      ".pds-command-separator",
      ".pds-combobox-input-group",
      ".pds-combobox-trigger",
      ".pds-combobox-clear",
      ".pds-combobox-content",
      ".pds-combobox-list",
      ".pds-combobox-group",
      ".pds-combobox-label",
      ".pds-combobox-item",
      ".pds-combobox-item[data-highlighted]",
      ".pds-combobox-item[data-selected]",
      ".pds-combobox-item-indicator",
      ".pds-combobox-separator",
      ".pds-combobox-empty",
      ".pds-combobox-chips",
      ".pds-combobox-chip",
      ".pds-combobox-chip-remove",
      ".pds-combobox-chip-input",
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
      ".pds-alert",
      '.pds-alert[data-tone="danger"]',
      ".pds-alert-title",
      ".pds-alert-description",
      ".pds-alert-action",
      ".pds-filter-chip",
      '.pds-filter-chip[data-active="true"]',
      ".pds-filter-chip-action",
      ".pds-filter-chip-icon",
      ".pds-filter-chip-label",
      ".pds-filter-chip-separator",
      ".pds-filter-chip-count",
      ".pds-filter-chip-remove",
      ".pds-filter-chip-notification",
      ".pds-breadcrumb",
      ".pds-breadcrumb-link",
      ".pds-breadcrumb-page",
      ".pds-breadcrumb-ellipsis",
      ".pds-breadcrumb-separator",
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
      ".pds-dropdown-menu-content",
      ".pds-dropdown-menu-item",
      '.pds-dropdown-menu-item[data-intent="danger"]',
      ".pds-context-menu-trigger",
      ".pds-context-menu-content",
      ".pds-context-menu-item",
      '.pds-context-menu-item[data-intent="danger"]',
      ".pds-menubar",
      ".pds-menubar-trigger",
      ".pds-menubar-content",
      ".pds-menubar-item",
      '.pds-menubar-item[data-intent="danger"]',
      ".pds-navigation-menu",
      ".pds-navigation-menu-list",
      ".pds-navigation-menu-trigger",
      '.pds-navigation-menu-trigger[data-state="open"]',
      ".pds-navigation-menu-content",
      ".pds-navigation-menu-link",
      ".pds-navigation-menu-viewport",
      ".pds-navigation-menu-indicator",
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
      ".pds-accordion",
      ".pds-accordion-item",
      ".pds-accordion-trigger",
      '.pds-accordion-trigger[data-state="open"] .pds-accordion-trigger-icon',
      ".pds-accordion-content",
      '.pds-accordion-content[data-state="open"]',
      ".pds-accordion-content-inner",
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
      ".pds-toaster",
      ".pds-sonner-toast",
      ".pds-sonner-success",
      ".pds-sonner-title",
      ".pds-sonner-description",
      ".pds-sonner-action-button",
      ".pds-sonner-cancel-button",
      ".pds-sonner-close-button",
      ".pds-alert-dialog-overlay",
      ".pds-alert-dialog-content",
      ".pds-alert-dialog-header",
      ".pds-alert-dialog-footer",
      ".pds-alert-dialog-media",
      ".pds-alert-dialog-title",
      ".pds-alert-dialog-description",
      ".pds-dialog-overlay",
      ".pds-dialog-content",
      ".pds-sheet-overlay",
      ".pds-sheet-content",
      ".pds-sheet-header",
      ".pds-sheet-body",
      ".pds-sheet-footer",
      ".pds-sheet-title",
      ".pds-sheet-description",
      ".pds-drawer-overlay",
      ".pds-drawer-content",
      ".pds-drawer-handle",
      ".pds-drawer-header",
      ".pds-drawer-body",
      ".pds-drawer-footer",
      ".pds-drawer-title",
      ".pds-drawer-description",
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
      ".pds-input-group",
      '.pds-input-group:has([data-slot="input-group-control"]:focus-visible)',
      '.pds-input-group:has([aria-invalid="true"])',
      ".pds-input-group-addon",
      '.pds-input-group-addon[data-align="block-start"]',
      ".pds-input-group-control.pds-input",
      ".pds-input-group-button",
      '.pds-input-group-button[data-input-group-size="icon-xs"]',
      ".pds-input-group-text",
      ".pds-input-otp",
      ".pds-input-otp-control",
      ".pds-input-otp-group",
      ".pds-input-otp-slot",
      '.pds-input-otp-slot[data-active="true"]',
      '.pds-input-otp:has(.pds-input-otp-control[aria-invalid="true"]) .pds-input-otp-slot',
      ".pds-input-otp-separator",
      ".pds-label",
      ".pds-field-set",
      ".pds-field-legend",
      '.pds-field-legend[data-variant="label"]',
      ".pds-field-group",
      ".pds-field",
      '.pds-field[data-orientation="horizontal"]',
      '.pds-field[data-invalid="true"] .pds-field-label',
      ".pds-field-content",
      ".pds-field-label",
      ".pds-field-title",
      ".pds-field-description",
      ".pds-field-error",
      ".pds-field-separator",
      ".pds-field-separator-content",
      ".pds-separator",
      '.pds-separator[data-orientation="vertical"]',
      ".pds-sidebar-wrapper",
      ".pds-sidebar",
      ".pds-sidebar-shell",
      '.pds-sidebar-shell[data-collapsible="icon"] .pds-sidebar-container',
      ".pds-sidebar-mobile.pds-sheet-content[data-mobile=\"true\"]",
      ".pds-sidebar-trigger",
      ".pds-sidebar-rail",
      ".pds-sidebar-inset",
      ".pds-sidebar-input",
      ".pds-sidebar-content",
      ".pds-sidebar-group",
      ".pds-sidebar-group-label",
      ".pds-sidebar-group-action",
      ".pds-sidebar-group-content",
      ".pds-sidebar-menu",
      ".pds-sidebar-menu-button",
      '.pds-sidebar-menu-button[data-active="true"]',
      ".pds-sidebar-menu-action",
      ".pds-sidebar-menu-badge",
      ".pds-sidebar-menu-skeleton",
      ".pds-sidebar-menu-sub",
      ".pds-sidebar-menu-sub-button",
      ".pds-resizable-panel-group",
      '.pds-resizable-panel-group[data-orientation="vertical"]',
      ".pds-resizable-panel",
      ".pds-resizable-handle",
      ".pds-resizable-handle-grip",
      ".pds-kbd",
      ".pds-kbd-group",
      ".pds-empty",
      ".pds-empty-header",
      ".pds-empty-media",
      '.pds-empty-media[data-variant="icon"]',
      ".pds-empty-title",
      ".pds-empty-description",
      ".pds-empty-content",
      ".pds-spinner",
      '.pds-spinner[data-size="lg"]',
      ".pds-aspect-ratio",
      '.pds-aspect-ratio[data-fit="contain"] > :is(img, video, canvas, iframe, picture)',
      ".pds-scroll-area",
      ".pds-scroll-area-viewport",
      ".pds-scroll-area-scrollbar",
      '.pds-scroll-area-scrollbar[data-orientation="horizontal"]',
      ".pds-scroll-area-thumb",
      ".pds-scroll-area-corner",
      ".pds-native-select-wrapper",
      ".pds-native-select",
      '.pds-native-select[data-size="sm"]',
      '.pds-native-select[aria-invalid="true"]',
      ".pds-native-select-icon",
      ".pds-slider",
      ".pds-slider-track",
      ".pds-slider-range",
      ".pds-slider-thumb",
      '.pds-slider[data-orientation="vertical"]',
      ".pds-toggle",
      '.pds-toggle[data-state="on"]',
      '.pds-toggle[data-variant="outline"]',
      '.pds-toggle[aria-invalid="true"]',
      ".pds-toggle-group",
      '.pds-toggle-group[data-spacing="joined"]',
      ".pds-toggle-group-item",
      ".pds-collapsible-trigger",
      ".pds-collapsible-content",
      '.pds-collapsible-content[data-state="open"]',
      ".pds-hover-card-content",
      ".pds-hover-card-arrow",
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
      ".pds-button-group",
      ".pds-button-group-text",
      ".pds-card",
      ".pds-card-header",
      ".pds-card-title",
      ".pds-card-description",
      ".pds-card-action",
      ".pds-card-content",
      ".pds-card-footer",
      ".pds-command",
      ".pds-command-input-wrapper",
      ".pds-command-input",
      ".pds-command-list",
      ".pds-command-empty",
      ".pds-command-group",
      ".pds-command-group [cmdk-group-heading]",
      ".pds-command-item",
      ".pds-combobox-content",
      ".pds-combobox-list",
      ".pds-combobox-group",
      ".pds-combobox-label",
      ".pds-combobox-item",
      ".pds-combobox-empty",
      ".pds-combobox-chips",
      ".pds-combobox-chip",
      ".pds-combobox-chip-input",
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
      ".pds-breadcrumb",
      ".pds-breadcrumb-link",
      ".pds-breadcrumb-page",
      ".pds-breadcrumb-ellipsis",
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
      ".pds-input-group",
      ".pds-input-group-addon",
      ".pds-input-group-text",
      ".pds-input-otp",
      ".pds-input-otp-group",
      ".pds-input-otp-slot",
      ".pds-input-otp-separator",
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
      ".pds-alert",
      ".pds-alert-title",
      ".pds-alert-description",
      ".pds-alert-action",
      ".pds-menu-content",
      ".pds-menu-item",
      ".pds-dropdown-menu-content",
      ".pds-dropdown-menu-item",
      ".pds-context-menu-trigger",
      ".pds-context-menu-content",
      ".pds-context-menu-item",
      ".pds-menubar",
      ".pds-menubar-trigger",
      ".pds-menubar-content",
      ".pds-menubar-item",
      ".pds-navigation-menu",
      ".pds-navigation-menu-list",
      ".pds-navigation-menu-item",
      ".pds-navigation-menu-trigger",
      ".pds-navigation-menu-content",
      ".pds-navigation-menu-link",
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
      ".pds-accordion",
      ".pds-accordion-trigger",
      ".pds-accordion-trigger-label",
      ".pds-accordion-content",
      ".pds-accordion-content-inner",
      ".pds-collapsible-trigger",
      ".pds-collapsible-content",
      ".pds-hover-card-content",
      ".pds-scroll-area",
      ".pds-scroll-area-viewport",
      ".pds-resizable-panel-group",
      ".pds-resizable-panel",
      ".pds-tooltip-content",
      ".pds-toast",
      ".pds-toast-title",
      ".pds-toast-description",
      ".pds-toast-action",
      ".pds-sonner-toast",
      ".pds-sonner-title",
      ".pds-sonner-description",
      ".pds-sonner-action-button",
      ".pds-sonner-cancel-button",
      ".pds-alert-dialog-content",
      ".pds-alert-dialog-header",
      ".pds-alert-dialog-footer",
      ".pds-alert-dialog-media",
      ".pds-alert-dialog-title",
      ".pds-alert-dialog-description",
      ".pds-dialog-content",
      ".pds-dialog-title",
      ".pds-dialog-description",
      ".pds-sheet-content",
      ".pds-sheet-header",
      ".pds-sheet-body",
      ".pds-sheet-footer",
      ".pds-sheet-title",
      ".pds-sheet-description",
      ".pds-drawer-content",
      ".pds-drawer-header",
      ".pds-drawer-body",
      ".pds-drawer-footer",
      ".pds-drawer-title",
      ".pds-drawer-description",
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
    expect(componentStyles).toContain(".pds-input-group:not([data-disabled]):hover");
    expect(componentStyles).toContain(
      ".pds-combobox-trigger:not([data-disabled]):hover"
    );
    expect(componentStyles).toContain(
      ".pds-combobox-clear:not([data-disabled]):hover"
    );
    expect(componentStyles).toContain(
      ".pds-combobox-chip-remove:not([data-disabled]):hover"
    );
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
    expect(componentStyles).toContain(
      ".pds-navigation-menu-trigger:not(:disabled):hover"
    );
    expect(componentStyles).toContain(
      ".pds-calendar-nav-button:not(:disabled):hover"
    );
    expect(componentStyles).toContain(
      ".pds-sidebar-group-action:not(:disabled):hover"
    );
    expect(componentStyles).toContain(
      ".pds-sidebar-menu-button:not(:disabled):hover"
    );
    expect(componentStyles).toContain(".pds-sidebar-menu-sub-button:hover");
    expect(componentStyles).toContain(
      ".pds-accordion-trigger:not(:disabled):hover"
    );
    expect(componentStyles).toContain(
      ".pds-collapsible-trigger:not(:disabled):hover"
    );
    expect(componentStyles).toContain(".pds-dialog-close:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-dialog-close:not(:disabled):active");
    expect(componentStyles).toContain(".pds-sheet-close:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-sheet-close:not(:disabled):active");
    expect(componentStyles).toContain(".pds-drawer-close:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-drawer-close:not(:disabled):active");
    expect(componentStyles).toContain(".pds-toast-action:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-toast-close:not(:disabled):hover");
    expect(componentStyles).toContain(
      '.pds-resizable-handle:not([data-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      ".pds-sonner-action-button:not(:disabled):hover"
    );
    expect(componentStyles).toContain(
      ".pds-sonner-cancel-button:not(:disabled):hover"
    );
    expect(componentStyles).toContain(
      ".pds-sonner-close-button:not(:disabled):hover"
    );
    expect(componentStyles).toContain(
      ".pds-bottom-sheet-close:not(:disabled):hover"
    );
  });
});
