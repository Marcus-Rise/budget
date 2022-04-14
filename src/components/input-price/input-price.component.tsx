import type {ChangeEventHandler, InputHTMLAttributes} from "react";
import {forwardRef, useCallback} from "react";
import type {Merge} from "../../types/Merge";

type BaseInputPriceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;
type Props = {
  onChange: (val: number) => void;
}
type InputPriceProps = Merge<[BaseInputPriceProps, Props]>

const InputPrice= forwardRef<HTMLInputElement, InputPriceProps>(({onChange, ...props}, ref) => {
  const change: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(Number(e.target.value));
  }, [onChange]);

  return <input {...props} type={"number"} ref={ref} onChange={change} />;
});

export { InputPrice };
