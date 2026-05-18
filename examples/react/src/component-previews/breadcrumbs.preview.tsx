import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Hierarchical path navigation with ellipsis and current page.",
  group: "Navigation",
  id: "breadcrumbs",
  name: "Breadcrumbs",
  Preview() {
    return (
      <Stack>
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
                Generated compliance review packet
              </BreadcrumbsPage>
            </BreadcrumbsItem>
          </BreadcrumbsList>
        </Breadcrumbs>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
