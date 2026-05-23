import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit
} from "@pds/react";

import { NarrowFrame } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Radix form fields with labels, controls, validation copy, and submit action.",
  group: "Forms",
  id: "form",
  name: "Form",
  Preview() {
    return (
      <NarrowFrame>
        <Form>
          <FormField name="title" serverInvalid>
            <FormLabel>Run title</FormLabel>
            <FormControl
              aria-invalid="true"
              defaultValue="Q2 migration readiness review"
              required
            />
            <FormMessage>Title is required before handoff.</FormMessage>
          </FormField>
          <FormField name="owner">
            <FormLabel>Owner email</FormLabel>
            <FormControl defaultValue="reviewer@example.com" type="email" />
          </FormField>
          <FormSubmit>Save changes</FormSubmit>
        </Form>
      </NarrowFrame>
    );
  }
} satisfies ComponentPreview;

export default preview;
