import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@pds/react";

import { Field, NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "One-time code input with grouped slots, separator, filled, empty, and invalid states.",
  group: "Forms",
  id: "input-otp",
  name: "InputOTP",
  Preview() {
    return (
      <Stack>
        <Field label="Verification code">
          <InputOTP aria-label="Verification code" maxLength={6} value="492" onChange={() => {}}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
        <NarrowFrame>
          <Field label="Invalid recovery code">
            <InputOTP
              aria-describedby="input-otp-error"
              aria-label="Recovery code"
              invalid
              maxLength={4}
              value="7"
              onChange={() => {}}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          <p className="visual-lab-error" id="input-otp-error">
            Enter the full four digit recovery code.
          </p>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
