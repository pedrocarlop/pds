import { Button, Icon } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Material Symbols Rounded icons as decorative and labelled affordances.",
  group: "Actions",
  id: "icon",
  name: "Icon",
  Preview() {
    return (
      <Stack>
        <Row>
          <Icon name="add" />
          <Icon name="close" />
          <Icon name="chevron_right" />
          <Icon label="Synced" name="check_circle" />
        </Row>
        <Row>
          <Button>
            <Icon name="add" />
            Create
          </Button>
          <Button aria-label="Refresh" intent="secondary" size="icon">
            <Icon name="refresh" />
          </Button>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
