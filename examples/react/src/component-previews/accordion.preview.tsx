import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger
} from "@pds/react";

import { longBody, NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Expandable sections with open, closed, and narrow long-copy states.",
  group: "Layout and data",
  id: "accordion",
  name: "Accordion",
  Preview() {
    return (
      <Stack>
        <Accordion defaultValue="summary" type="single">
          <AccordionItem value="summary">
            <AccordionHeader>
              <AccordionTrigger>Run summary</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>{longBody}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="policy">
            <AccordionHeader>
              <AccordionTrigger>Review policy</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Approval requires a human reviewer.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <NarrowFrame>
          <Accordion defaultValue="long" type="single">
            <AccordionItem value="long">
              <AccordionHeader>
                <AccordionTrigger>
                  Very long translated section title for generated audit output
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>{longBody}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
