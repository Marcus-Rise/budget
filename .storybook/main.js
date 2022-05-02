module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-next",
  ],
  framework: "@storybook/react",
  managerHead: (head, { configType }) => {
    if (configType === "PRODUCTION") {
      return `
        ${head}
        <base href="storybook/">
      `;
    }
  },
  babel: async (options) => {
    return {
      ...options,
      plugins: options.plugins.filter(
        (x) => !(typeof x === "string" && x.includes("plugin-transform-classes")),
      ),
    };
  },
  core: {
    builder: "webpack5",
  },
};
