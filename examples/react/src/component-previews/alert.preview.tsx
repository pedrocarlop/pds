import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  Icon
} from "@pds/react";

import { NarrowFrame, Stack, longBody } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Status, warning, and danger messages with optional icon and action.",
  group: "Feedback",
  id: "alert",
  name: "Alert",
  Preview() {
    return (
      <Stack>
        <Alert role="status" tone="success">
          <Icon name="check_circle" />
          <AlertTitle>Generated changes are ready</AlertTitle>
          <AlertDescription>{longBody}</AlertDescription>
          <AlertAction>
            <Button intent="secondary">Review</Button>
          </AlertAction>
        </Alert>
        <Alert tone="warning">
          <Icon name="warning" />
          <AlertTitle>Manual approval required</AlertTitle>
          <AlertDescription>
            Inspect the generated migration before the next run starts.
          </AlertDescription>
        </Alert>
        <NarrowFrame>
          <Alert tone="danger">
            <AlertTitle>Connection failed</AlertTitle>
            <AlertDescription>{longBody}</AlertDescription>
          </Alert>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
