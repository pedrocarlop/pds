import {
  Badge,
  Button,
  Details,
  Icon,
  TravelWidget,
  TravelWidgetSkeleton
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const hotelImages = [
  "https://assets.revolut.com/web-ui-kit/docs/widgets/travel-card-widget-large-image.png?id=1",
  "https://assets.revolut.com/web-ui-kit/docs/widgets/travel-card-widget-large-image-2.png?id=1",
  "https://assets.revolut.com/web-ui-kit/docs/widgets/travel-card-widget-large-image.png?id=2"
];

const preview = {
  description:
    "Image-led travel and commerce summary cards with explicit content, action, and loading slots.",
  group: "Layout and data",
  id: "travel-widget",
  name: "TravelWidget",
  Preview() {
    return (
      <Stack>
        <TravelWidget image={hotelImages} onClick={() => undefined}>
          <TravelWidget.Action>
            <Button aria-label="Save Omni Hilton Hotel" intent="secondary" size="icon">
              <Icon name="favorite" />
            </Button>
          </TravelWidget.Action>
          <TravelWidget.Title>Omni Hilton Hotel</TravelWidget.Title>
          <TravelWidget.Details>
            <Icon name="hotel" />
            Holiday rental - Rating 4.5 from 1.2k reviews
          </TravelWidget.Details>
          <TravelWidget.Description>
            Reserve now, pay later with free cancellation until the week before
            check-in.
          </TravelWidget.Description>
          <TravelWidget.Content>
            <Details variant="compact">
              <Details.Title>Price</Details.Title>
              <Details.Content>GBP 1,480</Details.Content>
            </Details>
            <Details variant="compact">
              <Details.Title>Cashback</Details.Title>
              <Details.Content>
                <Badge emphasis="outline" tone="success">
                  GBP 200
                </Badge>
              </Details.Content>
            </Details>
          </TravelWidget.Content>
        </TravelWidget>

        <NarrowFrame>
          <Stack>
            <TravelWidget
              image="https://assets.revolut.com/web-ui-kit/docs/widgets/travel-card-widget-small-image.png"
              onClick={() => undefined}
              variant="small"
            >
              <TravelWidget.Action>
                <Button aria-label="Save compact hotel" intent="secondary" size="icon">
                  <Icon name="favorite" />
                </Button>
              </TravelWidget.Action>
              <TravelWidget.Title>
                Omni Hilton Hotel with a long translated destination label
              </TravelWidget.Title>
              <TravelWidget.Details>Additional details and flexible booking</TravelWidget.Details>
              <TravelWidget.Content>
                <Badge emphasis="outline" tone="accent">
                  4.5 rating
                </Badge>
                <Details variant="compact">
                  <Details.Title>Tonight</Details.Title>
                  <Details.Content>GBP 1,480</Details.Content>
                </Details>
              </TravelWidget.Content>
            </TravelWidget>

            <TravelWidget use="div">
              <TravelWidget.Title>iPad Pro</TravelWidget.Title>
              <TravelWidget.Content>
                <Details variant="compact">
                  <Details.Title>Cashback</Details.Title>
                  <Details.Content>
                    <Badge emphasis="outline" tone="success">
                      5%
                    </Badge>
                  </Details.Content>
                </Details>
                Free no-contact delivery
              </TravelWidget.Content>
            </TravelWidget>

            <TravelWidgetSkeleton variant="small" />
          </Stack>
        </NarrowFrame>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
