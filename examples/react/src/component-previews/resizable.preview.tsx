import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Resizable panel group with accessible handle and content panes.",
  group: "Layout and data",
  id: "resizable",
  name: "Resizable",
  Preview() {
    return (
      <Stack>
        <ResizablePanelGroup
          className="visual-lab-resizable"
          defaultLayout={{ detail: 36, transcript: 64 }}
          id="preview-resizable"
        >
          <ResizablePanel id="transcript" minSize="30%">
            <div className="visual-lab-resizable-panel">
              <strong>Transcript</strong>
              <span>Generated reasoning and user-visible output remain readable inside the pane.</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel id="detail" minSize="24%">
            <div className="visual-lab-resizable-panel">
              <strong>Run details</strong>
              <span>Artifacts, reviewers, and status metadata fit beside the main content.</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
