import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Dropdown menu with checkbox, radio, submenu, shortcuts, and danger item.",
  group: "Navigation",
  id: "menu",
  name: "Menu",
  Preview() {
    return (
      <Row>
        <Menu modal={false} open>
          <MenuTrigger asChild>
            <Button intent="secondary">Menu</Button>
          </MenuTrigger>
          <MenuContent align="start">
            <MenuLabel>View options</MenuLabel>
            <MenuItem>
              Open run
              <MenuShortcut>Enter</MenuShortcut>
            </MenuItem>
            <MenuCheckboxItem checked>Show tool calls</MenuCheckboxItem>
            <MenuRadioGroup value="compact">
              <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
              <MenuRadioItem value="compact">Compact</MenuRadioItem>
            </MenuRadioGroup>
            <MenuSeparator />
            <MenuSub open>
              <MenuSubTrigger>Export</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem>Copy markdown</MenuItem>
                <MenuItem>Download JSON</MenuItem>
              </MenuSubContent>
            </MenuSub>
            <MenuItem intent="danger">Delete draft</MenuItem>
          </MenuContent>
        </Menu>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
