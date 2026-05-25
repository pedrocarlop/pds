import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Native select fields for simple browser-managed option lists.",
  group: "Forms",
  id: "native-select",
  name: "NativeSelect",
  Preview() {
    return (
      <Stack>
        <Field>
          <FieldLabel htmlFor="native-select-model">Model routing</FieldLabel>
          <FieldContent>
            <NativeSelect id="native-select-model" defaultValue="balanced">
              <NativeSelectOptGroup label="Recommended">
                <NativeSelectOption value="balanced">Balanced</NativeSelectOption>
                <NativeSelectOption value="fast">Fast</NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOption value="manual">Manual review</NativeSelectOption>
            </NativeSelect>
            <FieldDescription>
              Use native select behavior for simple settings.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field invalid>
          <FieldLabel htmlFor="native-select-region">Deployment region</FieldLabel>
          <FieldContent>
            <NativeSelect
              aria-describedby="native-select-region-error"
              id="native-select-region"
              invalid
              size="sm"
            >
              <NativeSelectOption value="">Choose a region</NativeSelectOption>
              <NativeSelectOption value="eu-west">EU West</NativeSelectOption>
              <NativeSelectOption value="us-east">US East</NativeSelectOption>
            </NativeSelect>
            <FieldError id="native-select-region-error">
              Region is required before deployment.
            </FieldError>
          </FieldContent>
        </Field>
        <NarrowFrame>
          <Field disabled>
            <FieldLabel htmlFor="native-select-disabled">Policy owner</FieldLabel>
            <FieldContent>
              <NativeSelect id="native-select-disabled" disabled>
                <NativeSelectOption>Organization default</NativeSelectOption>
              </NativeSelect>
            </FieldContent>
          </Field>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
