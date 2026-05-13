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
  it("loads token CSS before component CSS through pds/styles.css", () => {
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
      ".pds-badge",
      '.pds-badge[data-tone="success"]',
      '.pds-badge[data-emphasis="outline"]',
      ".pds-avatar",
      '.pds-avatar[data-size="lg"]',
      ".pds-avatar-group-count",
      ".pds-surface",
      '.pds-surface[data-level="nested"]',
      ".pds-tooltip-content",
      ".pds-dialog-overlay",
      ".pds-dialog-content",
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

  it("keeps text-bearing components resilient in narrow containers", () => {
    const resilientSelectors = [
      ".pds-button",
      ".pds-badge",
      ".pds-surface",
      ".pds-surface-title",
      ".pds-surface-description",
      ".pds-surface-content",
      ".pds-tooltip-content",
      ".pds-dialog-content",
      ".pds-dialog-title",
      ".pds-dialog-description"
    ];

    for (const selector of resilientSelectors) {
      const selectorIndex = componentStyles.indexOf(selector);
      expect(selectorIndex).toBeGreaterThanOrEqual(0);
      expect(componentStyles.slice(selectorIndex, selectorIndex + 800)).toContain(
        "overflow-wrap: anywhere;"
      );
    }
  });

  it("does not apply hover treatments to disabled controls", () => {
    expect(componentStyles).toContain(
      '.pds-button[data-intent="primary"]:not(:disabled, [aria-disabled="true"]):hover'
    );
    expect(componentStyles).toContain(
      '.pds-button[data-intent="primary"]:not(:disabled, [aria-disabled="true"]):active'
    );
    expect(componentStyles).toContain(".pds-input:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-textarea:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-dialog-close:not(:disabled):hover");
    expect(componentStyles).toContain(".pds-dialog-close:not(:disabled):active");
  });
});
