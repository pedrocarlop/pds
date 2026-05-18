import { Switch } from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Binary setting control with checked, unchecked, and disabled states.",
  group: "Forms",
  id: "switch",
  name: "Switch",
  Preview() {
    return (
      <Stack>
        <label className="visual-lab-inline-field">
          <Switch defaultChecked />
          <span>Auto-approve low-risk runs</span>
        </label>
        <label className="visual-lab-inline-field">
          <Switch />
          <span>Notify reviewers</span>
        </label>
        <label className="visual-lab-inline-field">
          <Switch disabled />
          <span>Locked setting</span>
        </label>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
