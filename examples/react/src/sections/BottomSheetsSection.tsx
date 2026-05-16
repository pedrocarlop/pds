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
  Surface,
  SurfaceContent,
  SurfaceDescription,
  SurfaceHeader,
  SurfaceTitle
} from "pds";

export function BottomSheetsSection() {
  return (
    <section className="examples-section" aria-labelledby="bottom-sheets-title">
      <div className="examples-section-heading">
        <h2 id="bottom-sheets-title">BottomSheet</h2>
        <p>
          Bottom-attached modal review with named content, fixed actions, and a
          scrollable body for agreement-style flows.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Agreement review</h3>
          <Surface level="nested">
            <SurfaceHeader>
              <SurfaceTitle>Platform services agreement</SurfaceTitle>
              <SurfaceDescription>Version 4.2 - Spain - Required</SurfaceDescription>
            </SurfaceHeader>
            <SurfaceContent>
              <p className="examples-body-copy">
                The accept action stays outside the document body so it remains
                reachable while the document scrolls.
              </p>
            </SurfaceContent>
          </Surface>
          <BottomSheet>
            <BottomSheetTrigger asChild>
              <Button>Review agreement</Button>
            </BottomSheetTrigger>
            <BottomSheetContent>
              <BottomSheetHeader>
                <BottomSheetTitle>Platform services agreement</BottomSheetTitle>
                <BottomSheetDescription>
                  Version 4.2 - Spain - Updated May 2026
                </BottomSheetDescription>
              </BottomSheetHeader>
              <BottomSheetBody>
                <div className="examples-document-copy">
                  {Array.from({ length: 7 }, (_, index) => (
                    <p key={index}>
                      Section {index + 1}: agreement copy can include long
                      translated paragraphs, jurisdiction-specific terms, and
                      audit-relevant version details that must remain readable.
                    </p>
                  ))}
                </div>
              </BottomSheetBody>
              <BottomSheetFooter>
                <BottomSheetClose asChild>
                  <Button intent="secondary">Cancel</Button>
                </BottomSheetClose>
                <BottomSheetClose asChild>
                  <Button>Accept agreement</Button>
                </BottomSheetClose>
              </BottomSheetFooter>
            </BottomSheetContent>
          </BottomSheet>
        </div>

        <div className="examples-panel examples-panel-narrow">
          <h3>Narrow trigger layout</h3>
          <div className="examples-narrow-frame">
            <BottomSheet>
              <BottomSheetTrigger asChild>
                <Button intent="secondary">
                  Open a bottom sheet from a compact agreement row
                </Button>
              </BottomSheetTrigger>
              <BottomSheetContent>
                <BottomSheetHeader>
                  <BottomSheetTitle>Compact source layout</BottomSheetTitle>
                  <BottomSheetDescription>
                    The sheet stays viewport constrained and keeps actions
                    reachable.
                  </BottomSheetDescription>
                </BottomSheetHeader>
                <BottomSheetBody>
                  <p>
                    Content wraps inside the sheet body and can grow without
                    pushing the footer out of reach.
                  </p>
                </BottomSheetBody>
                <BottomSheetFooter>
                  <BottomSheetClose asChild>
                    <Button>Done</Button>
                  </BottomSheetClose>
                </BottomSheetFooter>
              </BottomSheetContent>
            </BottomSheet>
          </div>
        </div>
      </div>
    </section>
  );
}
