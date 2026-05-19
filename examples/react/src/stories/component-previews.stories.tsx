import type { Story, StoryDefault } from "@ladle/react";

import actionMenuPreview from "../component-previews/action-menu.preview";
import actionWidgetPreview from "../component-previews/action-widget.preview";
import amountPreview from "../component-previews/amount.preview";
import avatarPreview from "../component-previews/avatar.preview";
import badgePreview from "../component-previews/badge.preview";
import bottomSheetPreview from "../component-previews/bottom-sheet.preview";
import breadcrumbsPreview from "../component-previews/breadcrumbs.preview";
import buttonPreview from "../component-previews/button.preview";
import cellPreview from "../component-previews/cell.preview";
import checkboxPreview from "../component-previews/checkbox.preview";
import composerPreview from "../component-previews/composer.preview";
import dataListPreview from "../component-previews/data-list.preview";
import detailsPreview from "../component-previews/details.preview";
import dialogPreview from "../component-previews/dialog.preview";
import filterChipPreview from "../component-previews/filter-chip.preview";
import iconPreview from "../component-previews/icon.preview";
import inlineAlertPreview from "../component-previews/inline-alert.preview";
import inputPreview from "../component-previews/input.preview";
import itemPreview from "../component-previews/item.preview";
import menuPreview from "../component-previews/menu.preview";
import messagePreview from "../component-previews/message.preview";
import paginationPreview from "../component-previews/pagination.preview";
import popoverPreview from "../component-previews/popover.preview";
import progressPreview from "../component-previews/progress.preview";
import radioGroupPreview from "../component-previews/radio-group.preview";
import runStatusPreview from "../component-previews/run-status.preview";
import selectPreview from "../component-previews/select.preview";
import skeletonPreview from "../component-previews/skeleton.preview";
import surfacePreview from "../component-previews/surface.preview";
import switchPreview from "../component-previews/switch.preview";
import tablePreview from "../component-previews/table.preview";
import tabsPreview from "../component-previews/tabs.preview";
import textareaPreview from "../component-previews/textarea.preview";
import toastPreview from "../component-previews/toast.preview";
import tooltipPreview from "../component-previews/tooltip.preview";
import transcriptPreview from "../component-previews/transcript.preview";
import {
  ComponentPreviewStory,
  componentPreviewStoryArgTypes,
  componentPreviewStoryArgs
} from "./ComponentPreviewStory";
import type { ComponentPreviewStoryProps } from "./ComponentPreviewStory";

export default {
  title: "Components"
} satisfies StoryDefault;

export const ActionMenu: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={actionMenuPreview} surface={surface} />
);
ActionMenu.args = componentPreviewStoryArgs;
ActionMenu.argTypes = componentPreviewStoryArgTypes;

export const ActionWidget: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={actionWidgetPreview} surface={surface} />
);
ActionWidget.args = componentPreviewStoryArgs;
ActionWidget.argTypes = componentPreviewStoryArgTypes;

export const Amount: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={amountPreview} surface={surface} />
);
Amount.args = componentPreviewStoryArgs;
Amount.argTypes = componentPreviewStoryArgTypes;

export const Avatar: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={avatarPreview} surface={surface} />
);
Avatar.args = componentPreviewStoryArgs;
Avatar.argTypes = componentPreviewStoryArgTypes;

export const Badge: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={badgePreview} surface={surface} />
);
Badge.args = componentPreviewStoryArgs;
Badge.argTypes = componentPreviewStoryArgTypes;

export const BottomSheet: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={bottomSheetPreview} surface={surface} />
);
BottomSheet.args = componentPreviewStoryArgs;
BottomSheet.argTypes = componentPreviewStoryArgTypes;

export const Breadcrumbs: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={breadcrumbsPreview} surface={surface} />
);
Breadcrumbs.args = componentPreviewStoryArgs;
Breadcrumbs.argTypes = componentPreviewStoryArgTypes;

export const Button: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={buttonPreview} surface={surface} />
);
Button.args = componentPreviewStoryArgs;
Button.argTypes = componentPreviewStoryArgTypes;

export const Cell: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={cellPreview} surface={surface} />
);
Cell.args = componentPreviewStoryArgs;
Cell.argTypes = componentPreviewStoryArgTypes;

export const Checkbox: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={checkboxPreview} surface={surface} />
);
Checkbox.args = componentPreviewStoryArgs;
Checkbox.argTypes = componentPreviewStoryArgTypes;

export const Composer: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={composerPreview} surface={surface} />
);
Composer.args = componentPreviewStoryArgs;
Composer.argTypes = componentPreviewStoryArgTypes;

