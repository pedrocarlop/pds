import {
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  ScrollArea
} from "@pds/react";

import { NarrowFrame, Stack, longBody } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const runs = [
  ["Build", "Preview artifacts compiled successfully."],
  ["Review", longBody],
  ["Docs", "Reference and component context are ready for verification."],
  ["Release", "Package contract checks will confirm the public surface."],
  ["Archive", "Older generated runs remain available for audit."]
] as const;

const preview = {
  description: "Constrained scroll regions with tokenized scrollbar affordances.",
  group: "Layout and data",
  id: "scroll-area",
  name: "ScrollArea",
  Preview() {
    return (
      <Stack>
        <ScrollArea
          className="visual-lab-narrow"
          viewportProps={{ "aria-label": "Recent run activity", tabIndex: 0 }}
        >
          <DataList>
            {runs.map(([term, description]) => (
              <DataListItem key={term}>
                <DataListTerm>{term}</DataListTerm>
                <DataListDescription>{description}</DataListDescription>
              </DataListItem>
            ))}
          </DataList>
        </ScrollArea>
        <NarrowFrame>
          <ScrollArea
            viewportProps={{ "aria-label": "Long generated summary" }}
          >
            <p className="visual-lab-note">{longBody}</p>
          </ScrollArea>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
