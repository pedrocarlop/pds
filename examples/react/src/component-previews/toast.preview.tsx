import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Non-blocking notification with tone, action, close, and viewport.",
  group: "Feedback",
  id: "toast",
  name: "Toast",
  Preview() {
    return (
      <ToastProvider swipeDirection="right">
        <Stack>
          <p className="visual-lab-note">
            Toast uses a viewport, so the open notification appears at the edge
            of the preview page.
          </p>
          <Toast open tone="success">
            <ToastTitle>Run summary ready</ToastTitle>
            <ToastDescription>
              The generated artifact is ready for review.
            </ToastDescription>
            <ToastAction altText="Open run">Open</ToastAction>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </Stack>
      </ToastProvider>
    );
  }
} satisfies ComponentPreview;

export default preview;
