import type { Story, StoryDefault } from "@ladle/react";
import {
  Badge,
  Button,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  FilterChip,
  Icon,
  InlineAlert,
  InlineAlertActions,
  InlineAlertDescription,
  InlineAlertTitle,
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderText,
  PageHeaderTitle,
  RunStatus,
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
  TabsTrigger
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

const evidenceRows = [
  {
    action: "Compare",
    coverage: "Customer timeline",
    owner: "Disputes specialist",
    source: "DISP-7312",
    status: "running" as const,
    title: "Agent summary is matching transaction events to the dispute reason"
  },
  {
    action: "Attach",
    coverage: "Refund policy",
    owner: "Policy reviewer",
    source: "POL-118",
    status: "queued" as const,
    title: "Refund exception policy still needs source citation"
  },
  {
    action: "Resolve",
    coverage: "Merchant response",
    owner: "Operations lead",
    source: "MSG-4409",
    status: "warning" as const,
    title: "Merchant note conflicts with agent-proposed decision"
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

export const GenericProductScreenGuardrail: Story = () => (
  <StoryFrame
    description="Rendered outcome scenario proving broad briefs become concrete product workflows instead of generic landing pages."
    title="Generic product screen guardrail"
  >
    <div className="visual-lab-scenario-shell">
      <nav className="visual-lab-scenario-nav" aria-label="Chargeback workspace">
        <a aria-current="page" href="#evidence">
          Evidence
        </a>
        <a href="#decisions">Decisions</a>
        <a href="#exports">Exports</a>
        <a href="#settings">Settings</a>
      </nav>

      <div className="visual-lab-scenario-main">
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderText>
              <PageHeaderTitle>Chargeback evidence workspace</PageHeaderTitle>
              <PageHeaderDescription>
                Resolve one disputed payment by checking the agent summary,
                missing source evidence, owner handoffs, and decision feedback
                before submitting a final response.
              </PageHeaderDescription>
              <PageHeaderMeta>
                <Badge tone="warning">Evidence gap</Badge>
                <RunStatus status="running">Draft updating</RunStatus>
              </PageHeaderMeta>
            </PageHeaderText>
            <PageHeaderActions>
              <Button intent="secondary">
                <Icon name="ios_share" />
                Export audit
              </Button>
              <Button>
                <Icon name="task_alt" />
                Submit decision
              </Button>
            </PageHeaderActions>
          </PageHeaderContent>
        </PageHeader>

        <Tabs defaultValue="evidence">
          <TabsList aria-label="Chargeback evidence views">
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="gaps">Gaps</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="evidence">
            <div className="visual-lab-scenario-content">
              <Surface className="visual-lab-scenario-primary" level="base">
                <SurfaceHeader>
                  <SurfaceTitle>Evidence to verify</SurfaceTitle>
                  <SurfaceDescription>
                    The table is the working surface. It names sources, owners,
                    status, and actions instead of presenting decorative proof.
                  </SurfaceDescription>
                  <SurfaceAction>
                    <FilterChip active count={2} icon="filter_list" label="Open gaps" />
                  </SurfaceAction>
                </SurfaceHeader>
                <SurfaceContent>
                  <div className="visual-lab-scenario-filters">
                    <FilterChip active count={1} label="Needs citation" />
                    <FilterChip count={1} label="Conflicting source" />
                    <FilterChip label="Ready" />
                  </div>

                  <TableContainer className="visual-lab-table-wrap">
                    <Table density="compact">
                      <TableCaption>
                        Chargeback evidence sources, owners, status, and actions.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead>Coverage</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evidenceRows.map((row, index) => (
                          <TableRow
                            aria-selected={index === 0}
                            data-selected={index === 0 || undefined}
                            key={row.source}
                          >
                            <TableCell>
                              <strong>{row.source}</strong>
                              <span className="visual-lab-scenario-cell-note">
                                {row.title}
                              </span>
                            </TableCell>
                            <TableCell>{row.coverage}</TableCell>
                            <TableCell>{row.owner}</TableCell>
                            <TableCell>
                              <RunStatus status={row.status} />
                            </TableCell>
                            <TableCell>
                              <Button intent="secondary" size="sm">
                                {row.action}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SurfaceContent>
              </Surface>

              <aside className="visual-lab-scenario-detail" aria-label="Selected dispute">
                <Surface level="elevated">
                  <SurfaceHeader>
                    <SurfaceTitle>Selected dispute</SurfaceTitle>
                    <SurfaceDescription>
                      DISP-7312 keeps required evidence, workflow state, and
                      decision controls visible in the same task context.
                    </SurfaceDescription>
                  </SurfaceHeader>
                  <SurfaceContent>
                    <DataList density="compact">
                      <DataListItem>
                        <DataListTerm>Decision state</DataListTerm>
                        <DataListDescription>
                          <RunStatus status="warning">Needs citation</RunStatus>
                        </DataListDescription>
                      </DataListItem>
                      <DataListItem>
                        <DataListTerm>Missing source</DataListTerm>
                        <DataListDescription>
                          Refund exception policy for international cards.
                        </DataListDescription>
                      </DataListItem>
                      <DataListItem>
                        <DataListTerm>Next owner</DataListTerm>
                        <DataListDescription>Policy reviewer</DataListDescription>
                      </DataListItem>
                    </DataList>

                    <InlineAlert tone="warning">
                      <InlineAlertTitle>Decision cannot be submitted yet</InlineAlertTitle>
                      <InlineAlertDescription>
                        Attach the policy source or mark the agent summary as
                        unsupported before sending the chargeback response.
                      </InlineAlertDescription>
                      <InlineAlertActions>
                        <Button intent="secondary" size="sm">
                          Mark unsupported
                        </Button>
                        <Button size="sm">Attach source</Button>
                      </InlineAlertActions>
                    </InlineAlert>

                    <div className="visual-lab-scenario-loading" aria-label="Loading source match">
                      <Skeleton shape="text" />
                      <Skeleton shape="text" />
                    </div>
                  </SurfaceContent>
                  <SurfaceFooter>
                    <Button intent="secondary">Save draft</Button>
                    <Button disabled>Submit decision</Button>
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
