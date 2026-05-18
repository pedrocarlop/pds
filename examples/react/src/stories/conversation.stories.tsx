import type { Story, StoryDefault } from "@ladle/react";
import {
  Avatar,
  AvatarFallback,
  Button,
  Composer,
  ComposerActions,
  ComposerFooter,
  ComposerInput,
  Message,
  MessageActions,
  MessageAuthor,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageMeta,
  RunStatus,
  Transcript,
  TranscriptEmpty,
  TranscriptList
} from "@pds/react";
import type { MessageRole, TranscriptDensity } from "@pds/react";

import "../examples.css";
import { ProductSurfacesSection } from "../sections/ProductSurfacesSection";
import {
  longBody,
  MatrixItem,
  NarrowFrame,
  Row,
  Stack,
  StateMatrix,
  StoryFrame,
  surfaceArgTypes
} from "./StoryFrame";
import type { StorySurface } from "./StoryFrame";

export default {
  title: "Conversation Product"
} satisfies StoryDefault;

function AgentAvatar({ label = "AI" }: { label?: string }) {
  return (
    <Avatar size="sm">
      <AvatarFallback>{label}</AvatarFallback>
    </Avatar>
  );
}

function MessageExample({
  role = "assistant",
  variant = "default"
}: {
  role?: MessageRole;
  variant?: "default" | "compact";
}) {
  return (
    <Message role={role} variant={variant}>
      <MessageAvatar>
        <AgentAvatar label={role === "user" ? "PC" : "AI"} />
      </MessageAvatar>
      <MessageHeader>
        <MessageAuthor>{role === "user" ? "Pedro" : "Agent"}</MessageAuthor>
        <MessageMeta>Just now</MessageMeta>
      </MessageHeader>
      <MessageContent>
        <p>{longBody}</p>
      </MessageContent>
      <MessageActions>
        <Button intent="quiet" size="sm">
          Copy
        </Button>
        <Button intent="quiet" size="sm">
          Inspect
        </Button>
      </MessageActions>
    </Message>
  );
}

function TranscriptExample({
  density = "default",
  empty = false
}: {
  density?: TranscriptDensity;
  empty?: boolean;
}) {
  if (empty) {
    return <Transcript density={density} empty="No messages yet." />;
  }

  return (
    <Transcript density={density}>
      <TranscriptList>
        <MessageExample role="user" variant={density === "compact" ? "compact" : "default"} />
        <MessageExample role="assistant" variant={density === "compact" ? "compact" : "default"} />
        <Message role="tool" variant={density === "compact" ? "compact" : "default"}>
          <MessageHeader>
            <MessageAuthor>Tool run</MessageAuthor>
            <MessageMeta>
              <RunStatus status="success" />
            </MessageMeta>
          </MessageHeader>
          <MessageContent>
            <p>Fetched current implementation status and component exports.</p>
          </MessageContent>
        </Message>
      </TranscriptList>
    </Transcript>
  );
}

function ComposerExample({
  busy = false,
  disabled = false,
  invalid = false
}: {
  busy?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <Composer
      aria-label="Agent reply composer"
      busy={busy}
      disabled={disabled}
      invalid={invalid}
      onSubmit={(event) => event.preventDefault()}
    >
      <ComposerInput
        aria-label="Message"
        defaultValue={invalid ? "Ship it without reviewing spacing" : ""}
        placeholder="Ask the agent to implement the next PDS screen"
        rows={4}
      />
      <ComposerActions>
        <Button disabled={disabled || busy} intent="secondary" type="button">
          Save draft
        </Button>
        <Button disabled={disabled || busy} type="submit">
          {busy ? "Sending" : "Send"}
        </Button>
      </ComposerActions>
      <ComposerFooter>
        {invalid ? "Explain the review reason before sending." : "Submit behavior is consumer-owned."}
      </ComposerFooter>
    </Composer>
  );
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Conversation primitives for agent-facing transcripts, messages, and composers."
    surface={surface}
    title="Conversation"
  >
    <StateMatrix>
      <MatrixItem label="Message roles">
        <Stack>
          <MessageExample role="user" />
          <MessageExample role="assistant" />
          <MessageExample role="system" />
          <MessageExample role="tool" />
        </Stack>
      </MatrixItem>
      <MatrixItem label="Transcript states">
        <Stack>
          <TranscriptExample />
          <Transcript>
            <TranscriptEmpty>Empty slot rendered directly.</TranscriptEmpty>
          </Transcript>
        </Stack>
      </MatrixItem>
      <MatrixItem label="Composer states">
        <Stack>
          <ComposerExample />
          <ComposerExample busy />
          <ComposerExample invalid />
          <ComposerExample disabled />
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  busy: boolean;
  density: TranscriptDensity;
  disabled: boolean;
  invalid: boolean;
  role: MessageRole;
  surface: StorySurface;
}> = ({ busy, density, disabled, invalid, role, surface }) => (
  <StoryFrame
    description="Manipulate conversation state without adding side effects to PDS components."
    surface={surface}
    title="Conversation controls"
  >
    <StateMatrix>
      <MatrixItem label="Message role">
        <MessageExample role={role} variant={density === "compact" ? "compact" : "default"} />
      </MatrixItem>
      <MatrixItem label="Transcript density">
        <TranscriptExample density={density} />
      </MatrixItem>
      <MatrixItem label="Composer state">
        <ComposerExample busy={busy} disabled={disabled} invalid={invalid} />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  busy: false,
  density: "default",
  disabled: false,
  invalid: false,
  role: "assistant",
  surface: "grouped"
};
Controls.argTypes = {
  busy: { control: { type: "boolean" } },
  density: {
    control: { type: "inline-radio" },
    options: ["default", "compact"]
  },
  disabled: { control: { type: "boolean" } },
  invalid: { control: { type: "boolean" } },
  role: {
    control: { type: "select" },
    options: ["user", "assistant", "system", "tool"]
  },
  ...surfaceArgTypes
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Conversation surfaces keep long generated content and actions visible in narrow panes."
    surface={surface}
    title="Conversation resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow transcript">
        <NarrowFrame>
          <TranscriptExample density="compact" />
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Long composer content">
        <Stack>
          <Composer
            aria-label="Long composer"
            onSubmit={(event) => event.preventDefault()}
          >
            <ComposerInput aria-label="Message" defaultValue={longBody} rows={5} />
            <ComposerActions>
              <Button intent="secondary" type="button">
                Save extended draft
              </Button>
              <Button type="submit">Send for review</Button>
            </ComposerActions>
            <ComposerFooter>{longBody}</ComposerFooter>
          </Composer>
          <Row>
            <RunStatus status="running">Generating accessible review summary</RunStatus>
          </Row>
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Resilience.args = {
  surface: "grouped"
};
Resilience.argTypes = surfaceArgTypes;

export const ProductSurfaces: Story = () => (
  <main className="examples-page">
    <ProductSurfacesSection />
  </main>
);
