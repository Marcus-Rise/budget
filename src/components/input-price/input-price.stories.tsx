import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputPrice } from "./input-price.component";

const Config: ComponentMeta<typeof InputPrice> = {
  title: "components/InputPrice",
  component: InputPrice,
};

const Template: ComponentStory<typeof InputPrice> = (args) => <InputPrice {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
