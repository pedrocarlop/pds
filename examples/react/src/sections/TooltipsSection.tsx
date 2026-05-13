import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "pds";

export function TooltipsSection() {
  return (
    <section className="examples-section" aria-labelledby="tooltips-title">
      <div className="examples-section-heading">
        <h2 id="tooltips-title">Tooltip</h2>
        <p>
          Supplemental trigger descriptions, long content wrapping, and keyboard
          focus behavior.
        </p>
      </div>

      <TooltipProvider>
        <div className="examples-grid">
          <div className="examples-panel">
            <h3>Basic tooltip</h3>
            <div className="examples-row">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button intent="secondary">Show status</Button>
                </TooltipTrigger>
                <TooltipContent>Agent is ready for review.</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="examples-panel">
            <h3>Long content</h3>
            <div className="examples-row">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button intent="quiet">Explain queue</Button>
                </TooltipTrigger>
                <TooltipContent>
                  This tooltip intentionally contains a longer description so
                  the content can wrap within the viewport-constrained tooltip
                  width.
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="examples-panel examples-panel-wide">
            <h3>Keyboard note</h3>
            <p className="examples-note">
              Focus the trigger with the keyboard to inspect the same tooltip
              content without relying on pointer hover.
            </p>
            <div className="examples-row">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>Focus target</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Keyboard focus opens the tooltip through the Radix primitive.
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
}
