import { Icon, ToggleGroup, ToggleGroupItem } from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Grouped toggle items for single-select and multi-select toolbar choices.",
  group: "Actions",
  id: "toggle-group",
  name: "ToggleGroup",
  Preview() {
    return (
      <Stack>
        <ToggleGroup
          aria-label="View mode"
          defaultValue="preview"
          type="single"
          variant="outline"
        >
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
          <ToggleGroupItem value="code">Code</ToggleGroupItem>
          <ToggleGroupItem value="diff">Diff</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          aria-label="Formatting"
          defaultValue={["bold"]}
          size="icon"
          spacing="separated"
          type="multiple"
          variant="outline"
        >
          <ToggleGroupItem aria-label="Bold" value="bold">
            <Icon name="format_bold" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Italic" value="italic">
            <Icon name="format_italic" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Underline" value="underline">
            <Icon name="format_underlined" />
          </ToggleGroupItem>
        </ToggleGroup>
        <NarrowFrame>
          <ToggleGroup
            aria-label="Long generated filters"
            defaultValue="needs-review"
            spacing="separated"
            type="single"
          >
            <ToggleGroupItem value="needs-review">Needs review</ToggleGroupItem>
            <ToggleGroupItem value="generated-artifacts">
              Generated artifacts
            </ToggleGroupItem>
          </ToggleGroup>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
