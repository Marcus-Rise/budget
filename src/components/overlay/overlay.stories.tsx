import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Overlay } from "./overlay.component";
import { Modal } from "../modal";

const Config: ComponentMeta<typeof Overlay> = {
  title: "components/Overlay",
  component: Overlay,
  decorators: [
    (Story) => (
      <div>
        <button>button</button>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />;

const Default = Template.bind({});
Default.args = {
  children: (
    <Modal>
      <button>button</button>
    </Modal>
  ),
};

export default Config;
export { Default };
