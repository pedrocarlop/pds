import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Tabbed panels with line and segmented list variants.",
  group: "Navigation",
  id: "tabs",
  name: "Tabs",
  Preview() {
    return (
      <Stack>
        <Tabs defaultValue="summary">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <p className="visual-lab-note">{longBody}</p>
          </TabsContent>
          <TabsContent value="tools">
            <p className="visual-lab-note">Tool output is ready for inspection.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="visual-lab-note">Settings remain in a separate tab panel.</p>
          </TabsContent>
        </Tabs>
        <Tabs defaultValue="review">
          <TabsList variant="segmented">
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
          </TabsList>
        </Tabs>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
