"use client";

import * as React from "react";

import { cn } from "../utilities";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./avatar";
import { Cell, type CellProps } from "./cell";
import { Input, type InputProps } from "./input";

export enum AmountInputType {
  TEXT = "text",
  MONEY = "money",
  MONEY_FRACTIONAL = "money-fractional"
}

export interface AmountCurrencyDefinition {
  code: string;
  fractionalPart?: number;
  symbol?: string;
}

export interface IntlProviderProps {
  children: React.ReactNode;
  locale: string;
}

export interface CurrencyProviderProps {
  children: React.ReactNode;
  currencies: AmountCurrencyDefinition[];
}

export interface AmountProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "aria-invalid"> {
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  invalid?: boolean;
}

export interface AmountCurrencyProps
  extends Omit<CellProps, "children" | "value" | "variant"> {
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  image?: React.ReactNode | string;
  invalid?: boolean;
  value: React.ReactNode;
}

export interface AmountInputProps
  extends Omit<InputProps, "defaultValue" | "type" | "value"> {
  currency?: string;
  defaultValue?: number | string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  negative?: boolean;
  showCurrency?: boolean;
  showSign?: boolean;
  type?: AmountInputType;
  value?: number | string;
}

type AmountCompoundComponent = React.ForwardRefExoticComponent<
  AmountProps & React.RefAttributes<HTMLDivElement>
> & {
  Currency: typeof AmountCurrency;
  Input: typeof AmountInput;
};

const defaultCurrencyContext = new Map<string, AmountCurrencyDefinition>();
const CurrencyContext = React.createContext(defaultCurrencyContext);
const IntlContext = React.createContext("en-GB");

function normalizeCurrencyCode(code: string) {
  return code.trim().toUpperCase();
}

function isInvalidAriaValue(value: React.AriaAttributes["aria-invalid"]) {
  return value === true || value === "true";
}

function mergeDescribedBy(...ids: Array<string | undefined>) {
  const merged = ids.filter(Boolean).join(" ");

  return merged || undefined;
}

function coerceNumber(value: number | string | undefined) {
  if (value === undefined || value === "") {
    return undefined;
  }

  const nextValue = typeof value === "number" ? value : Number(value);

  return Number.isFinite(nextValue) ? nextValue : undefined;
}

function getCurrencyDefinition(
  currencies: Map<string, AmountCurrencyDefinition>,
  currency: string | undefined
) {
  if (!currency) {
    return undefined;
  }

  return currencies.get(normalizeCurrencyCode(currency));
}

function getCurrencyFractionDigits(
  locale: string,
  currency: string | undefined,
  definition: AmountCurrencyDefinition | undefined
): number {
  if (definition?.fractionalPart !== undefined) {
    return definition.fractionalPart;
  }

  if (!currency) {
    return 2;
  }

  try {
    return new Intl.NumberFormat(locale, {
      currency,
      style: "currency"
    }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
}

function getDisplayAmount({
  currencies,
  currency,
  locale,
  negative,
  showCurrency,
  showSign,
  type,
  value
}: {
  currencies: Map<string, AmountCurrencyDefinition>;
  currency: string | undefined;
  locale: string;
  negative: boolean;
  showCurrency: boolean;
  showSign: boolean;
  type: AmountInputType;
  value: number | string | undefined;
}) {
  if (type === AmountInputType.TEXT) {
    return value;
  }

  const numberValue = coerceNumber(value);

  if (numberValue === undefined) {
    return undefined;
  }

  const definition = getCurrencyDefinition(currencies, currency);
  const fractionDigits = getCurrencyFractionDigits(locale, currency, definition);
  const scaledValue =
    type === AmountInputType.MONEY_FRACTIONAL
      ? numberValue / 10 ** fractionDigits
      : numberValue;
  const signedValue = negative ? -Math.abs(scaledValue) : scaledValue;

  if (definition && showCurrency) {
    return formatCustomCurrency({
      definition,
      fractionDigits,
      locale,
      showSign,
      value: signedValue
    });
  }

  try {
    return new Intl.NumberFormat(locale, {
      currency: showCurrency && currency ? currency : undefined,
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: fractionDigits,
      signDisplay: showSign ? "always" : "auto",
      style: showCurrency && currency ? "currency" : "decimal"
    }).format(signedValue);
  } catch {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: fractionDigits,
      signDisplay: showSign ? "always" : "auto",
      style: "decimal"
    }).format(signedValue);
  }
}

function formatCustomCurrency({
  definition,
  fractionDigits,
  locale,
  showSign,
  value
}: {
  definition: AmountCurrencyDefinition;
  fractionDigits: number;
  locale: string;
  showSign: boolean;
  value: number;
}) {
  const isNegative = value < 0 || Object.is(value, -0);
  const sign = isNegative ? "-" : showSign ? "+" : "";
  const formattedValue = new Intl.NumberFormat(locale, {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
    signDisplay: "never",
    style: "decimal"
  }).format(Math.abs(value));
  const symbol = definition.symbol ?? `${normalizeCurrencyCode(definition.code)} `;

  return `${sign}${symbol}${formattedValue}`;
}

function getCurrencyFallback(value: React.ReactNode) {
  if (typeof value !== "string") {
    return "$";
  }

  const normalizedValue = value.trim();

  return normalizedValue.slice(0, 2).toUpperCase() || "$";
}

