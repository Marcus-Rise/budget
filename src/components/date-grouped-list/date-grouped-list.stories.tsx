import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { DateGroupedList } from "./date-grouped-list.component";

const Config: ComponentMeta<typeof DateGroupedList> = {
  title: "components/DateGroupedList",
  component: DateGroupedList,
};

const Template: ComponentStory<typeof DateGroupedList> = (args) => <DateGroupedList {...args} />;

const Default = Template.bind({});
Default.args = {
  items: [
    {
      date: new Date(),
      id: "Item",
    },
    {
      date: new Date(),
      id: "Item2",
    },
    {
      date: new Date(),
      id: "Item3",
    },
  ],
};

const Single = Template.bind({});
Single.args = {
  items: [
    {
      date: new Date(),
      id: "Item",
    },
  ],
};

export default Config;
export { Default, Single };
