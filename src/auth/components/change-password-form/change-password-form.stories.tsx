import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChangePasswordForm } from "./change-password-form.component";
import { addPaddingDecorator } from "../../../stories/helpers";

const Config: ComponentMeta<typeof ChangePasswordForm> = {
  title: "auth/ChangePasswordForm",
  component: ChangePasswordForm,
  decorators: [addPaddingDecorator],
};

const Template: ComponentStory<typeof ChangePasswordForm> = (args) => (
  <ChangePasswordForm {...args} />
);

const Default = Template.bind({});

export default Config;
export { Default };
