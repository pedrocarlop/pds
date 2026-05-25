import { Calendar } from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const selected = new Date(2026, 4, 25);

const preview = {
  description: "Date picker calendar with month navigation, outside days, today, and selected state.",
  group: "Forms",
  id: "calendar",
  name: "Calendar",
  Preview() {
    return (
      <NarrowFrame>
        <Stack>
          <Calendar mode="single" month={selected} selected={selected} />
        </Stack>
      </NarrowFrame>
    );
  }
} satisfies ComponentPreview;

export default preview;
