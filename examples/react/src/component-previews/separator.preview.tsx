import { Separator } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Decorative horizontal and vertical separators for dense groups.",
  group: "Layout and data",
  id: "separator",
  name: "Separator",
  Preview() {
    return (
      <Stack>
        <span>Queue summary</span>
        <Separator />
        <span>3 blocked runs, 12 ready runs</span>
        <Row>
          <span>Build</span>
          <Separator orientation="vertical" />
          <span>Review</span>
          <Separator orientation="vertical" />
          <span>Ship</span>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
