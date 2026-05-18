import {
  Details,
  DetailsCell,
  DetailsCellSkeleton,
  DetailsSkeleton
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Compact detail rows, cells, notes, and loading skeletons.",
  group: "Layout and data",
  id: "details",
  name: "Details",
  Preview() {
    return (
      <Stack>
        <Details>
          <Details.Title>Default details</Details.Title>
          <Details.Content>Generated change summary</Details.Content>
          <Details.Note>Updated now</Details.Note>
        </Details>
        <DetailsCell variant="compact">
          <DetailsCell.Title>Compact cell</DetailsCell.Title>
          <DetailsCell.Content>Review required</DetailsCell.Content>
        </DetailsCell>
        <DetailsSkeleton />
        <DetailsCellSkeleton />
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
