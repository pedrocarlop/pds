import type { Story, StoryDefault } from "@ladle/react";
import {
  Checkbox,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea
} from "@pds/react";
import type { FieldDensity } from "@pds/react";

import {
  Field,
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

export default {
  title: "Forms"
} satisfies StoryDefault;

function SelectExample({
  density = "default",
  disabled = false,
  invalid = false,
  open = false,
  value = "review"
}: {
  density?: FieldDensity;
  disabled?: boolean;
  invalid?: boolean;
  open?: boolean;
  value?: string;
}) {
  return (
    <Select open={open} value={value} onValueChange={() => undefined}>
      <SelectTrigger
        aria-label="Review destination"
        density={density}
        disabled={disabled}
        invalid={invalid}
      >
        <SelectValue placeholder="Select destination" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Queues</SelectLabel>
        <SelectItem value="review">Review queue</SelectItem>
        <SelectItem value="automation">Automation run</SelectItem>
        <SelectSeparator />
        <SelectItem value="archive">Archive</SelectItem>
      </SelectContent>
    </Select>
  );
}

export const Matrix: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Form primitives across density, invalid, disabled, checked, and open states."
    surface={surface}
    title="Forms"
  >
    <StateMatrix>
      <MatrixItem label="Text fields">
        <Stack>
          <Field label="Default input">
            <Input defaultValue="Generate status summary" />
          </Field>
          <Field label="Compact invalid input">
            <Input
              aria-describedby="forms-command-error"
              defaultValue="Ship without review"
              density="compact"
              invalid
            />
          </Field>
          <p className="visual-lab-error" id="forms-command-error">
            Approval reason is required before running this action.
          </p>
          <Field label="Textarea">
            <Textarea defaultValue={longBody} rows={4} />
          </Field>
        </Stack>
      </MatrixItem>
      <MatrixItem label="Select">
        <Stack>
          <SelectExample />
          <SelectExample invalid open />
          <SelectExample disabled />
        </Stack>
      </MatrixItem>
      <MatrixItem label="Checkbox, radio, switch">
        <Stack>
          <label className="visual-lab-inline-field">
            <Checkbox defaultChecked />
            <span>Require human approval</span>
          </label>
          <label className="visual-lab-inline-field">
            <Checkbox checked="indeterminate" />
            <span>Some reviewers assigned</span>
          </label>
          <label className="visual-lab-inline-field">
            <Checkbox invalid />
            <span>Invalid acknowledgement</span>
          </label>
          <RadioGroup defaultValue="agent">
            <label className="visual-lab-inline-field">
              <RadioGroupItem value="agent" />
              <span>Agent workspace</span>
            </label>
            <label className="visual-lab-inline-field">
              <RadioGroupItem value="queue" />
              <span>Review queue</span>
            </label>
          </RadioGroup>
          <label className="visual-lab-inline-field">
            <Switch defaultChecked />
            <span>Notify reviewers</span>
          </label>
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Matrix.args = {
  surface: "grouped"
};
Matrix.argTypes = surfaceArgTypes;

export const Controls: Story<{
  density: FieldDensity;
  disabled: boolean;
  invalid: boolean;
  surface: StorySurface;
  value: string;
}> = ({ density, disabled, invalid, surface, value }) => (
  <StoryFrame
    description="Manipulate shared field state across input, textarea, and select."
    surface={surface}
    title="Form controls"
  >
    <StateMatrix>
      <MatrixItem label="Field controls">
        <Stack>
          <Field label="Input">
            <Input
              density={density}
              disabled={disabled}
              invalid={invalid}
              readOnly
              value={value}
            />
          </Field>
          <Field label="Textarea">
            <Textarea
              density={density}
              disabled={disabled}
              invalid={invalid}
              readOnly
              rows={4}
              value={longBody}
            />
          </Field>
          <Field label="Select">
            <SelectExample
              density={density}
              disabled={disabled}
              invalid={invalid}
            />
          </Field>
        </Stack>
      </MatrixItem>
      <MatrixItem label="Boolean controls">
        <Stack>
          <label className="visual-lab-inline-field">
            <Checkbox checked={!disabled} disabled={disabled} invalid={invalid} />
            <span>Checkbox state follows controls</span>
          </label>
          <label className="visual-lab-inline-field">
            <Switch checked={!disabled} disabled={disabled} />
            <span>Switch state follows controls</span>
          </label>
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Controls.args = {
  density: "default",
  disabled: false,
  invalid: false,
  surface: "grouped",
  value: "Summarize latest tool results"
};
Controls.argTypes = {
  density: {
    control: { type: "inline-radio" },
    options: ["default", "compact"]
  },
  disabled: { control: { type: "boolean" } },
  invalid: { control: { type: "boolean" } },
  value: { control: { type: "text" } },
  ...surfaceArgTypes
};

export const Resilience: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Fields remain readable inside the narrow frame used by compact product panes."
    surface={surface}
    title="Form resilience"
  >
    <StateMatrix>
      <MatrixItem label="Narrow form">
        <NarrowFrame>
          <Field label="Translated command label">
            <Input defaultValue="Prepare implementation notes for a regional compliance reviewer" />
          </Field>
          <Field label="Long reason">
            <Textarea defaultValue={longBody} rows={5} />
          </Field>
          <SelectExample value="automation" />
        </NarrowFrame>
      </MatrixItem>
      <MatrixItem label="Wrapped choice group">
        <Stack>
          <label className="visual-lab-inline-field">
            <Checkbox defaultChecked />
            <span className="visual-lab-copy">{longBody}</span>
          </label>
          <RadioGroup defaultValue="review">
            <label className="visual-lab-inline-field">
              <RadioGroupItem value="review" />
              <span className="visual-lab-copy">
                Route this generated artifact to the extended review queue
              </span>
            </label>
            <label className="visual-lab-inline-field">
              <RadioGroupItem value="manual" />
              <span className="visual-lab-copy">Keep as manual draft</span>
            </label>
          </RadioGroup>
          <Row>
            <Switch defaultChecked aria-label="Enable extended notifications" />
            <span className="visual-lab-note">Long labels wrap beside controls.</span>
          </Row>
        </Stack>
      </MatrixItem>
    </StateMatrix>
  </StoryFrame>
);

Resilience.args = {
  surface: "grouped"
};
Resilience.argTypes = surfaceArgTypes;
