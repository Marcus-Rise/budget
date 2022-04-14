import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "./input-text.component";

const Config: ComponentMeta<typeof InputText> = {
  title: "components/InputText",
  component: InputText,
};

const Template: ComponentStory<typeof InputText> = (args) => <InputText {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
