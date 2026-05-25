import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@pds/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const data = [
  { day: "Mon", passed: 16, queued: 8 },
  { day: "Tue", passed: 22, queued: 11 },
  { day: "Wed", passed: 18, queued: 7 },
  { day: "Thu", passed: 28, queued: 13 },
  { day: "Fri", passed: 25, queued: 9 }
];

const config = {
  passed: {
    color: "var(--pds-color-brand-teal)",
    label: "Passed"
  },
  queued: {
    color: "var(--pds-color-brand-indigo)",
    label: "Queued"
  }
};

const preview = {
  description: "Recharts container with scoped chart colors, tooltip content, legend, and tokenized axes.",
  group: "Layout and data",
  id: "chart",
  name: "Chart",
  Preview() {
    return (
      <Stack>
        <ChartContainer config={config} style={{ minHeight: 260 }}>
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey="day" tickLine={false} />
            <YAxis axisLine={false} tickLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="passed"
              fill="var(--color-passed)"
              fillOpacity={0.24}
              stroke="var(--color-passed)"
              type="monotone"
            />
            <Area
              dataKey="queued"
              fill="var(--color-queued)"
              fillOpacity={0.16}
              stroke="var(--color-queued)"
              type="monotone"
            />
          </AreaChart>
        </ChartContainer>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
