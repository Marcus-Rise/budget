import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Link } from "./link.component";

const Config: ComponentMeta<typeof Link> = {
  title: "components/Link",
  component: Link,
};

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

const Default = Template.bind({});
Default.args = {
  href: "/some#home",
  children: <p>Paragraph</p>,
};

export default Config;
export { Default };
