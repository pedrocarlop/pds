import type { ReactNode } from "react";
import { FilterChip } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

function AppliedFilters({
  active,
  disabled
}: {
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <FilterChip active={active} disabled={disabled} label="Filters">
      <FilterChip.Value>Team members</FilterChip.Value>
      <FilterChip.Value>Recipients</FilterChip.Value>
      <FilterChip.Value>Statuses</FilterChip.Value>
    </FilterChip>
  );
}

function WidthFrame({
  children,
  width
}: {
  children: ReactNode;
  width: string;
}) {
  return (
    <div style={{ maxWidth: "100%", width }}>
      {children}
    </div>
  );
}

const preview = {
  description:
    "Filter summary control with applied values, active state, disabled state, and narrow wrapping.",
  group: "Forms",
  id: "filter-chip",
  name: "FilterChip",
  Preview() {
    return (
      <Stack>
        <Row>
          <AppliedFilters />
          <AppliedFilters active />
          <AppliedFilters disabled />
          <AppliedFilters active disabled />
        </Row>
        <Row>
          <FilterChip label="Filters" />
          <FilterChip active label="Filters">
            <FilterChip.Value>
              Translated approval responsibility
            </FilterChip.Value>
          </FilterChip>
        </Row>
        <Stack>
          <WidthFrame width="400px">
            <AppliedFilters active />
          </WidthFrame>
          <WidthFrame width="200px">
            <AppliedFilters active />
          </WidthFrame>
          <WidthFrame width="40px">
            <AppliedFilters active />
          </WidthFrame>
        </Stack>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
