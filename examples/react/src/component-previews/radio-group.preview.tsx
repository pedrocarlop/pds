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
            <RadioGroupItem aria-label="Agent workspace" value="agent" />
            <span>Agent workspace</span>
          </label>
          <label className="visual-lab-inline-field">
            <RadioGroupItem aria-label="Human review queue" value="human" />
            <span>Human review queue</span>
          </label>
          <label className="visual-lab-inline-field">
            <RadioGroupItem aria-label="Locked destination" disabled value="locked" />
            <span>Locked destination</span>
          </label>
        </Stack>
      </RadioGroup>
    );
  }
} satisfies ComponentPreview;

export default preview;
