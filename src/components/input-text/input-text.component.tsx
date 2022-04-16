import type { ChangeEventHandler, InputHTMLAttributes } from "react";
import { forwardRef, useCallback } from "react";
import type { Merge } from "../../types/Merge";
import { Input } from "../input";

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;
type Props = {
  onChange: (val: string) => void;
};
type InputTextProps = Merge<[BaseInputProps, Props]>;

const InputText = forwardRef<HTMLInputElement, InputTextProps>(({ onChange, ...props }, ref) => {
  const change: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return <Input {...props} onChange={change} type={"text"} ref={ref} />;
});

export { InputText };
export type { InputTextProps };
