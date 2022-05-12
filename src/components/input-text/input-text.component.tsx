import type { ChangeEventHandler } from "react";
import { forwardRef, useCallback } from "react";
import type { Merge } from "../../types/merge";
import type { InputProps } from "../input";
import { Input } from "../input";

type BaseInputProps = Omit<InputProps, "type">;
type Props = {
  onChange: (val: string) => void;
  password?: boolean;
};
type InputTextProps = Merge<[BaseInputProps, Props]>;

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ onChange, password, ...props }, ref) => {
    const change: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return <Input {...props} onChange={change} type={password ? "password" : "text"} ref={ref} />;
  },
);

export { InputText };
export type { InputTextProps };
