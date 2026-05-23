import { HoverCard, HoverCardContent, HoverCardTrigger } from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Hover preview card with anchored metadata and long copy.",
  group: "Overlays",
  id: "hover-card",
  name: "HoverCard",
  Preview() {
    return (
      <Stack>
        <HoverCard open>
          <HoverCardTrigger href="/agents/codex">Codex production agent</HoverCardTrigger>
          <HoverCardContent align="start">
            <strong>Codex production agent</strong>
            <p className="visual-lab-note">{longBody}</p>
          </HoverCardContent>
        </HoverCard>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
