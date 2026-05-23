import { Icon, Toggle } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Single pressed-state controls with text and icon sizing.",
  group: "Actions",
  id: "toggle",
  name: "Toggle",
  Preview() {
    return (
      <Stack>
        <Row>
          <Toggle>Compact view</Toggle>
          <Toggle defaultPressed>Preview</Toggle>
          <Toggle variant="outline">Outline</Toggle>
        </Row>
        <Row>
          <Toggle size="sm">Small</Toggle>
          <Toggle size="lg">Large</Toggle>
          <Toggle aria-label="Pin run" size="icon">
            <Icon name="keep" />
          </Toggle>
          <Toggle disabled>Disabled</Toggle>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
