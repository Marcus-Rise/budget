import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Login from "../../../pages/login";

const Config: ComponentMeta<typeof Login> = {
  title: "pages/Login",
  component: Login,
};

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
