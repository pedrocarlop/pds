import {
  Amount,
  AmountInputType,
  Avatar,
  AvatarFallback,
  CurrencyProvider,
  IntlProvider
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const noop = () => undefined;

function AccountImage({ label }: { label: string }) {
  return (
    <Avatar size="sm">
      <AvatarFallback>{label}</AvatarFallback>
    </Avatar>
  );
}

const preview = {
  description:
    "Compound currency and amount entry with balances, fee text, invalid states, disabled state, and localized money display.",
  group: "Forms",
  id: "amount",
  name: "Amount",
  Preview() {
    return (
      <Stack>
        <Amount>
          <Amount.Currency
            aria-label="Currency"
            onClick={noop}
            value="GBP"
          />
          <Amount.Input
            aria-label="Amount input"
            onChange={noop}
            value={1200}
          />
        </Amount>

        <Amount>
          <Amount.Currency
            aria-label="Account"
            description="Balance: GBP 500"
            image={<AccountImage label="S" />}
            onClick={noop}
            value="Savings"
          />
          <Amount.Input
            aria-label="Amount input"
            description="No fee"
            value={1200}
          />
        </Amount>

        <Amount aria-invalid>
          <Amount.Currency
            aria-label="Currency"
            errorMessage="Choose another currency"
            invalid
            value="GBP"
          />
          <Amount.Input
            aria-label="Amount input"
            errorMessage="Amount is above the available balance"
            invalid
            value={1200}
          />
        </Amount>

        <Amount aria-disabled>
          <Amount.Currency aria-label="Currency" disabled value="GBP" />
          <Amount.Input aria-label="Amount input" disabled value={1200} />
        </Amount>

        <Amount>
          <Amount.Currency aria-label="Currency" value="GBP" />
          <Amount.Input
            aria-label="GBP amount"
            currency="GBP"
            readOnly
            type={AmountInputType.MONEY}
            value={100000.01}
          />
        </Amount>

        <IntlProvider locale="pl-PL">
          <Amount>
            <Amount.Currency aria-label="Currency" value="GBP" />
            <Amount.Input
              aria-label="Localized amount"
              currency="GBP"
              readOnly
              type={AmountInputType.MONEY}
              value={100000.01}
            />
          </Amount>
        </IntlProvider>

        <CurrencyProvider
          currencies={[{ code: "BTC", fractionalPart: 8, symbol: "B" }]}
        >
          <Stack>
            <Amount>
              <Amount.Currency
                aria-label="Asset"
                description="Custom fractional precision"
                image={<AccountImage label="B" />}
                value="BTC"
              />
              <Amount.Input
                aria-label="BTC amount"
                currency="BTC"
                readOnly
                type={AmountInputType.MONEY}
                value={0.212}
              />
            </Amount>
            <Amount>
              <Amount.Currency aria-label="Asset" value="BTC" />
              <Amount.Input
                aria-label="BTC fractional amount"
                currency="BTC"
                readOnly
                type={AmountInputType.MONEY_FRACTIONAL}
                value={212345678}
              />
            </Amount>
          </Stack>
        </CurrencyProvider>

        <NarrowFrame>
          <Amount aria-invalid>
            <Amount.Currency
              aria-label="Currency"
              errorMessage="Currency label is too long for this operation"
              invalid
              value="Long generated currency label for resilience testing"
            />
            <Amount.Input
              aria-label="Amount input"
              errorMessage="Amount requires review before it can be submitted"
              invalid
              value={1200}
            />
          </Amount>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
