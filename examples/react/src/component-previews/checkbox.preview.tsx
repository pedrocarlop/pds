import { Checkbox } from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Boolean and indeterminate selection states for compact forms.",
  group: "Forms",
  id: "checkbox",
  name: "Checkbox",
  Preview() {
    return (
      <Stack>
        <label className="visual-lab-inline-field">
          <Checkbox aria-label="Require human approval" defaultChecked />
          <span>Require human approval</span>
        </label>
        <label className="visual-lab-inline-field">
          <Checkbox aria-label="Some reviewers assigned" checked="indeterminate" />
          <span>Some reviewers assigned</span>
        </label>
        <label className="visual-lab-inline-field">
          <Checkbox aria-label="Invalid acknowledgement" invalid />
          <span>Invalid acknowledgement</span>
        </label>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
