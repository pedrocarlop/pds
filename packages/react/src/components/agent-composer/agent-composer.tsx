import { forwardRef, useId, useState } from "react";
import type {
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes
} from "react";

import { cx } from "../../utilities/classes";

export interface AgentComposerProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  actions?: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onSubmitMessage?: (message: string, event: FormEvent<HTMLFormElement>) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  submitLabel?: string;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  value?: string;
}

export const AgentComposer = forwardRef<HTMLFormElement, AgentComposerProps>(
  (
    {
      actions,
      className,
      defaultValue = "",
      disabled = false,
      label = "Message",
      onSubmit,
      onSubmitMessage,
      onValueChange,
      placeholder = "Ask the agent...",
      submitLabel = "Send",
      textareaProps,
      value,
      ...props
    },
    ref
  ) => {
    const fallbackId = useId();
    const [draft, setDraft] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : draft;
    const isDisabled = disabled || textareaProps?.disabled === true;
    const textareaId = textareaProps?.id ?? fallbackId;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      onSubmit?.(event);

      if (event.defaultPrevented || !onSubmitMessage) {
        return;
      }

      event.preventDefault();

      const message = currentValue.trim();

      if (!message) {
        return;
      }

      onSubmitMessage(message, event);

      if (!isControlled) {
        setDraft("");
      }
    }

    return (
      <form
        className={cx("pds-agent-composer", className)}
        onSubmit={handleSubmit}
        ref={ref}
        {...props}
      >
        <label className="pds-sr-only" htmlFor={textareaId}>
          {label}
        </label>
        <textarea
          {...textareaProps}
          className={cx("pds-agent-composer__input", textareaProps?.className)}
          disabled={isDisabled}
          id={textareaId}
          onChange={(event) => {
            textareaProps?.onChange?.(event);
            onValueChange?.(event.currentTarget.value);

            if (!isControlled) {
              setDraft(event.currentTarget.value);
            }
          }}
          placeholder={placeholder}
          rows={textareaProps?.rows ?? 3}
          value={currentValue}
        />
        <div className="pds-agent-composer__footer">
          <div className="pds-agent-composer__actions">{actions}</div>
          <button
            className="pds-agent-composer__submit"
            disabled={isDisabled || currentValue.trim().length === 0}
            type="submit"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    );
  }
);

AgentComposer.displayName = "AgentComposer";
