import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import { Icon } from "./icon.component";

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Config: ComponentMeta<typeof Icon> = {
  title: "components/Icon",
  component: Icon,
  argTypes: {
    color: {
      control: {
        type: "color",
      },
    },
    size: {
      type: "string",
    },
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

const Default = Template.bind({});
Default.args = {
  name: "account",
};
const Hoverable = Template.bind({});
Hoverable.args = {
  ...Default.args,
  hoverable: true,
};

const icons: string[] = ["account", "lock", "eye", "eye-off", "success", "info", "close"];

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const IconLabel = styled.span`
  display: inline-flex;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background-color: #d0c9d6;
`;

const All: ComponentStory<typeof Icon> = (args) => (
  <>
    {icons.map((icon) => (
      <IconWrapper key={icon}>
        <Icon {...args} name={icon} />
        <IconLabel>{icon}</IconLabel>
      </IconWrapper>
    ))}
  </>
);
All.args = {
  ...Default.args,
};

export default Config;
export { Default, All, Hoverable };
