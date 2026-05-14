import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
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
  TranscriptList
} from "pds";

const agentAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23242424'/%3E%3Ccircle cx='40' cy='40' r='24' fill='%234F55F1'/%3E%3Cpath d='M29 43h22M32 33h2M46 33h2' stroke='%23fff' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E";

export function AgentSurfaceSection() {
  return (
    <section className="examples-section" aria-labelledby="agent-surface-title">
      <div className="examples-section-heading">
        <h2 id="agent-surface-title">Agent surface</h2>
        <p>
          First product component slice combining status, message, transcript,
          and composer layout.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel examples-panel-wide">
          <h3>Transcript and composer</h3>
          <div className="examples-agent-shell">
            <Transcript aria-label="Agent conversation">
              <TranscriptList>
                <Message role="user">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>PC</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageHeader>
                    <MessageAuthor>Pedro</MessageAuthor>
                    <MessageMeta>09:42</MessageMeta>
                    <RunStatus status="success">Sent</RunStatus>
                  </MessageHeader>
                  <MessageContent>
                    <p>
                      Please review the package exports and identify the next
                      small component slice.
                    </p>
                  </MessageContent>
                </Message>

                <Message role="assistant">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarImage alt="Agent" src={agentAvatar} />
                      <AvatarFallback>AI</AvatarFallback>
                      <AvatarBadge aria-label="Running" />
                    </Avatar>
                  </MessageAvatar>
                  <MessageHeader>
                    <MessageAuthor>Agent</MessageAuthor>
                    <MessageMeta>09:43</MessageMeta>
                    <RunStatus status="running">Running</RunStatus>
                  </MessageHeader>
                  <MessageContent>
                    <p>
                      The starter primitives are stable enough to support a
                      compact product slice. I am checking message layout,
                      status metadata, and composer behavior against the public
                      API.
                    </p>
                  </MessageContent>
                  <MessageActions>
                    <Button intent="secondary" size="sm">
                      Copy
                    </Button>
                    <Button intent="quiet" size="sm">
                      Resolve
                    </Button>
                  </MessageActions>
                </Message>
              </TranscriptList>
            </Transcript>

            <Composer
              aria-label="Agent reply composer"
              onSubmit={(event) => event.preventDefault()}
            >
              <ComposerInput
                aria-label="Message"
                defaultValue="Keep the implementation token-first and avoid adding tool output rendering in this slice."
              />
              <ComposerActions>
                <Button intent="secondary" type="button">
                  Save draft
                </Button>
                <Button type="submit">Send</Button>
              </ComposerActions>
              <ComposerFooter>
                Submit behavior belongs to the consuming product surface.
              </ComposerFooter>
            </Composer>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Busy and disabled composer</h3>
          <Composer aria-label="Busy composer" busy disabled>
            <ComposerInput
              aria-label="Disabled message"
              defaultValue="Waiting for the current run to finish before accepting another message."
            />
            <ComposerActions>
              <Button disabled type="submit">
                Sending
              </Button>
            </ComposerActions>
            <ComposerFooter>Current run is still processing.</ComposerFooter>
          </Composer>
        </div>

        <div className="examples-panel examples-panel-narrow">
          <h3>Narrow content</h3>
          <div className="examples-narrow-frame">
            <Transcript aria-label="Narrow transcript" density="compact">
              <TranscriptList>
                <Message role="assistant" variant="compact">
                  <MessageHeader>
                    <MessageAuthor>
                      Assistant with a translated display name that wraps
                    </MessageAuthor>
                    <MessageMeta>
                      run-agent-production-eu-west-very-long-generated-id
                    </MessageMeta>
                    <RunStatus status="warning">
                      Waiting for translated reviewer approval
                    </RunStatus>
                  </MessageHeader>
                  <MessageContent>
                    <p>
                      This intentionally long user-generated content includes a
                      generated_identifier_without_breaks_2026_05_14_to_check_wrapping
                      and translated copy that should remain available in a
                      narrow container.
                    </p>
                  </MessageContent>
                </Message>
              </TranscriptList>
            </Transcript>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Empty transcript</h3>
          <Transcript
            aria-label="Empty transcript"
            empty="No messages have been added to this run yet."
          />
        </div>
      </div>
    </section>
  );
}
