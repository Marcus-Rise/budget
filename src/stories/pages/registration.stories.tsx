import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Registration from "../../../pages/registration";
import { rest } from "msw";

const Config: ComponentMeta<typeof Registration> = {
  title: "pages/Registration",
  component: Registration,
};

const Template: ComponentStory<typeof Registration> = (args) => <Registration {...args} />;

const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.post("/api/auth/register", (req, res, ctx) => {
        return res(ctx.status(201));
      }),
    ],
  },
};

const Failed = Template.bind({});
Failed.parameters = {
  msw: {
    handlers: [
      rest.post("/api/auth/register", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ],
  },
};

export default Config;
export { Default, Failed };
