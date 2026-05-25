import { Button, Separator } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Horizontal and vertical separators used only when spacing is not enough.",
  group: "Layout and data",
  id: "separator",
  name: "Separator",
  Preview() {
    return (
      <Stack>
        <div>
          <p>Model routing</p>
          <Separator />
          <p>Approval and notification settings</p>
        </div>
        <Row>
          <Button intent="quiet">Preview</Button>
          <Separator decorative={false} orientation="vertical" />
          <Button intent="quiet">Export</Button>
          <Separator decorative={false} orientation="vertical" />
          <Button intent="quiet">Archive</Button>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
