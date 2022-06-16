import { themes } from "@storybook/theming";
import React from "react";
import { LayoutGlobal } from "../src/components/layout-global";
import { initialize, mswDecorator } from "msw-storybook-addon";

initialize({ onUnhandledRequest: "bypass" });

const parameters = {
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

const decorators = [
  mswDecorator,
  (Story) => (
    <LayoutGlobal>
      <Story />
    </LayoutGlobal>
  ),
];

export { decorators, parameters };
