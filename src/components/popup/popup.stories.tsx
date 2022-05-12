import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Popup, PopupType } from "./popup.component";

const Config: ComponentMeta<typeof Popup> = {
  title: "components/Popup",
  component: Popup,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem", margin: "1rem", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

const Default = Template.bind({});
Default.args = {
  title: "awdawdawdawdaw adwadadada",
};

const Success = Template.bind({});
Success.args = {
  ...Default.args,
  type: PopupType.SUCCESS,
};

const Danger = Template.bind({});
Danger.args = {
  ...Default.args,
  type: PopupType.DANGER,
};

export default Config;
export { Default, Success, Danger };
