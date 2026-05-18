import type { Story, StoryDefault } from "@ladle/react";
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@pds/react";

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

type OverlayKind = "dialog" | "bottomSheet" | "popover" | "tooltip";

export default {
  title: "Overlays"
} satisfies StoryDefault;

function DialogExample({ open }: { open?: boolean }) {
  const rootProps = open === undefined ? {} : { open };

  return (
    <Dialog modal={false} {...rootProps}>
      <DialogTrigger asChild>
        <Button intent="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve generated change</DialogTitle>
          <DialogDescription>{longBody}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button intent="secondary">Cancel</Button>
          </DialogClose>
          <Button>Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BottomSheetExample({ open }: { open?: boolean }) {
  const rootProps = open === undefined ? {} : { open };

  return (
    <BottomSheet modal={false} {...rootProps}>
      <BottomSheetTrigger asChild>
        <Button intent="secondary">Open sheet</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Review generated artifact</BottomSheetTitle>
          <BottomSheetDescription>{longBody}</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetBody>
          <p className="visual-lab-note">{longBody}</p>
        </BottomSheetBody>
        <BottomSheetFooter>
          <BottomSheetClose asChild>
            <Button intent="secondary">Dismiss</Button>
          </BottomSheetClose>
          <Button>Continue</Button>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
}

function PopoverExample({ open = true }: { open?: boolean }) {
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button intent="secondary">Inspect</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Stack>
          <strong>Tool details</strong>
          <p className="visual-lab-note">{longBody}</p>
          <PopoverClose asChild>
            <Button size="sm">Close</Button>
          </PopoverClose>
        </Stack>
      </PopoverContent>
    </Popover>
  );
}

function TooltipExample({ open = true }: { open?: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <Button intent="quiet">Explain</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          This state is visible in the generated visual lab.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function OverlayByKind({ kind, open }: { kind: OverlayKind; open: boolean }) {
  if (kind === "dialog") {
    return <DialogExample open={open} />;
  }

  if (kind === "bottomSheet") {
    return <BottomSheetExample open={open} />;
  }

  if (kind === "tooltip") {
    return <TooltipExample open={open} />;
  }

  return <PopoverExample open={open} />;
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Overlay primitives for modal, sheet, popover, and tooltip surfaces."
    surface={surface}
    title="Overlays"
  >
    <StateMatrix>
      <MatrixItem label="Dialog trigger">
        <DialogExample />
      </MatrixItem>
      <MatrixItem label="BottomSheet trigger">
        <BottomSheetExample />
      </MatrixItem>
      <MatrixItem label="Popover open">
        <PopoverExample />
      </MatrixItem>
      <MatrixItem label="Tooltip open">
        <TooltipExample />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  kind: OverlayKind;
  open: boolean;
  surface: StorySurface;
}> = ({ kind, open, surface }) => (
  <StoryFrame
    description="Switch overlay type and open state. Modal variants are iframed by Ladle for isolation."
    surface={surface}
    title="Overlay controls"
  >
    <StateMatrix>
      <MatrixItem label="Controlled overlay">
        <OverlayByKind kind={kind} open={open} />
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  kind: "popover",
  open: true,
  surface: "grouped"
};
Controls.argTypes = {
  kind: {
    control: { type: "select" },
    options: ["dialog", "bottomSheet", "popover", "tooltip"]
  },
  open: { control: { type: "boolean" } },
  ...surfaceArgTypes
};
Controls.meta = {
  iframed: true
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Long overlay content must remain readable and keep actions visible."
    surface={surface}
    title="Overlay resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow popover">
        <NarrowFrame>
          <PopoverExample />
          <TooltipExample />
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Modal long copy">
        <Stack>
          <Row>
            <DialogExample open />
            <BottomSheetExample />
          </Row>
          <p className="visual-lab-note">
            The open dialog verifies modal content and footer resilience.
          </p>
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Resilience.args = {
  surface: "grouped"
};
Resilience.argTypes = surfaceArgTypes;
Resilience.meta = {
  iframed: true
};
