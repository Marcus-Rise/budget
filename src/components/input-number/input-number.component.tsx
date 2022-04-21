import type { ChangeEventHandler } from "react";
import { forwardRef, useCallback } from "react";
import type { Merge } from "../../types/merge";
import type { InputProps } from "../input";
import { Input } from "../input";

type BaseInputPriceProps = Omit<InputProps, "type">;
type Props = {
  onChange: (val: number) => void;
};
type InputPriceProps = Merge<[BaseInputPriceProps, Props]>;

const InputNumber = forwardRef<HTMLInputElement, InputPriceProps>(({ onChange, ...props }, ref) => {
  const change: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange(Number(e.target.value));
    },
    [onChange],
  );

  return <Input {...props} type={"number"} ref={ref} onChange={change} />;
});

export { InputNumber };
