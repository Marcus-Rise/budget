import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "./header.component";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 120vh;
`;

const Config: ComponentMeta<typeof Header> = {
  title: "components/Layout/Header",
  component: Header,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
        <main>content</main>
      </Wrapper>
    ),
  ],
};

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
