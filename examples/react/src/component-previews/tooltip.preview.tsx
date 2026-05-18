import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Supplemental trigger explanation with long content and arrow.",
  group: "Overlays",
  id: "tooltip",
  name: "Tooltip",
  Preview() {
    return (
      <TooltipProvider>
        <Row>
          <Tooltip open>
            <TooltipTrigger asChild>
              <Button intent="quiet">Explain</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              This tooltip intentionally contains a longer description so the
              content can wrap within the viewport-constrained tooltip width.
            </TooltipContent>
          </Tooltip>
        </Row>
      </TooltipProvider>
    );
  }
} satisfies ComponentPreview;

export default preview;
