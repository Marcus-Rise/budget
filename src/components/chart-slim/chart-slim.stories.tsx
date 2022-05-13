import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChartSlim } from "./chart-slim.component";

const Config: ComponentMeta<typeof ChartSlim> = {
  title: "components/ChartSlim",
  component: ChartSlim,
};

const Template: ComponentStory<typeof ChartSlim> = (args) => <ChartSlim {...args} />;

const Default = Template.bind({});
Default.args = {
  credit: 70,
  profit: 30,
};

const Height = Template.bind({});
Height.args = {
  ...Default.args,
  height: 2,
};

export default Config;
export { Default, Height };
