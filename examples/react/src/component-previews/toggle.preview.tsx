import { Icon, Toggle } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Single pressed/unpressed controls for compact modes and toolbar actions.",
  group: "Actions",
  id: "toggle",
  name: "Toggle",
  Preview() {
    return (
      <Stack>
        <Row>
          <Toggle defaultPressed>Show archived</Toggle>
          <Toggle variant="outline">Preview mode</Toggle>
          <Toggle disabled>Locked</Toggle>
        </Row>
        <Row>
          <Toggle aria-label="Bold" size="icon" variant="outline">
            <Icon name="format_bold" />
          </Toggle>
          <Toggle aria-label="Italic" size="icon" variant="outline">
            <Icon name="format_italic" />
          </Toggle>
          <Toggle aria-label="Invalid filter" invalid variant="outline">
            Needs owner
          </Toggle>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
