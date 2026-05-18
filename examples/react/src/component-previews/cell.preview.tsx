import { Cell, Checkbox, RunStatus } from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Static rows, interactive rows, choice state, and control composition.",
  group: "Layout and data",
  id: "cell",
  name: "Cell",
  Preview() {
    return (
      <Stack>
        <Cell>Default cell</Cell>
        <Cell use="button" variant="disclosure">
          View run details
        </Cell>
        <Cell aria-pressed use="button" variant="choice">
          Manual review
        </Cell>
        <Cell variant="accent">
          <span className="visual-lab-copy">Priority approval needed</span>
          <RunStatus status="warning">Review</RunStatus>
        </Cell>
        <NarrowFrame>
          <Cell>
            <Checkbox aria-label="Require human approval" defaultChecked />
            <span className="visual-lab-copy">Require human approval</span>
          </Cell>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
