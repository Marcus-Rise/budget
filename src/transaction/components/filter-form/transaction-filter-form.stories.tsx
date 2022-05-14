import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionFilterForm } from "./transaction-filter-form.component";

const Config: ComponentMeta<typeof TransactionFilterForm> = {
  title: "transaction/FilterForm",
  component: TransactionFilterForm,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof TransactionFilterForm> = (args) => (
  <TransactionFilterForm {...args} />
);

const Default = Template.bind({});
Default.args = {
  alreadyAppliedFilters: [],
};

export default Config;
export { Default };
