import {
  Badge,
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  Button,
  PageHeader,
  PageHeaderActions,
  PageHeaderBreadcrumbs,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderText,
  PageHeaderTitle
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description:
    "Page-level identity with breadcrumbs, wrapped copy, metadata, and responsive actions.",
  group: "Layout and data",
  id: "page-header",
  name: "PageHeader",
  Preview() {
    return (
      <Stack>
        <PageHeader>
          <PageHeaderBreadcrumbs>
            <Breadcrumbs>
              <BreadcrumbsList>
                <BreadcrumbsItem>
                  <BreadcrumbsLink href="/workspaces">Workspaces</BreadcrumbsLink>
                  <BreadcrumbsSeparator />
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                  <BreadcrumbsPage>Settings</BreadcrumbsPage>
                </BreadcrumbsItem>
              </BreadcrumbsList>
            </Breadcrumbs>
          </PageHeaderBreadcrumbs>
          <PageHeaderContent>
            <PageHeaderText>
              <PageHeaderTitle>Workspace settings</PageHeaderTitle>
              <PageHeaderDescription>
                Manage account access, agent defaults, connected systems, and
                operational safeguards for this workspace.
              </PageHeaderDescription>
              <PageHeaderMeta>
                <Badge>6 sections</Badge>
                <Badge tone="success">Healthy</Badge>
              </PageHeaderMeta>
            </PageHeaderText>
            <PageHeaderActions>
              <Button intent="secondary">Export</Button>
              <Button>Save changes</Button>
            </PageHeaderActions>
          </PageHeaderContent>
        </PageHeader>

        <NarrowFrame>
          <PageHeader>
            <PageHeaderContent>
              <PageHeaderText>
                <PageHeaderTitle>
                  International reviewer configuration and account governance
                </PageHeaderTitle>
                <PageHeaderDescription>
                  Header copy wraps before actions move below the title stack.
                </PageHeaderDescription>
              </PageHeaderText>
              <PageHeaderActions>
                <Button intent="secondary">Cancel</Button>
                <Button>Apply</Button>
              </PageHeaderActions>
            </PageHeaderContent>
          </PageHeader>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
