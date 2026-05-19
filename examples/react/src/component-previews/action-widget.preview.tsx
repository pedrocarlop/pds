import {
  ActionWidget,
  ActionWidgetActions,
  ActionWidgetAvatar,
  ActionWidgetContent,
  ActionWidgetTitle,
  Avatar,
  AvatarFallback,
  Button,
  Icon
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Compact next-step surface with optional visuals, copy, and actions.",
  group: "Actions",
  id: "action-widget",
  name: "ActionWidget",
  Preview() {
    return (
      <Stack>
        <ActionWidget level="elevated">
          <ActionWidgetAvatar>
            <Icon name="bolt" />
          </ActionWidgetAvatar>
          <ActionWidgetTitle>Prepare implementation summary</ActionWidgetTitle>
          <ActionWidgetContent>{longBody}</ActionWidgetContent>
          <ActionWidgetActions>
            <Button intent="secondary" size="sm">
              Inspect
            </Button>
            <Button size="sm">Approve</Button>
          </ActionWidgetActions>
        </ActionWidget>

        <ActionWidget>
          <ActionWidgetContent>
            This action can stand alone when the surrounding view already names the
            task.
          </ActionWidgetContent>
          <ActionWidgetActions justify="center">
            <Button intent="secondary" size="sm">
              Action 1
            </Button>
            <Button size="sm">Action 2</Button>
          </ActionWidgetActions>
        </ActionWidget>

        <ActionWidget>
          <ActionWidgetAvatar>
            <Avatar size="lg">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </ActionWidgetAvatar>
          <ActionWidgetTitle>Agent-ready handoff</ActionWidgetTitle>
        </ActionWidget>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
