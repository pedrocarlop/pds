import { AspectRatio } from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Media frame that preserves product preview ratios across widths.",
  group: "Layout and data",
  id: "aspect-ratio",
  name: "AspectRatio",
  Preview() {
    return (
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <svg aria-label="Generated dashboard preview" role="img" viewBox="0 0 160 90">
            <rect fill="currentColor" height="90" opacity="0.08" width="160" />
            <rect fill="currentColor" height="10" opacity="0.18" rx="3" width="52" x="14" y="14" />
            <rect fill="currentColor" height="44" opacity="0.14" rx="4" width="60" x="14" y="32" />
            <rect fill="currentColor" height="18" opacity="0.22" rx="4" width="68" x="84" y="32" />
            <rect fill="currentColor" height="18" opacity="0.12" rx="4" width="68" x="84" y="58" />
          </svg>
        </AspectRatio>
        <NarrowFrame>
          <AspectRatio ratio={4 / 3}>
            <svg aria-label="Compact product preview" role="img" viewBox="0 0 120 90">
              <rect fill="currentColor" height="90" opacity="0.08" width="120" />
              <circle cx="30" cy="30" fill="currentColor" opacity="0.2" r="14" />
              <rect fill="currentColor" height="10" opacity="0.16" rx="3" width="52" x="52" y="22" />
              <rect fill="currentColor" height="10" opacity="0.12" rx="3" width="42" x="52" y="42" />
              <rect fill="currentColor" height="12" opacity="0.18" rx="4" width="82" x="20" y="66" />
            </svg>
          </AspectRatio>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
