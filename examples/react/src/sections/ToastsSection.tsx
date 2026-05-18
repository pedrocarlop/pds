import { useState } from "react";

import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@pds/react";

export function ToastsSection() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <section className="examples-section" aria-labelledby="toasts-title">
        <div className="examples-section-heading">
          <h2 id="toasts-title">Toast</h2>
          <p>
            Non-blocking feedback with semantic tone, action, dismiss control,
            viewport placement, and resilient copy.
          </p>
        </div>

        <div className="examples-grid">
          <div className="examples-panel">
            <h3>Completion feedback</h3>
            <p className="examples-body-copy">
              Use Toast for success messages that can disappear without blocking
              the current task.
            </p>
            <div className="examples-row">
              <Button
                intent="secondary"
                onClick={() => setSuccessOpen((open) => !open)}
              >
                Toggle success toast
              </Button>
            </div>
          </div>

          <div className="examples-panel">
            <h3>Recoverable notice</h3>
            <p className="examples-body-copy">
              Required errors still belong inline. Toast can support the flow
              when the user can keep working.
            </p>
            <div className="examples-row">
              <Button intent="secondary" onClick={() => setDangerOpen(true)}>
                Show recoverable notice
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ToastViewport />
      <Toast
        onOpenChange={setSuccessOpen}
        open={successOpen}
        tone="success"
      >
        <ToastTitle>Agreement signed</ToastTitle>
        <ToastDescription>
          We saved the acceptance timestamp for version 4.2.
        </ToastDescription>
        <ToastAction altText="Review signed agreement">Review</ToastAction>
        <ToastClose />
      </Toast>
      <Toast onOpenChange={setDangerOpen} open={dangerOpen} tone="danger">
        <ToastTitle>Retry available</ToastTitle>
        <ToastDescription>
          The audit log update failed, but your review progress is still saved.
        </ToastDescription>
        <ToastClose />
      </Toast>
    </ToastProvider>
  );
}
