import {
  Avatar,
  AvatarFallback,
  Button,
  Message,
  MessageActions,
  MessageAuthor,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageMeta
} from "@pds/react";

import { longBody, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Conversation message layout for user, assistant, system, and tool roles.",
  group: "Conversation",
  id: "message",
  name: "Message",
  Preview() {
    return (
      <Stack>
        <Message role="assistant">
          <MessageAvatar>
            <Avatar size="sm">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageHeader>
            <MessageAuthor>Agent</MessageAuthor>
            <MessageMeta>Just now</MessageMeta>
          </MessageHeader>
          <MessageContent>
            <p>{longBody}</p>
          </MessageContent>
          <MessageActions>
            <Button intent="quiet" size="sm">
              Copy
            </Button>
          </MessageActions>
        </Message>
        <Message role="tool" variant="compact">
          <MessageHeader>
            <MessageAuthor>Tool run</MessageAuthor>
            <MessageMeta>Success</MessageMeta>
          </MessageHeader>
          <MessageContent>
            <p>Fetched current implementation status and component exports.</p>
          </MessageContent>
        </Message>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
