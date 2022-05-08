import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "./header.component";
import styled from "styled-components";
import { UserProvider } from "../../../../user";

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

const Default: ComponentStory<typeof Header> = (args) => (
  <UserProvider>
    <Header {...args} />
  </UserProvider>
);

const UserExist: ComponentStory<typeof Header> = (args) => (
  <UserProvider user={{ email: "some@somes.com" }}>
    <Header {...args} />
  </UserProvider>
);

export default Config;
export { Default, UserExist };
