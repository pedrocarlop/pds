import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  Icon,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "@pds/react";

import { NarrowFrame, Stack, longBody } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Inputs with inline addons, compact actions, block metadata, and textarea content.",
  group: "Forms",
  id: "input-group",
  name: "InputGroup",
  Preview() {
    return (
      <Stack>
        <Field>
          <FieldLabel htmlFor="input-group-repo">Repository</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="input-group-repo"
                defaultValue="github.com/pds/components"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Search repository" size="icon-xs">
                  <Icon name="search" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Inline addons stay inside the field surface.</FieldDescription>
          </FieldContent>
        </Field>
        <NarrowFrame>
          <Field>
            <FieldLabel htmlFor="input-group-slug">Workspace slug</FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupInput
                  id="input-group-slug"
                  defaultValue="international-review-queue-with-a-long-name"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="xs">Copy</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </FieldContent>
          </Field>
        </NarrowFrame>
        <Field>
          <FieldLabel htmlFor="input-group-notes">Run notes</FieldLabel>
          <FieldContent>
            <InputGroup>
              <InputGroupAddon align="block-start">
                <InputGroupText>Context shared with reviewers</InputGroupText>
              </InputGroupAddon>
              <InputGroupTextarea id="input-group-notes" defaultValue={longBody} />
            </InputGroup>
          </FieldContent>
        </Field>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
