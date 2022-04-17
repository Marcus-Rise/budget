import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionForm } from "./transaction-form.component";
import { TransactionType } from "../../transaction.model";

const Config: ComponentMeta<typeof TransactionForm> = {
  title: "components/" + TransactionForm.name,
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
};

export default Config;
export { Default };
