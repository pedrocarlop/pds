import type { ComponentPreview } from "../component-previews/types";
import {
  MatrixItem,
  StateMatrix,
  StoryFrame,
  surfaceArgTypes
} from "./StoryFrame";
import type { StorySurface } from "./StoryFrame";

export interface ComponentPreviewStoryProps {
  surface: StorySurface;
}

export const componentPreviewStoryArgs = {
  surface: "grouped"
} satisfies ComponentPreviewStoryProps;

export const componentPreviewStoryArgTypes = surfaceArgTypes;

export function ComponentPreviewStory({
  preview,
  surface
}: {
  preview: ComponentPreview;
  surface: StorySurface;
}) {
  return (
    <StoryFrame
      description={preview.description}
      surface={surface}
      title={preview.name}
    >
      <StateMatrix>
        <MatrixItem label={preview.name}>
          <preview.Preview />
        </MatrixItem>
      </StateMatrix>
    </StoryFrame>
  );
}
