import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Modal review surface with title, description, and footer actions.",
  group: "Overlays",
  id: "dialog",
  name: "Dialog",
  Preview() {
    return (
      <Stack>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve generated change</DialogTitle>
              <DialogDescription>{longBody}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button intent="secondary">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Approve</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button intent="danger">Delete run</Button>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
