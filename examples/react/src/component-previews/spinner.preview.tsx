import { Button, Spinner } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Compact loading indicators with status and decorative modes.",
  group: "Feedback",
  id: "spinner",
  name: "Spinner",
  Preview() {
    return (
      <Stack>
        <Row>
          <Spinner label="Loading agent runs" size="sm" />
          <Spinner label="Loading generated artifacts" />
          <Spinner label="Loading deployment results" size="lg" />
        </Row>
        <Button disabled intent="secondary">
          <Spinner decorative size="sm" />
          Saving
        </Button>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
