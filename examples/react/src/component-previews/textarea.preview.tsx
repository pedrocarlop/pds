import { Textarea } from "@pds/react";

import { Field, longBody, NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Multiline field density, long copy, disabled, and invalid states.",
  group: "Forms",
  id: "textarea",
  name: "Textarea",
  Preview() {
    return (
      <Stack>
        <Field label="Review note">
          <Textarea defaultValue={longBody} rows={4} />
        </Field>
        <Field label="Compact invalid note">
          <Textarea
            aria-describedby="textarea-preview-error"
            density="compact"
            invalid
            placeholder="Add context for reviewers"
          />
        </Field>
        <p className="visual-lab-error" id="textarea-preview-error">
          Add enough detail for the next reviewer to act.
        </p>
        <Field label="Disabled">
          <Textarea disabled defaultValue="This value is unavailable while archived." />
        </Field>
        <NarrowFrame>
          <Field label="Wrapped note">
            <Textarea
              density="compact"
              defaultValue="This narrow frame checks that field content remains readable without a special wrapper component."
            />
          </Field>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
