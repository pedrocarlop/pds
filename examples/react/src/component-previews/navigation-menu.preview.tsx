import {
  Icon,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Top-level navigation menu with open trigger, viewport content, active link, and indicator.",
  group: "Navigation",
  id: "navigation-menu",
  name: "NavigationMenu",
  Preview() {
    return (
      <Stack>
        <NavigationMenu value="workspace">
          <NavigationMenuList>
            <NavigationMenuItem value="workspace">
              <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink active href="#">
                  <Icon name="dashboard" />
                  Runs dashboard
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <Icon name="rule" />
                  Component contracts
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <Icon name="settings" />
                  Workspace settings
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Docs</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator forceMount />
        </NavigationMenu>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
