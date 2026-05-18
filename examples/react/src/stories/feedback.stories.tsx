import type { Story, StoryDefault } from "@ladle/react";
import {
  Badge,
  Button,
  InlineAlert,
  InlineAlertActions,
  InlineAlertDescription,
  InlineAlertTitle,
  Progress,
  RunStatus,
  Skeleton,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@pds/react";
import type { BadgeEmphasis, BadgeTone, RunStatusStatus, ToastTone } from "@pds/react";

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
  title: "Feedback"
} satisfies StoryDefault;

const badgeTones: BadgeTone[] = [
  "neutral",
  "accent",
  "success",
  "warning",
  "danger",
  "inactive"
];

const runStatuses: RunStatusStatus[] = [
  "idle",
  "queued",
  "running",
  "success",
  "warning",
  "error",
  "cancelled"
];

function ToastExample({ tone = "neutral" }: { tone?: ToastTone }) {
  return (
    <ToastProvider>
      <Toast open tone={tone}>
        <ToastTitle>Run summary ready</ToastTitle>
        <ToastDescription>
          The generated artifact is ready for review.
        </ToastDescription>
        <ToastAction altText="Open run">Open</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Feedback primitives for semantic status, progress, loading, and notifications."
    surface={surface}
    title="Feedback"
  >
    <StateMatrix>
      <MatrixItem label="Badge tones">
        <Row>
          {badgeTones.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </Row>
        <Row>
          <Badge emphasis="solid" tone="accent">
            solid
          </Badge>
          <Badge emphasis="soft" tone="success">
            soft
          </Badge>
          <Badge emphasis="outline" tone="warning">
            outline
          </Badge>
        </Row>
      </MatrixItem>
      <MatrixItem label="RunStatus">
        <Row>
          {runStatuses.map((status) => (
            <RunStatus key={status} status={status} />
          ))}
        </Row>
      </MatrixItem>
      <MatrixItem label="InlineAlert">
        <Stack>
          <InlineAlert tone="neutral">
            <InlineAlertTitle>Review note</InlineAlertTitle>
            <InlineAlertDescription>
              This generated screen needs human approval.
            </InlineAlertDescription>
          </InlineAlert>
          <InlineAlert tone="danger">
            <InlineAlertTitle>Blocked</InlineAlertTitle>
            <InlineAlertDescription>
              Required safety metadata is missing.
            </InlineAlertDescription>
            <InlineAlertActions>
              <Button intent="secondary" size="sm">
                Inspect
              </Button>
            </InlineAlertActions>
          </InlineAlert>
        </Stack>
      </MatrixItem>
      <MatrixItem label="Progress and skeleton">
        <Stack>
          <Progress value={62} />
          <Progress />
          <Skeleton className="visual-lab-skeleton-line" shape="text" />
          <Skeleton className="visual-lab-skeleton-short" shape="text" />
          <Skeleton className="visual-lab-skeleton-block" shape="block" />
        </Stack>
      </MatrixItem>
      <MatrixItem label="Toast open">
        <ToastExample tone="success" />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  badgeEmphasis: BadgeEmphasis;
  badgeTone: BadgeTone;
  progress: number;
  runStatus: RunStatusStatus;
  surface: StorySurface;
  toastTone: ToastTone;
}> = ({ badgeEmphasis, badgeTone, progress, runStatus, surface, toastTone }) => (
  <StoryFrame
    description="Manipulate semantic feedback without inventing new visual colors."
    surface={surface}
    title="Feedback controls"
  >
    <StateMatrix>
      <MatrixItem label="Status controls">
        <Stack>
          <Row>
            <Badge emphasis={badgeEmphasis} tone={badgeTone}>
              {badgeTone}
            </Badge>
            <RunStatus status={runStatus} />
          </Row>
          <Progress value={progress} />
        </Stack>
      </MatrixItem>
      <MatrixItem label="Toast controls">
        <ToastExample tone={toastTone} />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  badgeEmphasis: "soft",
  badgeTone: "accent",
  progress: 62,
  runStatus: "running",
  surface: "grouped",
  toastTone: "neutral"
};
Controls.argTypes = {
  badgeEmphasis: {
    control: { type: "inline-radio" },
    options: ["solid", "soft", "outline"]
  },
  badgeTone: {
    control: { type: "select" },
    options: badgeTones
  },
  progress: {
    control: { max: 100, min: 0, step: 1, type: "range" }
  },
  runStatus: {
    control: { type: "select" },
    options: runStatuses
  },
  toastTone: {
    control: { type: "select" },
    options: ["neutral", "success", "warning", "danger"]
  },
  ...surfaceArgTypes
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Feedback text remains readable in compact panes and with expanded strings."
    surface={surface}
    title="Feedback resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow alert">
        <NarrowFrame>
          <InlineAlert tone="warning">
            <InlineAlertTitle>Reviewer escalation required</InlineAlertTitle>
            <InlineAlertDescription>{longBody}</InlineAlertDescription>
            <InlineAlertActions>
              <Button intent="secondary" size="sm">
                Assign reviewer
              </Button>
              <Button size="sm">Continue</Button>
            </InlineAlertActions>
          </InlineAlert>
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Long status labels">
        <Stack>
          <Badge tone="accent">
            Waiting for extended multilingual approval window
          </Badge>
          <RunStatus status="running">
            Running regional compliance verification
          </RunStatus>
          <ToastExample tone="warning" />
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Resilience.args = {
  surface: "grouped"
};
Resilience.argTypes = surfaceArgTypes;
