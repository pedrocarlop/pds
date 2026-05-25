import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  Slider
} from "@pds/react";

import { NarrowFrame, Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Single-value, range, vertical, and disabled numeric sliders.",
  group: "Forms",
  id: "slider",
  name: "Slider",
  Preview() {
    return (
      <Stack>
        <Field>
          <FieldLabel id="slider-confidence">Confidence threshold</FieldLabel>
          <FieldContent>
            <Slider
              aria-labelledby="slider-confidence"
              defaultValue={[68]}
              thumbLabel="Confidence threshold"
            />
            <FieldDescription>
              Pair sliders with readable values when exact numbers matter.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel id="slider-budget">Budget range</FieldLabel>
          <FieldContent>
            <Slider
              aria-labelledby="slider-budget"
              defaultValue={[20, 80]}
              thumbLabel="Budget bound"
            />
          </FieldContent>
        </Field>
        <Row>
          <Slider
            aria-label="Vertical confidence threshold"
            defaultValue={[35]}
            orientation="vertical"
          />
          <NarrowFrame>
            <Slider aria-label="Disabled threshold" defaultValue={[55]} disabled />
          </NarrowFrame>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
