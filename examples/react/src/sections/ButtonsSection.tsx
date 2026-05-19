import { Button, Icon } from "@pds/react";

export function ButtonsSection() {
  return (
    <section className="examples-section" aria-labelledby="buttons-title">
      <div className="examples-section-heading">
        <h2 id="buttons-title">Button</h2>
        <p>
          Intent, fixed size, disabled, icon, and narrow-row behavior using the
          public Button API.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Intent</h3>
          <div className="examples-row">
            <Button intent="primary">Run agent</Button>
            <Button intent="secondary">View details</Button>
            <Button intent="quiet">Dismiss</Button>
            <Button intent="danger">Delete run</Button>
            <Button asChild intent="link">
              <a href="#buttons-title">View activity</a>
            </Button>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Size</h3>
          <div className="examples-row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button aria-label="Create run" size="icon">
              <Icon name="add" />
            </Button>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Disabled</h3>
          <div className="examples-row">
            <Button disabled>Waiting</Button>
            <Button disabled intent="secondary">
              Sync unavailable
            </Button>
            <Button disabled intent="danger">
              Cannot delete
            </Button>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Copy</h3>
          <div className="examples-row">
            <Button>Generate summary</Button>
            <Button intent="secondary">Review output</Button>
          </div>
        </div>

        <div className="examples-panel examples-panel-narrow">
          <h3>Narrow row</h3>
          <div className="examples-narrow-frame">
            <div className="examples-row">
              <Button size="sm">Approve</Button>
              <Button size="sm" intent="secondary">
                Send back
              </Button>
              <Button size="sm" intent="quiet">
                Later
              </Button>
            </div>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Interactive states</h3>
          <p className="examples-note">
            Hover and pressed states are native CSS pseudo-class states. Use the
            controls in this app directly to inspect them in a browser.
          </p>
          <div className="examples-row">
            <Button>Hover or press</Button>
            <Button intent="secondary">Focus with keyboard</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
