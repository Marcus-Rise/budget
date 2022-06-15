import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Loader } from "./loader.component";

const Config: ComponentMeta<typeof Loader> = {
  title: "components/Loader",
  component: Loader,
};

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

const Default = Template.bind({});

const Color = Template.bind({});
Color.args = {
  color: "#a82222",
};

const Size = Template.bind({});
Size.args = {
  size: "0.1rem",
};

const Width = Template.bind({});
Width.args = {
  width: "0.1rem",
};

export default Config;
export { Default, Width, Color, Size };
