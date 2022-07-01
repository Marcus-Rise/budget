import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChangePasswordForm } from "./change-password-form.component";
import { addPaddingDecorator } from "../../../stories/helpers";
import { FormProvider, useForm } from "react-hook-form";
import type { ChangePasswordFormDto } from "./change-password-form.dto";

const Config: ComponentMeta<typeof ChangePasswordForm> = {
  title: "auth/ChangePasswordForm",
  component: ChangePasswordForm,
  decorators: [addPaddingDecorator],
};

const Template: ComponentStory<typeof ChangePasswordForm> = (args) => {
  const methods = useForm<ChangePasswordFormDto>();

  return (
    <FormProvider {...methods}>
      <ChangePasswordForm {...args} />
    </FormProvider>
  );
};

const Default = Template.bind({});

export default Config;
export { Default };
