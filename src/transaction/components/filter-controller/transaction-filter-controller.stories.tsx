import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionFilterController } from "./transaction-filter-controller.component";
import { isTransactionInSameMonthFilter } from "../filter-form";

const Config: ComponentMeta<typeof TransactionFilterController> = {
  title: "transaction/FilterController",
  component: TransactionFilterController,
};

const Template: ComponentStory<typeof TransactionFilterController> = (args) => (
  <TransactionFilterController {...args} />
);

const Default = Template.bind({});
Default.args = {
  filters: [isTransactionInSameMonthFilter],
};

export default Config;
export { Default };
