import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Icon
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Searchable command list with groups, shortcuts, checked state, and disabled action.",
  group: "Actions",
  id: "command",
  name: "Command",
  Preview() {
    return (
      <NarrowFrame>
        <Stack>
          <Command label="Workspace commands" value="assign-reviewer">
            <CommandInput
              aria-label="Search workspace commands"
              placeholder="Search commands"
            />
            <CommandList>
              <CommandEmpty>No commands found</CommandEmpty>
              <CommandGroup heading="Workspace">
                <CommandItem data-checked="true" value="assign-reviewer">
                  <Icon name="person_add" />
                  Assign reviewer
                  <CommandShortcut>Enter</CommandShortcut>
                </CommandItem>
                <CommandItem value="copy-link">
                  <Icon name="link" />
                  Copy workspace link
                  <CommandShortcut>Cmd+C</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Danger zone">
                <CommandItem disabled value="delete-draft">
                  <Icon name="delete" />
                  Delete protected draft
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Stack>
      </NarrowFrame>
    );
  }
} satisfies ComponentPreview;

export default preview;
