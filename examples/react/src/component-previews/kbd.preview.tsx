import { Kbd, KbdGroup } from "@pds/react";

import { NarrowFrame, Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Keyboard shortcut labels for menus, tooltips, and command surfaces.",
  group: "Actions",
  id: "kbd",
  name: "Kbd",
  Preview() {
    return (
      <Stack>
        <Row>
          <span>Open command menu</span>
          <KbdGroup aria-label="Open command menu shortcut">
            <Kbd>Cmd</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Row>
        <Row>
          <span>Run selected workflow</span>
          <KbdGroup aria-label="Run selected workflow shortcut">
            <Kbd>Shift</Kbd>
            <Kbd>Enter</Kbd>
          </KbdGroup>
        </Row>
        <NarrowFrame>
          <KbdGroup aria-label="Long shortcut wrapping example">
            <Kbd>Ctrl</Kbd>
            <Kbd>Option</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>VeryLongGeneratedKeyName</Kbd>
          </KbdGroup>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
