import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { LayoutPrivate } from "./layout-private.component";
import { usePopup } from "../popup";
import { useEffect } from "react";

const Config: ComponentMeta<typeof LayoutPrivate> = {
  title: "components/LayoutPrivate",
  component: LayoutPrivate,
};

const Template: ComponentStory<typeof LayoutPrivate> = (args) => <LayoutPrivate {...args} />;

const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <p>content</p>
    </>
  ),
};

const Notifier: ComponentStory<typeof LayoutPrivate> = (args) => {
  const { open } = usePopup();

  useEffect(() => {
    open("title title title");
  }, [open]);

  return <LayoutPrivate {...args}>Content</LayoutPrivate>;
};

export default Config;
export { Default, Notifier };
