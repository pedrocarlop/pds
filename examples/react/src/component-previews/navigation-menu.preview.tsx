import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Top-level navigation with active link and inspectable flyout content.",
  group: "Navigation",
  id: "navigation-menu",
  name: "NavigationMenu",
  Preview() {
    return (
      <Stack>
        <NavigationMenu value="runs">
          <NavigationMenuList>
            <NavigationMenuItem value="runs">
              <NavigationMenuTrigger>Runs</NavigationMenuTrigger>
              <NavigationMenuContent forceMount>
                <strong>Recent generated runs</strong>
                <p className="visual-lab-note">{longBody}</p>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink active href="/settings">
                Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
