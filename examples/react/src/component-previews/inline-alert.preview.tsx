import {
  Button,
  InlineAlert,
  InlineAlertActions,
  InlineAlertDescription,
  InlineAlertTitle
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Inline status feedback with title, body copy, and optional actions.",
  group: "Feedback",
  id: "inline-alert",
  name: "InlineAlert",
  Preview() {
    return (
      <Stack>
        <InlineAlert tone="neutral">
          <InlineAlertTitle>Review note</InlineAlertTitle>
          <InlineAlertDescription>
            This generated screen needs human approval.
          </InlineAlertDescription>
        </InlineAlert>
        <InlineAlert tone="danger">
          <InlineAlertTitle>Blocked</InlineAlertTitle>
          <InlineAlertDescription>
            Required safety metadata is missing.
          </InlineAlertDescription>
          <InlineAlertActions>
            <Button intent="secondary" size="sm">
              Inspect
            </Button>
          </InlineAlertActions>
        </InlineAlert>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
