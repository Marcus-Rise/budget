import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputDate } from "./input-date.component";
import { useMemo } from "react";

const Config: ComponentMeta<typeof InputDate> = {
  title: "components/InputDate",
  component: InputDate,
  argTypes: {
    value: {
      control: "date",
    },
  },
};

const Template: ComponentStory<typeof InputDate> = (args) => <InputDate {...args} />;

const Default = Template.bind({});

const Perf: ComponentStory<typeof InputDate> = (args) => {
  const inputs = useMemo(
    () => new Array(100).fill(1).map((_, index) => <InputDate {...args} key={index} />),
    [args],
  );

  return <>{inputs}</>;
};

export default Config;
export { Default, Perf };
