import type { Story, StoryDefault } from "@ladle/react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge
} from "@pds/react";
import type { AvatarSize } from "@pds/react";

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
  title: "Identity"
} satisfies StoryDefault;

function AvatarExample({
  badge = false,
  fallback = "PC",
  size = "md"
}: {
  badge?: boolean;
  fallback?: string;
  size?: AvatarSize;
}) {
  return (
    <Avatar size={size}>
      <AvatarImage alt="" src="/missing-avatar.png" />
      <AvatarFallback>{fallback}</AvatarFallback>
      {badge ? <AvatarBadge /> : null}
    </Avatar>
  );
}

function AvatarGroupExample() {
  return (
    <AvatarGroup aria-label="Assigned reviewers">
      <AvatarExample fallback="PC" size="sm" />
      <AvatarExample fallback="AR" size="sm" />
      <AvatarExample fallback="MJ" size="sm" />
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  );
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Avatar identity primitives for users, reviewers, and grouped ownership."
    surface={surface}
    title="Identity"
  >
    <StateMatrix>
      <MatrixItem label="Avatar sizes">
        <Row>
          <AvatarExample fallback="SM" size="sm" />
          <AvatarExample fallback="MD" size="md" />
          <AvatarExample fallback="LG" size="lg" />
        </Row>
      </MatrixItem>
      <MatrixItem label="Presence badge">
        <Row>
          <AvatarExample badge fallback="PC" />
          <AvatarExample badge fallback="AI" size="lg" />
          <Badge tone="success">Available</Badge>
        </Row>
      </MatrixItem>
      <MatrixItem label="Avatar group">
        <AvatarGroupExample />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  badge: boolean;
  fallback: string;
  size: AvatarSize;
  surface: StorySurface;
}> = ({ badge, fallback, size, surface }) => (
  <StoryFrame
    description="Manipulate avatar size, fallback, and badge state."
    surface={surface}
    title="Identity controls"
  >
    <StateMatrix>
      <MatrixItem label="Controlled avatar">
        <Row>
          <AvatarExample badge={badge} fallback={fallback} size={size} />
          <Badge tone="neutral">Fallback source</Badge>
        </Row>
      </MatrixItem>
      <MatrixItem label="Group context">
        <AvatarGroupExample />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  badge: true,
  fallback: "PC",
  size: "md",
  surface: "grouped"
};
Controls.argTypes = {
  badge: { control: { type: "boolean" } },
  fallback: { control: { type: "text" } },
  size: {
    control: { type: "inline-radio" },
    options: ["sm", "md", "lg"]
  },
  ...surfaceArgTypes
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Identity rows tolerate long names and narrow inspector panes."
    surface={surface}
    title="Identity resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow identity row">
        <NarrowFrame>
          <Row>
            <AvatarExample badge fallback="PR" />
            <span className="visual-lab-copy">
              Principal reviewer for generated compliance workstream
            </span>
          </Row>
          <p className="visual-lab-note">{longBody}</p>
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Dense assignment group">
        <Stack>
          <AvatarGroupExample />
          <Badge tone="accent">
            Reviewers with extended regional names remain inspectable
          </Badge>
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Resilience.args = {
  surface: "grouped"
};
Resilience.argTypes = surfaceArgTypes;
