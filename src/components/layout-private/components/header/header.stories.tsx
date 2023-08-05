import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "./header.component";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 120vh;
`;

const Config: ComponentMeta<typeof Header> = {
  title: "components/LayoutPrivate/Header",
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

const Default: ComponentStory<typeof Header> = (args) => (
  <Header {...args} userStore={{ user: null, isLoading: false }} />
);

const UserExist: ComponentStory<typeof Header> = (args) => (
  <Header {...args} userStore={{ user: { login: "some@somes.com" }, isLoading: false }} />
);

export default Config;
export { Default, UserExist };
