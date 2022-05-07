import { themes } from "@storybook/theming";
import React from "react";
import { LayoutGlobal } from "../src/components/layout-global";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.light,
  },
};

export const decorators = [
  (Story) => (
    <LayoutGlobal>
      <Story />
    </LayoutGlobal>
  ),
];
