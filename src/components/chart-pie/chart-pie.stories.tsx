import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChartPie } from "./chart-pie.component";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
`;

const Config: ComponentMeta<typeof ChartPie> = {
  title: "components/ChartPie",
  component: ChartPie,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

const Template: ComponentStory<typeof ChartPie> = (args) => <ChartPie {...args} />;

const Default = Template.bind({});
Default.args = {
  data: [
    { title: "Item", value: 20 },
    { title: "Item", value: 10 },
    { title: "Item 2", value: 70 },
  ],
};

export default Config;
export { Default };