function CurrencyImage({
  image,
  value
}: {
  image: React.ReactNode | string;
  value: React.ReactNode;
}) {
  if (typeof image !== "string") {
    return (
      <span
        aria-hidden="true"
        className="pds-amount-currency-image"
        data-slot="amount-currency-image"
      >
        {image}
      </span>
    );
  }

  return (
    <Avatar
      aria-hidden="true"
      className="pds-amount-currency-image"
      data-slot="amount-currency-image"
      size="sm"
    >
      <AvatarImage alt="" src={image} />
      <AvatarFallback>{getCurrencyFallback(value)}</AvatarFallback>
    </Avatar>
  );
}

export function IntlProvider({ children, locale }: IntlProviderProps) {
  return <IntlContext.Provider value={locale}>{children}</IntlContext.Provider>;
}

export function CurrencyProvider({
  children,
  currencies
}: CurrencyProviderProps) {
  const parentCurrencies = React.useContext(CurrencyContext);
  const value = React.useMemo(() => {
    const nextCurrencies = new Map(parentCurrencies);

    for (const currency of currencies) {
      nextCurrencies.set(normalizeCurrencyCode(currency.code), currency);
    }

    return nextCurrencies;
  }, [currencies, parentCurrencies]);

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

const AmountRoot = React.forwardRef<HTMLDivElement, AmountProps>(function Amount(
  { "aria-invalid": ariaInvalid, className, invalid = false, ...props },
  ref
) {
  const invalidState = invalid || isInvalidAriaValue(ariaInvalid);

  return (
    <div
      ref={ref}
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      className={cn("pds-amount", className)}
      data-invalid={invalidState || undefined}
      data-slot="amount"
      {...props}
    />
  );
});

export const AmountCurrency = React.forwardRef<HTMLElement, AmountCurrencyProps>(
  function AmountCurrency(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      className,
      description,
      disabled = false,
      errorMessage,
      image,
      invalid = false,
      onClick,
      use,
      value,
      ...props
    },
    ref
  ) {
    const generatedId = React.useId();
    const descriptionId = description
      ? `${generatedId}-description`
      : undefined;
    const errorId = errorMessage ? `${generatedId}-error` : undefined;
    const invalidState = invalid || isInvalidAriaValue(ariaInvalid);
    const resolvedUse = use ?? (onClick ? "button" : "div");

    return (
      <Cell
        ref={ref}
        aria-describedby={mergeDescribedBy(
          ariaDescribedBy,
          descriptionId,
          errorId
        )}
        aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
        className={cn("pds-amount-currency", className)}
        data-invalid={invalidState || undefined}
        data-slot="amount-currency"
        disabled={disabled}
        onClick={onClick}
        use={resolvedUse}
        variant="nested"
        {...props}
      >
        {image ? <CurrencyImage image={image} value={value} /> : null}
        <span className="pds-amount-currency-body">
          <span className="pds-amount-currency-value" data-slot="amount-currency-value">
            {value}
          </span>
          {description ? (
            <span
              className="pds-amount-currency-description"
              data-slot="amount-currency-description"
              id={descriptionId}
            >
              {description}
            </span>
          ) : null}
          {errorMessage ? (
            <span
              className="pds-amount-currency-error"
              data-slot="amount-currency-error"
              id={errorId}
            >
              {errorMessage}
            </span>
          ) : null}
        </span>
      </Cell>
    );
  }
);

export const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  function AmountInput(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      className,
      currency,
      defaultValue,
      description,
      disabled = false,
      errorMessage,
      inputMode,
      invalid = false,
      negative = false,
      showCurrency = true,
      showSign = false,
      type = AmountInputType.TEXT,
      value,
      ...props
    },
    ref
  ) {
    const generatedId = React.useId();
    const locale = React.useContext(IntlContext);
    const currencies = React.useContext(CurrencyContext);
    const descriptionId = description
      ? `${generatedId}-description`
      : undefined;
    const errorId = errorMessage ? `${generatedId}-error` : undefined;
    const invalidState = invalid || isInvalidAriaValue(ariaInvalid);
    const isMoneyInput =
      type === AmountInputType.MONEY ||
      type === AmountInputType.MONEY_FRACTIONAL;
    const formatOptions = {
      currencies,
      currency,
      locale,
      negative,
      showCurrency,
      showSign,
      type
    };

    return (
      <div
        className="pds-amount-input"
        data-disabled={disabled || undefined}
        data-invalid={invalidState || undefined}
        data-slot="amount-input"
      >
        <Input
          ref={ref}
          aria-describedby={mergeDescribedBy(
            ariaDescribedBy,
            descriptionId,
            errorId
          )}
          aria-invalid={ariaInvalid}
          className={cn("pds-amount-input-control", className)}
          data-slot="amount-input-control"
          defaultValue={getDisplayAmount({
            ...formatOptions,
            value: defaultValue
          })}
          disabled={disabled}
          inputMode={inputMode ?? (isMoneyInput ? "decimal" : undefined)}
          invalid={invalid}
          type="text"
          value={getDisplayAmount({
            ...formatOptions,
            value
          })}
          {...props}
        />
        {description ? (
          <span
            className="pds-amount-input-description"
            data-slot="amount-input-description"
            id={descriptionId}
          >
            {description}
          </span>
        ) : null}
        {errorMessage ? (
          <span
            className="pds-amount-input-error"
            data-slot="amount-input-error"
            id={errorId}
          >
            {errorMessage}
          </span>
        ) : null}
      </div>
    );
  }
);

export const Amount = Object.assign(AmountRoot, {
  Currency: AmountCurrency,
  Input: AmountInput
}) as AmountCompoundComponent;
