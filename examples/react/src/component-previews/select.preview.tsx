import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@pds/react";

import { Field, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Select trigger and menu content for destination choices.",
  group: "Forms",
  id: "select",
  name: "Select",
  Preview() {
    return (
      <Stack>
        <Field label="Review destination">
          <Select open value="review" onValueChange={() => undefined}>
            <SelectTrigger aria-label="Review destination">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Queues</SelectLabel>
                <SelectItem value="review">Review queue</SelectItem>
                <SelectItem value="automation">Automation run</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectItem value="archive">Archive</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Select value="archive" onValueChange={() => undefined}>
          <SelectTrigger aria-label="Disabled destination" disabled>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="archive">Archive</SelectItem>
          </SelectContent>
        </Select>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
