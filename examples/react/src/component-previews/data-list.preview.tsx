import {
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Term-description metadata display in default and compact density.",
  group: "Layout and data",
  id: "data-list",
  name: "DataList",
  Preview() {
    return (
      <Stack>
        <DataList>
          <DataListItem>
            <DataListTerm>Owner</DataListTerm>
            <DataListDescription>Agent workspace</DataListDescription>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Status</DataListTerm>
            <DataListDescription>Awaiting approval</DataListDescription>
          </DataListItem>
          <DataListItem>
            <DataListTerm>Risk</DataListTerm>
            <DataListDescription>Low</DataListDescription>
          </DataListItem>
        </DataList>
        <DataList density="compact">
          <DataListItem>
            <DataListTerm>Updated</DataListTerm>
            <DataListDescription>2m ago</DataListDescription>
          </DataListItem>
        </DataList>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
