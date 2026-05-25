import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  Input
} from "@pds/react";

import { NarrowFrame, Stack, longBody } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Optional advanced content with open, closed, and narrow examples.",
  group: "Overlays",
  id: "collapsible",
  name: "Collapsible",
  Preview() {
    return (
      <Stack>
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Advanced run settings</CollapsibleTrigger>
          <CollapsibleContent>
            <Stack>
              <Field>
                <FieldLabel htmlFor="collapsible-timeout">Timeout</FieldLabel>
                <FieldContent>
                  <Input id="collapsible-timeout" defaultValue="120 seconds" />
                  <FieldDescription>{longBody}</FieldDescription>
                </FieldContent>
              </Field>
              <Button intent="secondary">Save advanced settings</Button>
            </Stack>
          </CollapsibleContent>
        </Collapsible>
        <NarrowFrame>
          <Collapsible>
            <CollapsibleTrigger>Closed deployment details</CollapsibleTrigger>
            <CollapsibleContent>
              <p className="visual-lab-note">{longBody}</p>
            </CollapsibleContent>
          </Collapsible>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
