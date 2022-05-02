import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionList } from "./transaction-list.component";
import { TRANSACTION_DATA_MOCK } from "../../transactions-data.mock";

const Config: ComponentMeta<typeof TransactionList> = {
  title: "transaction/List",
  component: TransactionList,
};

const Template: ComponentStory<typeof TransactionList> = (args) => <TransactionList {...args} />;

const Default = Template.bind({});
Default.args = {
  transactions: TRANSACTION_DATA_MOCK,
};

export default Config;
export { Default };
