import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./button.component";

const Config: ComponentMeta<typeof Button> = {
  title: "components/Button",
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

const Default = Template.bind({});

export { Default };
export default Config;
