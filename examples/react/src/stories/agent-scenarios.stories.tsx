import type { Story, StoryDefault } from "@ladle/react";
import {
  Badge,
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  Button,
  Checkbox,
  Composer,
  ComposerActions,
  ComposerInput,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FilterChip,
  Icon,
  InlineAlert,
  InlineAlertActions,
  InlineAlertDescription,
  InlineAlertTitle,
  Input,
  Message,
  MessageAuthor,
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
  Table,
  TableBody,
  TableCaption,
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
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Transcript,
  TranscriptList
} from "@pds/react";

import { StoryFrame } from "./StoryFrame";

const queueRows = [
  {
    age: "14 min",
    assignee: "Policy reviewer",
    caseId: "CASE-4281",
    owner: "Payments queue",
    risk: "High",
    status: "running" as const,
    title: "Generated refund policy exception needs evidence review"
  },
  {
    age: "31 min",
    assignee: "Operations lead",
    caseId: "CASE-4277",
    owner: "Trust queue",
    risk: "Medium",
    status: "queued" as const,
    title: "Account restriction appeal drafted by agent"
  },
  {
    age: "Today",
    assignee: "Risk reviewer",
    caseId: "CASE-4269",
    owner: "Compliance queue",
    risk: "Low",
    status: "warning" as const,
    title: "Merchant profile enrichment waiting for source check"
  }
];

const runSteps = [
  {
    detail: "Loaded customer timeline, policy exception, and refund history.",
    name: "Gather evidence",
    status: "success" as const
  },
  {
    detail: "Drafting risk summary with policy citations for approval.",
    name: "Draft proposal",
    status: "running" as const
  },
  {
    detail: "Requires policy reviewer approval before sending the exception.",
    name: "Approval gate",
    status: "queued" as const
  }
];

export default {
  title: "Agent scenarios"
} satisfies StoryDefault;

