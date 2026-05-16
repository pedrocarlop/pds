import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import * as pds from "../index";

const packageJson = JSON.parse(
  readFileSync(resolve(process.cwd(), "package.json"), "utf8")
) as {
  exports: Record<string, unknown>;
  files: string[];
  sideEffects: string[];
};

describe("PDS package contract", () => {
  it("exports the full starter component surface from pds", () => {
    expect(Object.keys(pds).sort()).toEqual([
      "Avatar",
      "AvatarBadge",
      "AvatarFallback",
      "AvatarGroup",
      "AvatarGroupCount",
      "AvatarImage",
      "Badge",
      "BottomSheet",
      "BottomSheetBody",
      "BottomSheetClose",
      "BottomSheetContent",
      "BottomSheetDescription",
      "BottomSheetFooter",
      "BottomSheetHeader",
      "BottomSheetOverlay",
      "BottomSheetPortal",
      "BottomSheetTitle",
      "BottomSheetTrigger",
      "Button",
      "Composer",
      "ComposerActions",
      "ComposerFooter",
      "ComposerInput",
      "Dialog",
      "DialogClose",
      "DialogContent",
      "DialogDescription",
      "DialogFooter",
      "DialogHeader",
      "DialogOverlay",
      "DialogPortal",
      "DialogTitle",
      "DialogTrigger",
      "Input",
      "Message",
      "MessageActions",
      "MessageAuthor",
      "MessageAvatar",
      "MessageContent",
      "MessageHeader",
      "MessageMeta",
      "RunStatus",
      "Surface",
      "SurfaceAction",
      "SurfaceContent",
      "SurfaceDescription",
      "SurfaceFooter",
      "SurfaceHeader",
      "SurfaceTitle",
      "Textarea",
      "Toast",
      "ToastAction",
      "ToastClose",
      "ToastDescription",
      "ToastProvider",
      "ToastTitle",
      "ToastViewport",
      "Tooltip",
      "TooltipContent",
      "TooltipProvider",
      "TooltipTrigger",
      "Transcript",
      "TranscriptEmpty",
      "TranscriptList"
    ]);
  });

  it("publishes only stable root and stylesheet export paths", () => {
    expect(packageJson.exports).toEqual({
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js"
      },
      "./styles.css": "./dist/styles.css"
    });
    expect(packageJson.files).toEqual(["dist"]);
    expect(packageJson.sideEffects).toEqual(["**/*.css"]);
  });

  it("keeps source stylesheet paths aligned with the package export map", () => {
    expect(readFileSync(resolve(process.cwd(), "src/index.ts"), "utf8")).toContain(
      'export * from "./components";'
    );
    expect(readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8")).toBe(
      '@import "@pds/tokens/styles.css";\n@import "./components.css";\n'
    );
  });
});
