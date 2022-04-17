import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputAutocomplete } from "./input-autocomplete.component";
import { useState } from "react";

const Config: ComponentMeta<typeof InputAutocomplete> = {
  title: "components/InputAutocomplete",
  component: InputAutocomplete,
};

const Template: ComponentStory<typeof InputAutocomplete> = (args) => {
  const [val, setVal] = useState(args.value);

  return (
    <>
      <InputAutocomplete {...args} value={val} onChange={setVal} />
      val: {val}
    </>
  );
};

const Default = Template.bind({});
Default.args = {
  value: "",
  variants: ["foo", "bar", "baz"],
};

const Labeled = Template.bind({});
Labeled.args = {
  label: "Label",
  value: "",
  variants: ["foo", "bar", "baz"],
};

export default Config;
export { Default, Labeled };
