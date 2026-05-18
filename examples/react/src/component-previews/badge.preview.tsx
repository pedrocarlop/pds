import { Badge } from "@pds/react";
import type { BadgeTone } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const tones: BadgeTone[] = [
  "neutral",
  "accent",
  "success",
  "warning",
  "danger",
  "inactive"
];

const preview = {
  description: "Semantic status labels across tone, emphasis, and long copy.",
  group: "Feedback",
  id: "badge",
  name: "Badge",
  Preview() {
    return (
      <Stack>
        <Row>
          {tones.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </Row>
        <Row>
          <Badge emphasis="solid" tone="accent">
            Solid
          </Badge>
          <Badge emphasis="soft" tone="success">
            Soft
          </Badge>
          <Badge emphasis="outline" tone="warning">
            Outline
          </Badge>
        </Row>
        <Badge tone="warning">
          Waiting for a translated approval status that wraps cleanly
        </Badge>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
