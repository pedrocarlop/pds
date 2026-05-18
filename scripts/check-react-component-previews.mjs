import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const componentsDir = join(root, "packages/react/src/components");
const previewsDir = join(root, "examples/react/src/component-previews");
const generatedStoriesPath = join(
  root,
  "examples/react/src/stories/component-previews.stories.tsx"
);
const shouldWrite = process.argv.includes("--write");

const componentIds = readdirSync(componentsDir)
  .filter((file) => file.endsWith(".tsx"))
  .filter((file) => !file.endsWith(".test.tsx"))
  .map((file) => file.replace(/\.tsx$/, ""))
  .sort();

const previewIds = readdirSync(previewsDir)
  .filter((file) => file.endsWith(".preview.tsx"))
  .map((file) => file.replace(/\.preview\.tsx$/, ""))
  .sort();

const componentIdSet = new Set(componentIds);
const previewIdSet = new Set(previewIds);

const missingPreviews = componentIds.filter((id) => !previewIdSet.has(id));
const extraPreviews = previewIds.filter((id) => !componentIdSet.has(id));
const generatedStories = generateStories(previewIds);

if (missingPreviews.length > 0 || extraPreviews.length > 0) {
  if (missingPreviews.length > 0) {
    console.error("Missing component preview files:");
    for (const id of missingPreviews) {
      console.error(
        `- ${relative(root, join(previewsDir, `${id}.preview.tsx`))}`
      );
    }
  }

  if (extraPreviews.length > 0) {
    console.error("Preview files without matching component source files:");
    for (const id of extraPreviews) {
      console.error(
        `- ${relative(root, join(previewsDir, `${id}.preview.tsx`))}`
      );
    }
  }

  process.exitCode = 1;
}

if (shouldWrite) {
  writeFileSync(generatedStoriesPath, generatedStories);
} else {
  const currentStories = readFileSync(generatedStoriesPath, "utf8");

  if (currentStories !== generatedStories) {
    console.error(
      `${relative(root, generatedStoriesPath)} is out of sync with component previews.`
    );
    console.error("Run pnpm examples:previews:sync to regenerate it.");
    process.exitCode = 1;
  }
}

function toPascalCase(id) {
  return id
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

function toCamelCase(id) {
  const pascalName = toPascalCase(id);
  return `${pascalName.charAt(0).toLowerCase()}${pascalName.slice(1)}`;
}

function generateStories(ids) {
  const imports = ids
    .map(
      (id) =>
        `import ${toCamelCase(id)}Preview from "../component-previews/${id}.preview";`
    )
    .join("\n");

  const exports = ids
    .map((id) => {
      const exportName = toPascalCase(id);
      const previewName = `${toCamelCase(id)}Preview`;

      return `export const ${exportName}: Story<ComponentPreviewStoryProps> = ({ surface }) => (
  <ComponentPreviewStory preview={${previewName}} surface={surface} />
);
${exportName}.args = componentPreviewStoryArgs;
${exportName}.argTypes = componentPreviewStoryArgTypes;`;
    })
    .join("\n\n");

  return `import type { Story, StoryDefault } from "@ladle/react";

${imports}
import {
  ComponentPreviewStory,
  componentPreviewStoryArgTypes,
  componentPreviewStoryArgs
} from "./ComponentPreviewStory";
import type { ComponentPreviewStoryProps } from "./ComponentPreviewStory";

export default {
  title: "Components"
} satisfies StoryDefault;

${exports}
`;
}
