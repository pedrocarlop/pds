import { Button, Icon } from "@pds/react";

import { NarrowFrame, Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description:
    "Action intent, compact sizing, expanded trigger state, disabled state, icon sizes, and narrow labels.",
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
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
        <Row>
          <Button aria-label="Pin run" size="icon-xs">
            <Icon name="keep" />
          </Button>
          <Button aria-label="Create run" size="icon-sm">
            <Icon name="add" />
          </Button>
          <Button aria-label="Pin run" size="icon">
            <Icon name="keep" />
          </Button>
          <Button aria-label="Open details" size="icon-lg">
            <Icon name="open_in_new" />
          </Button>
        </Row>
        <Row>
          <Button aria-expanded intent="secondary">
            Actions
          </Button>
          <Button aria-expanded intent="quiet">
            More
          </Button>
          <Button aria-disabled="true" intent="secondary">
            Aria disabled
          </Button>
        </Row>
        <NarrowFrame>
          <Row>
            <Button>Approve</Button>
            <Button intent="secondary">Review</Button>
          </Row>
          <Button size="xs">Compact run</Button>
          <Button disabled intent="secondary">
            Disabled
          </Button>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
