import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Input } from "./input.component";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../icon";

const Wrapper = styled.div`
  padding: 2rem;
`;

const Config: ComponentMeta<typeof Input> = {
  title: "components/Input",
  component: Input,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

const Template: ComponentStory<typeof Input> = ({ value: val, onChange, ...args }) => {
  const [value, setValue] = useState(val);

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);

        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
};

const Default = Template.bind({});
Default.args = {
  value: "",
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByTestId("input"), "test value", {
    delay: 100,
  });
};

const Labeled = Template.bind({});
Labeled.args = {
  value: "",
  label: "Label",
};
Labeled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByTestId("input"), "test value", {
    delay: 100,
  });
};

const LabeledWithPlaceholder = Template.bind({});
LabeledWithPlaceholder.args = {
  label: "Label",
  placeholder: "Placeholder",
};

const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: "Error message",
};

const StartIcon = Template.bind({});
StartIcon.args = {
  ...Default.args,
  label: "Label",
  error: "Error message",
  startIcon: <Icon name={"account"} />,
};

export default Config;
export { Default, Labeled, LabeledWithPlaceholder, Error, StartIcon };
