import type { Story, StoryDefault } from "@ladle/react";
import {
  Badge,
  Button,
  Cell,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  Details,
  DetailsCell,
  DetailsCellSkeleton,
  DetailsSkeleton,
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
  TableRow
} from "@pds/react";
import type { CellVariant, SurfaceLevel, TableDensity } from "@pds/react";

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
  title: "Layout Data"
} satisfies StoryDefault;

function SurfaceExample({ level = "base" }: { level?: SurfaceLevel }) {
  return (
    <Surface level={level}>
      <SurfaceHeader>
        <div>
          <SurfaceTitle>Run inspection</SurfaceTitle>
          <SurfaceDescription>
            Token-first surface slots with action placement.
          </SurfaceDescription>
        </div>
        <SurfaceAction>
          <Button intent="secondary" size="sm">
            Review
          </Button>
        </SurfaceAction>
      </SurfaceHeader>
      <SurfaceContent>
        <p className="visual-lab-note">{longBody}</p>
      </SurfaceContent>
      <SurfaceFooter>
        <Badge tone="success">Ready</Badge>
      </SurfaceFooter>
    </Surface>
  );
}

function DataListExample({ density = "default" }: { density?: TableDensity }) {
  return (
    <DataList density={density}>
      <DataListItem>
        <DataListTerm>Owner</DataListTerm>
        <DataListDescription>Agent workspace</DataListDescription>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Status</DataListTerm>
        <DataListDescription>Awaiting approval</DataListDescription>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Risk</DataListTerm>
        <DataListDescription>Low</DataListDescription>
      </DataListItem>
    </DataList>
  );
}

function TableExample({ density = "default" }: { density?: TableDensity }) {
  return (
    <TableContainer className="visual-lab-table-wrap">
      <Table density={density}>
        <TableCaption>Latest generated artifacts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Artifact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Review summary</TableCell>
            <TableCell>Ready</TableCell>
            <TableCell>Agent</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Implementation notes</TableCell>
            <TableCell>Queued</TableCell>
            <TableCell>Reviewer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Structural primitives for surfaces, cells, details, data lists, and tables."
    surface={surface}
    title="Layout and data"
  >
    <StateMatrix>
      <MatrixItem label="Surface levels">
        <Stack>
          <SurfaceExample level="base" />
          <SurfaceExample level="nested" />
          <SurfaceExample level="elevated" />
        </Stack>
      </MatrixItem>
      <MatrixItem label="Cell variants">
        <Stack>
          {(["default", "disclosure", "choice", "compact", "accent", "nested"] as CellVariant[]).map(
            (variant) => (
              <Cell key={variant} variant={variant}>
                <span className="visual-lab-copy">{variant} cell</span>
              </Cell>
            )
          )}
          <Cell disabled use="button">
            Disabled button cell
          </Cell>
        </Stack>
      </MatrixItem>
      <MatrixItem label="Details">
        <Stack>
          <Details>
            <Details.Title>Default details</Details.Title>
            <Details.Content>Generated change summary</Details.Content>
            <Details.Note>Updated now</Details.Note>
          </Details>
          <DetailsCell variant="compact">
            <DetailsCell.Title>Compact cell</DetailsCell.Title>
            <DetailsCell.Content>Review required</DetailsCell.Content>
          </DetailsCell>
          <DetailsSkeleton />
          <DetailsCellSkeleton />
        </Stack>
      </MatrixItem>
      <MatrixItem label="Data display">
        <Stack>
          <DataListExample />
          <TableExample />
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  density: TableDensity;
  level: SurfaceLevel;
  surface: StorySurface;
}> = ({ density, level, surface }) => (
  <StoryFrame
    description="Manipulate surface depth and data density together."
    surface={surface}
    title="Layout and data controls"
  >
    <StateMatrix>
      <MatrixItem label="Surface level">
        <SurfaceExample level={level} />
      </MatrixItem>
      <MatrixItem label="Density">
        <Stack>
          <DataListExample density={density} />
          <TableExample density={density} />
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  density: "default",
  level: "base",
  surface: "grouped"
};
Controls.argTypes = {
  density: {
    control: { type: "inline-radio" },
    options: ["default", "compact"]
  },
  level: {
    control: { type: "inline-radio" },
    options: ["base", "nested", "elevated"]
  },
  ...surfaceArgTypes
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Layout primitives keep long content inspectable in narrow product panes."
    surface={surface}
    title="Layout and data resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow surface">
        <NarrowFrame>
          <SurfaceExample level="nested" />
          <Cell variant="disclosure">
            <span className="visual-lab-copy">{longBody}</span>
          </Cell>
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Long records">
        <Stack>
          <Details>
            <Details.Title>Internationalized review packet owner and status</Details.Title>
            <Details.Content>{longBody}</Details.Content>
            <Details.Note>Visible helper copy remains available.</Details.Note>
          </Details>
          <DataList density="compact">
            <DataListItem>
              <DataListTerm>Generated artifact with an extended title</DataListTerm>
              <DataListDescription>{longBody}</DataListDescription>
            </DataListItem>
          </DataList>
          <Row>
            <Badge tone="accent">Data remains readable</Badge>
          </Row>
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Resilience.args = {
  surface: "grouped"
};
Resilience.argTypes = surfaceArgTypes;
