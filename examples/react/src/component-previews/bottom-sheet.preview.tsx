import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  Button
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Bottom-attached review surface with fixed actions and scrollable body.",
  group: "Overlays",
  id: "bottom-sheet",
  name: "BottomSheet",
  Preview() {
    return (
      <Stack>
        <BottomSheet>
          <BottomSheetTrigger asChild>
            <Button>Review agreement</Button>
          </BottomSheetTrigger>
          <BottomSheetContent>
            <BottomSheetHeader>
              <BottomSheetTitle>Platform services agreement</BottomSheetTitle>
              <BottomSheetDescription>
                Version 4.2 - Spain - Updated May 2026
              </BottomSheetDescription>
            </BottomSheetHeader>
            <BottomSheetBody>
              <p>{longBody}</p>
            </BottomSheetBody>
            <BottomSheetFooter>
              <BottomSheetClose asChild>
                <Button intent="secondary">Cancel</Button>
              </BottomSheetClose>
              <BottomSheetClose asChild>
                <Button>Accept agreement</Button>
              </BottomSheetClose>
            </BottomSheetFooter>
          </BottomSheetContent>
        </BottomSheet>
        <p className="visual-lab-note">
          Use the trigger to inspect the sheet in Ladle.
        </p>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
