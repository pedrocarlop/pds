import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@pds/react";

export function DialogsSection() {
  return (
    <section className="examples-section" aria-labelledby="dialogs-title">
      <div className="examples-section-heading">
        <h2 id="dialogs-title">Dialog</h2>
        <p>
          Trigger, title, description, scrollable long content, footer actions,
          destructive confirmation, and narrow trigger layout.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Basic dialog</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Review agent run</DialogTitle>
                <DialogDescription>
                  Confirm the generated output before publishing it.
                </DialogDescription>
              </DialogHeader>
              <p className="examples-body-copy">
                This dialog uses the public PDS dialog slots and regular app
                markup for body content.
              </p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button intent="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Approve</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="examples-panel">
          <h3>Destructive confirmation</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button intent="danger">Delete run</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete this run?</DialogTitle>
                <DialogDescription>
                  This action removes the run from the review queue.
                </DialogDescription>
              </DialogHeader>
              <p className="examples-body-copy">
                Destructive intent comes from the existing Button primitive, not
                a dialog-specific API.
              </p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button intent="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button intent="danger">Delete run</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="examples-panel">
          <h3>Long content</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button intent="secondary">Open long dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Long generated review context that may wrap across multiple
                  lines
                </DialogTitle>
                <DialogDescription>
                  The content area scrolls when there is more information than
                  the viewport can comfortably show.
                </DialogDescription>
              </DialogHeader>
              <div className="examples-dialog-long-copy">
                {Array.from({ length: 8 }, (_, index) => (
                  <p key={index}>
                    Review note {index + 1}: generated output can include long
                    translated strings, pasted logs, detailed rationale, and
                    user-authored context that needs to remain readable.
                  </p>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button intent="secondary">Close</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Continue</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="examples-panel examples-panel-narrow">
          <h3>Narrow trigger layout</h3>
          <div className="examples-narrow-frame">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  Open dialog from a narrow layout with a longer trigger label
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Narrow source layout</DialogTitle>
                  <DialogDescription>
                    The modal remains viewport constrained even when opened from
                    a compact area.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Done</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
