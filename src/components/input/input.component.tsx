import styled from "styled-components";
import type { InputHTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";

const StyledInput = styled.input`
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  background-color: #eeeeee;
  border-color: black;

  &:focus {
    background-color: white;
    outline: none;
  }
`;

const Label = styled.label`
  position: absolute;
  top: -1rem;
  left: 1rem;
  font-size: 0.75rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  const isShowLabel = useMemo(() => {
    return !!label && (!!props.value || !!props.placeholder);
  }, [label, props.placeholder, props.value]);

  const placeholder = useMemo(() => props.placeholder ?? label, [label, props.placeholder]);

  return (
    <InputWrapper>
      {isShowLabel && <Label htmlFor={props.id}>{label}</Label>}
      <StyledInput {...props} ref={ref} placeholder={placeholder} data-testid={"input"} />
    </InputWrapper>
  );
});

export { Input };
export type { InputProps };
