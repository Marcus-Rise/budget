import type { ComponentMeta, ComponentStory } from "@storybook/react";
import ChangePassword from "../../../pages/change-password";
import { rest } from "msw";

const Config: ComponentMeta<typeof ChangePassword> = {
  title: "pages/ChangePassword",
  component: ChangePassword,
};

const Template: ComponentStory<typeof ChangePassword> = (args) => <ChangePassword {...args} />;

const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.post("/api/auth/change-password", (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    ],
  },
};

const Failed = Template.bind({});
Failed.parameters = {
  msw: {
    handlers: [
      rest.post("/api/auth/change-password", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};

export default Config;
export { Default, Failed };
