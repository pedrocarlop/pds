import * as React from "react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  Composer,
  ComposerActions,
  ComposerFooter,
  ComposerInput,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  InlineAlert,
  InlineAlertActions,
  InlineAlertDescription,
  InlineAlertTitle,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
  Message,
  MessageActions,
  MessageAuthor,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageMeta,
  Progress,
  RunStatus,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceFooter,
  SurfaceHeader,
  SurfaceTitle,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Transcript,
  TranscriptList
} from "@pds/react";

type ToolStatus = "queued" | "running" | "success" | "warning" | "error";
type ReviewMode = "pending" | "resolved" | "empty";
type ReviewState = "idle" | "loading" | "approved" | "rejected" | "error";

interface ToolRun {
  id: string;
  name: string;
  status: ToolStatus;
  label: string;
  duration: string;
  detail: string;
  output: string;
}

interface ReviewItem {
  id: string;
  title: string;
  owner: string;
  risk: "Low" | "Medium" | "High";
  status: "Pending" | "Approved" | "Rejected";
  age: string;
  summary: string;
}

interface Account {
  id: string;
  name: string;
  status: "success" | "warning" | "error";
  meta: string;
}

const toolRuns: ToolRun[] = [
  {
    id: "search",
    name: "Policy search",
    status: "success",
    label: "Indexed",
    duration: "1.4s",
    detail: "Searched workspace policy notes and matched approval language.",
    output: "5 relevant passages, newest source: May release checklist."
  },
  {
    id: "diff",
    name: "Repository diff",
    status: "running",
    label: "Streaming",
    duration: "8.2s",
    detail: "Comparing pending package changes against component contracts.",
    output: "12 files inspected, 3 require human approval before merge."
  },
  {
    id: "handoff",
    name: "Handoff draft",
    status: "queued",
    label: "Waiting",
    duration: "Queued",
    detail: "Preparing a concise reviewer handoff after validation finishes.",
    output: "Summary will include risks, checks, and unresolved questions."
  }
];

const reviewItems: ReviewItem[] = [
  {
    id: "queue-1",
    title: "Publish retry policy change",
    owner: "Release agent",
    risk: "Medium",
    status: "Pending",
    age: "4m",
    summary:
      "The agent wants to retry package publish failures twice before escalating to a human reviewer."
  },
  {
    id: "queue-2",
    title: "Merge generated acceptance copy",
    owner: "Legal workflow",
    risk: "High",
    status: "Pending",
    age: "11m",
    summary:
      "Generated copy changes the acceptance requirement for translated agreements and needs explicit review."
  },
  {
    id: "queue-3",
    title: "Close stale support run",
    owner: "Ops assistant",
    risk: "Low",
    status: "Approved",
    age: "22m",
    summary:
      "The run is already resolved and can be archived after confirming no linked incident remains open."
  }
];

const accounts: Account[] = [
  {
    id: "github",
    name: "GitHub",
    status: "success",
    meta: "Connected as pds-maintainer"
  },
  {
    id: "linear",
    name: "Linear",
    status: "warning",
    meta: "Token expires in 6 days"
  },
  {
    id: "slack",
    name: "Slack",
    status: "error",
    meta: "Action scopes need review"
  }
];

function riskTone(risk: ReviewItem["risk"]) {
  if (risk === "High") {
    return "danger";
  }

  if (risk === "Medium") {
    return "warning";
  }

  return "neutral";
}

function statusForReview(state: ReviewState) {
  if (state === "approved") {
    return "success";
  }

  if (state === "rejected") {
    return "cancelled";
  }

  if (state === "error") {
    return "error";
  }

  if (state === "loading") {
    return "running";
  }

  return "queued";
}

function progressForTool(status: ToolStatus) {
  if (status === "success") {
    return 100;
  }

  if (status === "running") {
    return 68;
  }

  if (status === "warning") {
    return 42;
  }

  if (status === "error") {
    return 28;
  }

  return 12;
}

