import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@pds/react";

import { NarrowFrame, Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const slides = [
  { label: "Ready", title: "Contract review", value: "12 checks" },
  { label: "Queued", title: "Visual audit", value: "4 screens" },
  { label: "Draft", title: "Docs sync", value: "8 files" }
];

const preview = {
  description: "Embla-backed carousel with keyboard region, slide groups, and PDS controls.",
  group: "Layout and data",
  id: "carousel",
  name: "Carousel",
  Preview() {
    return (
      <NarrowFrame>
        <Stack>
          <Carousel aria-label="Implementation queue">
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.title}>
                  <Card>
                    <CardHeader>
                      <Badge emphasis="outline">{slide.label}</Badge>
                      <CardTitle>{slide.title}</CardTitle>
                      <CardDescription>{slide.value}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      Agent-facing status content stays readable inside each slide.
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Stack>
      </NarrowFrame>
    );
  }
} satisfies ComponentPreview;

export default preview;
