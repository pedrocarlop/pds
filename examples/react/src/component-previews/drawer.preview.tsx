import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Vaul drawer with handle, modal content, body copy, and footer actions.",
  group: "Overlays",
  id: "drawer",
  name: "Drawer",
  Preview() {
    return (
      <Row>
        <Drawer direction="bottom" noBodyStyles open>
          <DrawerTrigger asChild>
            <Button intent="secondary">Review patch</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Review pending patch</DrawerTitle>
              <DrawerDescription>
                Confirm the generated component changes before applying them.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              Three files will be added and the generated references will be
              refreshed after verification.
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button intent="secondary">Cancel</Button>
              </DrawerClose>
              <Button>Apply patch</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
