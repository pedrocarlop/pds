import * as React from "react";
import { Button, Toaster, toast } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const toasterId = "sonner-preview";
const toastId = "sonner-preview-toast";

function SonnerPreview() {
  React.useEffect(() => {
    toast.success("Run queued", {
      action: {
        label: "Open",
        onClick: () => {}
      },
      description: "Reviewers will be notified when the run starts.",
      duration: Infinity,
      id: toastId,
      toasterId
    });

    return () => {
      toast.dismiss(toastId);
    };
  }, []);

  return (
    <Stack>
      <Row>
        <Button
          intent="secondary"
          onClick={() => {
            toast.info("Reviewer added", {
              description: "The workspace notification list was updated.",
              id: "sonner-preview-info",
              toasterId
            });
          }}
        >
          Notify
        </Button>
      </Row>
      <Toaster id={toasterId} duration={100000} />
    </Stack>
  );
}

const preview = {
  description: "Sonner-backed toaster with PDS toast classes, icons, action, and queue API.",
  group: "Feedback",
  id: "sonner",
  name: "Toaster",
  Preview: SonnerPreview
} satisfies ComponentPreview;

export default preview;
