import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TransactionFormQuick } from "./transaction-form-quick.component";

const Config: ComponentMeta<typeof TransactionFormQuick> = {
  title: "transaction/FormQuick",
  component: TransactionFormQuick,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof TransactionFormQuick> = (args) => (
  <TransactionFormQuick {...args} />
);

const Default = Template.bind({});

export default Config;
export { Default };
