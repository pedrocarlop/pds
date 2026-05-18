import { Skeleton } from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Text, circular, and block loading placeholders.",
  group: "Feedback",
  id: "skeleton",
  name: "Skeleton",
  Preview() {
    return (
      <Stack>
        <Skeleton className="visual-lab-skeleton-line" shape="text" />
        <Skeleton className="visual-lab-skeleton-short" shape="text" />
        <Skeleton shape="circle" />
        <Skeleton className="visual-lab-skeleton-block" shape="block" />
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
