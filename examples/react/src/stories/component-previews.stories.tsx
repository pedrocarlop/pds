import type { Story, StoryDefault } from "@ladle/react";

import accordionPreview from "../component-previews/accordion.preview";
import actionMenuPreview from "../component-previews/action-menu.preview";
import actionWidgetPreview from "../component-previews/action-widget.preview";
import alertPreview from "../component-previews/alert.preview";
import alertDialogPreview from "../component-previews/alert-dialog.preview";
import amountPreview from "../component-previews/amount.preview";
import aspectRatioPreview from "../component-previews/aspect-ratio.preview";
import avatarPreview from "../component-previews/avatar.preview";
import badgePreview from "../component-previews/badge.preview";
import bottomSheetPreview from "../component-previews/bottom-sheet.preview";
import breadcrumbPreview from "../component-previews/breadcrumb.preview";
import breadcrumbsPreview from "../component-previews/breadcrumbs.preview";
import buttonPreview from "../component-previews/button.preview";
import buttonGroupPreview from "../component-previews/button-group.preview";
import calendarPreview from "../component-previews/calendar.preview";
import cardPreview from "../component-previews/card.preview";
import carouselPreview from "../component-previews/carousel.preview";
import cellPreview from "../component-previews/cell.preview";
import chartPreview from "../component-previews/chart.preview";
import checkboxPreview from "../component-previews/checkbox.preview";
import collapsiblePreview from "../component-previews/collapsible.preview";
import comboboxPreview from "../component-previews/combobox.preview";
import commandPreview from "../component-previews/command.preview";
import composerPreview from "../component-previews/composer.preview";
import contextMenuPreview from "../component-previews/context-menu.preview";
import dataListPreview from "../component-previews/data-list.preview";
import detailsPreview from "../component-previews/details.preview";
import dialogPreview from "../component-previews/dialog.preview";
import directionPreview from "../component-previews/direction.preview";
import drawerPreview from "../component-previews/drawer.preview";
import dropdownMenuPreview from "../component-previews/dropdown-menu.preview";
import emptyPreview from "../component-previews/empty.preview";
import fieldPreview from "../component-previews/field.preview";
import filterChipPreview from "../component-previews/filter-chip.preview";
import hoverCardPreview from "../component-previews/hover-card.preview";
import iconPreview from "../component-previews/icon.preview";
import inlineAlertPreview from "../component-previews/inline-alert.preview";
import inputPreview from "../component-previews/input.preview";
import inputGroupPreview from "../component-previews/input-group.preview";
import inputOtpPreview from "../component-previews/input-otp.preview";
import itemPreview from "../component-previews/item.preview";
import kbdPreview from "../component-previews/kbd.preview";
import labelPreview from "../component-previews/label.preview";
import menuPreview from "../component-previews/menu.preview";
import menubarPreview from "../component-previews/menubar.preview";
import messagePreview from "../component-previews/message.preview";
import nativeSelectPreview from "../component-previews/native-select.preview";
import navigationMenuPreview from "../component-previews/navigation-menu.preview";
import pageHeaderPreview from "../component-previews/page-header.preview";
import paginationPreview from "../component-previews/pagination.preview";
import popoverPreview from "../component-previews/popover.preview";
import progressPreview from "../component-previews/progress.preview";
import radioGroupPreview from "../component-previews/radio-group.preview";
import resizablePreview from "../component-previews/resizable.preview";
import runStatusPreview from "../component-previews/run-status.preview";
import scrollAreaPreview from "../component-previews/scroll-area.preview";
import selectPreview from "../component-previews/select.preview";
import separatorPreview from "../component-previews/separator.preview";
import sheetPreview from "../component-previews/sheet.preview";
import sidebarPreview from "../component-previews/sidebar.preview";
import skeletonPreview from "../component-previews/skeleton.preview";
import sliderPreview from "../component-previews/slider.preview";
import sonnerPreview from "../component-previews/sonner.preview";
import spinnerPreview from "../component-previews/spinner.preview";
import surfacePreview from "../component-previews/surface.preview";
import switchPreview from "../component-previews/switch.preview";
import tablePreview from "../component-previews/table.preview";
import tabsPreview from "../component-previews/tabs.preview";
import textareaPreview from "../component-previews/textarea.preview";
import toastPreview from "../component-previews/toast.preview";
import togglePreview from "../component-previews/toggle.preview";
import toggleGroupPreview from "../component-previews/toggle-group.preview";
import tooltipPreview from "../component-previews/tooltip.preview";
import transcriptPreview from "../component-previews/transcript.preview";
import travelWidgetPreview from "../component-previews/travel-widget.preview";
import {
  ComponentPreviewStory,
  componentPreviewStoryArgTypes,
  componentPreviewStoryArgs
} from "./ComponentPreviewStory";
import type { ComponentPreviewStoryProps } from "./ComponentPreviewStory";

