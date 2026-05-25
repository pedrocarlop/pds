import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@pds/react";

import { NarrowFrame, Row, Stack, longBody } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Supplementary object previews with arrow and constrained copy.",
  group: "Overlays",
  id: "hover-card",
  name: "HoverCard",
  Preview() {
    return (
      <Stack>
        <HoverCard open>
          <HoverCardTrigger asChild>
            <Button intent="secondary">Inspect reviewer</Button>
          </HoverCardTrigger>
          <HoverCardContent align="start">
            <Row>
              <Avatar>
                <AvatarFallback>PC</AvatarFallback>
              </Avatar>
              <Stack>
                <strong>Pedro Carrasco</strong>
                <Badge tone="success">Available</Badge>
              </Stack>
            </Row>
            <p className="visual-lab-note">{longBody}</p>
          </HoverCardContent>
        </HoverCard>
        <NarrowFrame>
          <HoverCard open>
            <HoverCardTrigger asChild>
              <Button intent="secondary">Long workspace preview</Button>
            </HoverCardTrigger>
            <HoverCardContent showArrow={false}>
              <strong>international-review-queue-with-a-long-name</strong>
              <p className="visual-lab-note">{longBody}</p>
            </HoverCardContent>
          </HoverCard>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
