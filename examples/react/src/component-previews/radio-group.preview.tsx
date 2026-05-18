import { RadioGroup, RadioGroupItem } from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Single-choice control group for mutually exclusive settings.",
  group: "Forms",
  id: "radio-group",
  name: "RadioGroup",
  Preview() {
    return (
      <RadioGroup defaultValue="agent">
        <Stack>
          <label className="visual-lab-inline-field">
            <RadioGroupItem value="agent" />
            <span>Agent workspace</span>
          </label>
          <label className="visual-lab-inline-field">
            <RadioGroupItem value="human" />
            <span>Human review queue</span>
          </label>
          <label className="visual-lab-inline-field">
            <RadioGroupItem disabled value="locked" />
            <span>Locked destination</span>
          </label>
        </Stack>
      </RadioGroup>
    );
  }
} satisfies ComponentPreview;

export default preview;
