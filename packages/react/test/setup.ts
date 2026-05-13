import "@testing-library/jest-dom/vitest";

class PdsResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver ??= PdsResizeObserver;
