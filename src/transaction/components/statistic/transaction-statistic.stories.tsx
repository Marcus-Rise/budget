import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionStatistic } from "./transaction-statistic.component";
import { TRANSACTION_DATA_MOCK } from "../../transactions-data.mock";
import { TransactionModel, TransactionType } from "../../models";

const Config: ComponentMeta<typeof TransactionStatistic> = {
  title: "transaction/Statistic",
  component: TransactionStatistic,
};

const Template: ComponentStory<typeof TransactionStatistic> = (args) => (
  <TransactionStatistic {...args} />
);

const Default = Template.bind({});
Default.args = {
  transactions: TRANSACTION_DATA_MOCK,
};

const Credit = Template.bind({});
Credit.args = {
  transactions: [
    new TransactionModel("22", "aawdaw", "dddddd", 100000, TransactionType.CREDIT),
    ...TRANSACTION_DATA_MOCK,
  ],
};

const FullView = Template.bind({});
FullView.args = {
  ...Default.args,
  fullView: true,
};

export default Config;
export { Default, Credit, FullView };
