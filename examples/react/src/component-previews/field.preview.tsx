import {
  Button,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Input,
  Switch,
  Textarea
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Form-field composition with labels, helper text, errors, and grouping.",
  group: "Forms",
  id: "field",
  name: "Field",
  Preview() {
    return (
      <Stack>
        <FieldSet>
          <FieldLegend>Run setup</FieldLegend>
          <FieldGroup>
            <Field invalid>
              <FieldLabel htmlFor="field-run-name">Run name</FieldLabel>
              <FieldContent>
                <Input
                  aria-describedby="field-run-name-error"
                  id="field-run-name"
                  invalid
                  placeholder="Nightly ledger review"
                />
                <FieldDescription>
                  Use a name that another reviewer can understand later.
                </FieldDescription>
                <FieldError id="field-run-name-error">
                  Run name is required.
                </FieldError>
              </FieldContent>
            </Field>
            <Field orientation="horizontal">
              <FieldTitle>Live notifications</FieldTitle>
              <FieldContent>
                <Switch aria-label="Live notifications" defaultChecked />
                <FieldDescription>
                  Send updates when generated artifacts need attention.
                </FieldDescription>
              </FieldContent>
            </Field>
            <FieldSeparator>Advanced</FieldSeparator>
            <Field orientation="responsive">
              <FieldLabel htmlFor="field-notes">Reviewer notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="field-notes"
                  defaultValue="Summarize assumptions, manual checks, and unresolved risks before handing this run to another reviewer."
                />
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>
        <NarrowFrame>
          <Field disabled>
            <FieldLabel htmlFor="field-disabled">Workspace default model</FieldLabel>
            <FieldContent>
              <Input
                disabled
                id="field-disabled"
                defaultValue="Use organization policy"
              />
              <FieldDescription>
                Disabled field labels and helper text remain visible.
              </FieldDescription>
            </FieldContent>
          </Field>
        </NarrowFrame>
        <Button intent="secondary">Save settings</Button>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
