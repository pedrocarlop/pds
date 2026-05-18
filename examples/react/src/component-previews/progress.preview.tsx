import { Progress, ProgressIndicator } from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Determinate and indeterminate progress indicators.",
  group: "Feedback",
  id: "progress",
  name: "Progress",
  Preview() {
    return (
      <Stack>
        <Progress value={62} />
        <Progress />
        <Progress value={32}>
          <ProgressIndicator />
        </Progress>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
