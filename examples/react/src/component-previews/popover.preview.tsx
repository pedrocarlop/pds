import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Anchored inspectable content with action and dismiss control.",
  group: "Overlays",
  id: "popover",
  name: "Popover",
  Preview() {
    return (
      <Popover open>
        <PopoverTrigger asChild>
          <Button intent="secondary">Inspect</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Stack>
            <strong>Tool details</strong>
            <p className="visual-lab-note">{longBody}</p>
            <PopoverClose asChild>
              <Button size="sm">Close</Button>
            </PopoverClose>
          </Stack>
        </PopoverContent>
      </Popover>
    );
  }
} satisfies ComponentPreview;

export default preview;
