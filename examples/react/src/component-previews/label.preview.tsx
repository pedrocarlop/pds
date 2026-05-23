import { Input, Label, Switch } from "@pds/react";

import { Field, Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Associated form labels, disabled labels, and control pairing.",
  group: "Forms",
  id: "label",
  name: "Label",
  Preview() {
    return (
      <Stack>
        <Field label="Text input association">
          <Label htmlFor="label-preview-run">Run name</Label>
          <Input id="label-preview-run" placeholder="Nightly audit" />
        </Field>
        <Row>
          <Label htmlFor="label-preview-switch">Notify reviewers</Label>
          <Switch id="label-preview-switch" />
        </Row>
        <Label aria-disabled="true">Disabled label</Label>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
