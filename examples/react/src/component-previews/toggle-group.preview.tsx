import { Icon, ToggleGroup, ToggleGroupItem } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Single and multiple grouped pressed-state controls.",
  group: "Actions",
  id: "toggle-group",
  name: "ToggleGroup",
  Preview() {
    return (
      <Stack>
        <ToggleGroup aria-label="View mode" defaultValue="list" type="single">
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="split">Split</ToggleGroupItem>
        </ToggleGroup>
        <Row>
          <ToggleGroup aria-label="Text tools" defaultValue={["bold"]} type="multiple">
            <ToggleGroupItem aria-label="Bold" size="icon" value="bold">
              <Icon name="format_bold" />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Italic" size="icon" value="italic">
              <Icon name="format_italic" />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Quote" size="icon" value="quote">
              <Icon name="format_quote" />
            </ToggleGroupItem>
          </ToggleGroup>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
