import {
  Message,
  MessageAuthor,
  MessageContent,
  MessageHeader,
  MessageMeta,
  RunStatus,
  Transcript,
  TranscriptEmpty,
  TranscriptList
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Conversation transcript with list, empty state, and compact density.",
  group: "Conversation",
  id: "transcript",
  name: "Transcript",
  Preview() {
    return (
      <Stack>
        <Transcript>
          <TranscriptList>
            <Message role="user">
              <MessageHeader>
                <MessageAuthor>Pedro</MessageAuthor>
                <MessageMeta>Just now</MessageMeta>
              </MessageHeader>
              <MessageContent>
                <p>Can you connect the components to Ladle previews?</p>
              </MessageContent>
            </Message>
            <Message role="assistant">
              <MessageHeader>
                <MessageAuthor>Agent</MessageAuthor>
                <MessageMeta>
                  <RunStatus status="running" />
                </MessageMeta>
              </MessageHeader>
              <MessageContent>
                <p>{longBody}</p>
              </MessageContent>
            </Message>
          </TranscriptList>
        </Transcript>
        <Transcript density="compact">
          <TranscriptEmpty>Empty slot rendered directly.</TranscriptEmpty>
        </Transcript>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
