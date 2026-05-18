import type { ComponentPreview, ComponentPreviewGroup } from "./types";

interface ComponentPreviewModule {
  default: ComponentPreview;
}

const groupOrder: ComponentPreviewGroup[] = [
  "Actions",
  "Identity",
  "Forms",
  "Feedback",
  "Layout and data",
  "Navigation",
  "Overlays",
  "Conversation"
];

const previewModules = import.meta.glob<ComponentPreviewModule>(
  "./*.preview.tsx",
  {
    eager: true
  }
);

export const componentPreviews = Object.values(previewModules)
  .map((module) => module.default)
  .sort((first, second) => {
    const firstGroup = groupOrder.indexOf(first.group);
    const secondGroup = groupOrder.indexOf(second.group);

    if (firstGroup !== secondGroup) {
      return firstGroup - secondGroup;
    }

    return first.name.localeCompare(second.name);
  });

export const componentPreviewGroups = groupOrder
  .map((group) => ({
    group,
    previews: componentPreviews.filter((preview) => preview.group === group)
  }))
  .filter(({ previews }) => previews.length > 0);
