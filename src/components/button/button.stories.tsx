import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button, ButtonVariant } from "./button.component";

const Config: ComponentMeta<typeof Button> = {
  title: "components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

const Default = Template.bind({});
const Text = Template.bind({});
Text.args = {
  variant: ButtonVariant.TEXT,
};

export default Config;
export { Default, Text };
