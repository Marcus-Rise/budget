import type { ChangeEventHandler, InputHTMLAttributes } from "react";
import { forwardRef, useCallback } from "react";
import type { Merge } from "../../types/Merge";
import styled from "styled-components";

type BaseInputRadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

type InputRadioProps = Merge<
  [BaseInputRadioProps, { onChange: (val: BaseInputRadioProps["value"]) => void }]
>;

const InputContainer = styled.div`
  display: inline-block;
`;

const InputRadio = forwardRef<HTMLInputElement, InputRadioProps>(({ onChange, ...props }, ref) => {
  const change: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <InputContainer>
      <input {...props} ref={ref} type="radio" onChange={change} />
      <label htmlFor={props.id}>{props.value}</label>
    </InputContainer>
  );
});

export { InputRadio };
