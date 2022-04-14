import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionForm } from "./transaction-form.component";

const Config: ComponentMeta<typeof TransactionForm> = {
  title: "components/" + TransactionForm.name,
  component: TransactionForm,
};

const Template: ComponentStory<typeof TransactionForm> = (args) => <TransactionForm {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
