import type { ComponentMeta, ComponentStory } from "@storybook/react";
import ForgotPassword from "../../../pages/forgot-password/index";
import { rest } from "msw";

const Config: ComponentMeta<typeof ForgotPassword> = {
  title: "pages/ForgotPassword",
  component: ForgotPassword,
};

const Template: ComponentStory<typeof ForgotPassword> = (args) => <ForgotPassword {...args} />;

const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.post("/api/auth/proxy/reset-password", (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    ],
  },
};

const Failed = Template.bind({});
Failed.parameters = {
  msw: {
    handlers: [
      rest.post("/api/auth/proxy/reset-password", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};

export default Config;
export { Default, Failed };
