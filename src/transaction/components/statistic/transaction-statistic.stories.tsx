import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionStatistic } from "./transaction-statistic.component";
import { TransactionType } from "../../models";

const Config: ComponentMeta<typeof TransactionStatistic> = {
  title: "transaction/Statistic",
  component: TransactionStatistic,
};

const Template: ComponentStory<typeof TransactionStatistic> = (args) => (
  <TransactionStatistic {...args} />
);

const Default = Template.bind({});
Default.args = {
  transactions: [
    {
      type: TransactionType.DEBIT,
      title: "Зарплата",
      category: "Работа",
      amount: 30000,
      date: new Date(),
      uuid: "1",
    },
    {
      type: TransactionType.CREDIT,
      title: "Еда",
      category: "Дом",
      amount: 5000,
      date: new Date(),
      uuid: "2",
    },
    {
      type: TransactionType.CREDIT,
      title: "Стул",
      category: "Дом",
      amount: 10000,
      date: new Date(),
      uuid: "3",
    },
    {
      type: TransactionType.CREDIT,
      title: "Куртка",
      category: "Себе",
      amount: 10000,
      date: new Date(),
      uuid: "4",
    },
  ],
};

export default Config;
export { Default };
