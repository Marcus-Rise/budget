import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Badge } from "./badge.component";

const Config: ComponentMeta<typeof Badge> = {
  title: "components/Badge",
  component: Badge,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

const Default = Template.bind({});
Default.args = {
  children: "Badge",
};

export default Config;
export { Default };