export default {
  title: "Components"
} satisfies StoryDefault;

export const Accordion: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={accordionPreview} surface={surface} />
);
Accordion.args = componentPreviewStoryArgs;
Accordion.argTypes = componentPreviewStoryArgTypes;

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

export const Alert: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={alertPreview} surface={surface} />
);
Alert.args = componentPreviewStoryArgs;
Alert.argTypes = componentPreviewStoryArgTypes;

export const AlertDialog: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={alertDialogPreview} surface={surface} />
);
AlertDialog.args = componentPreviewStoryArgs;
AlertDialog.argTypes = componentPreviewStoryArgTypes;

export const Amount: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={amountPreview} surface={surface} />
);
Amount.args = componentPreviewStoryArgs;
Amount.argTypes = componentPreviewStoryArgTypes;

export const AspectRatio: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={aspectRatioPreview} surface={surface} />
);
AspectRatio.args = componentPreviewStoryArgs;
AspectRatio.argTypes = componentPreviewStoryArgTypes;

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

export const Breadcrumb: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={breadcrumbPreview} surface={surface} />
);
Breadcrumb.args = componentPreviewStoryArgs;
Breadcrumb.argTypes = componentPreviewStoryArgTypes;

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

export const ButtonGroup: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={buttonGroupPreview} surface={surface} />
);
ButtonGroup.args = componentPreviewStoryArgs;
ButtonGroup.argTypes = componentPreviewStoryArgTypes;

export const Calendar: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={calendarPreview} surface={surface} />
);
Calendar.args = componentPreviewStoryArgs;
Calendar.argTypes = componentPreviewStoryArgTypes;

export const Card: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={cardPreview} surface={surface} />
);
Card.args = componentPreviewStoryArgs;
Card.argTypes = componentPreviewStoryArgTypes;

export const Carousel: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={carouselPreview} surface={surface} />
);
Carousel.args = componentPreviewStoryArgs;
Carousel.argTypes = componentPreviewStoryArgTypes;

export const Cell: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={cellPreview} surface={surface} />
);
Cell.args = componentPreviewStoryArgs;
Cell.argTypes = componentPreviewStoryArgTypes;

export const Chart: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={chartPreview} surface={surface} />
);
Chart.args = componentPreviewStoryArgs;
Chart.argTypes = componentPreviewStoryArgTypes;

export const Checkbox: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={checkboxPreview} surface={surface} />
);
Checkbox.args = componentPreviewStoryArgs;
Checkbox.argTypes = componentPreviewStoryArgTypes;

export const Collapsible: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={collapsiblePreview} surface={surface} />
);
Collapsible.args = componentPreviewStoryArgs;
Collapsible.argTypes = componentPreviewStoryArgTypes;

export const Combobox: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={comboboxPreview} surface={surface} />
);
Combobox.args = componentPreviewStoryArgs;
Combobox.argTypes = componentPreviewStoryArgTypes;

export const Command: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={commandPreview} surface={surface} />
);
Command.args = componentPreviewStoryArgs;
Command.argTypes = componentPreviewStoryArgTypes;

export const Composer: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={composerPreview} surface={surface} />
);
Composer.args = componentPreviewStoryArgs;
Composer.argTypes = componentPreviewStoryArgTypes;

export const ContextMenu: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={contextMenuPreview} surface={surface} />
);
ContextMenu.args = componentPreviewStoryArgs;
ContextMenu.argTypes = componentPreviewStoryArgTypes;

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

export const Direction: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={directionPreview} surface={surface} />
);
Direction.args = componentPreviewStoryArgs;
Direction.argTypes = componentPreviewStoryArgTypes;

export const Drawer: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={drawerPreview} surface={surface} />
);
Drawer.args = componentPreviewStoryArgs;
Drawer.argTypes = componentPreviewStoryArgTypes;

export const DropdownMenu: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={dropdownMenuPreview} surface={surface} />
);
DropdownMenu.args = componentPreviewStoryArgs;
DropdownMenu.argTypes = componentPreviewStoryArgTypes;

export const Empty: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={emptyPreview} surface={surface} />
);
Empty.args = componentPreviewStoryArgs;
Empty.argTypes = componentPreviewStoryArgTypes;

export const Field: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={fieldPreview} surface={surface} />
);
Field.args = componentPreviewStoryArgs;
Field.argTypes = componentPreviewStoryArgTypes;

export const FilterChip: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={filterChipPreview} surface={surface} />
);
FilterChip.args = componentPreviewStoryArgs;
FilterChip.argTypes = componentPreviewStoryArgTypes;

export const HoverCard: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={hoverCardPreview} surface={surface} />
);
HoverCard.args = componentPreviewStoryArgs;
HoverCard.argTypes = componentPreviewStoryArgTypes;

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

