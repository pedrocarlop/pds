/** @type {import("@ladle/react").UserConfig} */
export default {
  addons: {
    a11y: {
      enabled: true
    },
    control: {
      enabled: true
    },
    source: {
      enabled: true
    },
    theme: {
      enabled: true,
      defaultState: "dark"
    },
    width: {
      enabled: true,
      options: {
        viewportMin: 320,
        compact: 480,
        narrow: 760,
        contentMax: 1120
      },
      defaultState: 0
    }
  },
  defaultStory: "actions--matrix",
  expandStoryTree: true,
  outDir: "dist/ladle",
  stories: "src/stories/**/*.stories.{ts,tsx,mdx}"
};
