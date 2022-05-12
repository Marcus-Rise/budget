import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button, ButtonVariant } from "./button.component";
import { Icon } from "../icon";

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

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const Default = Template.bind({});
Default.args = {
  children: "Button",
};

const Text = Template.bind({});
Text.args = {
  ...Default.args,
  variant: ButtonVariant.TEXT,
};

const Iconed = Template.bind({});
Iconed.args = {
  ...Default.args,
  variant: ButtonVariant.ICON,
  children: <Icon name={"success"} />,
};

export default Config;
export { Default, Text, Iconed };