export const ReviewQueue: Story = () => (
  <StoryFrame
    description="Rendered outcome scenario for the review-queue pattern and first-level navigation structure."
    title="Review queue scenario"
  >
    <div className="visual-lab-scenario-shell">
      <nav className="visual-lab-scenario-nav" aria-label="Review workspace">
        <a aria-current="page" href="#reviews">
          Reviews
        </a>
        <a href="#activity">Activity</a>
        <a href="#policy">Policy</a>
        <a href="#settings">Settings</a>
      </nav>

      <div className="visual-lab-scenario-main">
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderText>
              <PageHeaderTitle>Operations review queue</PageHeaderTitle>
              <PageHeaderDescription>
                Compare pending agent proposals by case, risk, owner, age, and
                next action before approving or rejecting work.
              </PageHeaderDescription>
              <PageHeaderMeta>
                <Badge tone="warning">High-risk review active</Badge>
                <RunStatus status="running">Selection preserved</RunStatus>
              </PageHeaderMeta>
            </PageHeaderText>
            <PageHeaderActions>
              <Button intent="secondary">
                <Icon name="refresh" />
                Refresh
              </Button>
              <Button>
                <Icon name="rule" />
                Review policy
              </Button>
            </PageHeaderActions>
          </PageHeaderContent>
        </PageHeader>

        <Tabs defaultValue="pending">
          <TabsList aria-label="Review queue views">
            <TabsTrigger value="pending">Pending review</TabsTrigger>
            <TabsTrigger value="escalated">Escalated</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <div className="visual-lab-scenario-content">
              <Surface className="visual-lab-scenario-primary" level="base">
                <SurfaceHeader>
                  <SurfaceTitle>Pending agent actions</SurfaceTitle>
                  <SurfaceDescription>
                    Dense list first, selected detail second. The queue keeps
                    context visible when a decision is in progress.
                  </SurfaceDescription>
                  <SurfaceAction>
                    <FilterChip active count={3} icon="filter_list" label="Filters" />
                  </SurfaceAction>
                </SurfaceHeader>
                <SurfaceContent>
                  <div className="visual-lab-scenario-filters">
                    <FilterChip active count={1} label="Risk" />
                    <FilterChip count={2} label="Assignee" />
                    <FilterChip label="SLA" />
                  </div>

                  <TableContainer className="visual-lab-table-wrap">
                    <Table density="compact">
                      <TableCaption>
                        Review queue with risk, owner, status, age, and next action.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Case</TableHead>
                          <TableHead>Risk</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queueRows.map((row, index) => (
                          <TableRow
                            aria-selected={index === 0}
                            data-selected={index === 0 || undefined}
                            key={row.caseId}
                          >
                            <TableCell>
                              <strong>{row.caseId}</strong>
                              <span className="visual-lab-scenario-cell-note">
                                {row.title}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                tone={
                                  row.risk === "High"
                                    ? "danger"
                                    : row.risk === "Medium"
                                      ? "warning"
                                      : "neutral"
                                }
                              >
                                {row.risk}
                              </Badge>
                            </TableCell>
                            <TableCell>{row.owner}</TableCell>
                            <TableCell>
                              <RunStatus status={row.status} />
                            </TableCell>
                            <TableCell>{row.age}</TableCell>
                            <TableCell>
                              <Button intent="secondary" size="sm">
                                Inspect
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SurfaceContent>
              </Surface>

              <aside className="visual-lab-scenario-detail" aria-label="Selected review">
                <Surface level="elevated">
                  <SurfaceHeader>
                    <SurfaceTitle>Selected case</SurfaceTitle>
                    <SurfaceDescription>
                      CASE-4281 keeps the proposal, source evidence, owner, and
                      decision controls in one region.
                    </SurfaceDescription>
                  </SurfaceHeader>
                  <SurfaceContent>
                    <DataList density="compact">
                      <DataListItem>
                        <DataListTerm>Assigned to</DataListTerm>
                        <DataListDescription>Policy reviewer</DataListDescription>
                      </DataListItem>
                      <DataListItem>
                        <DataListTerm>Risk</DataListTerm>
                        <DataListDescription>
                          <Badge tone="danger">High</Badge>
                        </DataListDescription>
                      </DataListItem>
                      <DataListItem>
                        <DataListTerm>Evidence</DataListTerm>
                        <DataListDescription>
                          Source policy, customer timeline, and generated summary
                          attached for audit.
                        </DataListDescription>
                      </DataListItem>
                    </DataList>

                    <InlineAlert tone="warning">
                      <InlineAlertTitle>Decision needs visible context</InlineAlertTitle>
                      <InlineAlertDescription>
                        Rejecting or approving should preserve this selected case
                        and show retry feedback inline if the action fails.
                      </InlineAlertDescription>
                      <InlineAlertActions>
                        <Button intent="secondary" size="sm">
                          Defer
                        </Button>
                        <Button intent="danger" size="sm">
                          Reject
                        </Button>
                      </InlineAlertActions>
                    </InlineAlert>

                    <div className="visual-lab-scenario-loading" aria-label="Loading comparison">
                      <Skeleton shape="text" />
                      <Skeleton shape="text" />
                    </div>
                  </SurfaceContent>
                  <SurfaceFooter>
                    <Button intent="secondary">Request changes</Button>
                    <Button>Approve action</Button>
                  </SurfaceFooter>
                </Surface>
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </StoryFrame>
);

export const AgentWorkspace: Story = () => (
  <StoryFrame
    description="Rendered outcome scenario for the agent-workspace pattern."
    title="Agent workspace scenario"
  >
    <div className="visual-lab-scenario-shell">
      <nav className="visual-lab-scenario-nav" aria-label="Agent workspace">
        <a aria-current="page" href="#workspace">
          Workspace
        </a>
        <a href="#runs">Runs</a>
        <a href="#approvals">Approvals</a>
        <a href="#settings">Settings</a>
      </nav>

      <div className="visual-lab-scenario-main">
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderText>
              <PageHeaderTitle>Refund policy agent</PageHeaderTitle>
              <PageHeaderDescription>
                Conversation, current tool work, and the next user action stay
                visible while the run is active.
              </PageHeaderDescription>
              <PageHeaderMeta>
                <RunStatus status="running">Running tool checks</RunStatus>
                <Badge tone="neutral">3 tools inspected</Badge>
              </PageHeaderMeta>
            </PageHeaderText>
            <PageHeaderActions>
              <Button intent="secondary">
                <Icon name="pause" />
                Pause
              </Button>
              <Button intent="danger">
                <Icon name="stop" />
                Stop run
              </Button>
            </PageHeaderActions>
          </PageHeaderContent>
        </PageHeader>

        <div className="visual-lab-scenario-content">
          <Surface className="visual-lab-scenario-primary" level="base">
            <SurfaceHeader>
              <SurfaceTitle>Transcript</SurfaceTitle>
              <SurfaceDescription>
                Tool progress remains inspectable without hiding the composer.
              </SurfaceDescription>
            </SurfaceHeader>
            <SurfaceContent>
              <Transcript aria-label="Agent conversation" density="compact">
                <TranscriptList>
                  <Message role="user" variant="compact">
                    <MessageHeader>
                      <MessageAuthor>Operations lead</MessageAuthor>
                      <MessageMeta>09:41</MessageMeta>
                    </MessageHeader>
                    <MessageContent>
                      Draft the exception response and flag any policy risk.
                    </MessageContent>
                  </Message>
                  <Message role="assistant" variant="compact">
                    <MessageHeader>
                      <MessageAuthor>Policy agent</MessageAuthor>
                      <MessageMeta>Using source policy</MessageMeta>
                    </MessageHeader>
                    <MessageContent>
                      I found two policy constraints and one approval gate before
                      the message can be sent.
                    </MessageContent>
                  </Message>
                  <Message role="tool" variant="compact">
                    <MessageHeader>
                      <MessageAuthor>Tool: policy_search</MessageAuthor>
                      <MessageMeta>Running</MessageMeta>
                    </MessageHeader>
                    <MessageContent>
                      Searching refund exception, merchant dispute, and customer
                      timeline sources.
                    </MessageContent>
                  </Message>
                </TranscriptList>
              </Transcript>
            </SurfaceContent>
            <SurfaceFooter>
              <Composer aria-label="Message composer" busy>
                <ComposerInput
                  aria-label="Message"
                  defaultValue="Ask the agent to cite policy section 4.2"
                />
                <ComposerActions>
                  <Button intent="secondary" size="sm">
                    Attach
                  </Button>
                  <Button size="sm">Send</Button>
                </ComposerActions>
              </Composer>
            </SurfaceFooter>
          </Surface>

          <aside className="visual-lab-scenario-detail" aria-label="Run inspector">
            <Surface level="elevated">
              <SurfaceHeader>
                <SurfaceTitle>Active tool stack</SurfaceTitle>
                <SurfaceDescription>
                  The selected tool, output, and recovery state stay near the
                  current run status.
                </SurfaceDescription>
              </SurfaceHeader>
              <SurfaceContent>
                <DataList density="compact">
                  <DataListItem>
                    <DataListTerm>Current step</DataListTerm>
                    <DataListDescription>
                      <RunStatus status="running">Policy search</RunStatus>
                    </DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Workspace</DataListTerm>
                    <DataListDescription>Payments operations</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Next action</DataListTerm>
                    <DataListDescription>
                      Reviewer approval required before sending a customer
                      response.
                    </DataListDescription>
                  </DataListItem>
                </DataList>
                <Progress aria-label="Run progress" value={62} />
                <InlineAlert tone="warning">
                  <InlineAlertTitle>Approval gate detected</InlineAlertTitle>
                  <InlineAlertDescription>
                    Keep the required decision visible instead of relying on a
                    toast-only prompt.
                  </InlineAlertDescription>
                </InlineAlert>
              </SurfaceContent>
            </Surface>
          </aside>
        </div>
      </div>
    </div>
  </StoryFrame>
);

export const RunDetails: Story = () => (
  <StoryFrame
    description="Rendered outcome scenario for the run-details pattern."
    title="Run details scenario"
  >
    <div className="visual-lab-scenario-shell">
      <nav className="visual-lab-scenario-nav" aria-label="Run details">
        <a href="#workspace">Workspace</a>
        <a aria-current="page" href="#run">
          Run details
        </a>
        <a href="#logs">Logs</a>
        <a href="#audit">Audit</a>
      </nav>

      <div className="visual-lab-scenario-main">
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderText>
              <PageHeaderTitle>Run RUN-8429 policy exception</PageHeaderTitle>
              <PageHeaderDescription>
                Timeline, selected tool output, approval gate, and audit
                metadata remain visible for one inspectable run.
              </PageHeaderDescription>
              <PageHeaderMeta>
                <RunStatus status="running">Drafting proposal</RunStatus>
                <Badge tone="warning">Approval required</Badge>
              </PageHeaderMeta>
            </PageHeaderText>
            <PageHeaderActions>
              <Button intent="secondary">
                <Icon name="download" />
                Export audit
              </Button>
              <Button intent="danger">
                <Icon name="cancel" />
                Cancel run
              </Button>
            </PageHeaderActions>
          </PageHeaderContent>
        </PageHeader>

        <div className="visual-lab-scenario-content">
          <Surface className="visual-lab-scenario-primary" level="base">
            <SurfaceHeader>
              <SurfaceTitle>Timeline</SurfaceTitle>
              <SurfaceDescription>
                Step selection keeps evidence and recovery actions connected.
              </SurfaceDescription>
            </SurfaceHeader>
            <SurfaceContent>
              <DataList density="compact">
                {runSteps.map((step) => (
                  <DataListItem key={step.name}>
                    <DataListTerm>{step.name}</DataListTerm>
                    <DataListDescription>
                      <RunStatus status={step.status} />
                      <span className="visual-lab-scenario-cell-note">
                        {step.detail}
                      </span>
                    </DataListDescription>
                  </DataListItem>
                ))}
              </DataList>
            </SurfaceContent>
          </Surface>

          <aside className="visual-lab-scenario-detail" aria-label="Selected run step">
            <Surface level="elevated">
              <SurfaceHeader>
                <SurfaceTitle>Selected step output</SurfaceTitle>
                <SurfaceDescription>
                  Policy source, generated summary, and required approval are
                  available before continuation.
                </SurfaceDescription>
              </SurfaceHeader>
              <SurfaceContent>
                <Tabs defaultValue="evidence">
                  <TabsList aria-label="Run detail views" variant="segmented">
                    <TabsTrigger value="evidence">Evidence</TabsTrigger>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                    <TabsTrigger value="audit">Audit</TabsTrigger>
                  </TabsList>
                  <TabsContent value="evidence">
                    <InlineAlert tone="warning">
                      <InlineAlertTitle>Approval gate</InlineAlertTitle>
                      <InlineAlertDescription>
                        Policy section 4.2 must be approved before external
                        delivery.
                      </InlineAlertDescription>
                    </InlineAlert>
                    <DataList density="compact">
                      <DataListItem>
                        <DataListTerm>Source</DataListTerm>
                        <DataListDescription>
                          refund-exception-policy-v2026-05.pdf
                        </DataListDescription>
                      </DataListItem>
                      <DataListItem>
                        <DataListTerm>Reviewer</DataListTerm>
                        <DataListDescription>Policy reviewer</DataListDescription>
                      </DataListItem>
                    </DataList>
                  </TabsContent>
                </Tabs>
              </SurfaceContent>
              <SurfaceFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button intent="secondary">Review source</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Policy source</DialogTitle>
                      <DialogDescription>
                        Review the cited policy section before continuing.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button intent="secondary">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button>Approve next step</Button>
              </SurfaceFooter>
            </Surface>
          </aside>
        </div>
      </div>
    </div>
  </StoryFrame>
);

export const Settings: Story = () => (
  <StoryFrame
    description="Rendered outcome scenario for the settings-system pattern."
    title="Settings scenario"
  >
    <div className="visual-lab-scenario-shell">
      <nav className="visual-lab-scenario-nav" aria-label="Settings">
        <a href="#workspace">Workspace</a>
        <a href="#runs">Runs</a>
        <a aria-current="page" href="#settings">
          Settings
        </a>
        <a href="#security">Security</a>
      </nav>

      <div className="visual-lab-scenario-main">
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderText>
              <PageHeaderTitle>Agent workspace settings</PageHeaderTitle>
              <PageHeaderDescription>
                Routine configuration, connected account health, and destructive
                controls stay separated.
              </PageHeaderDescription>
              <PageHeaderMeta>
                <RunStatus status="success">Saved 2 min ago</RunStatus>
                <Badge tone="neutral">3 integrations</Badge>
              </PageHeaderMeta>
            </PageHeaderText>
            <PageHeaderActions>
              <Button intent="secondary">Reset</Button>
              <Button>Save changes</Button>
            </PageHeaderActions>
          </PageHeaderContent>
        </PageHeader>

        <div className="visual-lab-scenario-content">
          <Surface className="visual-lab-scenario-primary" level="base">
            <SurfaceHeader>
              <SurfaceTitle>Configuration</SurfaceTitle>
              <SurfaceDescription>
                Fields keep labels and entered values visible while saving.
              </SurfaceDescription>
            </SurfaceHeader>
            <SurfaceContent>
              <label className="visual-lab-field">
                Workspace name
                <Input defaultValue="Payments operations" />
              </label>
              <label className="visual-lab-field">
                Default run mode
                <Select defaultValue="review">
                  <SelectTrigger aria-label="Default run mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="review">Require review</SelectItem>
                    <SelectItem value="fast">Fast path</SelectItem>
                  </SelectContent>
                </Select>
              </label>
              <label className="visual-lab-field">
                System instructions
                <Textarea defaultValue="Always cite source policy before proposing an external action." />
              </label>
              <label className="visual-lab-inline-field">
                <Checkbox defaultChecked aria-label="Require approval for external actions" />
                Require approval for external actions
              </label>
            </SurfaceContent>
          </Surface>

          <aside className="visual-lab-scenario-detail" aria-label="System status">
            <Surface level="elevated">
              <SurfaceHeader>
                <SurfaceTitle>Connected accounts</SurfaceTitle>
                <SurfaceDescription>
                  Status and actions remain named by account.
                </SurfaceDescription>
              </SurfaceHeader>
              <SurfaceContent>
                <DataList density="compact">
                  <DataListItem>
                    <DataListTerm>Policy Drive</DataListTerm>
                    <DataListDescription>
                      <RunStatus status="success">Connected</RunStatus>
                    </DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Ticket system</DataListTerm>
                    <DataListDescription>
                      <RunStatus status="warning">Scope expiring</RunStatus>
                    </DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Webhook signing</DataListTerm>
                    <DataListDescription>
                      <Badge tone="neutral">Key rotated today</Badge>
                    </DataListDescription>
                  </DataListItem>
                </DataList>
                <InlineAlert tone="danger">
                  <InlineAlertTitle>Destructive controls</InlineAlertTitle>
                  <InlineAlertDescription>
                    Resetting this workspace revokes stored approvals and pauses
                    active runs.
                  </InlineAlertDescription>
                  <InlineAlertActions>
                    <Button intent="danger" size="sm">
                      Reset workspace
                    </Button>
                  </InlineAlertActions>
                </InlineAlert>
              </SurfaceContent>
            </Surface>
          </aside>
        </div>
      </div>
    </div>
  </StoryFrame>
);

export const ApprovalSigning: Story = () => (
  <StoryFrame
    description="Rendered outcome scenario for the agreement-signing pattern."
    title="Approval signing scenario"
  >
    <ToastProvider>
      <div className="visual-lab-scenario-shell">
        <nav className="visual-lab-scenario-nav" aria-label="Approval flow">
          <a href="#workspace">Workspace</a>
          <a href="#run">Run details</a>
          <a aria-current="page" href="#approval">
            Approval
          </a>
          <a href="#audit">Audit</a>
        </nav>

        <div className="visual-lab-scenario-main">
          <PageHeader>
            <PageHeaderContent>
              <PageHeaderText>
                <PageHeaderTitle>Approve policy exception</PageHeaderTitle>
                <PageHeaderDescription>
                  The document identity, review state, requirement, and final
                  action remain visible before signing.
                </PageHeaderDescription>
                <PageHeaderMeta>
                  <RunStatus status="warning">Approval locked</RunStatus>
                  <Badge tone="warning">Version 2026.05</Badge>
                </PageHeaderMeta>
              </PageHeaderText>
              <PageHeaderActions>
                <Button intent="secondary">Cancel</Button>
                <Button disabled>Sign approval</Button>
              </PageHeaderActions>
            </PageHeaderContent>
          </PageHeader>

          <div className="visual-lab-scenario-content">
            <Surface className="visual-lab-scenario-primary" level="base">
              <SurfaceHeader>
                <SurfaceTitle>Required document</SurfaceTitle>
                <SurfaceDescription>
                  Acceptance stays locked until the reviewer opens the document
                  and checks the required confirmation.
                </SurfaceDescription>
              </SurfaceHeader>
              <SurfaceContent>
                <DataList density="compact">
                  <DataListItem>
                    <DataListTerm>Document</DataListTerm>
                    <DataListDescription>
                      Refund exception approval policy
                    </DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Jurisdiction</DataListTerm>
                    <DataListDescription>United States operations</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Required action</DataListTerm>
                    <DataListDescription>
                      Open the current version and confirm the cited risk.
                    </DataListDescription>
                  </DataListItem>
                </DataList>
                <InlineAlert tone="warning">
                  <InlineAlertTitle>Approval is locked</InlineAlertTitle>
                  <InlineAlertDescription>
                    Open version 2026.05 and confirm reviewer responsibility
                    before signing.
                  </InlineAlertDescription>
                </InlineAlert>
                <label className="visual-lab-inline-field">
                  <Checkbox aria-label="Confirm reviewer responsibility" />
                  I confirm I reviewed the cited policy and source evidence.
                </label>
              </SurfaceContent>
              <SurfaceFooter>
                <BottomSheet>
                  <BottomSheetTrigger asChild>
                    <Button intent="secondary">Open document</Button>
                  </BottomSheetTrigger>
                  <BottomSheetContent>
                    <BottomSheetHeader>
                      <BottomSheetTitle>Refund exception approval policy</BottomSheetTitle>
                      <BottomSheetDescription>
                        Version 2026.05, United States operations.
                      </BottomSheetDescription>
                    </BottomSheetHeader>
                    <BottomSheetBody>
                      Document review content remains scrollable while actions
                      stay anchored to the sheet footer.
                    </BottomSheetBody>
                    <BottomSheetFooter>
                      <BottomSheetClose asChild>
                        <Button intent="secondary">Close</Button>
                      </BottomSheetClose>
                    </BottomSheetFooter>
                  </BottomSheetContent>
                </BottomSheet>
                <Button disabled>Sign approval</Button>
              </SurfaceFooter>
            </Surface>

            <aside className="visual-lab-scenario-detail" aria-label="Approval audit">
              <Surface level="elevated">
                <SurfaceHeader>
                  <SurfaceTitle>Audit preview</SurfaceTitle>
                  <SurfaceDescription>
                    Signature metadata and non-blocking completion feedback stay
                    separate from required errors.
                  </SurfaceDescription>
                </SurfaceHeader>
                <SurfaceContent>
                  <DataList density="compact">
                    <DataListItem>
                      <DataListTerm>Signer</DataListTerm>
                      <DataListDescription>Policy reviewer</DataListDescription>
                    </DataListItem>
                    <DataListItem>
                      <DataListTerm>Timestamp</DataListTerm>
                      <DataListDescription>Captured on submit</DataListDescription>
                    </DataListItem>
                    <DataListItem>
                      <DataListTerm>Webhook</DataListTerm>
                      <DataListDescription>
                        Signed payload requires active key.
                      </DataListDescription>
                    </DataListItem>
                  </DataList>
                  <ToastViewport />
                  <Toast defaultOpen tone="success">
                    <ToastTitle>Ready to record signature</ToastTitle>
                    <ToastDescription>
                      Completion feedback can be transient after inline state is
                      saved.
                    </ToastDescription>
                    <ToastAction altText="Review audit details">Audit</ToastAction>
                    <ToastClose />
                  </Toast>
                </SurfaceContent>
              </Surface>
            </aside>
          </div>
        </div>
      </div>
    </ToastProvider>
  </StoryFrame>
);
