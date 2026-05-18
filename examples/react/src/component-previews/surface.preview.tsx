import {
  Badge,
  Button,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceFooter,
  SurfaceHeader,
  SurfaceTitle
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Tokenized container slots across base, nested, and elevated levels.",
  group: "Layout and data",
  id: "surface",
  name: "Surface",
  Preview() {
    return (
      <Stack>
        <Surface level="elevated">
          <SurfaceHeader>
            <div>
              <SurfaceTitle>Agent run summary</SurfaceTitle>
              <SurfaceDescription>
                Review status, recent tool output, and the next action.
              </SurfaceDescription>
            </div>
            <SurfaceAction>
              <Button size="sm">Refresh</Button>
            </SurfaceAction>
          </SurfaceHeader>
          <SurfaceContent>
            <p className="visual-lab-note">{longBody}</p>
          </SurfaceContent>
          <SurfaceFooter>
            <Badge tone="success">Ready</Badge>
            <Button intent="secondary">Open details</Button>
          </SurfaceFooter>
        </Surface>
        <Surface level="nested">
          <SurfaceContent>Nested surface inside another grouped context.</SurfaceContent>
        </Surface>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
