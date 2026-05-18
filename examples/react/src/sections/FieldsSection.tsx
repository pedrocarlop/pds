import { Input, Textarea } from "@pds/react";

export function FieldsSection() {
  return (
    <section className="examples-section" aria-labelledby="fields-title">
      <div className="examples-section-heading">
        <h2 id="fields-title">Input and Textarea</h2>
        <p>
          Density, placeholder, filled, disabled, invalid, long values, and
          narrow layout behavior.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Default density</h3>
          <label className="examples-field">
            <span>Prompt title</span>
            <Input placeholder="Summarize the latest agent run" />
          </label>
          <label className="examples-field">
            <span>Instructions</span>
            <Textarea placeholder="Describe the next step for the agent" />
          </label>
        </div>

        <div className="examples-panel">
          <h3>Compact density</h3>
          <label className="examples-field">
            <span>Filter runs</span>
            <Input density="compact" placeholder="status:open" />
          </label>
          <label className="examples-field">
            <span>Short note</span>
            <Textarea
              density="compact"
              placeholder="Add context for reviewers"
            />
          </label>
        </div>

        <div className="examples-panel">
          <h3>Filled values</h3>
          <label className="examples-field">
            <span>Run name</span>
            <Input defaultValue="Generate component usage examples" />
          </label>
          <label className="examples-field">
            <span>Review note</span>
            <Textarea defaultValue="Keep this example focused on existing starter primitives and public imports only." />
          </label>
        </div>

        <div className="examples-panel">
          <h3>Disabled</h3>
          <label className="examples-field">
            <span>Locked owner</span>
            <Input disabled defaultValue="Design systems" />
          </label>
          <label className="examples-field">
            <span>Archived note</span>
            <Textarea disabled defaultValue="This value is unavailable while the run is archived." />
          </label>
        </div>

        <div className="examples-panel">
          <h3>Invalid</h3>
          <label className="examples-field">
            <span>Required command</span>
            <Input
              aria-describedby="command-error"
              defaultValue=""
              invalid
              placeholder="Enter a command"
            />
          </label>
          <p className="examples-error" id="command-error">
            Command is required before the run can start.
          </p>

          <label className="examples-field">
            <span>Failure reason</span>
            <Textarea
              aria-describedby="reason-error"
              defaultValue="Too short"
              invalid
            />
          </label>
          <p className="examples-error" id="reason-error">
            Add enough detail for the next reviewer to act.
          </p>
        </div>

        <div className="examples-panel">
          <h3>Long values</h3>
          <label className="examples-field">
            <span>Long generated identifier</span>
            <Input defaultValue="agent-run-production-eu-west-very-long-generated-identifier-2026-05-14" />
          </label>
          <label className="examples-field">
            <span>Translated instruction</span>
            <Textarea defaultValue="Review the complete generated response, including long translated copy, pasted logs, and user-authored context that may extend beyond the expected line length." />
          </label>
        </div>

        <div className="examples-panel examples-panel-narrow">
          <h3>Narrow layout</h3>
          <div className="examples-narrow-frame">
            <label className="examples-field">
              <span>Compact query</span>
              <Input
                density="compact"
                defaultValue="owner:platform status:needs-review"
              />
            </label>
            <label className="examples-field">
              <span>Wrapped note</span>
              <Textarea
                density="compact"
                defaultValue="This narrow frame checks that field content remains readable without a special wrapper component."
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
