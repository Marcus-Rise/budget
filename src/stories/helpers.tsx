import type { DecoratorFunction } from "@storybook/csf/dist/story";
import type { ReactFramework } from "@storybook/react";

type StoryDecorator = DecoratorFunction<ReactFramework>;

const addPaddingDecorator: StoryDecorator = (Story) => (
  <div style={{ padding: "1rem" }}>
    <Story />
  </div>
);

export { addPaddingDecorator };
