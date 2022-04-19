import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Price } from "./price.component";

const Config: ComponentMeta<typeof Price> = {
  title: "components/Price",
  component: Price,
};

const Template: ComponentStory<typeof Price> = (args) => <Price {...args} />;

const Default = Template.bind({});
Default.args = {
  amount: 10200,
};

export default Config;
export { Default };
