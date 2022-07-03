import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Profile from "../../../pages/profile";
import type { IUser } from "../../user";
import { UserProvider } from "../../user";
import { rest } from "msw";

const Config: ComponentMeta<typeof Profile> = {
  title: "pages/Profile",
  component: Profile,
};

const Template: ComponentStory<typeof Profile> = (args) => (
  <UserProvider>
    <Profile {...args} />
  </UserProvider>
);

const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get<IUser>("/api/proxy/user", (req, res, ctx) => {
        return res(ctx.json({ login: "some@some.com" }));
      }),
      rest.post("/api/auth/change-password", (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    ],
  },
};

const FailedChangePassword = Template.bind({});
FailedChangePassword.parameters = {
  msw: {
    handlers: [
      rest.get<IUser>("/api/proxy/user", (req, res, ctx) => {
        return res(ctx.json({ login: "some@some.com" }));
      }),
      rest.post("/api/auth/change-password", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};

export default Config;
export { Default, FailedChangePassword };
