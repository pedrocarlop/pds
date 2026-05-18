import type { Story, StoryDefault } from "@ladle/react";

import {
  componentPreviewGroups,
  componentPreviews
} from "../component-previews";
import {
  MatrixItem,
  StateMatrix,
  StoryFrame,
  surfaceArgTypes
} from "./StoryFrame";
import type { StorySurface } from "./StoryFrame";

export default {
  title: "Components"
} satisfies StoryDefault;

export const Gallery: Story<{ surface: StorySurface }> = ({ surface }) => (
  <StoryFrame
    description="Registry-driven previews for every public PDS React root component."
    surface={surface}
    title="Components"
  >
    {componentPreviewGroups.map(({ group, previews }) => (
      <section className="visual-lab-preview-group" key={group}>
        <header className="visual-lab-preview-group-header">
          <h2>{group}</h2>
        </header>
        <StateMatrix>
          {previews.map((preview) => (
            <MatrixItem
              key={preview.id}
              label={preview.name}
              note={preview.description}
            >
              <preview.Preview />
            </MatrixItem>
          ))}
        </StateMatrix>
      </section>
    ))}
  </StoryFrame>
);

Gallery.args = {
  surface: "grouped"
};
Gallery.argTypes = surfaceArgTypes;

export const Focused: Story<{
  component: string;
  surface: StorySurface;
}> = ({ component, surface }) => {
  const preview =
    componentPreviews.find((candidate) => candidate.name === component) ??
    componentPreviews[0];

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
};

Focused.args = {
  component: componentPreviews[0]?.name ?? "",
  surface: "grouped"
};
Focused.argTypes = {
  component: {
    control: { type: "select" },
    options: componentPreviews.map((preview) => preview.name)
  },
  ...surfaceArgTypes
};
