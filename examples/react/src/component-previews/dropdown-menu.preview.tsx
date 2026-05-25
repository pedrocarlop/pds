import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Dropdown command menu with checked choices, submenu, shortcuts, and danger intent.",
  group: "Actions",
  id: "dropdown-menu",
  name: "DropdownMenu",
  Preview() {
    return (
      <Row>
        <DropdownMenu modal={false} open>
          <DropdownMenuTrigger asChild>
            <Button intent="secondary">Workspace menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Workspace actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Open run
              <DropdownMenuShortcut>Enter</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem checked>
              Include hidden files
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="review">
              <DropdownMenuRadioItem value="review">Review mode</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="edit">Edit mode</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub open>
              <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Copy markdown</DropdownMenuItem>
                <DropdownMenuItem>Download JSON</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem intent="danger">Delete draft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
