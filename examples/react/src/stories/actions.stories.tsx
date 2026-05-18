import type { Story, StoryDefault } from "@ladle/react";
import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuLabel,
  ActionMenuSeparator,
  ActionMenuShortcut,
  ActionMenuTrigger,
  Button
} from "@pds/react";
import type { ButtonIntent, ButtonSize } from "@pds/react";

import {
  longLabel,
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
  title: "Actions"
} satisfies StoryDefault;

function OpenActionMenu() {
  return (
    <ActionMenu modal={false} open>
      <ActionMenuTrigger asChild>
        <Button intent="secondary">Actions</Button>
      </ActionMenuTrigger>
      <ActionMenuContent align="start">
        <ActionMenuLabel>Run controls</ActionMenuLabel>
        <ActionMenuItem>Resume run</ActionMenuItem>
        <ActionMenuItem>
          Copy trace
          <ActionMenuShortcut>Cmd+C</ActionMenuShortcut>
        </ActionMenuItem>
        <ActionMenuSeparator />
        <ActionMenuItem intent="danger">Cancel run</ActionMenuItem>
      </ActionMenuContent>
    </ActionMenu>
  );
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Button and ActionMenu states for compact command surfaces."
    surface={surface}
    title="Actions"
  >
    <StateMatrix>
      <MatrixItem label="Button intents">
        <Row>
          <Button>Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="danger">Danger</Button>
          <Button intent="quiet">Quiet</Button>
          <Button intent="link">Link</Button>
        </Row>
      </MatrixItem>
      <MatrixItem label="Button sizes">
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button aria-label="Pin run" size="icon">
            ^
          </Button>
        </Row>
      </MatrixItem>
      <MatrixItem label="Disabled">
        <Row>
          <Button disabled>Primary</Button>
          <Button disabled intent="secondary">
            Secondary
          </Button>
          <Button disabled intent="danger">
            Danger
          </Button>
        </Row>
      </MatrixItem>
      <MatrixItem label="ActionMenu open">
        <div className="visual-lab-menu-anchor">
          <OpenActionMenu />
        </div>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  disabled: boolean;
  intent: ButtonIntent;
  label: string;
  size: ButtonSize;
  surface: StorySurface;
}> = ({ disabled, intent, label, size, surface }) => (
  <StoryFrame
    description="Manipulate the action primitive without changing source."
    surface={surface}
    title="Action controls"
  >
    <StateMatrix>
      <MatrixItem label="Controlled Button">
        <Row>
          <Button disabled={disabled} intent={intent} size={size}>
            {label}
          </Button>
        </Row>
      </MatrixItem>
      <MatrixItem label="Menu context">
        <OpenActionMenu />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  disabled: false,
  intent: "primary",
  label: "Apply change",
  size: "md",
  surface: "grouped"
};
Controls.argTypes = {
  disabled: { control: { type: "boolean" } },
  intent: {
    control: { type: "select" },
    options: ["primary", "secondary", "danger", "quiet", "link"]
  },
  label: { control: { type: "text" } },
  size: {
    control: { type: "select" },
    options: ["sm", "md", "lg", "icon"]
  },
  ...surfaceArgTypes
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Long action labels and nested menu items must wrap without hiding command meaning."
    surface={surface}
    title="Action resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow action group">
        <NarrowFrame>
          <Stack>
            <Button>{longLabel}</Button>
            <Button intent="secondary">Save draft for later review</Button>
            <Button intent="danger">Cancel queued automation</Button>
          </Stack>
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Long menu items">
        <ActionMenu modal={false} open>
          <ActionMenuTrigger asChild>
            <Button intent="secondary">Open long menu</Button>
          </ActionMenuTrigger>
          <ActionMenuContent align="start">
            <ActionMenuLabel>Internationalized commands</ActionMenuLabel>
            <ActionMenuItem>{longLabel}</ActionMenuItem>
            <ActionMenuItem intent="danger">
              Delete generated approval packet after audit
            </ActionMenuItem>
          </ActionMenuContent>
        </ActionMenu>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Resilience.args = {
  surface: "grouped"
};
Resilience.argTypes = surfaceArgTypes;
