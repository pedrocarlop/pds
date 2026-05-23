import { Button, Icon, VisuallyHidden } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Hidden accessible text for compact visual controls.",
  group: "Actions",
  id: "visually-hidden",
  name: "VisuallyHidden",
  Preview() {
    return (
      <Stack>
        <Row>
          <Button size="icon">
            <Icon name="refresh" />
            <VisuallyHidden>Refresh run</VisuallyHidden>
          </Button>
          <Button intent="secondary" size="icon">
            <Icon name="content_copy" />
            <VisuallyHidden>Copy transcript</VisuallyHidden>
          </Button>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