export const InputGroup: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={inputGroupPreview} surface={surface} />
);
InputGroup.args = componentPreviewStoryArgs;
InputGroup.argTypes = componentPreviewStoryArgTypes;

export const InputOtp: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={inputOtpPreview} surface={surface} />
);
InputOtp.args = componentPreviewStoryArgs;
InputOtp.argTypes = componentPreviewStoryArgTypes;

export const Item: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={itemPreview} surface={surface} />
);
Item.args = componentPreviewStoryArgs;
Item.argTypes = componentPreviewStoryArgTypes;

export const Kbd: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={kbdPreview} surface={surface} />
);
Kbd.args = componentPreviewStoryArgs;
Kbd.argTypes = componentPreviewStoryArgTypes;

export const Label: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={labelPreview} surface={surface} />
);
Label.args = componentPreviewStoryArgs;
Label.argTypes = componentPreviewStoryArgTypes;

export const Menu: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={menuPreview} surface={surface} />
);
Menu.args = componentPreviewStoryArgs;
Menu.argTypes = componentPreviewStoryArgTypes;

export const Menubar: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={menubarPreview} surface={surface} />
);
Menubar.args = componentPreviewStoryArgs;
Menubar.argTypes = componentPreviewStoryArgTypes;

export const Message: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={messagePreview} surface={surface} />
);
Message.args = componentPreviewStoryArgs;
Message.argTypes = componentPreviewStoryArgTypes;

export const NativeSelect: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={nativeSelectPreview} surface={surface} />
);
NativeSelect.args = componentPreviewStoryArgs;
NativeSelect.argTypes = componentPreviewStoryArgTypes;

export const NavigationMenu: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={navigationMenuPreview} surface={surface} />
);
NavigationMenu.args = componentPreviewStoryArgs;
NavigationMenu.argTypes = componentPreviewStoryArgTypes;

export const PageHeader: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={pageHeaderPreview} surface={surface} />
);
PageHeader.args = componentPreviewStoryArgs;
PageHeader.argTypes = componentPreviewStoryArgTypes;

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

export const Resizable: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={resizablePreview} surface={surface} />
);
Resizable.args = componentPreviewStoryArgs;
Resizable.argTypes = componentPreviewStoryArgTypes;

export const RunStatus: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={runStatusPreview} surface={surface} />
);
RunStatus.args = componentPreviewStoryArgs;
RunStatus.argTypes = componentPreviewStoryArgTypes;

export const ScrollArea: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={scrollAreaPreview} surface={surface} />
);
ScrollArea.args = componentPreviewStoryArgs;
ScrollArea.argTypes = componentPreviewStoryArgTypes;

export const Select: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={selectPreview} surface={surface} />
);
Select.args = componentPreviewStoryArgs;
Select.argTypes = componentPreviewStoryArgTypes;

export const Separator: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={separatorPreview} surface={surface} />
);
Separator.args = componentPreviewStoryArgs;
Separator.argTypes = componentPreviewStoryArgTypes;

export const Sheet: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={sheetPreview} surface={surface} />
);
Sheet.args = componentPreviewStoryArgs;
Sheet.argTypes = componentPreviewStoryArgTypes;

export const Sidebar: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={sidebarPreview} surface={surface} />
);
Sidebar.args = componentPreviewStoryArgs;
Sidebar.argTypes = componentPreviewStoryArgTypes;

export const Skeleton: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={skeletonPreview} surface={surface} />
);
Skeleton.args = componentPreviewStoryArgs;
Skeleton.argTypes = componentPreviewStoryArgTypes;

export const Slider: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={sliderPreview} surface={surface} />
);
Slider.args = componentPreviewStoryArgs;
Slider.argTypes = componentPreviewStoryArgTypes;

export const Sonner: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={sonnerPreview} surface={surface} />
);
Sonner.args = componentPreviewStoryArgs;
Sonner.argTypes = componentPreviewStoryArgTypes;

export const Spinner: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={spinnerPreview} surface={surface} />
);
Spinner.args = componentPreviewStoryArgs;
Spinner.argTypes = componentPreviewStoryArgTypes;

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

export const Toggle: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={togglePreview} surface={surface} />
);
Toggle.args = componentPreviewStoryArgs;
Toggle.argTypes = componentPreviewStoryArgTypes;

export const ToggleGroup: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={toggleGroupPreview} surface={surface} />
);
ToggleGroup.args = componentPreviewStoryArgs;
ToggleGroup.argTypes = componentPreviewStoryArgTypes;

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

export const TravelWidget: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={travelWidgetPreview} surface={surface} />
);
TravelWidget.args = componentPreviewStoryArgs;
TravelWidget.argTypes = componentPreviewStoryArgTypes;
