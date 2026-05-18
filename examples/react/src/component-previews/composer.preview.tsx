import {
  Button,
  Composer,
  ComposerActions,
  ComposerFooter,
  ComposerInput
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Agent reply composer with textarea, actions, footer, and busy state.",
  group: "Conversation",
  id: "composer",
  name: "Composer",
  Preview() {
    return (
      <Stack>
        <Composer
          aria-label="Agent reply composer"
          onSubmit={(event) => event.preventDefault()}
        >
          <ComposerInput
            aria-label="Message"
            placeholder="Ask the agent to implement the next PDS screen"
            rows={4}
          />
          <ComposerActions>
            <Button intent="secondary" type="button">
              Save draft
            </Button>
            <Button type="submit">Send</Button>
          </ComposerActions>
          <ComposerFooter>Submit behavior is consumer-owned.</ComposerFooter>
        </Composer>
        <Composer aria-label="Busy composer" busy>
          <ComposerInput aria-label="Busy message" defaultValue="Sending" />
          <ComposerActions>
            <Button disabled>Sending</Button>
          </ComposerActions>
        </Composer>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
