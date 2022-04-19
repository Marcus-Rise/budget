import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionList, TransactionListItem } from "./transaction-list-item.component";
import { TransactionType } from "../../transaction.model";

const Config: ComponentMeta<typeof TransactionListItem> = {
  title: "transaction/ListItem",
  component: TransactionListItem,
};

const Template: ComponentStory<typeof TransactionListItem> = (args) => (
  <TransactionList>
    <TransactionListItem {...args} />
    <TransactionListItem {...args} />
    <TransactionListItem {...args} />
  </TransactionList>
);

const Default = Template.bind({});
Default.args = {
  title: "Transaction",
  amount: 2000,
  type: TransactionType.DEBIT,
  date: new Date(),
  category: "Category",
  index: 0,
};

export default Config;
export { Default };
