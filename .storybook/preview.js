import { themes } from "@storybook/theming";
import React from "react";
import { LayoutGlobal } from "../src/components/layout-global";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { ThemeProvider } from "@marcus-rise/react-theme";
import { ThemeToggle } from "../src/components/theme-toggle";

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
    <ThemeProvider>
      <ThemeToggle />
      <LayoutGlobal>
        <Story />
      </LayoutGlobal>
    </ThemeProvider>
  ),
];

export { decorators, parameters };
