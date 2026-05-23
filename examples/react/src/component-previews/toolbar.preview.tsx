import {
  Icon,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Local tool rows with buttons, separators, and toggle groups.",
  group: "Actions",
  id: "toolbar",
  name: "Toolbar",
  Preview() {
    return (
      <Stack>
        <Toolbar aria-label="Run tools">
          <ToolbarButton>
            <Icon name="undo" />
            Undo
          </ToolbarButton>
          <ToolbarButton>
            <Icon name="redo" />
            Redo
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarToggleGroup defaultValue="inspect" type="single">
            <ToolbarToggleItem value="inspect">Inspect</ToolbarToggleItem>
            <ToolbarToggleItem value="edit">Edit</ToolbarToggleItem>
          </ToolbarToggleGroup>
        </Toolbar>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
