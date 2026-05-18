import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuLabel,
  ActionMenuSeparator,
  ActionMenuShortcut,
  ActionMenuTrigger,
  Button
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Command menu with labels, shortcuts, separators, and danger intent.",
  group: "Actions",
  id: "action-menu",
  name: "ActionMenu",
  Preview() {
    return (
      <Row>
        <ActionMenu modal={false} open>
          <ActionMenuTrigger asChild>
            <Button intent="secondary">Actions</Button>
          </ActionMenuTrigger>
          <ActionMenuContent align="start">
            <ActionMenuLabel>Run controls</ActionMenuLabel>
            <ActionMenuItem>Resume run</ActionMenuItem>
            <ActionMenuItem>
              Copy trace
              <ActionMenuShortcut>Cmd+C</ActionMenuShortcut>
            </ActionMenuItem>
            <ActionMenuSeparator />
            <ActionMenuItem intent="danger">Cancel run</ActionMenuItem>
          </ActionMenuContent>
        </ActionMenu>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
