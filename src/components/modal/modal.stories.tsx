import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Modal } from "./modal.component";

const Config: ComponentMeta<typeof Modal> = {
  title: "components/Modal",
  component: Modal,
};

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

const Default = Template.bind({});
Default.args = {
  children: <button>button</button>,
};

export default Config;
export { Default };
