import {
  Button,
  Badge,
  Surface,
  SurfaceAction,
  SurfaceContent,
  SurfaceDescription,
  SurfaceFooter,
  SurfaceHeader,
  SurfaceTitle
} from "pds";

export function SurfacesSection() {
  return (
    <section className="examples-section" aria-labelledby="surfaces-title">
      <div className="examples-section-heading">
        <h2 id="surfaces-title">Surface</h2>
        <p>
          Structural layout slots, long copy, wrapping actions, and nested
          surfaces using the public composition primitives.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel examples-panel-wide">
          <h3>Header, content, and footer</h3>
          <Surface level="elevated">
            <SurfaceHeader>
              <SurfaceTitle>Agent run summary</SurfaceTitle>
              <SurfaceDescription>
                Review status, recent tool output, and the next action.
              </SurfaceDescription>
              <SurfaceAction>
                <Button size="sm">Refresh</Button>
              </SurfaceAction>
            </SurfaceHeader>
            <SurfaceContent>
              <div className="examples-surface-content">
                <Badge tone="success">Ready</Badge>
                <p>
                  The run completed with two tool calls and one generated
                  artifact ready for review.
                </p>
              </div>
            </SurfaceContent>
            <SurfaceFooter>
              <Button intent="secondary">Open details</Button>
              <Button>Approve</Button>
            </SurfaceFooter>
          </Surface>
        </div>

        <div className="examples-panel">
          <h3>Long title and description</h3>
          <Surface>
            <SurfaceHeader>
              <SurfaceTitle>
                Very long generated surface title that should wrap without
                clipping in translated or user-authored content
              </SurfaceTitle>
              <SurfaceDescription>
                This description intentionally runs long to show how supporting
                copy remains readable when the surface has more context than a
                compact layout originally expected.
              </SurfaceDescription>
              <SurfaceAction>
                <Button size="sm" intent="secondary">
                  Inspect
                </Button>
              </SurfaceAction>
            </SurfaceHeader>
            <SurfaceContent>
              <p className="examples-body-copy">
                Surface content can contain regular application markup while the
                primitive owns spacing and slot behavior.
              </p>
            </SurfaceContent>
          </Surface>
        </div>

        <div className="examples-panel">
          <h3>Nested surface pattern</h3>
          <Surface>
            <SurfaceHeader>
              <SurfaceTitle>Run context</SurfaceTitle>
              <SurfaceDescription>
                A base surface can contain nested surfaces for grouped details.
              </SurfaceDescription>
            </SurfaceHeader>
            <SurfaceContent>
              <Surface level="nested">
                <SurfaceContent>
                  <div className="examples-surface-content">
                    <Badge tone="accent">Tool output</Badge>
                    <p>
                      Nested content remains tokenized and visibly grouped
                      without adding a new demo component.
                    </p>
                  </div>
                </SurfaceContent>
              </Surface>
            </SurfaceContent>
          </Surface>
        </div>

        <div className="examples-panel examples-panel-narrow">
          <h3>Narrow footer wrapping</h3>
          <div className="examples-narrow-frame">
            <Surface>
              <SurfaceHeader>
                <SurfaceTitle>Review required</SurfaceTitle>
                <SurfaceDescription>
                  Footer actions wrap inside narrow containers.
                </SurfaceDescription>
              </SurfaceHeader>
              <SurfaceFooter>
                <Button size="sm">Approve</Button>
                <Button size="sm" intent="secondary">
                  Request changes
                </Button>
                <Button size="sm" intent="quiet">
                  Later
                </Button>
              </SurfaceFooter>
            </Surface>
          </div>
        </div>
      </div>
    </section>
  );
}
