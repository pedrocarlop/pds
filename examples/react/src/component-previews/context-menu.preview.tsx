import * as React from "react";
import {
  Button,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Context menu with object-specific actions, choices, submenu, and shortcuts.",
  group: "Actions",
  id: "context-menu",
  name: "ContextMenu",
  Preview() {
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      const trigger = triggerRef.current;

      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();

      trigger.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          button: 2,
          clientX: rect.left + rect.width / 2,
          clientY: rect.bottom + 8
        })
      );
    }, []);

    return (
      <Row>
        <ContextMenu modal={false}>
          <ContextMenuTrigger asChild>
            <Button ref={triggerRef} intent="secondary">Run row</Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Run actions</ContextMenuLabel>
            <ContextMenuItem>
              Copy path
              <ContextMenuShortcut>Cmd+C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuCheckboxItem checked>
              Include tool output
            </ContextMenuCheckboxItem>
            <ContextMenuRadioGroup value="summary">
              <ContextMenuRadioItem value="summary">Summary view</ContextMenuRadioItem>
              <ContextMenuRadioItem value="raw">Raw view</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuSub open>
              <ContextMenuSubTrigger>Open in</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Inspector</ContextMenuItem>
                <ContextMenuItem>New panel</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem intent="danger">Remove run</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
