import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Right-click contextual actions with choices, submenu, and danger item.",
  group: "Actions",
  id: "context-menu",
  name: "ContextMenu",
  Preview() {
    return (
      <Stack>
        <ContextMenu modal={false}>
          <ContextMenuTrigger>Right-click run row</ContextMenuTrigger>
          <ContextMenuContent forceMount>
            <ContextMenuLabel>Run actions</ContextMenuLabel>
            <ContextMenuItem>Open details</ContextMenuItem>
            <ContextMenuCheckboxItem checked>Include tool calls</ContextMenuCheckboxItem>
            <ContextMenuRadioGroup value="json">
              <ContextMenuRadioItem value="markdown">Markdown</ContextMenuRadioItem>
              <ContextMenuRadioItem value="json">JSON</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuSub open>
              <ContextMenuSubTrigger>Export</ContextMenuSubTrigger>
              <ContextMenuSubContent forceMount>
                <ContextMenuItem>Copy summary</ContextMenuItem>
                <ContextMenuItem>Download artifact</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem intent="danger">Delete draft</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
