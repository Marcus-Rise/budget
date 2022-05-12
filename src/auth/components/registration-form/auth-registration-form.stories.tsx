import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthRegistrationForm } from "./auth-registration-form.component";

const Config: ComponentMeta<typeof AuthRegistrationForm> = {
  title: "auth/RegistrationForm",
  component: AuthRegistrationForm,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof AuthRegistrationForm> = (args) => (
  <AuthRegistrationForm {...args} />
);

const Default = Template.bind({});

export default Config;
export { Default };
