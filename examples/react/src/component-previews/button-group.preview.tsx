import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Icon
} from "@pds/react";

import { NarrowFrame, Row, Stack, longLabel } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Joined action clusters with text, separators, and vertical layout.",
  group: "Actions",
  id: "button-group",
  name: "ButtonGroup",
  Preview() {
    return (
      <Stack>
        <ButtonGroup aria-label="Run actions">
          <Button>Run</Button>
          <Button intent="secondary">Schedule</Button>
          <ButtonGroupSeparator />
          <ButtonGroupText>Draft</ButtonGroupText>
        </ButtonGroup>
        <Row>
          <ButtonGroup aria-label="Compact review actions">
            <Button intent="secondary" size="icon" aria-label="Approve">
              <Icon name="check" />
            </Button>
            <Button intent="secondary" size="icon" aria-label="Comment">
              <Icon name="chat" />
            </Button>
            <Button intent="danger" size="icon" aria-label="Reject">
              <Icon name="close" />
            </Button>
          </ButtonGroup>
          <NarrowFrame>
            <ButtonGroup aria-label="Long action example">
              <Button>Generate</Button>
              <ButtonGroupText>{longLabel}</ButtonGroupText>
            </ButtonGroup>
          </NarrowFrame>
        </Row>
        <ButtonGroup aria-label="Vertical export actions" orientation="vertical">
          <Button intent="secondary">Export summary</Button>
          <Button intent="secondary">Copy link</Button>
        </ButtonGroup>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
