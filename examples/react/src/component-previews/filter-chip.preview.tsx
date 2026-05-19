import { FilterChip } from "@pds/react";

import { Row, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

function FilterChipSet({
  active,
  disabled
}: {
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <Row>
      <FilterChip
        active={active}
        count={3}
        disabled={disabled}
        icon="filter_list"
        label="Filters"
      />
      <FilterChip
        active={active}
        count={10}
        disabled={disabled}
        label="Team members"
      />
      <FilterChip active={active} disabled={disabled} label="Recipients" />
      <FilterChip active={active} disabled={disabled} label="Statuses" />
    </Row>
  );
}

const preview = {
  description:
    "Sibling filter controls with icon, count, active state, disabled state, overflow, and removable forms.",
  group: "Forms",
  id: "filter-chip",
  name: "FilterChip",
  Preview() {
    return (
      <Stack>
        <FilterChipSet />
        <FilterChipSet active />
        <FilterChipSet disabled />
        <FilterChipSet active disabled />
        <Row>
          <FilterChip count={3} icon="filter_list" label="Filters" />
          <FilterChip count={10} label="Team members" />
          <FilterChip aria-label="More filters" icon="more_horiz" iconOnly />
        </Row>
        <Row>
          <FilterChip count={3} icon="filter_list" label="Filters" />
          <FilterChip aria-label="More filters" icon="more_horiz" iconOnly />
        </Row>
        <Row>
          <FilterChip
            aria-label="Filters with new activity"
            icon="filter_list"
            iconOnly
            notification
          />
        </Row>
        <Row>
          <FilterChip count={3} icon="filter_list" label="Filters" />
        </Row>
        <Row>
          <FilterChip aria-label="Open filters" icon="filter_list" iconOnly />
        </Row>
        <Row>
          <FilterChip
            count={10}
            icon="filter_list"
            label="Team members"
            onRemove={() => undefined}
          />
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
