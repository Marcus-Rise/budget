import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputCombobox, InputComboboxItem } from "./input-combobox.component";

const Config: ComponentMeta<typeof InputCombobox> = {
  title: "components/InputCombobox",
  component: InputCombobox,
  subcomponents: { InputComboboxItem },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof InputCombobox> = (args) => <InputCombobox {...args} />;

const variants = [
  {
    value: "Val",
    title: "Title",
  },
  {
    value: "Val1",
    title: "Title1",
  },
  {
    value: "Val2",
    title: "Title2",
  },
];

const Default = Template.bind({});
Default.args = {
  value: [variants[0]],
  variants,
};

export default Config;
export { Default };
