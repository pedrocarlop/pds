import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Tokenized scroll viewport with visible scrollbar affordance.",
  group: "Layout and data",
  id: "scroll-area",
  name: "ScrollArea",
  Preview() {
    return (
      <Stack>
        <ScrollArea style={{ height: 180, width: "100%" }} type="always">
          <ScrollAreaViewport>
            <div className="visual-lab-stack">
              {Array.from({ length: 8 }, (_, index) => (
                <p className="visual-lab-note" key={index}>
                  Audit event {index + 1}: generated output stayed within policy
                  and retained the full review trail.
                </p>
              ))}
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar forceMount>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
