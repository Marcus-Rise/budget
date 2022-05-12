import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthLoginForm } from "./auth-login-form.component";

const Config: ComponentMeta<typeof AuthLoginForm> = {
  title: "auth/LoginForm",
  component: AuthLoginForm,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof AuthLoginForm> = (args) => <AuthLoginForm {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
