import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  Item,
  ItemSkeleton,
  Switch
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Rich rows with identity, descriptions, side values, controls, and loading states.",
  group: "Layout and data",
  id: "item",
  name: "Item",
  Preview() {
    return (
      <Stack>
        <Item>
          <Item.Avatar>
            <Avatar>
              <AvatarFallback>GB</AvatarFallback>
            </Avatar>
          </Item.Avatar>
          <Item.Content>
            <Item.Title>British Pound</Item.Title>
            <Item.Description>Personal account</Item.Description>
          </Item.Content>
          <Item.Side>
            <Item.Value>GBP 1,235</Item.Value>
            <Item.Value variant="secondary">Available</Item.Value>
          </Item.Side>
        </Item>

        <Item use="button" useIcon="bolt" variant="disclosure">
          <Item.Content>
            <Item.Title>Instant transfer</Item.Title>
            <Item.Description>Send money in seconds</Item.Description>
          </Item.Content>
        </Item>

        <Item variant="accent">
          <Item.Avatar>
            <Avatar>
              <AvatarFallback>CB</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </Item.Avatar>
          <Item.Content>
            <Item.Title>Cashback boost</Item.Title>
            <Item.Description>Earn rewards on card spend</Item.Description>
            <Item.Actions>
              <Button size="sm">Activate</Button>
              <Button intent="secondary" size="sm">
                Later
              </Button>
            </Item.Actions>
          </Item.Content>
          <Item.Side>
            <Badge tone="accent">New</Badge>
          </Item.Side>
        </Item>

        <Item use="label">
          <Item.Prefix>
            <Checkbox aria-label="Enable marketing emails" />
          </Item.Prefix>
          <Item.Content>
            <Item.Title>Marketing emails</Item.Title>
            <Item.Description>Receive product updates and offers</Item.Description>
          </Item.Content>
        </Item>

        <NarrowFrame>
          <Stack>
            <Item use="label">
              <Item.Content>
                <Item.Title>Round up payments</Item.Title>
                <Item.Description>Send spare change to savings</Item.Description>
              </Item.Content>
              <Item.Side>
                <Switch aria-label="Round up payments" />
              </Item.Side>
            </Item>

            <Item>
              <Item.Content>
                <Item.Title>Monthly budget</Item.Title>
              </Item.Content>
              <Item.Side>
                <Item.Input
                  aria-label="Monthly budget"
                  currency="GBP"
                  defaultValue={1200}
                  type="money"
                />
              </Item.Side>
            </Item>

            <ItemSkeleton />
          </Stack>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
