import * as React from "react";

import { Cell, Checkbox, RunStatus } from "pds";

export function CellsSection() {
  const [choice, setChoice] = React.useState<"auto" | "manual">("manual");
  const [nativeChecked, setNativeChecked] = React.useState(true);
  const [pdsChecked, setPdsChecked] = React.useState(true);

  return (
    <section className="examples-section" aria-labelledby="cells-title">
      <div className="examples-section-heading">
        <h2 id="cells-title">Cell</h2>
        <p>
          Static rows, full-row actions, disclosure affordances, selection
          state, dense variants, and control composition.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Static and action</h3>
          <div className="examples-cell-stack">
            <Cell>Default cell</Cell>
            <Cell use="button" onClick={() => setChoice("auto")}>
              Interactive cell
            </Cell>
            <Cell inactive>Inactive cell</Cell>
            <Cell disabled use="button">
              Disabled button cell
            </Cell>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Disclosure and choice</h3>
          <div className="examples-cell-stack">
            <Cell use="button" variant="disclosure">
              View run details
            </Cell>
            <Cell
              aria-pressed={choice === "auto"}
              onClick={() => setChoice("auto")}
              use="button"
              variant="choice"
            >
              Automatic review
            </Cell>
            <Cell
              aria-pressed={choice === "manual"}
              onClick={() => setChoice("manual")}
              use="button"
              variant="choice"
            >
              Manual review
            </Cell>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Density and emphasis</h3>
          <div className="examples-cell-stack">
            <Cell variant="compact">Compact row</Cell>
            <Cell variant="accent">
              <span className="examples-cell-copy">Priority approval needed</span>
              <RunStatus status="warning">Review</RunStatus>
            </Cell>
            <Cell variant="nested">Nested row inside another grouped context</Cell>
          </div>
        </div>

        <div className="examples-panel examples-panel-narrow">
          <h3>Control rows</h3>
          <div className="examples-narrow-frame">
            <div className="examples-cell-stack">
              <Cell use="label">
                <input
                  checked={nativeChecked}
                  className="examples-cell-native-control"
                  onChange={(event) => setNativeChecked(event.currentTarget.checked)}
                  type="checkbox"
                />
                Generate release notes
              </Cell>
              <Cell>
                <Checkbox
                  aria-label="Require human approval"
                  checked={pdsChecked}
                  onCheckedChange={(checked) => setPdsChecked(checked === true)}
                />
                <span className="examples-cell-copy">Require human approval</span>
              </Cell>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
