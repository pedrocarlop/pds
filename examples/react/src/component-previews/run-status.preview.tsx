import { RunStatus } from "@pds/react";
import type { RunStatusStatus } from "@pds/react";

import { Row } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const statuses: RunStatusStatus[] = [
  "idle",
  "queued",
  "running",
  "success",
  "warning",
  "error",
  "cancelled"
];

const preview = {
  description: "Compact semantic status treatment for agent and tool runs.",
  group: "Feedback",
  id: "run-status",
  name: "RunStatus",
  Preview() {
    return (
      <Row>
        {statuses.map((status) => (
          <RunStatus key={status} status={status} />
        ))}
      </Row>
    );
  }
} satisfies ComponentPreview;

export default preview;
