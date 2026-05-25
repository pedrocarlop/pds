import {
  Badge,
  Icon,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Persistent application sidebar with provider state, trigger, rail, search, nested menu, and inset content.",
  group: "Navigation",
  id: "sidebar",
  name: "Sidebar",
  Preview() {
    return (
      <Stack>
        <SidebarProvider>
          <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
              <SidebarInput aria-label="Search navigation" placeholder="Search" />
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Runs">
                        <Icon name="dashboard" />
                        <span>Runs</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>9</SidebarMenuBadge>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#active">
                            <span>Active</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#archived">
                            <span>Archived</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Contracts">
                        <Icon name="rule" />
                        <span>Contracts</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <Badge emphasis="outline">Preview</Badge>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <div className="visual-lab-panel">
              <SidebarTrigger />
              <div>
                <strong>Implementation queue</strong>
                <p className="visual-lab-note">
                  Sidebar inset content remains available beside persistent navigation.
                </p>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
