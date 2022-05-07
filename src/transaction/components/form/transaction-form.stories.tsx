import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionForm } from "./transaction-form.component";
import { TransactionType } from "../../models";

const Config: ComponentMeta<typeof TransactionForm> = {
  title: "transaction/Form",
  component: TransactionForm,
  argTypes: {
    date: { control: "date" },
  },
};

const Template: ComponentStory<typeof TransactionForm> = (args) => <TransactionForm {...args} />;

const Default = Template.bind({});
Default.args = {
  title: "",
  amount: "" as unknown as number,
  type: TransactionType.CREDIT,
  date: new Date(),
  category: "",
  categories: ["Другое", "Дом", "Хозяйство"],
  children: <button type={"submit"}>submit</button>,
};

export default Config;
export { Default };
