import { Button } from "@pds/react";

import { longLabel, NarrowFrame, Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Action intent, sizing, disabled state, icon size, and long labels.",
  group: "Actions",
  id: "button",
  name: "Button",
  Preview() {
    return (
      <Stack>
        <Row>
          <Button>Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="danger">Danger</Button>
          <Button intent="quiet">Quiet</Button>
          <Button intent="link">Link</Button>
        </Row>
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button aria-label="Pin run" size="icon">
            ^
          </Button>
        </Row>
        <NarrowFrame>
          <Button>{longLabel}</Button>
          <Button disabled intent="secondary">
            Disabled
          </Button>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
