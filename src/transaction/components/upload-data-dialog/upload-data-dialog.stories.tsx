import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { UploadDataDialog } from "./upload-data-dialog.component";

const Config: ComponentMeta<typeof UploadDataDialog> = {
  title: "transaction/UploadDataDialog",
  component: UploadDataDialog,
};

const Template: ComponentStory<typeof UploadDataDialog> = (args) => <UploadDataDialog {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
