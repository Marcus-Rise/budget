import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card } from "./card.component";

const Config: ComponentMeta<typeof Card> = {
  title: "components/Card",
  component: Card,
  argTypes: {
    width: {
      type: "string",
    },
    maxWidth: {
      type: "string",
    },
    height: {
      type: "string",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const Default = Template.bind({});
Default.args = {
  children: <p>awdawda</p>,
};

export default Config;
export { Default };
