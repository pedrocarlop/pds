import type { Story, StoryDefault } from "@ladle/react";
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@pds/react";
import type { TabsListVariant } from "@pds/react";

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
  title: "Navigation"
} satisfies StoryDefault;

function BreadcrumbsExample({ long = false }: { long?: boolean }) {
  return (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Workspace</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsEllipsis />
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Runs</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>
            {long ? "Generated compliance review packet for international rollout" : "Run 482"}
          </BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
}

function PaginationExample() {
  return (
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isCurrent>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}

function TabsExample({ variant = "line" }: { variant?: TabsListVariant }) {
  return (
    <Tabs defaultValue="summary">
      <TabsList variant={variant}>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <p className="visual-lab-note">{longBody}</p>
      </TabsContent>
      <TabsContent value="tools">
        <p className="visual-lab-note">Tool output is ready for inspection.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="visual-lab-note">Settings remain in a separate tab panel.</p>
      </TabsContent>
    </Tabs>
  );
}

function MenuExample({ open = true }: { open?: boolean }) {
  return (
    <Menu modal={false} open={open}>
      <MenuTrigger asChild>
        <Button intent="secondary">Menu</Button>
      </MenuTrigger>
      <MenuContent align="start">
        <MenuLabel>View options</MenuLabel>
        <MenuItem>
          Open run
          <MenuShortcut>Enter</MenuShortcut>
        </MenuItem>
        <MenuCheckboxItem checked>Show tool calls</MenuCheckboxItem>
        <MenuRadioGroup value="compact">
          <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
          <MenuRadioItem value="compact">Compact</MenuRadioItem>
        </MenuRadioGroup>
        <MenuSeparator />
        <MenuSub open>
          <MenuSubTrigger>Export</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem>Copy markdown</MenuItem>
            <MenuItem>Download JSON</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuItem intent="danger">Delete draft</MenuItem>
      </MenuContent>
    </Menu>
  );
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Navigation primitives for breadcrumbs, pagination, tabs, and menus."
    surface={surface}
    title="Navigation"
  >
    <StateMatrix>
      <MatrixItem label="Breadcrumbs">
        <BreadcrumbsExample />
      </MatrixItem>
      <MatrixItem label="Pagination">
        <PaginationExample />
      </MatrixItem>
      <MatrixItem label="Tabs">
        <Stack>
          <TabsExample variant="line" />
          <TabsExample variant="segmented" />
        </Stack>
      </MatrixItem>
      <MatrixItem label="Menu open">
        <MenuExample />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  menuOpen: boolean;
  surface: StorySurface;
  tabsVariant: TabsListVariant;
}> = ({ menuOpen, surface, tabsVariant }) => (
  <StoryFrame
    description="Manipulate menu visibility and tab treatment."
    surface={surface}
    title="Navigation controls"
  >
    <StateMatrix>
      <MatrixItem label="Tabs variant">
        <TabsExample variant={tabsVariant} />
      </MatrixItem>
      <MatrixItem label="Menu visibility">
        <MenuExample open={menuOpen} />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  menuOpen: true,
  surface: "grouped",
  tabsVariant: "line"
};
Controls.argTypes = {
  menuOpen: { control: { type: "boolean" } },
  tabsVariant: {
    control: { type: "inline-radio" },
    options: ["line", "segmented"]
  },
  ...surfaceArgTypes
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Navigation remains usable with long current pages and narrow panes."
    surface={surface}
    title="Navigation resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow navigation">
        <NarrowFrame>
          <BreadcrumbsExample long />
          <PaginationExample />
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Long tabs and menu labels">
        <Stack>
          <Tabs defaultValue="first">
            <TabsList variant="segmented">
              <TabsTrigger value="first">Implementation summary</TabsTrigger>
              <TabsTrigger value="second">Reviewer assignments</TabsTrigger>
            </TabsList>
            <TabsContent value="first">
              <p className="visual-lab-note">{longBody}</p>
            </TabsContent>
            <TabsContent value="second">
              <p className="visual-lab-note">Reviewers can scan long labels.</p>
            </TabsContent>
          </Tabs>
          <Row>
            <Menu modal={false} open>
              <MenuTrigger asChild>
                <Button intent="secondary">Open extended navigation menu</Button>
              </MenuTrigger>
              <MenuContent align="start">
                <MenuItem>
                  Open generated compliance package for all regional reviewers
                </MenuItem>
                <MenuItem intent="danger">Remove generated package</MenuItem>
              </MenuContent>
            </Menu>
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
