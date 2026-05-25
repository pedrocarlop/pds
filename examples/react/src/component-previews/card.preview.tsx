import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@pds/react";

import { NarrowFrame, Row, Stack, longBody, longLabel } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Structured compact surfaces with header, action, content, footer, and small spacing.",
  group: "Layout and data",
  id: "card",
  name: "Card",
  Preview() {
    return (
      <Stack>
        <Card>
          <CardHeader>
            <CardTitle>Verification run</CardTitle>
            <CardDescription>{longBody}</CardDescription>
            <CardAction>
              <Badge tone="success">Passed</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="visual-lab-note">{longLabel}</p>
          </CardContent>
          <CardFooter>
            <Button intent="secondary">Open summary</Button>
            <Button>Approve</Button>
          </CardFooter>
        </Card>
        <Row>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Small card</CardTitle>
              <CardDescription>Compact spacing for dense side panels.</CardDescription>
            </CardHeader>
          </Card>
          <NarrowFrame>
            <Card>
              <CardHeader>
                <CardTitle>{longLabel}</CardTitle>
              </CardHeader>
              <CardContent>{longBody}</CardContent>
            </Card>
          </NarrowFrame>
        </Row>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
