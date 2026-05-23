import { Label, Slider } from "@pds/react";

import { Field, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Bounded numeric ranges with default and multi-thumb anatomy.",
  group: "Forms",
  id: "slider",
  name: "Slider",
  Preview() {
    return (
      <Stack>
        <Field label="Default range">
          <Label id="slider-confidence-label">Confidence threshold</Label>
          <Slider
            aria-labelledby="slider-confidence-label"
            defaultValue={[68]}
            max={100}
            step={1}
          />
        </Field>
        <Field label="Range selection">
          <Label id="slider-window-label">Review window</Label>
          <Slider
            aria-labelledby="slider-window-label"
            defaultValue={[20, 80]}
            max={100}
            step={5}
          />
        </Field>
        <Field label="Disabled">
          <Label id="slider-disabled-label" data-disabled="true">
            Locked threshold
          </Label>
          <Slider
            aria-labelledby="slider-disabled-label"
            defaultValue={[40]}
            disabled
          />
        </Field>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
