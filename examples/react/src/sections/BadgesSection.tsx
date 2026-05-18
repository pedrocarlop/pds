import { Badge } from "@pds/react";

export function BadgesSection() {
  return (
    <section className="examples-section" aria-labelledby="badges-title">
      <div className="examples-section-heading">
        <h2 id="badges-title">Badge</h2>
        <p>
          Status tones, emphasis levels, long copy, and dense metadata usage.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Tones</h3>
          <div className="examples-row">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="inactive">Inactive</Badge>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Emphasis</h3>
          <div className="examples-row">
            <Badge emphasis="solid" tone="accent">
              Solid
            </Badge>
            <Badge emphasis="soft" tone="accent">
              Soft
            </Badge>
            <Badge emphasis="outline" tone="accent">
              Outline
            </Badge>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Long status</h3>
          <div className="examples-row">
            <Badge tone="warning">
              Waiting for a translated approval status that wraps cleanly
            </Badge>
            <Badge emphasis="outline" tone="danger">
              Needs review before the run can continue
            </Badge>
          </div>
        </div>

        <div className="examples-panel examples-panel-wide">
          <h3>Dense metadata row</h3>
          <div className="examples-metadata-row">
            <Badge tone="success">Live</Badge>
            <span>Run 24</span>
            <span>3 tools</span>
            <Badge emphasis="outline" tone="neutral">
              Review queued
            </Badge>
            <span>Updated 2m ago</span>
          </div>
        </div>
      </div>
    </section>
  );
}
