import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button
} from "@pds/react";

import { longBody } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Blocking confirmation dialog with title, description, and paired actions.",
  group: "Overlays",
  id: "alert-dialog",
  name: "AlertDialog",
  Preview() {
    return (
      <AlertDialog open>
        <Button intent="danger">Delete draft</Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete generated draft?</AlertDialogTitle>
            <AlertDialogDescription>{longBody}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
} satisfies ComponentPreview;

export default preview;
