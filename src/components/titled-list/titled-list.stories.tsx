import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TitledList } from "./titled-list.components";
import { Price } from "../price";

const Config: ComponentMeta<typeof TitledList> = {
  title: "components/TitledList",
  component: TitledList,
};

const Template: ComponentStory<typeof TitledList> = (args) => <TitledList {...args} />;

const Default = Template.bind({});
Default.args = {
  title: "Title",
  children: (
    <>
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </>
  ),
};

const WithMeta = Template.bind({});
WithMeta.args = {
  ...Default.args,
  meta: <Price amount={3000} />,
};

export default Config;
export { Default, WithMeta };
