import type { ComponentMeta, ComponentStory } from "@storybook/react";
import ForgotPassword from "../../../pages/forgot-password/index";

const Config: ComponentMeta<typeof ForgotPassword> = {
  title: "pages/ForgotPassword",
  component: ForgotPassword,
};

const Template: ComponentStory<typeof ForgotPassword> = (args) => <ForgotPassword {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
