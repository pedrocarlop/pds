import {
  OneTimePasswordField,
  OneTimePasswordFieldHiddenInput,
  OneTimePasswordFieldInput
} from "@pds/react";

import { Field, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "One-time code entry with visible character inputs and hidden form value.",
  group: "Forms",
  id: "one-time-password-field",
  name: "OneTimePasswordField",
  Preview() {
    return (
      <Stack>
        <Field label="Verification code">
          <OneTimePasswordField defaultValue="4821" name="code">
            <OneTimePasswordFieldInput aria-label="Digit 1" index={0} />
            <OneTimePasswordFieldInput aria-label="Digit 2" index={1} />
            <OneTimePasswordFieldInput aria-label="Digit 3" index={2} />
            <OneTimePasswordFieldInput aria-label="Digit 4" index={3} />
            <OneTimePasswordFieldHiddenInput />
          </OneTimePasswordField>
        </Field>
        <Field label="Disabled code">
          <OneTimePasswordField defaultValue="90" disabled name="disabled-code">
            <OneTimePasswordFieldInput aria-label="Disabled digit 1" index={0} />
            <OneTimePasswordFieldInput aria-label="Disabled digit 2" index={1} />
          </OneTimePasswordField>
        </Field>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
