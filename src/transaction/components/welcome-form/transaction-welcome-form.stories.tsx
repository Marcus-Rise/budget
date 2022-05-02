import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionWelcomeForm } from "./transaction-welcome-form.component";

const Config: ComponentMeta<typeof TransactionWelcomeForm> = {
  title: "transaction/WelcomeForm",
  component: TransactionWelcomeForm,
};

const Template: ComponentStory<typeof TransactionWelcomeForm> = (args) => (
  <TransactionWelcomeForm {...args} />
);

const Default = Template.bind({});

export default Config;
export { Default };
