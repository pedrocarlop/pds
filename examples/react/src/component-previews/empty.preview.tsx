import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Icon
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Reusable empty states with title, description, media, and recovery action.",
  group: "Feedback",
  id: "empty",
  name: "Empty",
  Preview() {
    return (
      <Stack>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon name="search" />
            </EmptyMedia>
            <EmptyTitle>No generated runs found</EmptyTitle>
            <EmptyDescription>
              Clear the current filters or adjust the date range to inspect more
              agent activity.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button intent="secondary">Clear filters</Button>
          </EmptyContent>
        </Empty>
        <NarrowFrame>
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No artifacts for this unusually long branch name</EmptyTitle>
              <EmptyDescription>
                The branch
                agent-run-production-eu-west-very-long-generated-identifier has
                not produced inspectable files yet.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
