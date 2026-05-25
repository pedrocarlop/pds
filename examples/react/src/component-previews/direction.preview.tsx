import { DirectionProvider, useDirection, Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList, BreadcrumbsPage, BreadcrumbsSeparator } from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

function DirectionStatus() {
  const direction = useDirection();

  return <span className="visual-lab-note">Active direction: {direction}</span>;
}

const preview = {
  description: "LTR and RTL direction context for bidirectional product surfaces.",
  group: "Layout and data",
  id: "direction",
  name: "DirectionProvider",
  Preview() {
    return (
      <Stack>
        <DirectionProvider direction="ltr">
          <DirectionStatus />
        </DirectionProvider>
        <DirectionProvider direction="rtl">
          <div dir="rtl">
            <DirectionStatus />
            <Breadcrumbs aria-label="مسار التنقل">
              <BreadcrumbsList>
                <BreadcrumbsItem>
                  <BreadcrumbsLink href="/runs">المساحات</BreadcrumbsLink>
                  <BreadcrumbsSeparator />
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                  <BreadcrumbsPage>تشغيل طويل الاسم</BreadcrumbsPage>
                </BreadcrumbsItem>
              </BreadcrumbsList>
            </Breadcrumbs>
          </div>
        </DirectionProvider>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
