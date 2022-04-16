import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputRadio } from "./input-radio.component";

const Config: ComponentMeta<typeof InputRadio> = {
  title: "components/InputRadio",
  component: InputRadio,
};

const Template: ComponentStory<typeof InputRadio> = (args) => <InputRadio {...args} />;

const Default = Template.bind({});
Default.args = {
  value: "foo",
};

const Checked = Template.bind({});
Checked.args = {
  value: "foo",
  checked: true,
};

export default Config;
export { Default, Checked };
