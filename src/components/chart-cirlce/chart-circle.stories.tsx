import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChartCircle } from "./chart-circle.component";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
`;

const Config: ComponentMeta<typeof ChartCircle> = {
  title: "components/ChartCircle",
  component: ChartCircle,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

const Template: ComponentStory<typeof ChartCircle> = (args) => <ChartCircle {...args} />;

const Default = Template.bind({});
Default.args = {
  data: [
    { title: "Item", value: 20 },
    { title: "Item", value: 10 },
    { title: "Item 2", value: 40 },
    { title: "Item 3", value: 30 },
  ],
};

export default Config;
export { Default };
