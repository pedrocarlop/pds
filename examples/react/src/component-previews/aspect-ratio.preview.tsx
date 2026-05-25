import { AspectRatio, Surface, SurfaceContent } from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Responsive media and artifact preview ratios with cover or contain fit.",
  group: "Layout and data",
  id: "aspect-ratio",
  name: "AspectRatio",
  Preview() {
    return (
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <div aria-hidden="true" className="visual-lab-aspect-preview" />
        </AspectRatio>
        <p className="visual-lab-note">Run preview</p>
        <NarrowFrame>
          <AspectRatio fit="contain" ratio={4 / 3}>
            <Surface aria-hidden="true">
              <SurfaceContent />
            </Surface>
          </AspectRatio>
          <p className="visual-lab-note">
            Full artifact remains inspectable with contain fit.
          </p>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
