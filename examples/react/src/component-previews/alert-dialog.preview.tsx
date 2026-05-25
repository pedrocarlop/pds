import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Icon
} from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Confirmation dialog with alert semantics, media, supporting copy, and cancel/action controls.",
  group: "Overlays",
  id: "alert-dialog",
  name: "AlertDialog",
  Preview() {
    return (
      <Row>
        <AlertDialog open>
          <AlertDialogTrigger asChild>
            <Button intent="danger">Discard draft</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <Icon name="warning" />
              </AlertDialogMedia>
              <AlertDialogTitle>Discard generated draft?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes the generated notes and keeps the source files
                unchanged. The action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep draft</AlertDialogCancel>
              <AlertDialogAction>Discard</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
