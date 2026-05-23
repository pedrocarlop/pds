import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Persistent command bar with open menu content and shortcuts.",
  group: "Navigation",
  id: "menubar",
  name: "Menubar",
  Preview() {
    return (
      <Stack>
        <Menubar value="run">
          <MenubarMenu value="run">
            <MenubarTrigger>Run</MenubarTrigger>
            <MenubarContent forceMount>
              <MenubarItem>
                Start run
                <MenubarShortcut>Cmd Enter</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Schedule review</MenubarItem>
              <MenubarItem intent="danger">Stop run</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu value="view">
            <MenubarTrigger>View</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
