import {
  Button,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Side-attached modal sheet with header, scrollable body, footer actions, and close affordance.",
  group: "Overlays",
  id: "sheet",
  name: "Sheet",
  Preview() {
    return (
      <Row>
        <Sheet open>
          <SheetTrigger asChild>
            <Button intent="secondary">Run settings</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Run settings</SheetTitle>
              <SheetDescription>
                Adjust the defaults used for this workspace before starting the
                next run.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              Review mode, generated artifact retention, and notification
              routing apply to new runs created from this workspace.
            </SheetBody>
            <SheetFooter>
              <SheetClose asChild>
                <Button intent="secondary">Cancel</Button>
              </SheetClose>
              <Button>Save settings</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
