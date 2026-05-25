import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator
} from "@pds/react";

import { Field, NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Searchable value picker with open popup, grouped options, clear action, and multiselect chips.",
  group: "Forms",
  id: "combobox",
  name: "Combobox",
  Preview() {
    return (
      <Stack>
        <Field label="Review destination">
          <Combobox open value="review" onValueChange={() => undefined}>
            <ComboboxInput
              aria-label="Review destination"
              placeholder="Choose destination"
              showClear
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxGroup>
                  <ComboboxLabel>Queues</ComboboxLabel>
                  <ComboboxItem value="review">Review queue</ComboboxItem>
                  <ComboboxItem value="automation">Automation run</ComboboxItem>
                  <ComboboxSeparator />
                  <ComboboxItem value="archive">Archive workspace</ComboboxItem>
                  <ComboboxEmpty>No destinations found</ComboboxEmpty>
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <NarrowFrame>
          <Field label="Assigned reviewers">
            <Combobox multiple value={["design", "qa"]} onValueChange={() => undefined}>
              <ComboboxChips>
                <ComboboxChip>Design systems review</ComboboxChip>
                <ComboboxChip>QA verification</ComboboxChip>
                <ComboboxChipsInput
                  aria-label="Add reviewer group"
                  placeholder="Add reviewer"
                />
              </ComboboxChips>
            </Combobox>
          </Field>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
