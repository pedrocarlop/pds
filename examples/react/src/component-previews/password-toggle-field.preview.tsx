import {
  PasswordToggleField,
  PasswordToggleFieldInput,
  PasswordToggleFieldSlot,
  PasswordToggleFieldToggle
} from "@pds/react";

import { Field, NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Password input with a show and hide toggle control.",
  group: "Forms",
  id: "password-toggle-field",
  name: "PasswordToggleField",
  Preview() {
    return (
      <Stack>
        <NarrowFrame>
          <Field label="Deployment password">
            <PasswordToggleField>
              <PasswordToggleFieldInput
                aria-label="Deployment password"
                defaultValue="secret-preview-value"
              />
              <PasswordToggleFieldToggle>
                <PasswordToggleFieldSlot hidden="Show" visible="Hide" />
              </PasswordToggleFieldToggle>
            </PasswordToggleField>
          </Field>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