function AgentWorkspaceSurface() {
  const [selectedToolId, setSelectedToolId] = React.useState(toolRuns[1].id);
  const [draft, setDraft] = React.useState(
    "Summarize the diff, flag risky policy changes, and keep the approval queue in view."
  );
  const [sentDraft, setSentDraft] = React.useState("");
  const selectedTool =
    toolRuns.find((toolRun) => toolRun.id === selectedToolId) ?? toolRuns[0];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSentDraft(draft.trim());
  }

  return (
    <div className="examples-product-grid examples-product-grid-agent">
      <Surface className="examples-product-main" level="base">
        <SurfaceHeader>
          <div>
            <SurfaceTitle>Agent workspace</SurfaceTitle>
            <SurfaceDescription>
              Conversation, run status, composer, and inspectable tool activity
              stay in one task surface.
            </SurfaceDescription>
          </div>
          <SurfaceAction>
            <RunStatus status="running">Run active</RunStatus>
          </SurfaceAction>
        </SurfaceHeader>
        <SurfaceContent>
          <Transcript aria-label="Agent workspace transcript">
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
                    Review the pending package change and tell me what needs
                    human approval before release.
                  </p>
                </MessageContent>
              </Message>

              <Message role="assistant">
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarBadge aria-label="Running" />
                  </Avatar>
                </MessageAvatar>
                <MessageHeader>
                  <MessageAuthor>Agent</MessageAuthor>
                  <MessageMeta>09:43</MessageMeta>
                  <RunStatus status="running">Inspecting tools</RunStatus>
                </MessageHeader>
                <MessageContent>
                  <p>
                    The release path is mostly clear. I found one policy copy
                    change and one connected-account scope mismatch that should
                    stay visible for review.
                  </p>
                </MessageContent>
                <MessageActions>
                  <Button intent="secondary" size="sm">
                    Copy
                  </Button>
                  <Button intent="quiet" size="sm">
                    Create task
                  </Button>
                </MessageActions>
              </Message>

              {sentDraft ? (
                <Message role="user" variant="compact">
                  <MessageHeader>
                    <MessageAuthor>You</MessageAuthor>
                    <MessageMeta>Draft sent locally</MessageMeta>
                    <RunStatus status="queued">Queued</RunStatus>
                  </MessageHeader>
                  <MessageContent>
                    <p>{sentDraft}</p>
                  </MessageContent>
                </Message>
              ) : null}
            </TranscriptList>
          </Transcript>

          <Composer aria-label="Agent reply composer" onSubmit={handleSubmit}>
            <ComposerInput
              aria-label="Message"
              onChange={(event) => setDraft(event.currentTarget.value)}
              value={draft}
            />
            <ComposerActions>
              <Button intent="secondary" type="button">
                Save draft
              </Button>
              <Button disabled={!draft.trim()} type="submit">
                Send
              </Button>
            </ComposerActions>
            <ComposerFooter>
              Composer state is local to this reference surface.
            </ComposerFooter>
          </Composer>
        </SurfaceContent>
      </Surface>

      <aside className="examples-inspector" aria-label="Tool inspection panel">
        <Surface level="elevated">
          <SurfaceHeader>
            <div>
              <SurfaceTitle>Tool status</SurfaceTitle>
              <SurfaceDescription>
                Select a tool run to inspect inputs, status, and output.
              </SurfaceDescription>
            </div>
          </SurfaceHeader>
          <SurfaceContent>
            <div className="examples-tool-list" role="list">
              {toolRuns.map((toolRun) => (
                <button
                  aria-pressed={toolRun.id === selectedToolId}
                  className="examples-tool-row"
                  key={toolRun.id}
                  onClick={() => setSelectedToolId(toolRun.id)}
                  type="button"
                >
                  <span>
                    <strong>{toolRun.name}</strong>
                    <span>{toolRun.duration}</span>
                  </span>
                  <RunStatus status={toolRun.status}>{toolRun.label}</RunStatus>
                </button>
              ))}
            </div>

            <DataList density="compact">
              <DataListItem>
                <DataListTerm>Selected tool</DataListTerm>
                <DataListDescription>{selectedTool.name}</DataListDescription>
              </DataListItem>
              <DataListItem>
                <DataListTerm>Detail</DataListTerm>
                <DataListDescription>{selectedTool.detail}</DataListDescription>
              </DataListItem>
              <DataListItem>
                <DataListTerm>Output</DataListTerm>
                <DataListDescription>{selectedTool.output}</DataListDescription>
              </DataListItem>
            </DataList>

            <div className="examples-progress-block">
              <span>{selectedTool.name} progress</span>
              <Progress
                aria-label={`${selectedTool.name} progress`}
                value={progressForTool(selectedTool.status)}
              />
            </div>
          </SurfaceContent>
        </Surface>
      </aside>
    </div>
  );
}

