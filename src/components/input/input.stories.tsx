import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Input } from "./input.component";

const Config: ComponentMeta<typeof Input> = {
  title: "components/Input",
  component: Input,
};

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const Default = Template.bind({});
Default.args = {
  value: "",
};

const Labeled = Template.bind({});
Labeled.args = {
  label: "Label",
};

const LabeledWithPlaceholder = Template.bind({});
LabeledWithPlaceholder.args = {
  label: "Label",
  placeholder: "Placeholder",
};

const LabeledWithValue = Template.bind({});
LabeledWithValue.args = {
  label: "Label",
  value: "Value",
};

export default Config;
export { Default, Labeled, LabeledWithPlaceholder, LabeledWithValue };
