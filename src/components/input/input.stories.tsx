import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Input } from "./input.component";
import { useState } from "react";

const Config: ComponentMeta<typeof Input> = {
  title: "components/Input",
  component: Input,
};

const Template: ComponentStory<typeof Input> = ({ value: val, onChange, ...args }) => {
  const [value, setValue] = useState(val);

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);

        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
};

const Default = Template.bind({});
Default.args = {
  value: "",
};

const Labeled = Template.bind({});
Labeled.args = {
  value: "",
  label: "Label",
};

const LabeledWithPlaceholder = Template.bind({});
LabeledWithPlaceholder.args = {
  label: "Label",
  placeholder: "Placeholder",
  value: "",
};

const LabeledWithValue = Template.bind({});
LabeledWithValue.args = {
  label: "Label",
  value: "Value",
};

export default Config;
export { Default, Labeled, LabeledWithPlaceholder, LabeledWithValue };
