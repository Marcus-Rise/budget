import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ForgotPasswordForm } from "./forgot-password-form.component";

const Config: ComponentMeta<typeof ForgotPasswordForm> = {
  title: "auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof ForgotPasswordForm> = (args) => (
  <ForgotPasswordForm {...args} />
);

const Default = Template.bind({});
const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export default Config;
export { Default, Loading };
