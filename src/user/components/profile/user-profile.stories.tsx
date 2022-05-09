import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserProfile } from "./user-profile.component";

const Config: ComponentMeta<typeof UserProfile> = {
  title: "user/Profile",
  component: UserProfile,
};

const Template: ComponentStory<typeof UserProfile> = (args) => <UserProfile {...args} />;

const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export default Config;
export { Default };
