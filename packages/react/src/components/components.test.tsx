import "@testing-library/jest-dom/vitest";

import * as React from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { Line, LineChart, XAxis } from "recharts";
import { describe, expect, it, vi } from "vitest";

import {
  ActionMenu,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuShortcut,
  ActionMenuTrigger,
  ActionWidget,
  ActionWidgetActions,
  ActionWidgetAvatar,
  ActionWidgetContent,
  ActionWidgetTitle,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Amount,
  AmountCurrency,
  AmountInput,
  AmountInputType,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetOverlay,
  BottomSheetPortal,
  BottomSheetTitle,
  BottomSheetTrigger,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Calendar,
  CalendarDayButton,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Cell,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  CheckboxIndicator,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Composer,
  ComposerActions,
  ComposerFooter,
  ComposerInput,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  CurrencyProvider,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  Details,
  DetailsCell,
  DetailsCellSkeleton,
  DetailsContent,
  DetailsNote,
  DetailsSkeleton,
  DetailsSkeletonContent,
  DetailsSkeletonNote,
  DetailsSkeletonTitle,
  DetailsTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DirectionProvider,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  FilterChip,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  InlineAlert,
  InlineAlertActions,
  InlineAlertDescription,
  InlineAlertTitle,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  IntlProvider,
  Item,
  ItemSkeleton,
  Kbd,
  KbdGroup,
  Label,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  Message,
  MessageActions,
  MessageAuthor,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageMeta,
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  PageHeader,
  PageHeaderActions,
  PageHeaderBreadcrumbs,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderText,
  PageHeaderTitle,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressIndicator,
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  RunStatus,
  ScrollArea,
  ScrollBar,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Slider,
  Skeleton,
  Spinner,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceFooter,
  SurfaceHeader,
  SurfaceTitle,
  Switch,
  SwitchThumb,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Transcript,
  TranscriptEmpty,
  TranscriptList,
  TravelWidget,
  TravelWidgetAction,
  TravelWidgetContent,
  TravelWidgetDescription,
  TravelWidgetDetails,
  TravelWidgetSkeleton,
  TravelWidgetSkeletonContent,
  TravelWidgetSkeletonDescription,
  TravelWidgetSkeletonDetails,
  TravelWidgetSkeletonTitle,
  TravelWidgetTitle,
  navigationMenuTriggerStyle,
  toast,
  useDirection
} from "../index";

function stubMatchMedia(matches = false) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn()
    }))
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class TestIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly scrollMargin = "";
      readonly thresholds = [];

      disconnect() {}
      observe() {}
      takeRecords() {
        return [];
      }
      unobserve() {}
    }
  );
  vi.stubGlobal(
    "ResizeObserver",
    class TestResizeObserver implements ResizeObserver {
      disconnect() {}
      observe() {}
      unobserve() {}
    }
  );
}

