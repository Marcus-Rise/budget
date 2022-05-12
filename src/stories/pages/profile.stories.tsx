import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Profile from "../../../pages/profile";
import { UserProvider } from "../../user";

const Config: ComponentMeta<typeof Profile> = {
  title: "pages/Profile",
  component: Profile,
};

const Default: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;

const WithUser: ComponentStory<typeof Profile> = (args) => (
  <UserProvider user={{ email: "some@some.com" }}>
    <Profile {...args} />
  </UserProvider>
);

export default Config;
export { Default, WithUser };
