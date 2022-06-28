import type { ComponentMeta, ComponentStory } from "@storybook/react";
import RegistrationConfirm from "../../../pages/registration/confirm";

const Config: ComponentMeta<typeof RegistrationConfirm> = {
  title: "pages/RegistrationConfirm",
  component: RegistrationConfirm,
};

const Template: ComponentStory<typeof RegistrationConfirm> = (args) => (
  <RegistrationConfirm {...args} />
);

const Default = Template.bind({});

export default Config;
export { Default };
