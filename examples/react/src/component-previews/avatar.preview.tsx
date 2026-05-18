import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount
} from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Fallback, sizes, status badge, and grouped identity treatment.",
  group: "Identity",
  id: "avatar",
  name: "Avatar",
  Preview() {
    return (
      <Stack>
        <Row>
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback>PC</AvatarFallback>
            <AvatarBadge aria-label="Online" />
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>AI</AvatarFallback>
            <AvatarBadge aria-label="Active" />
          </Avatar>
        </Row>
        <AvatarGroup aria-label="Reviewers">
          <Avatar>
            <AvatarFallback>PC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
