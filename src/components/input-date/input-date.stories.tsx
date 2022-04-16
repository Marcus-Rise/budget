import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputDate } from "./input-date.component";

const Config: ComponentMeta<typeof InputDate> = {
  title: "components/InputDate",
  component: InputDate,
  argTypes: {
    value: {
      control: "date",
    },
  },
};

const Template: ComponentStory<typeof InputDate> = (args) => <InputDate {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
