import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputAutocomplete } from "./input-autocomplete.component";
import { useState } from "react";

const Config: ComponentMeta<typeof InputAutocomplete> = {
  title: "components/InputAutocomplete",
  component: InputAutocomplete,
};

const Template: ComponentStory<typeof InputAutocomplete> = (args) => {
  const [val, setVal] = useState(args.value);

  return <InputAutocomplete {...args} value={val} onChange={setVal} />;
};

const Default = Template.bind({});
Default.args = {
  variants: ["foo", "bar", "baz"],
};

export default Config;
export { Default };
