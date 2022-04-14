import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Input } from "./input.component";

const Config: ComponentMeta<typeof Input> = {
  title: "components/Input",
  component: Input,
};

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
