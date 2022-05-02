import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionStatistic } from "./transaction-statistic.component";
import { TRANSACTION_DATA_MOCK } from "../../transactions-data.mock";

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

export default Config;
export { Default };
