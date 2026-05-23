import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@pds/react";

import { longBody, NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Inline disclosure region with open and narrow long-copy states.",
  group: "Layout and data",
  id: "collapsible",
  name: "Collapsible",
  Preview() {
    return (
      <Stack>
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Advanced run controls</CollapsibleTrigger>
          <CollapsibleContent>{longBody}</CollapsibleContent>
        </Collapsible>
        <NarrowFrame>
          <Collapsible defaultOpen>
            <CollapsibleTrigger>
              Long translated trigger label for retry and timeout settings
            </CollapsibleTrigger>
            <CollapsibleContent>{longBody}</CollapsibleContent>
          </Collapsible>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
