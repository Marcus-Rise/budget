import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionPrice } from "./transaction-price.component";
import { TransactionType } from "../../models";

const Config: ComponentMeta<typeof TransactionPrice> = {
  title: "transaction/Price",
  component: TransactionPrice,
};

const Template: ComponentStory<typeof TransactionPrice> = (args) => <TransactionPrice {...args} />;

const Default = Template.bind({});
Default.args = {
  amount: 10000,
};

const Credit = Template.bind({});
Credit.args = {
  ...Default.args,
  type: TransactionType.CREDIT,
};

const Debit = Template.bind({});
Debit.args = {
  ...Default.args,
  type: TransactionType.DEBIT,
};

export default Config;
export { Default, Credit, Debit };