export const DataList: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={dataListPreview} surface={surface} />
);
DataList.args = componentPreviewStoryArgs;
DataList.argTypes = componentPreviewStoryArgTypes;

export const Details: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={detailsPreview} surface={surface} />
);
Details.args = componentPreviewStoryArgs;
Details.argTypes = componentPreviewStoryArgTypes;

export const Dialog: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={dialogPreview} surface={surface} />
);
Dialog.args = componentPreviewStoryArgs;
Dialog.argTypes = componentPreviewStoryArgTypes;

export const FilterChip: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={filterChipPreview} surface={surface} />
);
FilterChip.args = componentPreviewStoryArgs;
FilterChip.argTypes = componentPreviewStoryArgTypes;

export const Icon: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={iconPreview} surface={surface} />
);
Icon.args = componentPreviewStoryArgs;
Icon.argTypes = componentPreviewStoryArgTypes;

export const InlineAlert: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={inlineAlertPreview} surface={surface} />
);
InlineAlert.args = componentPreviewStoryArgs;
InlineAlert.argTypes = componentPreviewStoryArgTypes;

export const Input: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={inputPreview} surface={surface} />
);
Input.args = componentPreviewStoryArgs;
Input.argTypes = componentPreviewStoryArgTypes;

export const Item: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={itemPreview} surface={surface} />
);
Item.args = componentPreviewStoryArgs;
Item.argTypes = componentPreviewStoryArgTypes;

export const Menu: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={menuPreview} surface={surface} />
);
Menu.args = componentPreviewStoryArgs;
Menu.argTypes = componentPreviewStoryArgTypes;

export const Message: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={messagePreview} surface={surface} />
);
Message.args = componentPreviewStoryArgs;
Message.argTypes = componentPreviewStoryArgTypes;

export const Pagination: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={paginationPreview} surface={surface} />
);
Pagination.args = componentPreviewStoryArgs;
Pagination.argTypes = componentPreviewStoryArgTypes;

export const Popover: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={popoverPreview} surface={surface} />
);
Popover.args = componentPreviewStoryArgs;
Popover.argTypes = componentPreviewStoryArgTypes;

export const Progress: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={progressPreview} surface={surface} />
);
Progress.args = componentPreviewStoryArgs;
Progress.argTypes = componentPreviewStoryArgTypes;

export const RadioGroup: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={radioGroupPreview} surface={surface} />
);
RadioGroup.args = componentPreviewStoryArgs;
RadioGroup.argTypes = componentPreviewStoryArgTypes;

export const RunStatus: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={runStatusPreview} surface={surface} />
);
RunStatus.args = componentPreviewStoryArgs;
RunStatus.argTypes = componentPreviewStoryArgTypes;

export const Select: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={selectPreview} surface={surface} />
);
Select.args = componentPreviewStoryArgs;
Select.argTypes = componentPreviewStoryArgTypes;

export const Skeleton: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={skeletonPreview} surface={surface} />
);
Skeleton.args = componentPreviewStoryArgs;
Skeleton.argTypes = componentPreviewStoryArgTypes;

export const Surface: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={surfacePreview} surface={surface} />
);
Surface.args = componentPreviewStoryArgs;
Surface.argTypes = componentPreviewStoryArgTypes;

export const Switch: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={switchPreview} surface={surface} />
);
Switch.args = componentPreviewStoryArgs;
Switch.argTypes = componentPreviewStoryArgTypes;

export const Table: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={tablePreview} surface={surface} />
);
Table.args = componentPreviewStoryArgs;
Table.argTypes = componentPreviewStoryArgTypes;

export const Tabs: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={tabsPreview} surface={surface} />
);
Tabs.args = componentPreviewStoryArgs;
Tabs.argTypes = componentPreviewStoryArgTypes;

export const Textarea: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={textareaPreview} surface={surface} />
);
Textarea.args = componentPreviewStoryArgs;
Textarea.argTypes = componentPreviewStoryArgTypes;

export const Toast: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={toastPreview} surface={surface} />
);
Toast.args = componentPreviewStoryArgs;
Toast.argTypes = componentPreviewStoryArgTypes;

export const Tooltip: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={tooltipPreview} surface={surface} />
);
Tooltip.args = componentPreviewStoryArgs;
Tooltip.argTypes = componentPreviewStoryArgTypes;

export const Transcript: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={transcriptPreview} surface={surface} />
);
Transcript.args = componentPreviewStoryArgs;
Transcript.argTypes = componentPreviewStoryArgTypes;
