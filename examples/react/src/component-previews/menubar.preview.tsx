import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Horizontal menubar with an open command category, choices, submenu, and shortcuts.",
  group: "Actions",
  id: "menubar",
  name: "Menubar",
  Preview() {
    return (
      <Row>
        <Menubar value="file">
          <MenubarMenu value="file">
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Workspace file</MenubarLabel>
              <MenubarItem>
                New run
                <MenubarShortcut>Cmd+N</MenubarShortcut>
              </MenubarItem>
              <MenubarCheckboxItem checked>Auto save</MenubarCheckboxItem>
              <MenubarRadioGroup value="markdown">
                <MenubarRadioItem value="markdown">Markdown export</MenubarRadioItem>
                <MenubarRadioItem value="json">JSON export</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarSub open>
                <MenubarSubTrigger>Export as</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>PDF</MenubarItem>
                  <MenubarItem>HTML</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem intent="danger">Close workspace</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu value="view">
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Toggle sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