function ReviewQueueSurface() {
  const [mode, setMode] = React.useState<ReviewMode>("pending");
  const [selectedReviewId, setSelectedReviewId] = React.useState(reviewItems[0].id);
  const [reviewState, setReviewState] = React.useState<ReviewState>("idle");

  const visibleItems =
    mode === "empty"
      ? []
      : reviewItems.filter((item) =>
          mode === "pending" ? item.status === "Pending" : item.status !== "Pending"
        );
  const selectedReview =
    reviewItems.find((item) => item.id === selectedReviewId) ?? reviewItems[0];

  return (
    <div className="examples-product-grid">
      <Surface className="examples-queue-list" level="base">
        <SurfaceHeader>
          <div>
            <SurfaceTitle>Review queue</SurfaceTitle>
            <SurfaceDescription>
              Pending actions stay scannable while detail, decisions, and
              recovery remain in context.
            </SurfaceDescription>
          </div>
          <SurfaceAction>
            <Select value={mode} onValueChange={(value) => setMode(value as ReviewMode)}>
              <SelectTrigger aria-label="Queue view" density="compact">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="empty">Empty state</SelectItem>
              </SelectContent>
            </Select>
          </SurfaceAction>
        </SurfaceHeader>
        <SurfaceContent>
          {mode === "empty" ? (
            <InlineAlert tone="neutral">
              <InlineAlertTitle>No reviews match this filter</InlineAlertTitle>
              <InlineAlertDescription>
                Empty queue states keep the page calm and give users a clear
                return path.
              </InlineAlertDescription>
            </InlineAlert>
          ) : null}

          {reviewState === "loading" ? (
            <div className="examples-loading-stack" aria-label="Loading reviews">
              <Skeleton shape="text" />
              <Skeleton shape="block" />
              <Skeleton shape="block" />
            </div>
          ) : (
            <div className="examples-review-list" role="list">
              {visibleItems.map((item) => (
                <button
                  aria-pressed={item.id === selectedReview.id}
                  className="examples-review-row"
                  key={item.id}
                  onClick={() => {
                    setSelectedReviewId(item.id);
                    setReviewState("idle");
                  }}
                  type="button"
                >
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.summary}</span>
                  </span>
                  <span className="examples-review-meta">
                    <Badge tone={riskTone(item.risk)}>{item.risk}</Badge>
                    <span>{item.age}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </SurfaceContent>
      </Surface>

      <Surface level="elevated">
        <SurfaceHeader>
          <div>
            <SurfaceTitle>{selectedReview.title}</SurfaceTitle>
            <SurfaceDescription>{selectedReview.summary}</SurfaceDescription>
          </div>
          <SurfaceAction>
            <RunStatus status={statusForReview(reviewState)}>
              {reviewState === "idle" ? selectedReview.status : reviewState}
            </RunStatus>
          </SurfaceAction>
        </SurfaceHeader>
        <SurfaceContent>
          <DataList density="compact">
            <DataListItem>
              <DataListTerm>Owner</DataListTerm>
              <DataListDescription>{selectedReview.owner}</DataListDescription>
            </DataListItem>
            <DataListItem>
              <DataListTerm>Risk</DataListTerm>
              <DataListDescription>{selectedReview.risk}</DataListDescription>
            </DataListItem>
            <DataListItem>
              <DataListTerm>Waiting</DataListTerm>
              <DataListDescription>{selectedReview.age}</DataListDescription>
            </DataListItem>
          </DataList>

          {reviewState === "approved" ? (
            <InlineAlert tone="success">
              <InlineAlertTitle>Approval recorded</InlineAlertTitle>
              <InlineAlertDescription>
                The queue keeps the reviewed item visible with its decision
                state for audit.
              </InlineAlertDescription>
            </InlineAlert>
          ) : null}

          {reviewState === "rejected" ? (
            <InlineAlert tone="warning">
              <InlineAlertTitle>Change rejected</InlineAlertTitle>
              <InlineAlertDescription>
                The agent can revise the proposal without losing the original
                reviewer context.
              </InlineAlertDescription>
            </InlineAlert>
          ) : null}

          {reviewState === "error" ? (
            <InlineAlert tone="danger">
              <InlineAlertTitle>Decision failed</InlineAlertTitle>
              <InlineAlertDescription>
                Keep the user in place and offer retry when the approval service
                cannot save the decision.
              </InlineAlertDescription>
              <InlineAlertActions>
                <Button intent="secondary" size="sm" onClick={() => setReviewState("idle")}>
                  Retry
                </Button>
              </InlineAlertActions>
            </InlineAlert>
          ) : null}
        </SurfaceContent>
        <SurfaceFooter>
          <div className="examples-action-row">
            <Button
              disabled={reviewState === "loading"}
              intent="secondary"
              onClick={() => setReviewState("rejected")}
            >
              Reject
            </Button>
            <Button
              disabled={reviewState === "loading"}
              onClick={() => setReviewState("approved")}
            >
              Approve
            </Button>
            <Button intent="quiet" onClick={() => setReviewState("loading")}>
              Show loading
            </Button>
            <Button intent="quiet" onClick={() => setReviewState("error")}>
              Show error
            </Button>
          </div>
        </SurfaceFooter>
      </Surface>
    </div>
  );
}

function SettingsSystemSurface() {
  const [telemetryEnabled, setTelemetryEnabled] = React.useState(true);
  const [reviewRequired, setReviewRequired] = React.useState(true);
  const [confirmDanger, setConfirmDanger] = React.useState(false);

  return (
    <div className="examples-product-grid examples-product-grid-settings">
      <Surface level="base">
        <SurfaceHeader>
          <div>
            <SurfaceTitle>Settings and system</SurfaceTitle>
            <SurfaceDescription>
              Account controls, system posture, and destructive actions share
              one durable settings layout.
            </SurfaceDescription>
          </div>
        </SurfaceHeader>
        <SurfaceContent>
          <div className="examples-settings-form">
            <label className="examples-field">
              Workspace name
              <Input defaultValue="PDS release workspace" />
            </label>

            <label className="examples-field">
              Default model lane
              <Select defaultValue="balanced">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fast">Fast triage</SelectItem>
                  <SelectItem value="balanced">Balanced review</SelectItem>
                  <SelectItem value="deep">Deep verification</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label className="examples-field">
              System instructions
              <Textarea
                defaultValue="Keep product decisions inspectable, preserve review state, and avoid publishing generated output without approval."
                rows={4}
              />
            </label>

            <label className="examples-check-row">
              <Checkbox
                checked={reviewRequired}
                onCheckedChange={(checked) => setReviewRequired(checked === true)}
              />
              <span>
                <strong>Require approval for destructive actions</strong>
                <span>Human review stays mandatory for publish, delete, and revoke flows.</span>
              </span>
            </label>

            <label className="examples-switch-row">
              <span>
                <strong>Runtime telemetry</strong>
                <span>Collect agent run status and tool failure metadata.</span>
              </span>
              <Switch
                checked={telemetryEnabled}
                onCheckedChange={setTelemetryEnabled}
              />
            </label>
          </div>
        </SurfaceContent>
      </Surface>

      <div className="examples-settings-side">
        <Surface level="elevated">
          <SurfaceHeader>
            <div>
              <SurfaceTitle>Connected accounts</SurfaceTitle>
              <SurfaceDescription>
                Rows expose account health and local account actions.
              </SurfaceDescription>
            </div>
          </SurfaceHeader>
          <SurfaceContent>
            <div className="examples-account-list">
              {accounts.map((account) => (
                <div className="examples-account-row" key={account.id}>
                  <span>
                    <strong>{account.name}</strong>
                    <span>{account.meta}</span>
                  </span>
                  <span className="examples-account-actions">
                    <RunStatus status={account.status}>
                      {account.status === "success"
                        ? "Connected"
                        : account.status === "warning"
                          ? "Attention"
                          : "Blocked"}
                    </RunStatus>
                    <Menu>
                      <MenuTrigger asChild>
                        <Button aria-label={`${account.name} account actions`} intent="quiet" size="sm">
                          Manage
                        </Button>
                      </MenuTrigger>
                      <MenuContent align="end">
                        <MenuLabel>{account.name}</MenuLabel>
                        <MenuItem>Reconnect</MenuItem>
                        <MenuItem>View scopes</MenuItem>
                        <MenuSeparator />
                        <MenuItem intent="danger">
                          Remove
                          <MenuShortcut>!</MenuShortcut>
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </span>
                </div>
              ))}
            </div>
          </SurfaceContent>
        </Surface>

        <Surface level="elevated">
          <SurfaceHeader>
            <div>
              <SurfaceTitle>System status</SurfaceTitle>
              <SurfaceDescription>
                Compact rows keep operational details scannable.
              </SurfaceDescription>
            </div>
          </SurfaceHeader>
          <SurfaceContent>
            <TableContainer>
              <Table density="compact">
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Tool gateway</TableCell>
                    <TableCell>
                      <RunStatus status="success">Healthy</RunStatus>
                    </TableCell>
                    <TableCell>142 ms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Review API</TableCell>
                    <TableCell>
                      <RunStatus status="warning">Degraded</RunStatus>
                    </TableCell>
                    <TableCell>480 ms</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <InlineAlert tone="danger">
              <InlineAlertTitle>Delete workspace data</InlineAlertTitle>
              <InlineAlertDescription>
                Destructive actions require visible confirmation and a durable
                recovery explanation.
              </InlineAlertDescription>
              <InlineAlertActions>
                <label className="examples-confirm-row">
                  <Checkbox
                    checked={confirmDanger}
                    onCheckedChange={(checked) => setConfirmDanger(checked === true)}
                  />
                  <span>I understand this removes local run history.</span>
                </label>
                <Button disabled={!confirmDanger} intent="danger" size="sm">
                  Delete data
                </Button>
              </InlineAlertActions>
            </InlineAlert>
          </SurfaceContent>
        </Surface>
      </div>
    </div>
  );
}

export function ProductSurfacesSection() {
  return (
    <section className="examples-section" aria-labelledby="product-surfaces-title">
      <div className="examples-section-heading">
        <h2 id="product-surfaces-title">Reference product surfaces</h2>
        <p>
          Canonical examples for building agent-facing product UI from the PDS
          starter slice before extracting more primitives.
        </p>
      </div>

      <Tabs className="examples-product-tabs" defaultValue="agent">
        <TabsList aria-label="Reference product surfaces" variant="segmented">
          <TabsTrigger value="agent">Agent workspace</TabsTrigger>
          <TabsTrigger value="review">Review queue</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="agent">
          <AgentWorkspaceSurface />
        </TabsContent>
        <TabsContent value="review">
          <ReviewQueueSurface />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsSystemSurface />
        </TabsContent>
      </Tabs>
    </section>
  );
}
