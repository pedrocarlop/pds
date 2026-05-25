import { Checkbox, Input, Label, Switch } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Visible form labels associated with inputs and binary controls.",
  group: "Forms",
  id: "label",
  name: "Label",
  Preview() {
    return (
      <Stack>
        <div>
          <Label htmlFor="label-run-name">Run name</Label>
          <Input id="label-run-name" defaultValue="Nightly account review" />
        </div>
        <Row>
          <Checkbox
            aria-labelledby="label-approval-text"
            id="label-approval"
            defaultChecked
          />
          <Label id="label-approval-text" htmlFor="label-approval">
            Require reviewer approval
          </Label>
        </Row>
        <Row>
          <Switch
            aria-labelledby="label-alerts-text"
            id="label-alerts"
            defaultChecked
          />
          <Label id="label-alerts-text" htmlFor="label-alerts">
            Send completion alerts
          </Label>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