describe("PDS starter components", () => {
  it("renders Button with PDS data attributes, disabled state, and forwarded refs", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <Button
        ref={ref}
        className="custom-button"
        disabled
        intent="secondary"
        size="lg"
      >
        Run
      </Button>
    );

    const button = screen.getByRole("button", { name: "Run" });
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("data-intent", "secondary");
    expect(button).toHaveAttribute("data-size", "lg");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("pds-button", "custom-button");
    expect(ref.current).toBe(button);
  });

  it("supports Button asChild composition", () => {
    render(
      <Button asChild>
        <a href="/runs">Runs</a>
      </Button>
    );

    expect(screen.getByRole("link", { name: "Runs" })).toHaveAttribute(
      "data-slot",
      "button"
    );
  });

  it("keeps full Button labels accessible to assistive technology", () => {
    const label =
      "Run the extremely long agent handoff workflow with full accessible context";

    render(<Button>{label}</Button>);

    expect(screen.getByRole("button", { name: label })).toHaveTextContent(label);
  });

  it("renders ButtonGroup orientation, text, and separator slots", () => {
    const groupRef = React.createRef<HTMLDivElement>();
    const textRef = React.createRef<HTMLDivElement>();
    const separatorRef = React.createRef<HTMLDivElement>();

    render(
      <ButtonGroup
        ref={groupRef}
        aria-label="Run actions"
        className="custom-button-group"
        orientation="vertical"
      >
        <Button>Run</Button>
        <ButtonGroupSeparator ref={separatorRef} decorative={false} />
        <ButtonGroupText ref={textRef}>Draft</ButtonGroupText>
      </ButtonGroup>
    );

    const group = screen.getByRole("group", { name: "Run actions" });
    expect(group).toHaveAttribute("data-slot", "button-group");
    expect(group).toHaveAttribute("data-orientation", "vertical");
    expect(group).toHaveClass("pds-button-group", "custom-button-group");
    expect(groupRef.current).toBe(group);
    expect(screen.getByText("Draft")).toHaveAttribute(
      "data-slot",
      "button-group-text"
    );
    expect(textRef.current).toBe(screen.getByText("Draft"));

    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("data-slot", "button-group-separator");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
    expect(separator).toHaveClass("pds-separator", "pds-button-group-separator");
    expect(separatorRef.current).toBe(separator);
  });

  it("renders Card anatomy, size metadata, and forwarded refs", () => {
    const cardRef = React.createRef<HTMLDivElement>();
    const titleRef = React.createRef<HTMLDivElement>();

    render(
      <Card ref={cardRef} className="custom-card" size="sm">
        <CardHeader>
          <CardTitle ref={titleRef}>Run summary</CardTitle>
          <CardDescription>Generated changes are ready.</CardDescription>
          <CardAction>
            <Badge tone="success">Passed</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>Three checks passed.</CardContent>
        <CardFooter>
          <Button>Open</Button>
        </CardFooter>
      </Card>
    );

    const card = screen.getByText("Run summary").closest('[data-slot="card"]');
    expect(card).toHaveAttribute("data-size", "sm");
    expect(card).toHaveClass("pds-card", "custom-card");
    expect(cardRef.current).toBe(card);
    expect(screen.getByText("Run summary")).toHaveAttribute(
      "data-slot",
      "card-title"
    );
    expect(titleRef.current).toBe(screen.getByText("Run summary"));
    expect(screen.getByText("Generated changes are ready.")).toHaveAttribute(
      "data-slot",
      "card-description"
    );
    expect(screen.getByText("Passed").closest('[data-slot="card-action"]')).toHaveClass(
      "pds-card-action"
    );
    expect(screen.getByText("Three checks passed.")).toHaveAttribute(
      "data-slot",
      "card-content"
    );
    expect(screen.getByRole("button", { name: "Open" }).closest(
      '[data-slot="card-footer"]'
    )).toHaveClass("pds-card-footer");
  });

  it("renders Calendar with DayPicker slots and selected day metadata", () => {
    const selected = new Date(2026, 4, 25);

    const { container } = render(
      <Calendar mode="single" month={selected} selected={selected} />
    );

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toHaveClass("pds-calendar");
    expect(container.querySelector(".pds-calendar-caption")).toHaveTextContent(
      "May 2026"
    );
    const selectedDay = Array.from(
      container.querySelectorAll<HTMLButtonElement>("[data-day]")
    ).find((button) => button.dataset.day === selected.toLocaleDateString());
    expect(selectedDay).toHaveAttribute("data-selected-single", "true");
    expect(selectedDay).toHaveClass("pds-calendar-day-button");
    expect(CalendarDayButton).toBeDefined();
  });

  it("renders Carousel region, slides, controls, and context-backed buttons", () => {
    stubMatchMedia();

    render(
      <Carousel aria-label="Feature slides">
        <CarouselContent>
          <CarouselItem>First slide</CarouselItem>
          <CarouselItem>Second slide</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    expect(screen.getByRole("region", { name: "Feature slides" })).toHaveClass(
      "pds-carousel"
    );
    expect(screen.getAllByRole("group")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Previous slide" })).toHaveClass(
      "pds-carousel-previous"
    );
    expect(screen.getByRole("button", { name: "Next slide" })).toHaveClass(
      "pds-carousel-next"
    );
  });

  it("renders ChartContainer style variables and custom tooltip content", () => {
    const config = {
      runs: {
        color: "var(--pds-color-accent)",
        label: "Runs"
      }
    };

    const { container } = render(
      <ChartContainer config={config} id="runs">
        <LineChart data={[{ day: "Mon", runs: 12 }]}>
          <XAxis dataKey="day" />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active
                payload={[
                  {
                    color: "var(--pds-color-accent)",
                    dataKey: "runs",
                    graphicalItemId: "runs-line",
                    name: "runs",
                    payload: { runs: 12 },
                    type: "none",
                    value: 12
                  }
                ]}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line dataKey="runs" stroke="var(--color-runs)" />
        </LineChart>
      </ChartContainer>
    );

    const chart = container.querySelector('[data-slot="chart"]');
    expect(chart).toHaveClass("pds-chart");
    expect(chart).toHaveAttribute("data-chart", "chart-runs");
    expect(container.querySelector("style")).toHaveTextContent(
      "--color-runs: var(--pds-color-accent)"
    );
    expect(ChartStyle).toBeDefined();
  });

  it("renders Sidebar provider, layout slots, menu states, and trigger behavior", () => {
    stubMatchMedia();

    render(
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarInput aria-label="Search navigation" />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add item">
                <Icon name="add" />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Runs">
                      <Icon name="dashboard" />
                      <span>Runs</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction aria-label="More actions" showOnHover>
                      <Icon name="more_horiz" />
                    </SidebarMenuAction>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#queued">
                          <span>Queued</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger />
          Workspace
        </SidebarInset>
      </SidebarProvider>
    );

    expect(document.querySelector('[data-slot="sidebar-wrapper"]')).toHaveClass(
      "pds-sidebar-wrapper"
    );
    expect(document.querySelector('[data-slot="sidebar"]')).toHaveAttribute(
      "data-state",
      "expanded"
    );
    expect(screen.getByLabelText("Search navigation")).toHaveClass(
      "pds-sidebar-input"
    );
    expect(screen.getByRole("button", { name: "Runs" })).toHaveAttribute(
      "data-active",
      "true"
    );
    expect(screen.getByRole("link", { name: "Queued" })).toHaveClass(
      "pds-sidebar-menu-sub-button"
    );
    expect(document.querySelector('[data-slot="sidebar-menu-skeleton"]')).toHaveClass(
      "pds-sidebar-menu-skeleton"
    );

    const trigger = document.querySelector(
      '[data-slot="sidebar-trigger"]'
    ) as HTMLElement;

    fireEvent.click(trigger);

    expect(document.querySelector('[data-slot="sidebar"]')).toHaveAttribute(
      "data-state",
      "collapsed"
    );
  });

  it("renders Alert tones, status semantics, and action slots", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <>
        <Alert ref={ref} className="custom-alert" tone="danger">
          <Icon name="warning" />
          <AlertTitle>Review failed</AlertTitle>
          <AlertDescription>One check needs attention.</AlertDescription>
          <AlertAction>
            <Button intent="secondary">Inspect</Button>
          </AlertAction>
        </Alert>
        <Alert role="status" tone="success">
          <AlertTitle>Review passed</AlertTitle>
        </Alert>
      </>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-slot", "alert");
    expect(alert).toHaveAttribute("data-tone", "danger");
    expect(alert).toHaveClass("pds-alert", "custom-alert");
    expect(ref.current).toBe(alert);
    expect(screen.getByText("Review failed")).toHaveAttribute(
      "data-slot",
      "alert-title"
    );
    expect(screen.getByText("One check needs attention.")).toHaveAttribute(
      "data-slot",
      "alert-description"
    );
    expect(screen.getByRole("button", { name: "Inspect" }).closest(
      '[data-slot="alert-action"]'
    )).toHaveClass("pds-alert-action");
    expect(screen.getByRole("status")).toHaveAttribute("data-tone", "success");
  });

  it("renders Icon with Material Symbols Rounded hooks", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(<Icon ref={ref} label="Create run" name="add" />);

    const icon = screen.getByRole("img", { name: "Create run" });
    expect(icon).toHaveAttribute("data-slot", "icon");
    expect(icon).toHaveAttribute("data-icon", "");
    expect(icon).toHaveClass("pds-icon", "material-symbols-rounded");
    expect(icon).toHaveTextContent("add");
    expect(ref.current).toBe(icon);
  });

  it("renders decorative Icon as hidden from assistive technology by default", () => {
    const { container } = render(<Icon name="add" />);

    const icon = container.querySelector("[data-slot='icon']");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).not.toHaveAttribute("role");
  });

  it("renders Cell with row attributes, variants, and forwarded refs", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Cell ref={ref} className="custom-cell" variant="disclosure">
        Open details
      </Cell>
    );

    const cell = screen.getByText("Open details");
    expect(cell).toHaveAttribute("data-slot", "cell");
    expect(cell).toHaveAttribute("data-variant", "disclosure");
    expect(cell).toHaveClass("pds-cell", "custom-cell");
    expect(ref.current).toBe(cell);
  });

  it("renders Cell as a button with native disabled behavior and default button type", () => {
    const handleClick = vi.fn();

    render(
      <Cell disabled onClick={handleClick} use="button">
        Disabled row
      </Cell>
    );

    const cell = screen.getByRole("button", { name: "Disabled row" });
    expect(cell).toHaveAttribute("data-disabled", "true");
    expect(cell).toHaveAttribute("type", "button");
    expect(cell).toBeDisabled();

    fireEvent.click(cell);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("uses aria-pressed for selectable Cell state", () => {
    render(
      <Cell aria-pressed use="button" variant="choice">
        Manual review
      </Cell>
    );

    const cell = screen.getByRole("button", { name: "Manual review" });
    expect(cell).toHaveAttribute("aria-pressed", "true");
    expect(cell).toHaveAttribute("data-variant", "choice");
  });

  it("maps disabled non-button Cell roots to aria-disabled", () => {
    render(
      <Cell disabled use="label">
        Label row
      </Cell>
    );

    const cell = screen.getByText("Label row");
    expect(cell).toHaveAttribute("aria-disabled", "true");
    expect(cell).toHaveAttribute("data-disabled", "true");
  });

  it("renders Item with rich row slots, icon tone, and forwarded refs", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Item
        ref={ref}
        className="custom-item"
        iconTone="accent"
        useIcon="bolt"
        variant="disclosure"
      >
        <Item.Avatar>
          <Avatar>
            <AvatarFallback>GB</AvatarFallback>
          </Avatar>
        </Item.Avatar>
        <Item.Content>
          <Item.Title>Instant transfer</Item.Title>
          <Item.Description>Send money in seconds</Item.Description>
        </Item.Content>
        <Item.Side>
          <Item.Value tone="success">Verified</Item.Value>
          <Item.Value variant="secondary">Today</Item.Value>
        </Item.Side>
      </Item>
    );

    const item = screen
      .getByText("Instant transfer")
      .closest('[data-slot="item"]');
    expect(item).toHaveAttribute("data-variant", "disclosure");
    expect(item).toHaveClass("pds-cell", "pds-item", "custom-item");
    expect(item?.querySelector('[data-slot="item-icon"]')).toHaveAttribute(
      "data-tone",
      "accent"
    );
    expect(screen.getByText("Send money in seconds")).toHaveAttribute(
      "data-slot",
      "item-description"
    );
    expect(screen.getByText("Verified")).toHaveAttribute("data-tone", "success");
    expect(screen.getByText("Today")).toHaveAttribute(
      "data-variant",
      "secondary"
    );
    expect(ref.current).toBe(item);
  });

  it("renders pending Item rows with disabled button behavior", () => {
    const handleClick = vi.fn();

    render(
      <Item pending onClick={handleClick} use="button">
        <Item.Content>
          <Item.Title>Sync account</Item.Title>
        </Item.Content>
      </Item>
    );

    const item = screen.getByRole("button", { name: "Sync account" });
    expect(item).toHaveAttribute("aria-busy", "true");
    expect(item).toHaveAttribute("data-pending", "true");
    expect(item).toHaveAttribute("data-disabled", "true");
    expect(item).toBeDisabled();

    fireEvent.click(item);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders Item prefix controls and compact money inputs", () => {
    render(
      <Item use="label">
        <Item.Prefix>
          <Checkbox aria-label="Enable round ups" defaultChecked />
        </Item.Prefix>
        <Item.Content>
          <Item.Title>Round up payments</Item.Title>
          <Item.Description>Send spare change to savings</Item.Description>
        </Item.Content>
        <Item.Side>
          <Item.Input
            aria-label="Monthly budget"
            currency="GBP"
            defaultValue={1200}
            type="money"
          />
        </Item.Side>
      </Item>
    );

    expect(screen.getByLabelText("Enable round ups")).toHaveAttribute(
      "data-slot",
      "checkbox"
    );
    const input = screen.getByLabelText("Monthly budget");
    expect(input.closest('[data-slot="item-input"]')).toHaveClass(
      "pds-item-input"
    );
    expect(input).toHaveValue("£1,200.00");
  });

  it("renders ItemSkeleton defaults and explicit skeleton slots", () => {
    render(
      <>
        <ItemSkeleton className="custom-item-skeleton" />
        <ItemSkeleton useIcon="account_balance">
          <ItemSkeleton.Content>
            <ItemSkeleton.Title className="custom-item-skeleton-title" />
            <ItemSkeleton.Actions />
          </ItemSkeleton.Content>
        </ItemSkeleton>
        <ItemSkeleton data-testid="explicit-item-skeleton">
          <ItemSkeleton.Content />
          <ItemSkeleton.Side />
        </ItemSkeleton>
      </>
    );

    const skeleton = document.querySelector('[data-slot="item-skeleton"]');
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass(
      "pds-cell",
      "pds-item",
      "pds-item-skeleton",
      "custom-item-skeleton"
    );
    expect(skeleton?.querySelector('[data-slot="item-skeleton-avatar"]')).toHaveClass(
      "pds-skeleton",
      "pds-item-skeleton-avatar"
    );
    expect(skeleton?.querySelector('[data-slot="item-skeleton-title"]')).toHaveClass(
      "pds-skeleton",
      "pds-item-skeleton-title"
    );
    expect(skeleton?.querySelector('[data-slot="item-skeleton-value"]')).toHaveClass(
      "pds-skeleton",
      "pds-item-skeleton-value"
    );
    expect(document.querySelector(".custom-item-skeleton-title")).toHaveAttribute(
      "data-slot",
      "item-skeleton-title"
    );
    expect(document.querySelectorAll('[data-slot="item-skeleton-action"]')).toHaveLength(
      2
    );
    expect(document.querySelectorAll('[data-slot="item-icon"]')[0]).toHaveTextContent(
      "account_balance"
    );
    const explicitSkeleton = screen.getByTestId("explicit-item-skeleton");
    expect(
      explicitSkeleton.querySelectorAll('[data-slot="item-skeleton-title"]')
    ).toHaveLength(1);
    expect(
      explicitSkeleton.querySelectorAll('[data-slot="item-skeleton-description"]')
    ).toHaveLength(1);
    expect(
      explicitSkeleton.querySelectorAll('[data-slot="item-skeleton-value"]')
    ).toHaveLength(1);
  });

  it("renders Details with named slots, variants, indent, and forwarded refs", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Details ref={ref} className="custom-details" indent={2} variant="header">
        <DetailsTitle>Plan</DetailsTitle>
        <DetailsContent>Team</DetailsContent>
        <DetailsNote>Includes shared agent runs.</DetailsNote>
      </Details>
    );

    const details = screen.getByText("Plan").closest('[data-slot="details"]');
    expect(details).toHaveAttribute("data-variant", "header");
    expect(details).toHaveClass("pds-details", "custom-details");
    expect((details as HTMLElement).style.getPropertyValue(
      "--pds-details-indent"
    )).toBe("2");
    expect(screen.getByText("Plan")).toHaveAttribute(
      "data-slot",
      "details-title"
    );
    expect(screen.getByText("Team")).toHaveAttribute(
      "data-slot",
      "details-content"
    );
    expect(screen.getByText("Includes shared agent runs.")).toHaveAttribute(
      "data-slot",
      "details-note"
    );
    expect(ref.current).toBe(details);
  });

  it("renders Details and DetailsCell compound slots", () => {
    render(
      <>
        <Details>
          <Details.Title>Owner</Details.Title>
          <Details.Content>Agent</Details.Content>
          <Details.Note>Assigned during triage.</Details.Note>
        </Details>
        <DetailsCell className="custom-details-cell">
          <DetailsCell.Title>Risk</DetailsCell.Title>
          <DetailsCell.Content>Medium</DetailsCell.Content>
        </DetailsCell>
      </>
    );

    expect(screen.getByText("Owner")).toHaveAttribute(
      "data-slot",
      "details-title"
    );
    expect(screen.getByText("Agent")).toHaveAttribute(
      "data-slot",
      "details-content"
    );
    expect(screen.getByText("Assigned during triage.")).toHaveAttribute(
      "data-slot",
      "details-note"
    );
    expect(screen.getByText("Risk").closest('[data-slot="details-cell"]')).toHaveClass(
      "pds-details",
      "pds-details-cell",
      "custom-details-cell"
    );
  });

  it("renders Details as a button with native disabled behavior", () => {
    const handleClick = vi.fn();

    render(
      <Details disabled onClick={handleClick} use="button">
        Disabled detail
      </Details>
    );

    const details = screen.getByRole("button", { name: "Disabled detail" });
    expect(details).toHaveAttribute("data-disabled", "true");
    expect(details).toHaveAttribute("type", "button");
    expect(details).toBeDisabled();

    fireEvent.click(details);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("maps disabled non-button DetailsCell roots to aria-disabled", () => {
    render(
      <DetailsCell disabled use="section">
        <DetailsTitle>Billing period</DetailsTitle>
        <DetailsContent>Monthly</DetailsContent>
      </DetailsCell>
    );

    const details = screen
      .getByText("Billing period")
      .closest('[data-slot="details-cell"]');
    expect(details).toHaveAttribute("aria-disabled", "true");
    expect(details).toHaveAttribute("data-disabled", "true");
  });

  it("renders Details skeleton defaults and explicit note slots", () => {
    render(
      <>
        <DetailsSkeleton className="custom-details-skeleton" />
        <DetailsSkeleton>
          <DetailsSkeletonTitle className="custom-skeleton-title" />
          <DetailsSkeletonContent />
          <DetailsSkeletonNote />
        </DetailsSkeleton>
        <DetailsCellSkeleton>
          <DetailsCellSkeleton.Title />
          <DetailsCellSkeleton.Content />
          <DetailsCellSkeleton.Note className="custom-skeleton-note" />
        </DetailsCellSkeleton>
      </>
    );

    const skeletons = document.querySelectorAll('[data-slot="details-skeleton"]');
    expect(skeletons[0]).toHaveAttribute("aria-hidden", "true");
    expect(skeletons[0]).toHaveClass(
      "pds-details",
      "pds-details-skeleton",
      "custom-details-skeleton"
    );
    expect(skeletons[0].querySelectorAll('[data-slot^="details-skeleton-"]')).toHaveLength(
      2
    );
    expect(document.querySelector('[data-slot="details-skeleton-title"]')).toHaveClass(
      "pds-skeleton",
      "pds-details-skeleton-title"
    );
    expect(document.querySelector(".custom-skeleton-title")).toHaveAttribute(
      "data-slot",
      "details-skeleton-title"
    );
    expect(document.querySelector(".custom-skeleton-note")).toHaveAttribute(
      "data-slot",
      "details-skeleton-note"
    );
    expect(document.querySelector('[data-slot="details-cell-skeleton"]')).toHaveClass(
      "pds-details",
      "pds-details-cell",
      "pds-details-cell-skeleton"
    );
  });

  it("renders Badge with tone, emphasis, className, and forwarded refs", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <Badge
        ref={ref}
        className="custom-badge"
        emphasis="outline"
        tone="success"
      >
        Live
      </Badge>
    );

    const badge = screen.getByText("Live");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-tone", "success");
    expect(badge).toHaveAttribute("data-emphasis", "outline");
    expect(badge).toHaveClass("pds-badge", "custom-badge");
    expect(ref.current).toBe(badge);
  });

  it("supports Badge asChild composition", () => {
    render(
      <Badge asChild tone="accent">
        <a href="/runs">Queued</a>
      </Badge>
    );

    const link = screen.getByRole("link", { name: "Queued" });
    expect(link).toHaveAttribute("data-slot", "badge");
    expect(link).toHaveAttribute("data-tone", "accent");
  });

  it("renders FilterChip with icon, label, separator, count, and active state", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <FilterChip
        ref={ref}
        active
        className="custom-filter-chip"
        count={3}
        icon="filter_list"
        label="Filters"
      />
    );

    const action = screen.getByRole("button", {
      name: /Filters.*3/
    });
    const chip = action.closest('[data-slot="filter-chip"]');

    expect(chip).toHaveAttribute("data-active", "true");
    expect(chip).toHaveClass("pds-filter-chip", "custom-filter-chip");
    expect(ref.current).toBe(chip);
    expect(action).toHaveAttribute("data-slot", "filter-chip-action");
    expect(action).toHaveAttribute("aria-pressed", "true");
    expect(action).toHaveAttribute("type", "button");
    expect(screen.getByText("filter_list")).toHaveAttribute(
      "data-slot",
      "filter-chip-icon"
    );
    expect(screen.getByText("Filters")).toHaveAttribute(
      "data-slot",
      "filter-chip-label"
    );
    expect(screen.getByText("·")).toHaveAttribute(
      "data-slot",
      "filter-chip-separator"
    );
    expect(screen.getByText("3")).toHaveAttribute(
      "data-slot",
      "filter-chip-count"
    );
  });

  it("renders disabled FilterChip with native button behavior", () => {
    const handleClick = vi.fn();

    render(
      <FilterChip disabled label="Recipients" onClick={handleClick} />
    );

    const action = screen.getByRole("button", { name: "Recipients" });
    const chip = action.closest('[data-slot="filter-chip"]');

    expect(chip).toHaveAttribute("data-disabled", "true");
    expect(action).toHaveAttribute("type", "button");
    expect(action).toBeDisabled();

    fireEvent.click(action);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders icon-only FilterChip with an accessible name and notification", () => {
    render(
      <FilterChip
        aria-label="Filters with new activity"
        icon="filter_list"
        iconOnly
        notification
      />
    );

    const action = screen.getByRole("button", {
      name: "Filters with new activity"
    });
    const chip = action.closest('[data-slot="filter-chip"]');

    expect(chip).toHaveAttribute("data-icon-only", "true");
    expect(
      chip?.querySelector('[data-slot="filter-chip-notification"]')
    ).not.toBeNull();
    expect(action).not.toHaveTextContent("Filters with new activity");
  });

  it("renders removable FilterChip actions as sibling buttons", () => {
    const handleRemove = vi.fn();

    render(<FilterChip count={10} label="Team members" onRemove={handleRemove} />);

    const action = screen.getByRole("button", { name: /Team members.*10/ });
    const remove = screen.getByRole("button", { name: "Remove Team members" });
    const chip = action.closest('[data-slot="filter-chip"]');

    expect(chip).toHaveAttribute("data-removable", "true");
    expect(remove).toHaveAttribute("data-slot", "filter-chip-remove");
    expect(chip?.querySelectorAll("button")).toHaveLength(2);
    expect(action.querySelector("button")).toBeNull();

    fireEvent.click(remove);

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("renders Avatar primitives with size, className, and forwarded refs", () => {
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <Avatar ref={ref} className="custom-avatar" size="lg">
        <AvatarImage alt="Pedro" src="/missing.png" />
        <AvatarFallback>PC</AvatarFallback>
        <AvatarBadge aria-label="Online" />
      </Avatar>
    );

    const avatar = screen.getByText("PC").closest('[data-slot="avatar"]');
    expect(avatar).toHaveAttribute("data-size", "lg");
    expect(avatar).toHaveClass("pds-avatar", "custom-avatar");
    expect(ref.current).toBe(avatar);
    expect(screen.getByText("PC")).toHaveAttribute(
      "data-slot",
      "avatar-fallback"
    );
    expect(screen.getByLabelText("Online")).toHaveAttribute(
      "data-slot",
      "avatar-badge"
    );
  });

  it("renders AvatarGroup and count slots", () => {
    render(
      <AvatarGroup className="custom-group">
        <Avatar>
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    );

    expect(screen.getByText("+3")).toHaveAttribute(
      "data-slot",
      "avatar-group-count"
    );
    expect(screen.getByText("PC").closest('[data-slot="avatar-group"]')).toHaveClass(
      "pds-avatar-group",
      "custom-group"
    );
  });

  it("renders Surface composition with slots, className, and forwarded refs", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Surface ref={ref} className="custom-surface" level="elevated">
        <SurfaceHeader>
          <SurfaceTitle>Transcript</SurfaceTitle>
          <SurfaceDescription>Recent agent messages</SurfaceDescription>
          <SurfaceAction>
            <Button>Refresh</Button>
          </SurfaceAction>
        </SurfaceHeader>
        <SurfaceContent>Messages</SurfaceContent>
        <SurfaceFooter>Footer actions</SurfaceFooter>
      </Surface>
    );

    const surface = screen.getByText("Transcript").closest('[data-slot="surface"]');
    expect(surface).toHaveAttribute("data-level", "elevated");
    expect(surface).toHaveClass("pds-surface", "custom-surface");
    expect(ref.current).toBe(surface);
    expect(screen.getByText("Transcript")).toHaveAttribute(
      "data-slot",
      "surface-title"
    );
    expect(screen.getByText("Recent agent messages")).toHaveAttribute(
      "data-slot",
      "surface-description"
    );
    expect(screen.getByText("Messages")).toHaveAttribute(
      "data-slot",
      "surface-content"
    );
    expect(screen.getByText("Footer actions")).toHaveAttribute(
      "data-slot",
      "surface-footer"
    );
  });

  it("renders PageHeader composition with semantic slots and forwarded refs", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <PageHeader ref={ref} className="custom-page-header">
        <PageHeaderBreadcrumbs className="custom-breadcrumbs">
          <Breadcrumbs>
            <BreadcrumbsList>
              <BreadcrumbsItem>
                <BreadcrumbsLink href="/settings">Settings</BreadcrumbsLink>
              </BreadcrumbsItem>
            </BreadcrumbsList>
          </Breadcrumbs>
        </PageHeaderBreadcrumbs>
        <PageHeaderContent>
          <PageHeaderText>
            <PageHeaderTitle>Workspace settings</PageHeaderTitle>
            <PageHeaderDescription>
              Manage account access and runtime defaults.
            </PageHeaderDescription>
            <PageHeaderMeta>Updated 2 minutes ago</PageHeaderMeta>
          </PageHeaderText>
          <PageHeaderActions>
            <Button>Save changes</Button>
          </PageHeaderActions>
        </PageHeaderContent>
      </PageHeader>
    );

    const header = screen
      .getByRole("heading", { level: 1, name: "Workspace settings" })
      .closest('[data-slot="page-header"]');
    expect(header).toHaveClass("pds-page-header", "custom-page-header");
    expect(ref.current).toBe(header);
    expect(screen.getByText("Settings").closest("div")).toHaveAttribute(
      "data-slot",
      "page-header-breadcrumbs"
    );
    expect(screen.getByText("Settings").closest("div")).toHaveClass(
      "custom-breadcrumbs"
    );
    expect(screen.getByText("Workspace settings")).toHaveAttribute(
      "data-slot",
      "page-header-title"
    );
    expect(
      screen.getByText("Manage account access and runtime defaults.")
    ).toHaveAttribute("data-slot", "page-header-description");
    expect(screen.getByText("Updated 2 minutes ago")).toHaveAttribute(
      "data-slot",
      "page-header-meta"
    );
    expect(screen.getByRole("button", { name: "Save changes" }).parentElement).toHaveAttribute(
      "data-slot",
      "page-header-actions"
    );
  });

  it("renders ActionWidget with PDS primitive slots and compound members", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <ActionWidget ref={ref} className="custom-widget" level="nested">
        <ActionWidgetAvatar>
          <Icon name="bolt" />
        </ActionWidgetAvatar>
        <ActionWidgetTitle>Review generated output</ActionWidgetTitle>
        <ActionWidgetContent>Inspect the changes before approval.</ActionWidgetContent>
        <ActionWidgetActions justify="center">
          <Button intent="secondary" size="sm">
            Inspect
          </Button>
          <Button size="sm">Approve</Button>
        </ActionWidgetActions>
      </ActionWidget>
    );

    const widget = screen
      .getByText("Review generated output")
      .closest('[data-slot="action-widget"]');
    expect(widget).toHaveAttribute("data-level", "nested");
    expect(widget).toHaveClass("pds-surface", "pds-action-widget", "custom-widget");
    expect(ref.current).toBe(widget);
    expect(screen.getByText("Review generated output")).toHaveAttribute(
      "data-slot",
      "action-widget-title"
    );
    expect(screen.getByText("Inspect the changes before approval.")).toHaveAttribute(
      "data-slot",
      "action-widget-content"
    );
    expect(screen.getByText("bolt").closest(
      '[data-slot="action-widget-avatar"]'
    )).toHaveClass("pds-action-widget-avatar");
    expect(screen.getByRole("button", { name: "Inspect" }).closest(
      '[data-slot="action-widget-actions"]'
    )).toHaveAttribute("data-justify", "center");

    expect(ActionWidget.Title).toBe(ActionWidgetTitle);
    expect(ActionWidget.Avatar).toBe(ActionWidgetAvatar);
    expect(ActionWidget.Content).toBe(ActionWidgetContent);
    expect(ActionWidget.Actions).toBe(ActionWidgetActions);
  });

  it("renders TravelWidget with media, carousel controls, action overlay, and slots", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <TravelWidget
        ref={ref}
        className="custom-travel-widget"
        image={["/hotel-1.jpg", "/hotel-2.jpg"]}
        onClick={vi.fn()}
      >
        <TravelWidgetAction>
          <Button aria-label="Save hotel" intent="secondary" size="icon">
            <Icon name="favorite" />
          </Button>
        </TravelWidgetAction>
        <TravelWidgetTitle>Omni Hilton Hotel</TravelWidgetTitle>
        <TravelWidgetDetails>Hotel rental - Rating 4.5</TravelWidgetDetails>
        <TravelWidgetDescription>
          Reserve now, pay later with free cancellation.
        </TravelWidgetDescription>
        <TravelWidgetContent>GBP 1,480 - GBP 200 cashback</TravelWidgetContent>
      </TravelWidget>
    );

    const widget = screen
      .getByText("Omni Hilton Hotel")
      .closest('[data-slot="travel-widget"]');
    const control = screen.getByRole("button", { name: "Omni Hilton Hotel" });
    const title = screen.getByText("Omni Hilton Hotel");

    expect(widget).toHaveAttribute("data-variant", "large");
    expect(widget).toHaveAttribute("data-image", "true");
    expect(widget).toHaveClass("pds-travel-widget", "custom-travel-widget");
    expect(ref.current).toBe(widget);
    expect(control).toHaveAttribute("data-slot", "travel-widget-control");
    expect(control).toHaveAttribute("aria-labelledby", title.id);
    expect(title).toHaveAttribute("data-slot", "travel-widget-title");
    expect(screen.getByText("Hotel rental - Rating 4.5")).toHaveAttribute(
      "data-slot",
      "travel-widget-details"
    );
    expect(
      screen.getByText("Reserve now, pay later with free cancellation.")
    ).toHaveAttribute("data-slot", "travel-widget-description");
    expect(screen.getByText("GBP 1,480 - GBP 200 cashback")).toHaveAttribute(
      "data-slot",
      "travel-widget-content"
    );
    expect(widget?.querySelector('[data-slot="travel-widget-media"]')).toHaveAttribute(
      "data-carousel",
      "true"
    );
    expect(control.querySelector('[data-slot="travel-widget-action"]')).toBeNull();
    expect(screen.getByRole("button", { name: "Save hotel" }).closest(
      '[data-slot="travel-widget-action"]'
    )).toHaveClass("pds-travel-widget-action");
    expect(screen.getByLabelText("Image 1 of 2")).toHaveAttribute(
      "data-slot",
      "travel-widget-carousel-status"
    );

    fireEvent.click(screen.getByRole("button", { name: "Show next image" }));

    expect(screen.getByLabelText("Image 2 of 2")).toHaveAttribute(
      "data-slot",
      "travel-widget-carousel-status"
    );

    expect(TravelWidget.Title).toBe(TravelWidgetTitle);
    expect(TravelWidget.Details).toBe(TravelWidgetDetails);
    expect(TravelWidget.Description).toBe(TravelWidgetDescription);
    expect(TravelWidget.Content).toBe(TravelWidgetContent);
    expect(TravelWidget.Action).toBe(TravelWidgetAction);
  });

  it("maps disabled non-button TravelWidget controls to aria-disabled", () => {
    render(
      <TravelWidget aria-label="Retail offer" disabled use="div" variant="small">
        <TravelWidget.Title>iPad Pro</TravelWidget.Title>
        <TravelWidget.Content>5% cashback</TravelWidget.Content>
      </TravelWidget>
    );

    const widget = screen.getByText("iPad Pro").closest('[data-slot="travel-widget"]');
    const control = widget?.querySelector('[data-slot="travel-widget-control"]');

    expect(widget).toHaveAttribute("data-disabled", "true");
    expect(widget).toHaveAttribute("data-variant", "small");
    expect(control).toHaveAttribute("aria-disabled", "true");
    expect(control).not.toHaveAttribute("disabled");
    expect(control).toHaveAttribute("aria-label", "Retail offer");
  });

  it("renders TravelWidgetSkeleton defaults and explicit skeleton slots", () => {
    render(
      <>
        <TravelWidgetSkeleton className="custom-travel-skeleton" />
        <TravelWidgetSkeleton variant="small">
          <TravelWidgetSkeletonTitle className="custom-travel-skeleton-title" />
          <TravelWidgetSkeletonDetails />
          <TravelWidgetSkeletonDescription />
          <TravelWidgetSkeletonContent />
        </TravelWidgetSkeleton>
      </>
    );

    const skeletons = document.querySelectorAll(
      '[data-slot="travel-widget-skeleton"]'
    );

    expect(skeletons[0]).toHaveAttribute("aria-hidden", "true");
    expect(skeletons[0]).toHaveClass(
      "pds-travel-widget",
      "pds-travel-widget-skeleton",
      "custom-travel-skeleton"
    );
    expect(skeletons[0].querySelector('[data-slot="travel-widget-skeleton-media"]')).toHaveClass(
      "pds-skeleton",
      "pds-travel-widget-media"
    );
    expect(skeletons[0].querySelectorAll('[data-slot^="travel-widget-skeleton-"]')).toHaveLength(
      8
    );
    expect(document.querySelector(".custom-travel-skeleton-title")).toHaveAttribute(
      "data-slot",
      "travel-widget-skeleton-title"
    );
    expect(skeletons[1]).toHaveAttribute("data-variant", "small");
    expect(skeletons[1].querySelector('[data-slot="travel-widget-skeleton-content"]')).toHaveClass(
      "pds-travel-widget-content",
      "pds-travel-widget-skeleton-content"
    );

    expect(TravelWidgetSkeleton.Title).toBe(TravelWidgetSkeletonTitle);
    expect(TravelWidgetSkeleton.Details).toBe(TravelWidgetSkeletonDetails);
    expect(TravelWidgetSkeleton.Description).toBe(TravelWidgetSkeletonDescription);
    expect(TravelWidgetSkeleton.Content).toBe(TravelWidgetSkeletonContent);
  });

  it("renders RunStatus statuses with badge-compatible attributes", () => {
    const statuses = [
      "idle",
      "queued",
      "running",
      "success",
      "warning",
      "error",
      "cancelled"
    ] as const;

    render(
      <div>
        {statuses.map((status) => (
          <RunStatus key={status} status={status} />
        ))}
      </div>
    );

    for (const status of statuses) {
      const label = status === "error" ? "Error" : status[0].toUpperCase() + status.slice(1);
      const runStatus = screen.getByText(label);
      expect(runStatus).toHaveAttribute("data-slot", "run-status");
      expect(runStatus).toHaveAttribute("data-status", status);
      expect(runStatus).toHaveAttribute("data-emphasis", "soft");
      expect(runStatus).toHaveClass("pds-badge", "pds-run-status");
    }
  });

  it("supports RunStatus asChild and consumer-owned live region behavior", () => {
    render(
      <RunStatus asChild aria-live="polite" status="running">
        <span>Working</span>
      </RunStatus>
    );

    const status = screen.getByText("Working");
    expect(status).toHaveAttribute("data-slot", "run-status");
    expect(status).toHaveAttribute("data-status", "running");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("renders Message layout slots with data attributes, className, and refs", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Message
        ref={ref}
        aria-label="Assistant message"
        className="custom-message"
        role="assistant"
        variant="compact"
      >
        <MessageAvatar>Avatar</MessageAvatar>
        <MessageHeader>
          <MessageAuthor>Agent</MessageAuthor>
          <MessageMeta>12:04</MessageMeta>
          <RunStatus status="success">Done</RunStatus>
        </MessageHeader>
        <MessageContent>Generated answer</MessageContent>
        <MessageActions>
          <Button size="sm">Copy</Button>
        </MessageActions>
      </Message>
    );

    const message = screen.getByRole("article", { name: "Assistant message" });
    expect(message).toHaveAttribute("data-slot", "message");
    expect(message).toHaveAttribute("data-role", "assistant");
    expect(message).toHaveAttribute("data-variant", "compact");
    expect(message).toHaveClass("pds-message", "custom-message");
    expect(ref.current).toBe(message);
    expect(screen.getByText("Avatar")).toHaveAttribute(
      "data-slot",
      "message-avatar"
    );
    expect(screen.getByText("Agent")).toHaveAttribute(
      "data-slot",
      "message-author"
    );
    expect(screen.getByText("12:04")).toHaveAttribute(
      "data-slot",
      "message-meta"
    );
    expect(screen.getByText("Generated answer")).toHaveAttribute(
      "data-slot",
      "message-content"
    );
    expect(screen.getByRole("button", { name: "Copy" }).closest(
      '[data-slot="message-actions"]'
    )).toHaveClass("pds-message-actions");
  });

  it("renders Transcript list and empty states", () => {
    const ref = React.createRef<HTMLElement>();

    const { rerender } = render(
      <Transcript
        ref={ref}
        aria-label="Conversation"
        className="custom-transcript"
        density="compact"
      >
        <TranscriptList className="custom-list">
          <Message role="user">Hello</Message>
        </TranscriptList>
      </Transcript>
    );

    const transcript = screen.getByRole("region", { name: "Conversation" });
    expect(transcript).toHaveAttribute("data-slot", "transcript");
    expect(transcript).toHaveAttribute("data-density", "compact");
    expect(transcript).toHaveClass("pds-transcript", "custom-transcript");
    expect(ref.current).toBe(transcript);
    expect(screen.getByText("Hello").closest('[data-slot="transcript-list"]')).toHaveClass(
      "pds-transcript-list",
      "custom-list"
    );

    rerender(
      <Transcript aria-label="Empty conversation" empty="No messages yet" />
    );

    expect(screen.getByText("No messages yet")).toHaveAttribute(
      "data-slot",
      "transcript-empty"
    );
  });

  it("supports explicit TranscriptEmpty composition", () => {
    render(
      <Transcript aria-label="Conversation">
        <TranscriptEmpty className="custom-empty">Nothing here</TranscriptEmpty>
      </Transcript>
    );

    expect(screen.getByText("Nothing here")).toHaveClass(
      "pds-transcript-empty",
      "custom-empty"
    );
  });

  it("maps Composer state to form and input accessibility attributes", () => {
    const ref = React.createRef<HTMLFormElement>();
    const inputRef = React.createRef<HTMLTextAreaElement>();

    render(
      <Composer
        ref={ref}
        aria-label="Message composer"
        busy
        className="custom-composer"
        disabled
        invalid
      >
        <ComposerInput ref={inputRef} aria-label="Message" />
        <ComposerActions>
          <Button type="submit">Send</Button>
        </ComposerActions>
        <ComposerFooter>Review before sending.</ComposerFooter>
      </Composer>
    );

    const composer = screen.getByRole("form", { name: "Message composer" });
    expect(composer).toHaveAttribute("aria-busy", "true");
    expect(composer).toHaveAttribute("data-slot", "composer");
    expect(composer).toHaveAttribute("data-busy", "true");
    expect(composer).toHaveAttribute("data-disabled", "true");
    expect(composer).toHaveAttribute("data-invalid", "true");
    expect(composer).toHaveClass("pds-composer", "custom-composer");
    expect(ref.current).toBe(composer);

    const input = screen.getByLabelText("Message");
    expect(input).toHaveAttribute("data-slot", "composer-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("pds-textarea", "pds-composer-input");
    expect(inputRef.current).toBe(input);
    expect(screen.getByRole("button", { name: "Send" }).closest(
      '[data-slot="composer-actions"]'
    )).toHaveClass("pds-composer-actions");
    expect(screen.getByText("Review before sending.")).toHaveAttribute(
      "data-slot",
      "composer-footer"
    );
  });

  it("submits Composer through consumer-owned submit controls", () => {
    const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    render(
      <Composer aria-label="Message composer" onSubmit={handleSubmit}>
        <ComposerInput aria-label="Message" defaultValue="Ship it" />
        <ComposerActions>
          <Button type="submit">Send</Button>
        </ComposerActions>
      </Composer>
    );

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("maps Input invalid and disabled states to accessibility attributes", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <Input
        ref={ref}
        className="custom-input"
        disabled
        invalid
        density="compact"
        aria-label="Prompt"
      />
    );

    const input = screen.getByLabelText("Prompt");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveAttribute("data-density", "compact");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("pds-input", "custom-input");
    expect(ref.current).toBe(input);
  });

  it("preserves explicit Input aria-invalid values", () => {
    render(<Input aria-invalid="grammar" aria-label="Prompt" />);

    expect(screen.getByLabelText("Prompt")).toHaveAttribute(
      "aria-invalid",
      "grammar"
    );
  });

  it("renders InputGroup addons, compact button, focus behavior, and textarea control", () => {
    const groupRef = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    const buttonRef = React.createRef<HTMLButtonElement>();
    const textareaRef = React.createRef<HTMLTextAreaElement>();

    render(
      <>
        <InputGroup ref={groupRef} aria-label="Repository" disabled>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            ref={inputRef}
            aria-label="Repository URL"
            defaultValue="github.com/pds"
            invalid
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              ref={buttonRef}
              aria-label="Copy repository"
              size="icon-xs"
            >
              <Icon name="content_copy" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup aria-label="Notes">
          <InputGroupAddon align="block-start">
            <InputGroupText>Reviewer context</InputGroupText>
          </InputGroupAddon>
          <InputGroupTextarea ref={textareaRef} aria-label="Run notes" />
        </InputGroup>
      </>
    );

    const group = screen.getByRole("group", { name: "Repository" });
    expect(group).toHaveAttribute("data-slot", "input-group");
    expect(group).toHaveAttribute("data-disabled", "true");
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(groupRef.current).toBe(group);

    const input = screen.getByLabelText("Repository URL");
    expect(input).toHaveAttribute("data-slot", "input-group-control");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("pds-input", "pds-input-group-input");
    expect(inputRef.current).toBe(input);

    fireEvent.click(screen.getByText("https://"));
    expect(input).toHaveFocus();

    const button = screen.getByRole("button", { name: "Copy repository" });
    expect(button).toHaveAttribute("data-slot", "input-group-button");
    expect(button).toHaveAttribute("data-input-group-size", "icon-xs");
    expect(button).toHaveClass("pds-button", "pds-input-group-button");
    expect(buttonRef.current).toBe(button);

    expect(screen.getByText("Reviewer context").closest("[data-align]")).toHaveAttribute(
      "data-align",
      "block-start"
    );
    expect(screen.getByLabelText("Run notes")).toHaveAttribute(
      "data-slot",
      "input-group-control"
    );
    expect(textareaRef.current).toBe(screen.getByLabelText("Run notes"));
  });

  it("renders InputOTP slots, invalid state, separator, and forwarded input ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    const handleChange = vi.fn();

    render(
      <InputOTP
        ref={ref}
        aria-label="Verification code"
        invalid
        maxLength={6}
        onChange={handleChange}
        value="123"
      >
        <InputOTPGroup aria-label="First three digits">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup aria-label="Last three digits">
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );

    const input = screen.getByLabelText("Verification code");
    expect(input).toHaveAttribute("data-slot", "input-otp");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveClass("pds-input-otp-control");
    expect(input.closest(".pds-input-otp")).toContainElement(input);
    expect(ref.current).toBe(input);

    const slots = document.querySelectorAll('[data-slot="input-otp-slot"]');
    expect(slots).toHaveLength(6);
    expect(slots[0]).toHaveTextContent("1");
    expect(slots[0]).toHaveAttribute("data-filled", "true");
    expect(slots[3]).not.toHaveAttribute("data-filled");

    expect(screen.getByRole("separator")).toHaveAttribute(
      "data-slot",
      "input-otp-separator"
    );
  });

  it("renders Amount compound slots with primitive-backed currency and input sides", () => {
    const amountRef = React.createRef<HTMLDivElement>();
    const currencyRef = React.createRef<HTMLElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    const handleCurrencyClick = vi.fn();

    render(
      <Amount ref={amountRef} aria-invalid className="custom-amount">
        <Amount.Currency
          ref={currencyRef}
          aria-label="Currency"
          description="Balance: £500"
          image="https://example.com/currencies/gbp.svg"
          invalid
          errorMessage="Choose another currency"
          onClick={handleCurrencyClick}
          value="GBP"
        />
        <Amount.Input
          ref={inputRef}
          aria-label="Amount"
          className="custom-amount-input"
          description="No fee"
          invalid
          errorMessage="Amount is above the limit"
          value={1200}
        />
      </Amount>
    );

    const amount = screen.getByLabelText("Amount").closest('[data-slot="amount"]');
    expect(amount).toHaveAttribute("data-invalid", "true");
    expect(amount).toHaveClass("pds-amount", "custom-amount");
    expect(amountRef.current).toBe(amount);

    const currency = screen.getByRole("button", { name: "Currency" });
    expect(currency).toHaveAttribute("data-slot", "amount-currency");
    expect(currency).toHaveAttribute("data-invalid", "true");
    expect(currency).toHaveAttribute("aria-invalid", "true");
    expect(currency).toHaveAccessibleDescription(
      "Balance: £500 Choose another currency"
    );
    expect(currency).toHaveClass("pds-cell", "pds-amount-currency");
    expect(currencyRef.current).toBe(currency);

    fireEvent.click(currency);
    expect(handleCurrencyClick).toHaveBeenCalledTimes(1);

    expect(screen.getByText("GBP")).toHaveAttribute(
      "data-slot",
      "amount-currency-value"
    );
    expect(document.querySelector('[data-slot="amount-currency-image"]')).toHaveClass(
      "pds-avatar",
      "pds-amount-currency-image"
    );

    const input = screen.getByLabelText("Amount");
    expect(input).toHaveAttribute("data-slot", "amount-input-control");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("No fee Amount is above the limit");
    expect(input).toHaveClass("pds-input", "pds-amount-input-control", "custom-amount-input");
    expect(input).toHaveValue("1200");
    expect(inputRef.current).toBe(input);
  });

  it("formats AmountInput money values with locale and custom currency metadata", () => {
    const formattedGbp = new Intl.NumberFormat("en-GB", {
      currency: "GBP",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: "currency"
    }).format(100000.01);
    const formattedPlnLocale = new Intl.NumberFormat("pl-PL", {
      currency: "GBP",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: "currency"
    }).format(100000.01);

    render(
      <CurrencyProvider
        currencies={[{ code: "BTC", fractionalPart: 8, symbol: "B" }]}
      >
        <Amount>
          <AmountCurrency aria-label="Currency" value="GBP" />
          <AmountInput
            aria-label="GBP amount"
            currency="GBP"
            type={AmountInputType.MONEY}
            value={100000.01}
          />
        </Amount>
        <IntlProvider locale="pl-PL">
          <Amount>
            <AmountCurrency aria-label="Currency" value="GBP" />
            <AmountInput
              aria-label="Localized amount"
              currency="GBP"
              type={AmountInputType.MONEY}
              value={100000.01}
            />
          </Amount>
        </IntlProvider>
        <Amount>
          <AmountCurrency aria-label="Asset" value="BTC" />
          <AmountInput
            aria-label="BTC amount"
            currency="BTC"
            type={AmountInputType.MONEY_FRACTIONAL}
            value={212345678}
          />
        </Amount>
        <Amount>
          <AmountCurrency aria-label="Currency" value="GBP" />
          <AmountInput
            aria-label="Signed amount"
            currency="GBP"
            negative
            showCurrency={false}
            showSign
            type={AmountInputType.MONEY}
            value={5}
          />
        </Amount>
      </CurrencyProvider>
    );

    expect(screen.getByLabelText("GBP amount")).toHaveValue(formattedGbp);
    expect(screen.getByLabelText("Localized amount")).toHaveValue(
      formattedPlnLocale
    );
    expect(screen.getByLabelText("BTC amount")).toHaveValue("B2.12345678");
    expect(screen.getByLabelText("Signed amount")).toHaveValue("-5.00");
  });

  it("maps Textarea invalid state, className, and refs", () => {
    const ref = React.createRef<HTMLTextAreaElement>();

    render(
      <Textarea
        ref={ref}
        className="custom-textarea"
        invalid
        density="compact"
        aria-label="Message"
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("data-invalid", "true");
    expect(textarea).toHaveAttribute("data-density", "compact");
    expect(textarea).toHaveClass("pds-textarea", "custom-textarea");
    expect(ref.current).toBe(textarea);
  });

  it("preserves explicit Textarea aria-invalid values", () => {
    render(<Textarea aria-invalid="spelling" aria-label="Message" />);

    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "aria-invalid",
      "spelling"
    );
  });

  it("wires Dialog primitives and accessible content", () => {
    render(
      <Dialog open>
        <DialogContent className="custom-dialog">
          <DialogTitle>Confirm run</DialogTitle>
          <DialogDescription>Start this agent run?</DialogDescription>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole("dialog", { name: "Confirm run" });
    expect(dialog).toHaveAttribute("data-slot", "dialog-content");
    expect(dialog).toHaveClass("pds-dialog-content", "custom-dialog");
    expect(dialog).toHaveAccessibleDescription("Start this agent run?");
    expect(screen.getByText("Confirm run")).toHaveAttribute(
      "data-slot",
      "dialog-title"
    );
    expect(screen.getByText("Start this agent run?")).toHaveAttribute(
      "data-slot",
      "dialog-description"
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "dialog-close"
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute(
      "data-slot",
      "dialog-close"
    );
  });

  it("opens and dismisses Dialog through Radix trigger and keyboard behavior", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm run</DialogTitle>
            <DialogDescription>Start this agent run?</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Confirm run");

    fireEvent.keyDown(dialog, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes Dialog through the default close button", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm run</DialogTitle>
          <DialogDescription>Start this agent run?</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("returns focus to the Dialog trigger after keyboard dismissal", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm run</DialogTitle>
          <DialogDescription>Start this agent run?</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByRole("button", { name: "Open dialog" });

    trigger.focus();
    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog");
    fireEvent.keyDown(dialog, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("allows explicit Dialog portal and overlay composition", () => {
    render(
      <Dialog open>
        <DialogPortal>
          <DialogOverlay className="custom-overlay" />
          <DialogContent showCloseButton={false}>
            <DialogTitle>Inspect run</DialogTitle>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );

    expect(document.querySelector('[data-slot="dialog-overlay"]')).toHaveClass(
      "pds-dialog-overlay",
      "custom-overlay"
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("wires AlertDialog confirmation slots and action controls", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent className="custom-alert-dialog" size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>!</AlertDialogMedia>
            <AlertDialogTitle>Discard draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove generated notes from the workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep draft</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const dialog = screen.getByRole("alertdialog", { name: "Discard draft?" });
    expect(dialog).toHaveAttribute("data-slot", "alert-dialog-content");
    expect(dialog).toHaveAttribute("data-size", "sm");
    expect(dialog).toHaveClass("pds-alert-dialog-content", "custom-alert-dialog");
    expect(dialog).toHaveAccessibleDescription(
      "This will remove generated notes from the workspace."
    );
    expect(screen.getByText("!")).toHaveAttribute(
      "data-slot",
      "alert-dialog-media"
    );
    expect(screen.getByText("Discard draft?")).toHaveAttribute(
      "data-slot",
      "alert-dialog-title"
    );
    expect(screen.getByRole("button", { name: "Keep draft" })).toHaveAttribute(
      "data-slot",
      "alert-dialog-cancel"
    );
    expect(screen.getByRole("button", { name: "Keep draft" })).toHaveAttribute(
      "data-intent",
      "secondary"
    );
    expect(screen.getByRole("button", { name: "Discard" })).toHaveAttribute(
      "data-slot",
      "alert-dialog-action"
    );
    expect(screen.getByRole("button", { name: "Discard" })).toHaveAttribute(
      "data-intent",
      "danger"
    );
  });

  it("opens and dismisses AlertDialog through trigger and cancel", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Discard draft</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Discard draft?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Discard draft" }));

    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  it("renders Toast feedback with tone, slots, action, close, and viewport", () => {
    render(
      <ToastProvider swipeDirection="right">
        <ToastViewport className="custom-viewport" />
        <Toast className="custom-toast" open tone="success">
          <ToastTitle>Agreement signed</ToastTitle>
          <ToastDescription>We saved the acceptance timestamp.</ToastDescription>
          <ToastAction altText="Review agreement details">Review</ToastAction>
          <ToastClose />
        </Toast>
      </ToastProvider>
    );

    expect(document.querySelector('[data-slot="toast-viewport"]')).toHaveClass(
      "pds-toast-viewport",
      "custom-viewport"
    );

    const toast = screen.getByText("Agreement signed").closest('[data-slot="toast"]');
    expect(toast).toHaveAttribute("data-tone", "success");
    expect(toast).toHaveClass("pds-toast", "custom-toast");
    expect(screen.getByText("Agreement signed")).toHaveAttribute(
      "data-slot",
      "toast-title"
    );
    expect(screen.getByText("We saved the acceptance timestamp.")).toHaveAttribute(
      "data-slot",
      "toast-description"
    );
    expect(screen.getByRole("button", { name: "Review" })).toHaveAttribute(
      "data-slot",
      "toast-action"
    );
    expect(screen.getByRole("button", { name: "Dismiss notification" })).toHaveAttribute(
      "data-slot",
      "toast-close"
    );
  });

  it("defaults Toast tone to neutral and supports custom close content", () => {
    render(
      <ToastProvider>
        <ToastViewport />
        <Toast open>
          <ToastTitle>Saved</ToastTitle>
          <ToastClose>Dismiss</ToastClose>
        </Toast>
      </ToastProvider>
    );

    expect(screen.getByText("Saved").closest('[data-slot="toast"]')).toHaveAttribute(
      "data-tone",
      "neutral"
    );
    expect(screen.getByRole("button", { name: "Dismiss" })).toHaveAttribute(
      "data-slot",
      "toast-close"
    );
  });

  it("keeps Toast action and close controls keyboard focusable", () => {
    render(
      <ToastProvider>
        <ToastViewport />
        <Toast defaultOpen tone="warning">
          <ToastTitle>Action needed</ToastTitle>
          <ToastDescription>Review the blocked run.</ToastDescription>
          <ToastAction altText="Review blocked run">Review</ToastAction>
          <ToastClose />
        </Toast>
      </ToastProvider>
    );

    const action = screen.getByRole("button", { name: "Review" });
    const close = screen.getByRole("button", { name: "Dismiss notification" });

    action.focus();
    expect(action).toHaveFocus();

    close.focus();
    expect(close).toHaveFocus();
  });

  it("renders Sonner Toaster with PDS classes and exported toast API", async () => {
    const handleOpen = vi.fn();
    const id = "sonner-test-toast";

    render(<Toaster id="sonner-test" duration={100000} />);

    act(() => {
      toast.success("Run queued", {
        action: {
          label: "Open",
          onClick: handleOpen
        },
        description: "We will notify reviewers when it starts.",
        id,
        toasterId: "sonner-test"
      });
    });

    expect(await screen.findByText("Run queued")).toBeInTheDocument();

    const toaster = document.querySelector("[data-sonner-toaster]");
    expect(toaster).toHaveClass("pds-toaster");

    const sonnerToast = screen.getByText("Run queued").closest("[data-sonner-toast]");
    expect(sonnerToast).toHaveClass("pds-sonner-toast", "pds-sonner-success");
    expect(screen.getByText("Run queued")).toHaveClass("pds-sonner-title");
    expect(
      screen.getByText("We will notify reviewers when it starts.")
    ).toHaveClass("pds-sonner-description");
    expect(screen.getByRole("button", { name: "Open" })).toHaveClass(
      "pds-sonner-action-button"
    );

    act(() => {
      toast.dismiss(id);
    });
  });

  it("wires BottomSheet primitives and accessible content", () => {
    render(
      <BottomSheet open>
        <BottomSheetContent className="custom-sheet">
          <BottomSheetHeader>
            <BottomSheetTitle>Review agreement</BottomSheetTitle>
            <BottomSheetDescription>
              Open the document before accepting.
            </BottomSheetDescription>
          </BottomSheetHeader>
          <BottomSheetBody>Document body</BottomSheetBody>
          <BottomSheetFooter>
            <BottomSheetClose>Cancel</BottomSheetClose>
            <Button>Accept</Button>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>
    );

    const sheet = screen.getByRole("dialog", { name: "Review agreement" });
    expect(sheet).toHaveAttribute("data-slot", "bottom-sheet-content");
    expect(sheet).toHaveClass("pds-bottom-sheet-content", "custom-sheet");
    expect(sheet).toHaveAccessibleDescription("Open the document before accepting.");
    expect(screen.getByText("Review agreement")).toHaveAttribute(
      "data-slot",
      "bottom-sheet-title"
    );
    expect(screen.getByText("Open the document before accepting.")).toHaveAttribute(
      "data-slot",
      "bottom-sheet-description"
    );
    expect(screen.getByText("Document body")).toHaveAttribute(
      "data-slot",
      "bottom-sheet-body"
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "bottom-sheet-close"
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute(
      "data-slot",
      "bottom-sheet-close"
    );
    expect(screen.getByRole("button", { name: "Accept" }).closest(
      '[data-slot="bottom-sheet-footer"]'
    )).toHaveClass("pds-bottom-sheet-footer");
  });

  it("opens and dismisses BottomSheet through Radix trigger and keyboard behavior", async () => {
    render(
      <BottomSheet>
        <BottomSheetTrigger>Open sheet</BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Agreement details</BottomSheetTitle>
            <BottomSheetDescription>Read the summary.</BottomSheetDescription>
          </BottomSheetHeader>
          <BottomSheetBody>Summary</BottomSheetBody>
        </BottomSheetContent>
      </BottomSheet>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open sheet" }));

    const sheet = await screen.findByRole("dialog");
    expect(sheet).toHaveTextContent("Agreement details");

    fireEvent.keyDown(sheet, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("returns focus to the BottomSheet trigger after keyboard dismissal", async () => {
    render(
      <BottomSheet>
        <BottomSheetTrigger>Open sheet</BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetTitle>Agreement details</BottomSheetTitle>
          <BottomSheetDescription>Read the summary.</BottomSheetDescription>
          <BottomSheetBody>Summary</BottomSheetBody>
        </BottomSheetContent>
      </BottomSheet>
    );

    const trigger = screen.getByRole("button", { name: "Open sheet" });

    trigger.focus();
    fireEvent.click(trigger);

    const sheet = await screen.findByRole("dialog");
    fireEvent.keyDown(sheet, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("allows explicit BottomSheet portal and overlay composition", () => {
    render(
      <BottomSheet open>
        <BottomSheetPortal>
          <BottomSheetOverlay className="custom-sheet-overlay" />
          <BottomSheetContent showCloseButton={false}>
            <BottomSheetTitle>Inspect agreement</BottomSheetTitle>
          </BottomSheetContent>
        </BottomSheetPortal>
      </BottomSheet>
    );

    expect(document.querySelector('[data-slot="bottom-sheet-overlay"]')).toHaveClass(
      "pds-bottom-sheet-overlay",
      "custom-sheet-overlay"
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("wires Sheet side placement, content slots, and close controls", () => {
    render(
      <Sheet open>
        <SheetContent className="custom-sheet" side="left">
          <SheetHeader>
            <SheetTitle>Run settings</SheetTitle>
            <SheetDescription>Update workspace defaults.</SheetDescription>
          </SheetHeader>
          <SheetBody>Settings body</SheetBody>
          <SheetFooter>
            <SheetClose>Cancel</SheetClose>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const sheet = screen.getByRole("dialog", { name: "Run settings" });
    expect(sheet).toHaveAttribute("data-slot", "sheet-content");
    expect(sheet).toHaveAttribute("data-side", "left");
    expect(sheet).toHaveClass("pds-sheet-content", "custom-sheet");
    expect(sheet).toHaveAccessibleDescription("Update workspace defaults.");
    expect(screen.getByText("Run settings")).toHaveAttribute(
      "data-slot",
      "sheet-title"
    );
    expect(screen.getByText("Settings body")).toHaveAttribute(
      "data-slot",
      "sheet-body"
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "sheet-close"
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute(
      "data-slot",
      "sheet-close"
    );
  });

  it("opens and dismisses Sheet through Radix trigger and keyboard behavior", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open settings</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Run settings</SheetTitle>
            <SheetDescription>Update workspace defaults.</SheetDescription>
          </SheetHeader>
          <SheetBody>Settings body</SheetBody>
        </SheetContent>
      </Sheet>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open settings" }));

    const sheet = await screen.findByRole("dialog");
    expect(sheet).toHaveTextContent("Run settings");

    fireEvent.keyDown(sheet, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("wires Drawer direction, handle, content slots, and close controls", () => {
    render(
      <Drawer direction="bottom" noBodyStyles open>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent className="custom-drawer">
          <DrawerHeader>
            <DrawerTitle>Review changes</DrawerTitle>
            <DrawerDescription>Inspect the pending patch.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>
            <DrawerClose>Cancel</DrawerClose>
            <Button>Apply</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    const drawer = screen.getByRole("dialog", { name: "Review changes" });
    expect(document.querySelector('[data-slot="drawer-trigger"]')).toHaveTextContent(
      "Open drawer"
    );
    expect(document.querySelector('[data-slot="drawer-trigger"]')).toHaveAttribute(
      "data-slot",
      "drawer-trigger"
    );
    expect(drawer).toHaveAttribute("data-slot", "drawer-content");
    expect(drawer).toHaveAttribute("data-vaul-drawer-direction", "bottom");
    expect(drawer).toHaveClass("pds-drawer-content", "custom-drawer");
    expect(drawer).toHaveAccessibleDescription("Inspect the pending patch.");
    expect(document.querySelector('[data-slot="drawer-handle"]')).toHaveClass(
      "pds-drawer-handle"
    );
    expect(screen.getByText("Review changes")).toHaveAttribute(
      "data-slot",
      "drawer-title"
    );
    expect(screen.getByText("Drawer body")).toHaveAttribute(
      "data-slot",
      "drawer-body"
    );
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "drawer-close"
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveAttribute(
      "data-slot",
      "drawer-close"
    );
  });

  it("wires Tooltip primitives with accessible content and className", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Details</TooltipTrigger>
          <TooltipContent className="custom-tooltip">Agent status</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByText("Details")).toHaveAttribute(
      "data-slot",
      "tooltip-trigger"
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("Agent status");
    const tooltipContent = document.querySelector(
      '[data-slot="tooltip-content"]'
    );
    expect(tooltipContent).toHaveClass(
      "pds-tooltip-content",
      "custom-tooltip"
    );
    expect(tooltipContent).toHaveTextContent("Agent status");
    expect(document.querySelector('[data-slot="tooltip-arrow"]')).toBeInTheDocument();
  });

  it("keeps Tooltip trigger keyboard focusable", () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Details</TooltipTrigger>
          <TooltipContent showArrow={false}>Agent status</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText("Details");
    trigger.focus();

    expect(trigger).toHaveFocus();
    expect(document.querySelector('[data-slot="tooltip-arrow"]')).not.toBeInTheDocument();
  });

  it("opens Tooltip content from keyboard focus", async () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Details</TooltipTrigger>
          <TooltipContent>Agent status</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    fireEvent.focus(screen.getByRole("button", { name: "Details" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Agent status"
    );
  });

  it("renders HoverCard content, trigger slot, and optional arrow", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <HoverCard open>
        <HoverCardTrigger asChild>
          <Button intent="secondary">Reviewer</Button>
        </HoverCardTrigger>
        <HoverCardContent ref={ref} className="custom-hover-card">
          Reviewer details
        </HoverCardContent>
      </HoverCard>
    );

    expect(screen.getByRole("button", { name: "Reviewer" })).toHaveAttribute(
      "data-slot",
      "hover-card-trigger"
    );
    expect(screen.getByText("Reviewer details")).toHaveAttribute(
      "data-slot",
      "hover-card-content"
    );
    expect(screen.getByText("Reviewer details")).toHaveClass(
      "pds-hover-card-content",
      "custom-hover-card"
    );
    expect(document.querySelector('[data-slot="hover-card-arrow"]')).toBeInTheDocument();
    expect(ref.current).toBe(screen.getByText("Reviewer details"));
  });

  it("renders Collapsible trigger and content state attributes", () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();

    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger ref={triggerRef}>Advanced settings</CollapsibleTrigger>
        <CollapsibleContent ref={contentRef}>Retry controls</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Advanced settings" });
    expect(trigger).toHaveAttribute("data-slot", "collapsible-trigger");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(trigger).toHaveClass("pds-collapsible-trigger");
    expect(triggerRef.current).toBe(trigger);

    const content = screen.getByText("Retry controls");
    expect(content).toHaveAttribute("data-slot", "collapsible-content");
    expect(content).toHaveAttribute("data-state", "open");
    expect(content).toHaveClass("pds-collapsible-content");
    expect(contentRef.current).toBe(content);
  });

  it("renders Accordion item, trigger, content, and disabled state", () => {
    const rootRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLDivElement>();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const contentRef = React.createRef<HTMLDivElement>();

    render(
      <Accordion ref={rootRef} collapsible defaultValue="checks" type="single">
        <AccordionItem ref={itemRef} value="checks">
          <AccordionTrigger ref={triggerRef}>Verification checks</AccordionTrigger>
          <AccordionContent ref={contentRef}>All checks passed.</AccordionContent>
        </AccordionItem>
        <AccordionItem disabled value="archive">
          <AccordionTrigger>Archived details</AccordionTrigger>
          <AccordionContent>Unavailable</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const root = document.querySelector('[data-slot="accordion"]');
    expect(root).toHaveClass("pds-accordion");
    expect(rootRef.current).toBe(root);

    expect(itemRef.current).toHaveAttribute("data-slot", "accordion-item");

    const trigger = screen.getByRole("button", {
      name: "Verification checks"
    });
    expect(trigger).toHaveAttribute("data-slot", "accordion-trigger");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(triggerRef.current).toBe(trigger);
    expect(trigger.querySelector('[data-slot="accordion-trigger-icon"]')).toHaveClass(
      "pds-accordion-trigger-icon"
    );

    const content = screen.getByText("All checks passed.").closest(
      '[data-slot="accordion-content"]'
    );
    expect(content).toHaveAttribute("data-state", "open");
    expect(content).toHaveClass("pds-accordion-content");
    expect(contentRef.current).toBe(content);

    const disabledTrigger = screen.getByRole("button", {
      name: "Archived details"
    });
    expect(disabledTrigger).toBeDisabled();
  });

  it("renders Select slots with density, invalid state, and item content", () => {
    render(
      <Select defaultValue="running" open>
        <SelectTrigger
          aria-label="Run status"
          className="custom-select"
          density="compact"
          invalid
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent showScrollButtons={false}>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectSeparator />
            <SelectItem value="running">Running</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = document.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    expect(trigger).toHaveAttribute("data-density", "compact");
    expect(trigger).toHaveAttribute("data-invalid", "true");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveClass("pds-select-trigger", "custom-select");
    expect(document.querySelector('[data-slot="select-content"]')).toHaveClass(
      "pds-select-content"
    );
    expect(screen.getByText("Status")).toHaveAttribute(
      "data-slot",
      "select-label"
    );
    expect(screen.getByText("Queued").closest('[data-slot="select-item"]')).toHaveClass(
      "pds-select-item"
    );
  });

  it("opens Select from the keyboard with listbox and option semantics", async () => {
    render(
      <Select defaultValue="queued">
        <SelectTrigger aria-label="Run status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="queued">Queued</SelectItem>
          <SelectItem value="running">Running</SelectItem>
          <SelectItem disabled value="cancelled">
            Cancelled
          </SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole("combobox", { name: "Run status" });

    trigger.focus();
    fireEvent.keyDown(trigger, { code: "ArrowDown", key: "ArrowDown" });

    const listbox = await screen.findByRole("listbox");
    expect(listbox).toHaveAttribute("data-slot", "select-content");
    expect(within(listbox).getByText("Queued").closest('[data-slot="select-item"]')).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(within(listbox).getByText("Cancelled").closest('[data-slot="select-item"]')).toHaveAttribute(
      "data-disabled"
    );

    fireEvent.keyDown(listbox, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("renders Checkbox with default and custom indicators", () => {
    const ref = React.createRef<HTMLButtonElement>();

    const { container: defaultContainer } = render(
      <Checkbox
        ref={ref}
        aria-label="Include archived"
        checked="indeterminate"
        className="custom-checkbox"
        invalid
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Include archived" });
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveClass("pds-checkbox", "custom-checkbox");
    expect(ref.current).toBe(checkbox);
    expect(defaultContainer.querySelector('[data-slot="checkbox-indicator"]')).toHaveClass(
      "pds-checkbox-indicator"
    );

    const { container: customContainer } = render(
      <Checkbox aria-label="Custom checkbox" checked>
        <CheckboxIndicator className="custom-indicator" />
      </Checkbox>
    );

    expect(customContainer.querySelector('[data-slot="checkbox-indicator"]')).toHaveClass(
      "pds-checkbox-indicator",
      "custom-indicator"
    );
  });

  it("renders RadioGroup, Switch, and Tabs primitives with state attributes", () => {
    render(
      <>
        <RadioGroup aria-label="Run mode" defaultValue="safe" orientation="horizontal">
          <RadioGroupItem value="safe" aria-label="Safe" />
          <RadioGroupItem value="fast" aria-label="Fast">
            <RadioGroupIndicator className="custom-radio-indicator" />
          </RadioGroupItem>
        </RadioGroup>
        <Switch aria-label="Enable automation" defaultChecked>
          <SwitchThumb className="custom-switch-thumb" />
        </Switch>
        <Tabs defaultValue="runs">
          <TabsList variant="segmented">
            <TabsTrigger value="runs">Runs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="runs">Recent runs</TabsContent>
          <TabsContent value="settings">Settings panel</TabsContent>
        </Tabs>
      </>
    );

    const group = screen.getByRole("radiogroup", { name: "Run mode" });
    expect(group).toHaveAttribute("data-slot", "radio-group");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(screen.getByRole("radio", { name: "Safe" })).toHaveAttribute(
      "data-state",
      "checked"
    );
    expect(document.querySelector('[data-slot="radio-group-indicator"]')).toHaveClass(
      "pds-radio-group-indicator"
    );

    const switchControl = screen.getByRole("switch", {
      name: "Enable automation"
    });
    expect(switchControl).toHaveAttribute("data-slot", "switch");
    expect(switchControl).toHaveAttribute("data-state", "checked");
    expect(document.querySelector('[data-slot="switch-thumb"]')).toHaveClass(
      "pds-switch-thumb",
      "custom-switch-thumb"
    );

    expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "segmented");
    expect(screen.getByRole("tab", { name: "Runs" })).toHaveAttribute(
      "data-state",
      "active"
    );
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "data-slot",
      "tabs-content"
    );
  });

  it("switches Tabs panels through trigger interaction", () => {
    function TabsHarness() {
      const [value, setValue] = React.useState("runs");

      return (
        <Tabs value={value} onValueChange={setValue}>
          <TabsList aria-label="Workspace sections" variant="line">
            <TabsTrigger value="runs">Runs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="runs">Recent runs</TabsContent>
          <TabsContent value="settings">Settings panel</TabsContent>
        </Tabs>
      );
    }

    render(<TabsHarness />);

    const settingsTab = screen.getByRole("tab", { name: "Settings" });

    fireEvent.mouseDown(settingsTab, { button: 0, ctrlKey: false });
    fireEvent.click(settingsTab);

    expect(settingsTab).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Settings panel");
  });

  it("keeps Tabs triggers keyboard focusable", () => {
    render(
      <Tabs defaultValue="runs">
        <TabsList aria-label="Workspace sections" variant="line">
          <TabsTrigger value="runs">Runs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="runs">Recent runs</TabsContent>
        <TabsContent value="settings">Settings panel</TabsContent>
      </Tabs>
    );

    const settingsTab = screen.getByRole("tab", { name: "Settings" });

    settingsTab.focus();

    expect(settingsTab).toHaveFocus();
  });

  it("renders Menu, Popover, and ActionMenu overlay primitives", () => {
    render(
      <>
        <Menu open>
          <MenuTrigger>Open menu</MenuTrigger>
          <MenuContent>
            <MenuLabel>Run actions</MenuLabel>
            <MenuItem>
              Copy <MenuShortcut>⌘C</MenuShortcut>
            </MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem checked>Show archived</MenuCheckboxItem>
            <MenuRadioGroup value="safe">
              <MenuRadioItem value="safe">Safe mode</MenuRadioItem>
            </MenuRadioGroup>
            <MenuItem intent="danger">Delete</MenuItem>
          </MenuContent>
        </Menu>
        <Popover open>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent>
            Popover body
            <PopoverClose>Close popover</PopoverClose>
          </PopoverContent>
        </Popover>
        <ActionMenu open>
          <ActionMenuTrigger>Open actions</ActionMenuTrigger>
          <ActionMenuContent>
            <ActionMenuItem>
              Duplicate <ActionMenuShortcut>D</ActionMenuShortcut>
            </ActionMenuItem>
            <ActionMenuItem intent="danger">Remove</ActionMenuItem>
          </ActionMenuContent>
        </ActionMenu>
      </>
    );

    expect(screen.getByText("Open menu")).toHaveAttribute(
      "data-slot",
      "menu-trigger"
    );
    expect(document.querySelector('[data-slot="menu-content"]')).toHaveClass(
      "pds-menu-content"
    );
    expect(screen.getByText("Copy").closest('[data-slot="menu-item"]')).toHaveAttribute(
      "data-intent",
      "default"
    );
    expect(screen.getByText("⌘C")).toHaveAttribute("data-slot", "menu-shortcut");
    expect(screen.getByText("Show archived")).toHaveAttribute(
      "data-slot",
      "menu-checkbox-item"
    );
    expect(screen.getByText("Safe mode")).toHaveAttribute(
      "data-slot",
      "menu-radio-item"
    );
    expect(screen.getByText("Delete")).toHaveAttribute("data-intent", "danger");

    expect(screen.getByText("Open popover")).toHaveAttribute(
      "data-slot",
      "popover-trigger"
    );
    expect(screen.getByText("Popover body")).toHaveAttribute(
      "data-slot",
      "popover-content"
    );
    expect(screen.getByText("Close popover")).toHaveAttribute(
      "data-slot",
      "popover-close"
    );
    expect(document.querySelector('[data-slot="popover-arrow"]')).toBeInTheDocument();

    expect(screen.getByText("Open actions")).toHaveAttribute(
      "data-slot",
      "action-menu-trigger"
    );
    expect(screen.getByText("Duplicate").closest(
      '[data-slot="action-menu-item"]'
    )).toHaveClass("pds-action-menu-item");
    expect(screen.getByText("D")).toHaveAttribute(
      "data-slot",
      "action-menu-shortcut"
    );
    expect(screen.getByText("Remove")).toHaveAttribute("data-intent", "danger");
  });

  it("renders DropdownMenu, ContextMenu, and Menubar Radix surfaces", async () => {
    render(
      <>
        <DropdownMenu open>
          <DropdownMenuTrigger>Open dropdown</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Dropdown actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Copy dropdown id <DropdownMenuShortcut>D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Include dropdown logs
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="json">
              <DropdownMenuRadioItem value="json">
                JSON export
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSub open>
              <DropdownMenuSubTrigger>Send dropdown to</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Reviewer queue</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem intent="danger">Delete dropdown draft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ContextMenu>
          <ContextMenuTrigger>Context target</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Context actions</ContextMenuLabel>
            <ContextMenuItem>
              Copy context path <ContextMenuShortcut>C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked>
              Include context metadata
            </ContextMenuCheckboxItem>
            <ContextMenuRadioGroup value="summary">
              <ContextMenuRadioItem value="summary">
                Summary format
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSub open>
              <ContextMenuSubTrigger>Open context in</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>New panel</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem intent="danger">Remove context item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <Menubar value="file">
          <MenubarMenu value="file">
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Run file</MenubarLabel>
              <MenubarItem>
                New run <MenubarShortcut>N</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarCheckboxItem checked>Auto save</MenubarCheckboxItem>
              <MenubarRadioGroup value="markdown">
                <MenubarRadioItem value="markdown">Markdown</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSub open>
                <MenubarSubTrigger>Export as</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>PDF</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem intent="danger">Close workspace</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </>
    );

    expect(screen.getByText("Open dropdown")).toHaveAttribute(
      "data-slot",
      "dropdown-menu-trigger"
    );
    expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toHaveClass(
      "pds-dropdown-menu-content"
    );
    expect(screen.getByText("Dropdown actions")).toHaveClass(
      "pds-dropdown-menu-label"
    );
    expect(screen.getByText("D")).toHaveAttribute(
      "data-slot",
      "dropdown-menu-shortcut"
    );
    expect(screen.getByText("Delete dropdown draft")).toHaveAttribute(
      "data-intent",
      "danger"
    );

    const contextTrigger = screen.getByText("Context target");

    fireEvent.contextMenu(contextTrigger);
    await screen.findByText("Context actions");

    expect(contextTrigger).toHaveAttribute(
      "data-slot",
      "context-menu-trigger"
    );
    expect(document.querySelector('[data-slot="context-menu-content"]')).toHaveClass(
      "pds-context-menu-content"
    );
    expect(screen.getByText("Context actions")).toHaveClass(
      "pds-context-menu-label"
    );
    expect(screen.getByText("C")).toHaveAttribute(
      "data-slot",
      "context-menu-shortcut"
    );
    expect(screen.getByText("Remove context item")).toHaveAttribute(
      "data-intent",
      "danger"
    );

    expect(document.querySelector('[data-slot="menubar"]')).toHaveClass(
      "pds-menubar"
    );
    expect(screen.getByText("File")).toHaveClass("pds-menubar-trigger");
    expect(document.querySelector('[data-slot="menubar-content"]')).toHaveClass(
      "pds-menubar-content"
    );
    expect(screen.getByText("Run file")).toHaveClass("pds-menubar-label");
    expect(screen.getByText("N")).toHaveAttribute(
      "data-slot",
      "menubar-shortcut"
    );
    expect(screen.getByText("Close workspace")).toHaveAttribute(
      "data-intent",
      "danger"
    );
  });

  it("renders Command palette anatomy with searchable items and dialog metadata", () => {
    const commandRef = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    const selectHandler = vi.fn();

    render(
      <>
        <Command ref={commandRef} label="Workspace commands" value="open-run">
          <CommandInput
            ref={inputRef}
            aria-label="Search workspace commands"
            placeholder="Search commands"
          />
          <CommandList>
            <CommandEmpty>No commands found</CommandEmpty>
            <CommandGroup heading="Workspace">
              <CommandItem
                data-checked="true"
                onSelect={selectHandler}
                value="open-run"
              >
                Open run
                <CommandShortcut>Enter</CommandShortcut>
              </CommandItem>
              <CommandSeparator />
              <CommandItem disabled value="archive-run">
                Archive run
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <CommandDialog open title="Quick actions">
          <Command label="Dialog commands">
            <CommandInput aria-label="Search quick actions" />
            <CommandList>
              <CommandItem value="copy">Copy link</CommandItem>
            </CommandList>
          </Command>
        </CommandDialog>
      </>
    );

    expect(commandRef.current).toHaveAttribute("data-slot", "command");
    expect(commandRef.current).toHaveClass("pds-command");
    expect(inputRef.current).toHaveAttribute("data-slot", "command-input");
    expect(inputRef.current).toHaveClass("pds-command-input");
    expect(screen.getByText("Workspace")).toHaveAttribute(
      "cmdk-group-heading"
    );
    expect(screen.getByText("Open run").closest('[data-slot="command-item"]')).toHaveAttribute(
      "data-checked",
      "true"
    );
    expect(screen.getByText("Enter")).toHaveAttribute(
      "data-slot",
      "command-shortcut"
    );
    expect(document.querySelector('[data-slot="command-separator"]')).toHaveClass(
      "pds-command-separator"
    );
    expect(screen.getByText("Archive run")).toHaveAttribute(
      "data-disabled",
      "true"
    );
    expect(screen.getByRole("dialog", { name: "Quick actions" })).toHaveClass(
      "pds-command-dialog-content"
    );
  });

  it("renders Combobox input, popup, collection slots, and multiselect chips", async () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const chipsRef = React.createRef<HTMLDivElement>();

    render(
      <>
        <Combobox defaultValue="router" open>
          <ComboboxInput
            ref={inputRef}
            aria-label="Component route"
            placeholder="Choose route"
            showClear
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxLabel>Routes</ComboboxLabel>
                <ComboboxItem value="router">Router</ComboboxItem>
                <ComboboxSeparator />
                <ComboboxCollection>
                  {() => <ComboboxItem value="workflow">Workflow</ComboboxItem>}
                </ComboboxCollection>
                <ComboboxEmpty>No routes found</ComboboxEmpty>
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Combobox defaultValue={["agent"]} multiple>
          <ComboboxChips ref={chipsRef}>
            <ComboboxChip>Agent</ComboboxChip>
            <ComboboxChipsInput aria-label="Add owner" />
          </ComboboxChips>
          <ComboboxTrigger>
            <ComboboxValue placeholder="Owners" />
          </ComboboxTrigger>
          <ComboboxClear />
        </Combobox>
      </>
    );

    const comboboxInput = screen.getByRole("combobox", {
      name: "Component route"
    });
    expect(comboboxInput).toHaveClass("pds-combobox-input");
    expect(inputRef.current).toBe(comboboxInput);
    expect(document.querySelector('[data-slot="combobox-content"]')).toHaveClass(
      "pds-combobox-content"
    );
    expect(screen.getByText("Routes")).toHaveAttribute(
      "data-slot",
      "combobox-label"
    );
    expect(screen.getByText("Router")).toHaveAttribute(
      "data-slot",
      "combobox-item"
    );
    expect(document.querySelector('[data-slot="combobox-separator"]')).toHaveClass(
      "pds-combobox-separator"
    );
    expect(document.querySelector('[data-slot="combobox-clear"]')).toHaveClass(
      "pds-combobox-clear"
    );
    expect(chipsRef.current).toHaveAttribute("data-slot", "combobox-chips");
    expect(screen.getByText("Agent")).toHaveAttribute(
      "data-slot",
      "combobox-chip"
    );
    expect(screen.getByLabelText("Add owner")).toHaveAttribute(
      "data-slot",
      "combobox-chip-input"
    );
    expect(screen.getByText("agent")).toBeInTheDocument();
  });

  it("opens and dismisses Menu from the trigger with menu roles", async () => {
    render(
      <Menu>
        <MenuTrigger>Run actions</MenuTrigger>
        <MenuContent>
          <MenuItem>Copy run id</MenuItem>
          <MenuItem disabled>Archive run</MenuItem>
        </MenuContent>
      </Menu>
    );

    const trigger = screen.getByRole("button", { name: "Run actions" });

    fireEvent.pointerDown(trigger, {
      button: 0,
      ctrlKey: false,
      pointerType: "mouse"
    });

    const menu = await screen.findByRole("menu");
    expect(screen.getByRole("menuitem", { name: "Copy run id" })).toHaveAttribute(
      "data-slot",
      "menu-item"
    );
    expect(screen.getByRole("menuitem", { name: "Archive run" })).toHaveAttribute(
      "data-disabled"
    );

    fireEvent.keyDown(menu, { code: "Escape", key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("opens and closes Popover while preserving trigger focus", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open filters</PopoverTrigger>
        <PopoverContent>
          Filter controls
          <PopoverClose>Close filters</PopoverClose>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Open filters" });

    trigger.focus();
    fireEvent.click(trigger);

    expect(await screen.findByText("Filter controls")).toHaveAttribute(
      "data-slot",
      "popover-content"
    );

    fireEvent.click(screen.getByRole("button", { name: "Close filters" }));

    await waitFor(() => {
      expect(screen.queryByText("Filter controls")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("renders Skeleton, Progress, and InlineAlert feedback primitives", () => {
    render(
      <>
        <Skeleton className="custom-skeleton" shape="text" />
        <Progress aria-label="Run progress" value={40}>
          <ProgressIndicator className="custom-progress-indicator" />
        </Progress>
        <InlineAlert className="custom-alert" tone="danger">
          <InlineAlertTitle>Run failed</InlineAlertTitle>
          <InlineAlertDescription>Credentials expired.</InlineAlertDescription>
          <InlineAlertActions>
            <Button>Reconnect</Button>
          </InlineAlertActions>
        </InlineAlert>
      </>
    );

    expect(document.querySelector('[data-slot="skeleton"]')).toHaveAttribute(
      "data-shape",
      "text"
    );
    expect(document.querySelector('[data-slot="skeleton"]')).toHaveClass(
      "pds-skeleton",
      "custom-skeleton"
    );

    const progress = screen.getByRole("progressbar", { name: "Run progress" });
    expect(progress).toHaveAttribute("data-slot", "progress");
    expect(progress).toHaveStyle({ "--pds-progress-value": "40%" });
    expect(document.querySelector('[data-slot="progress-indicator"]')).toHaveClass(
      "pds-progress-indicator",
      "custom-progress-indicator"
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-tone", "danger");
    expect(alert).toHaveClass("pds-inline-alert", "custom-alert");
    expect(screen.getByText("Run failed")).toHaveAttribute(
      "data-slot",
      "inline-alert-title"
    );
    expect(screen.getByText("Credentials expired.")).toHaveAttribute(
      "data-slot",
      "inline-alert-description"
    );
    expect(screen.getByRole("button", { name: "Reconnect" }).closest(
      '[data-slot="inline-alert-actions"]'
    )).toHaveClass("pds-inline-alert-actions");
  });

  it("renders Table and DataList semantic data primitives", () => {
    render(
      <>
        <TableContainer className="custom-table-container">
          <Table density="compact">
            <TableCaption>Runs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Running</TableCell>
                <TableCell>Agent</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DataList density="compact">
          <DataListItem>
            <DataListTerm>Run ID</DataListTerm>
            <DataListDescription>run_123</DataListDescription>
          </DataListItem>
        </DataList>
      </>
    );

    expect(screen.getByText("Runs")).toHaveAttribute("data-slot", "table-caption");
    expect(screen.getByRole("table")).toHaveAttribute("data-density", "compact");
    expect(screen.getByText("Status")).toHaveAttribute("data-slot", "table-head");
    expect(screen.getByText("Running")).toHaveAttribute("data-slot", "table-cell");
    expect(document.querySelector('[data-slot="table-container"]')).toHaveClass(
      "pds-table-container",
      "custom-table-container"
    );

    expect(screen.getByText("Run ID")).toHaveAttribute(
      "data-slot",
      "data-list-term"
    );
    expect(screen.getByText("run_123")).toHaveAttribute(
      "data-slot",
      "data-list-description"
    );
    expect(document.querySelector('[data-slot="data-list"]')).toHaveAttribute(
      "data-density",
      "compact"
    );
  });

  it("renders Label and Field form grouping primitives", () => {
    const labelRef = React.createRef<HTMLLabelElement>();
    const standaloneLabelRef = React.createRef<HTMLLabelElement>();

    render(
      <>
        <Label ref={standaloneLabelRef} htmlFor="standalone-label">
          Standalone label
        </Label>
        <Input id="standalone-label" />
        <FieldSet disabled>
          <FieldLegend>Run settings</FieldLegend>
          <FieldGroup>
            <Field disabled invalid orientation="horizontal">
              <FieldLabel ref={labelRef} htmlFor="run-name">
                Run name
              </FieldLabel>
              <FieldContent>
                <Input id="run-name" invalid defaultValue="Nightly analysis" />
                <FieldDescription>
                  Visible labels and descriptions stay outside placeholders.
                </FieldDescription>
                <FieldError
                  errors={[
                    { message: "Run name is required." },
                    { message: "Run name is required." }
                  ]}
                />
              </FieldContent>
            </Field>
            <FieldSeparator>Advanced</FieldSeparator>
            <Field>
              <FieldTitle>Model routing</FieldTitle>
              <FieldContent>
                <FieldDescription>Uses the workspace default.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>
      </>
    );

    expect(screen.getByText("Standalone label")).toHaveAttribute(
      "data-slot",
      "label"
    );
    expect(standaloneLabelRef.current).toBe(screen.getByText("Standalone label"));
    expect(screen.getByText("Run settings")).toHaveAttribute(
      "data-slot",
      "field-legend"
    );
    expect(screen.getByText("Run name")).toHaveAttribute(
      "data-slot",
      "field-label"
    );
    expect(labelRef.current).toBe(screen.getByText("Run name"));

    const invalidField = document.querySelector('[data-slot="field"]');
    expect(invalidField).toHaveAttribute("role", "group");
    expect(invalidField).toHaveAttribute("data-orientation", "horizontal");
    expect(invalidField).toHaveAttribute("data-disabled", "true");
    expect(invalidField).toHaveAttribute("data-invalid", "true");
    expect(invalidField).toHaveAttribute("aria-invalid", "true");

    expect(screen.getByRole("textbox", { name: "Run name" })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Run name is required.");
    expect(screen.getByRole("alert").textContent).toBe("Run name is required.");
    expect(screen.getByText("Advanced")).toHaveAttribute(
      "data-slot",
      "field-separator-content"
    );
    expect(screen.getByText("Model routing")).toHaveAttribute(
      "data-slot",
      "field-title"
    );
  });

  it("renders Kbd shortcuts with grouped semantics and forwarded refs", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <KbdGroup aria-label="Shortcut">
        <Kbd ref={ref}>Cmd</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    );

    expect(screen.getByLabelText("Shortcut")).toHaveAttribute(
      "data-slot",
      "kbd-group"
    );
    expect(screen.getByText("Cmd")).toHaveAttribute("data-slot", "kbd");
    expect(screen.getByText("K")).toHaveClass("pds-kbd");
    expect(ref.current).toBe(screen.getByText("Cmd"));
  });

  it("renders Separator orientation and decorative behavior", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <>
        <Separator />
        <Separator ref={ref} decorative={false} orientation="vertical" />
      </>
    );

    const decorative = container.querySelector(
      '[data-slot="separator"][data-orientation="horizontal"]'
    );
    expect(decorative).toHaveAttribute("role", "none");

    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("data-slot", "separator");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
    expect(separator).toHaveClass("pds-separator");
    expect(ref.current).toBe(separator);
  });

  it("provides direction context with the direction alias prop", () => {
    function DirectionValue() {
      const direction = useDirection();

      return <span data-testid="direction-value">{direction}</span>;
    }

    render(
      <DirectionProvider direction="rtl">
        <DirectionValue />
      </DirectionProvider>
    );

    expect(screen.getByTestId("direction-value")).toHaveTextContent("rtl");
  });

  it("renders Resizable panes and handle anatomy", () => {
    const groupRef = React.createRef<HTMLDivElement>();
    const panelRef = React.createRef<HTMLDivElement>();
    const handleRef = React.createRef<HTMLDivElement>();

    render(
      <ResizablePanelGroup
        ref={groupRef}
        defaultLayout={{ details: 40, transcript: 60 }}
        id="run-layout"
      >
        <ResizablePanel ref={panelRef} id="transcript" minSize="30%">
          Transcript
        </ResizablePanel>
        <ResizableHandle ref={handleRef} withHandle />
        <ResizablePanel id="details" minSize="20%">
          Details
        </ResizablePanel>
      </ResizablePanelGroup>
    );

    const group = document.querySelector('[data-slot="resizable-panel-group"]');
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).toHaveClass("pds-resizable-panel-group");
    expect(groupRef.current).toBe(group);

    const panels = document.querySelectorAll('[data-slot="resizable-panel"]');
    expect(panels).toHaveLength(2);
    expect(screen.getByText("Transcript").closest(".pds-resizable-panel")).toHaveClass(
      "pds-resizable-panel"
    );
    expect(panelRef.current).toBe(panels[0]);

    const handle = screen.getByRole("separator");
    expect(handle).toHaveAttribute("data-slot", "resizable-handle");
    expect(handle).toHaveClass("pds-resizable-handle");
    expect(handle.querySelector('[data-slot="resizable-handle-grip"]')).toHaveClass(
      "pds-resizable-handle-grip"
    );
    expect(handleRef.current).toBe(handle);
  });

  it("renders Empty state anatomy with icon media and long content", () => {
    const ref = React.createRef<HTMLDivElement>();
    const longDescription =
      "No generated artifacts match the current filter for this unusually long workspace branch name.";

    render(
      <Empty ref={ref}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon name="search" />
          </EmptyMedia>
          <EmptyTitle>No runs found</EmptyTitle>
          <EmptyDescription>{longDescription}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button intent="secondary">Clear filters</Button>
        </EmptyContent>
      </Empty>
    );

    expect(screen.getByText("No runs found").parentElement).toHaveAttribute(
      "data-slot",
      "empty-header"
    );
    expect(screen.getByText("No runs found")).toHaveAttribute(
      "data-slot",
      "empty-title"
    );
    expect(screen.getByText(longDescription)).toHaveAttribute(
      "data-slot",
      "empty-description"
    );
    expect(screen.getByText("Clear filters").parentElement).toHaveAttribute(
      "data-slot",
      "empty-content"
    );
    expect(document.querySelector('[data-slot="empty-media"]')).toHaveAttribute(
      "data-variant",
      "icon"
    );
    expect(ref.current).toHaveAttribute("data-slot", "empty");
  });

  it("renders Spinner status and decorative states", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = render(
      <>
        <Spinner ref={ref} label="Loading runs" size="lg" />
        <Spinner decorative size="sm" />
      </>
    );

    const spinner = screen.getByRole("status", { name: "Loading runs" });
    expect(spinner).toHaveAttribute("data-slot", "spinner");
    expect(spinner).toHaveAttribute("data-size", "lg");
    expect(spinner).toHaveClass("pds-spinner");
    expect(ref.current).toBe(spinner);

    const decorative = container.querySelector(
      '[data-slot="spinner"][aria-hidden="true"]'
    );
    expect(decorative).toHaveAttribute("data-size", "sm");
    expect(decorative).not.toHaveAttribute("role");
  });

  it("renders AspectRatio with fit metadata and forwarded refs", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <AspectRatio ref={ref} fit="contain" ratio={16 / 9}>
        <img alt="Generated run preview" src="/preview.png" />
      </AspectRatio>
    );

    expect(screen.getByAltText("Generated run preview").parentElement).toHaveAttribute(
      "data-slot",
      "aspect-ratio"
    );
    expect(ref.current).toHaveAttribute("data-fit", "contain");
  });

  it("renders ScrollArea root, viewport, scrollbar, and thumb slots", () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <ScrollArea
        ref={ref}
        className="custom-scroll-area"
        style={{ height: "40px" }}
        type="always"
        viewportProps={{
          "aria-label": "Activity",
          className: "custom-scroll-viewport",
          tabIndex: 0
        }}
      >
        <p>Run activity</p>
      </ScrollArea>
    );

    const scrollArea = container.querySelector('[data-slot="scroll-area"]');
    expect(scrollArea).toHaveClass("pds-scroll-area", "custom-scroll-area");
    expect(ref.current).toBe(scrollArea);

    const viewport = screen.getByLabelText("Activity");
    expect(viewport).toHaveAttribute("data-slot", "scroll-area-viewport");
    expect(viewport).toHaveClass(
      "pds-scroll-area-viewport",
      "custom-scroll-viewport"
    );
    expect(container.querySelector('[data-slot="scroll-area-scrollbar"]')).toHaveClass(
      "pds-scroll-area-scrollbar"
    );
    expect(container.querySelector('[data-slot="scroll-area-thumb"]')).toHaveClass(
      "pds-scroll-area-thumb"
    );
    expect(ScrollBar).toBeDefined();
  });

  it("renders NativeSelect with options, groups, invalid state, and refs", () => {
    const ref = React.createRef<HTMLSelectElement>();

    render(
      <NativeSelect
        ref={ref}
        aria-label="Model routing"
        className="custom-native-select"
        defaultValue="balanced"
        invalid
        size="sm"
      >
        <NativeSelectOptGroup label="Recommended">
          <NativeSelectOption value="balanced">Balanced</NativeSelectOption>
          <NativeSelectOption value="fast">Fast</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    );

    const select = screen.getByRole("combobox", { name: "Model routing" });
    expect(select).toHaveAttribute("data-slot", "native-select");
    expect(select).toHaveAttribute("data-size", "sm");
    expect(select).toHaveAttribute("data-invalid", "true");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveClass("pds-native-select", "custom-native-select");
    expect(ref.current).toBe(select);
    expect(document.querySelector('[data-slot="native-select-wrapper"]')).toHaveClass(
      "pds-native-select-wrapper"
    );
    expect(document.querySelector('[data-slot="native-select-icon"]')).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.getByText("Balanced")).toHaveAttribute(
      "data-slot",
      "native-select-option"
    );
    expect(document.querySelector('[data-slot="native-select-optgroup"]')).toHaveAttribute(
      "label",
      "Recommended"
    );
  });

  it("renders Slider thumbs from default values and orientation", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = render(
      <Slider
        ref={ref}
        aria-label="Confidence range"
        defaultValue={[20, 80]}
        orientation="vertical"
        thumbLabel="Confidence bound"
      />
    );

    const slider = container.querySelector('[data-slot="slider"]');
    expect(slider).toHaveClass("pds-slider");
    expect(slider).toHaveAttribute("data-orientation", "vertical");
    expect(ref.current).toBe(slider);
    expect(container.querySelector('[data-slot="slider-track"]')).toHaveClass(
      "pds-slider-track"
    );
    expect(container.querySelector('[data-slot="slider-range"]')).toHaveClass(
      "pds-slider-range"
    );
    expect(container.querySelectorAll('[data-slot="slider-thumb"]')).toHaveLength(2);
    expect(screen.getByLabelText("Confidence bound 1")).toHaveAttribute(
      "role",
      "slider"
    );
  });

  it("renders Toggle states, invalid mapping, and forwarded refs", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <Toggle
        ref={ref}
        aria-label="Show archived"
        defaultPressed
        invalid
        size="icon"
        variant="outline"
      >
        <Icon name="inventory_2" />
      </Toggle>
    );

    const toggle = screen.getByRole("button", { name: "Show archived" });
    expect(toggle).toHaveAttribute("data-slot", "toggle");
    expect(toggle).toHaveAttribute("data-size", "icon");
    expect(toggle).toHaveAttribute("data-variant", "outline");
    expect(toggle).toHaveAttribute("data-invalid", "true");
    expect(toggle).toHaveAttribute("aria-invalid", "true");
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(ref.current).toBe(toggle);

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("data-state", "off");
  });

  it("renders ToggleGroup with shared item metadata", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <ToggleGroup
        ref={ref}
        aria-label="View mode"
        defaultValue="preview"
        size="sm"
        spacing="separated"
        type="single"
        variant="outline"
      >
        <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
        <ToggleGroupItem value="code">Code</ToggleGroupItem>
      </ToggleGroup>
    );

    const group = screen.getByRole("group", { name: "View mode" });
    expect(group).toHaveAttribute("data-slot", "toggle-group");
    expect(group).toHaveAttribute("data-size", "sm");
    expect(group).toHaveAttribute("data-spacing", "separated");
    expect(group).toHaveAttribute("data-variant", "outline");
    expect(ref.current).toBe(group);

    const preview = screen.getByRole("radio", { name: "Preview" });
    const code = screen.getByRole("radio", { name: "Code" });
    expect(preview).toHaveAttribute("data-slot", "toggle-group-item");
    expect(preview).toHaveAttribute("data-size", "sm");
    expect(preview).toHaveAttribute("data-variant", "outline");
    expect(preview).toHaveAttribute("data-spacing", "separated");
    expect(preview).toHaveAttribute("data-state", "on");
    expect(code).toHaveAttribute("data-state", "off");
  });

  it("renders Breadcrumbs and Pagination navigation primitives", () => {
    render(
      <>
        <Breadcrumb aria-label="Project breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/workspaces">Workspaces</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Imported run packet</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Breadcrumbs>
          <BreadcrumbsList>
            <BreadcrumbsItem>
              <BreadcrumbsLink href="/runs">Runs</BreadcrumbsLink>
              <BreadcrumbsSeparator />
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbsEllipsis />
              <BreadcrumbsSeparator />
            </BreadcrumbsItem>
            <BreadcrumbsItem>
              <BreadcrumbsPage>Run 123</BreadcrumbsPage>
            </BreadcrumbsItem>
          </BreadcrumbsList>
        </Breadcrumbs>
        <Pagination>
          <PaginationList>
            <PaginationItem>
              <PaginationPrevious href="?page=1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=2" isCurrent>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="?page=3" />
            </PaginationItem>
          </PaginationList>
        </Pagination>
      </>
    );

    expect(
      screen.getByRole("navigation", { name: "Project breadcrumb" })
    ).toHaveAttribute("data-slot", "breadcrumb");
    expect(
      screen.getByRole("link", { name: "Workspaces" })
    ).toHaveAttribute("data-slot", "breadcrumb-link");
    expect(screen.getByText("Imported run packet")).toHaveAttribute(
      "data-slot",
      "breadcrumb-page"
    );
    expect(screen.getByText("Imported run packet")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getAllByLabelText("More pages")[0]).toHaveAttribute(
      "data-slot",
      "breadcrumb-ellipsis"
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveAttribute(
      "data-slot",
      "breadcrumbs"
    );
    expect(screen.getByRole("link", { name: "Runs" })).toHaveAttribute(
      "data-slot",
      "breadcrumbs-link"
    );
    expect(screen.getByText("Run 123")).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByLabelText("More pages")[1]).toHaveAttribute(
      "data-slot",
      "breadcrumbs-ellipsis"
    );

    expect(screen.getByRole("navigation", { name: "Pagination" })).toHaveAttribute(
      "data-slot",
      "pagination"
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "data-slot",
      "pagination-previous"
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "data-slot",
      "pagination-next"
    );
  });

  it("renders NavigationMenu trigger, content, links, indicator, and viewport", () => {
    render(
      <>
        <NavigationMenu value="workspace">
          <NavigationMenuList>
            <NavigationMenuItem value="workspace">
              <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/runs">
                  Runs dashboard
                </NavigationMenuLink>
                <NavigationMenuLink active href="/settings">
                  Settings
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator forceMount />
        </NavigationMenu>
        <NavigationMenu viewport={false} value="docs">
          <NavigationMenuList>
            <NavigationMenuItem value="docs">
              <NavigationMenuTrigger className="custom-navigation-trigger">
                Docs
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/docs">
                  Component contracts
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </>
    );

    expect(document.querySelector('[data-slot="navigation-menu"]')).toHaveClass(
      "pds-navigation-menu"
    );
    expect(screen.getByRole("button", { name: /Workspace/ })).toHaveClass(
      "pds-navigation-menu-trigger"
    );
    expect(screen.getByText("Runs dashboard")).toHaveAttribute(
      "data-slot",
      "navigation-menu-link"
    );
    expect(screen.getByText("Settings")).toHaveAttribute("data-active");
    expect(NavigationMenuIndicator).toBeDefined();
    expect(
      document.querySelector('[data-slot="navigation-menu-viewport"]')
    ).toHaveClass("pds-navigation-menu-viewport");
    expect(screen.getByRole("button", { name: /Docs/ })).toHaveClass(
      "custom-navigation-trigger"
    );
    expect(navigationMenuTriggerStyle("custom")).toContain(
      "pds-navigation-menu-trigger"
    );
  });
});
