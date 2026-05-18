import { Input } from "@pds/react";

import { Field, NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Text input density, filled, disabled, invalid, and long value states.",
  group: "Forms",
  id: "input",
  name: "Input",
  Preview() {
    return (
      <Stack>
        <Field label="Default input">
          <Input defaultValue="Generate status summary" />
        </Field>
        <Field label="Compact invalid input">
          <Input
            aria-describedby="input-preview-error"
            density="compact"
            invalid
            placeholder="Enter a command"
          />
        </Field>
        <p className="visual-lab-error" id="input-preview-error">
          Command is required before the run can start.
        </p>
        <Field label="Disabled">
          <Input disabled defaultValue="Design systems" />
        </Field>
        <NarrowFrame>
          <Field label="Long generated identifier">
            <Input defaultValue="agent-run-production-eu-west-very-long-generated-identifier-2026-05-14" />
          </Field>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
