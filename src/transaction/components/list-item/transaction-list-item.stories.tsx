import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionListItem } from "./transaction-list-item.component";
import { TransactionType } from "../../models";

const Config: ComponentMeta<typeof TransactionListItem> = {
  title: "transaction/ListItem",
  component: TransactionListItem,
};

const Template: ComponentStory<typeof TransactionListItem> = () => (
  <>
    <TransactionListItem
      title={"Зарплата"}
      amount={20_000}
      type={TransactionType.DEBIT}
      date={new Date()}
      category={"Шиномонтаж"}
    />
    <TransactionListItem
      title={"Диван"}
      amount={3_000}
      type={TransactionType.CREDIT}
      date={new Date()}
      category={"Мебель"}
    />
  </>
);

const Default = Template.bind({});

export default Config;
export { Default };
