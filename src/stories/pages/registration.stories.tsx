import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Registration from "../../../pages/registration";

const Config: ComponentMeta<typeof Registration> = {
  title: "pages/Registration",
  component: Registration,
};

const Template: ComponentStory<typeof Registration> = (args) => <Registration {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
