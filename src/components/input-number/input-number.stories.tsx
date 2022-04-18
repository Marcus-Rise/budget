import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumber } from "./input-number.component";

const Config: ComponentMeta<typeof InputNumber> = {
  title: "components/InputNumber",
  component: InputNumber,
};

const Template: ComponentStory<typeof InputNumber> = (args) => <InputNumber {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
