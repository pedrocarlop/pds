import type { ReactNode } from "react";

export type ComponentPreviewGroup =
  | "Actions"
  | "Conversation"
  | "Feedback"
  | "Forms"
  | "Identity"
  | "Layout and data"
  | "Navigation"
  | "Overlays";

export interface ComponentPreview {
  description: string;
  group: ComponentPreviewGroup;
  id: string;
  name: string;
  Preview: () => ReactNode;
}
