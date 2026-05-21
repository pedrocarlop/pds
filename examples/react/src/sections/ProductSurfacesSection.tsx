import * as React from "react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  Badge,
  Button,
  Cell,
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
  Icon,
  Message,
  MessageActions,
  MessageAuthor,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageMeta,
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderText,
  PageHeaderTitle,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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

interface SettingsSection {
  badge: string;
  description: string;
  icon: string;
  id: string;
  title: string;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "inactive";
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

const settingsSections: SettingsSection[] = [
  {
    badge: "Live",
    description: "Workspace name, default model lane, and system instructions.",
    icon: "tune",
    id: "workspace",
    title: "Workspace defaults",
    tone: "success"
  },
  {
    badge: "3 accounts",
    description: "GitHub, Linear, Slack, and other connected account scopes.",
    icon: "hub",
    id: "accounts",
    title: "Connected accounts"
  },
  {
    badge: "Required",
    description: "Human approval rules for publish, delete, and revoke flows.",
    icon: "verified_user",
    id: "approvals",
    title: "Approval policy",
    tone: "accent"
  },
  {
    badge: "Degraded",
    description: "Tool gateway latency, review API health, and incident status.",
    icon: "monitor_heart",
    id: "system",
    title: "System status",
    tone: "warning"
  },
  {
    badge: "Audit",
    description: "Run history, event exports, retention windows, and logs.",
    icon: "history",
    id: "audit",
    title: "Audit and retention"
  },
  {
    badge: "Locked",
    description: "Delete workspace data, rotate secrets, and revoke access.",
    icon: "warning",
    id: "danger",
    title: "Danger zone",
    tone: "danger"
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
  return (
    <div className="examples-settings-page">
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderText>
            <PageHeaderTitle>Settings</PageHeaderTitle>
            <PageHeaderDescription>
              Manage workspace defaults, account access, approval rules, and
              operational safeguards from one scannable settings page.
            </PageHeaderDescription>
            <PageHeaderMeta>
              <Badge>6 sections</Badge>
              <RunStatus status="warning">1 section needs review</RunStatus>
            </PageHeaderMeta>
          </PageHeaderText>
          <PageHeaderActions>
            <Button intent="secondary">Export audit log</Button>
            <Button>Save changes</Button>
          </PageHeaderActions>
        </PageHeaderContent>
      </PageHeader>

      <ul className="examples-settings-cell-list" aria-label="Settings sections">
        {settingsSections.map((section) => (
          <li key={section.id}>
            <Cell use="button" variant="disclosure">
              <Icon
                aria-hidden="true"
                className="examples-settings-cell-icon"
                name={section.icon}
              />
              <span className="examples-settings-cell-copy">
                <strong>{section.title}</strong>
                <span>{section.description}</span>
              </span>
              <Badge tone={section.tone}>{section.badge}</Badge>
            </Cell>
          </li>
        ))}
      </ul>
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
