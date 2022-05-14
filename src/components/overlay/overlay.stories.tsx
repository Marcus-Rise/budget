import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Overlay } from "./overlay.component";
import { Modal } from "../modal";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 200vh;
`;

const Config: ComponentMeta<typeof Overlay> = {
  title: "components/Overlay",
  component: Overlay,
  decorators: [
    (Story) => (
      <Wrapper>
        <button>button</button>
        <Story />
      </Wrapper>
    ),
  ],
};

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />;

const Default = Template.bind({});
Default.args = {
  children: (
    <Modal show={true}>
      <button>button</button>
    </Modal>
  ),
};

export default Config;
export { Default };
