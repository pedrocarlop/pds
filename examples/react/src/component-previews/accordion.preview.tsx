import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button
} from "@pds/react";

import { NarrowFrame, Stack, longBody, longLabel } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Grouped disclosure sections with open, disabled, and long-content states.",
  group: "Overlays",
  id: "accordion",
  name: "Accordion",
  Preview() {
    return (
      <Stack>
        <Accordion type="multiple" defaultValue={["summary", "checks"]}>
          <AccordionItem value="summary">
            <AccordionTrigger>Run summary</AccordionTrigger>
            <AccordionContent>
              <p>{longBody}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="checks">
            <AccordionTrigger>Verification checks</AccordionTrigger>
            <AccordionContent>
              <Stack>
                <Badge tone="success">59 previews passed</Badge>
                <Button intent="secondary">Open report</Button>
              </Stack>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem disabled value="disabled">
            <AccordionTrigger>Archived details</AccordionTrigger>
            <AccordionContent>Archived details are not available.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <NarrowFrame>
          <Accordion type="single" collapsible defaultValue="long">
            <AccordionItem value="long">
              <AccordionTrigger>{longLabel}</AccordionTrigger>
              <AccordionContent>{longBody}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
