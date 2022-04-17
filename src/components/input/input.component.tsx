import styled from "styled-components";
import type { ChangeEventHandler, InputHTMLAttributes } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";

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

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, onChange, ...props }, ref) => {
  const [value, setValue] = useState(props.value);

  const change: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange],
  );

  const isShowLabel = useMemo(() => {
    return !!label && (!!value || !!props.placeholder);
  }, [label, props.placeholder, value]);

  const placeholder = useMemo(() => props.placeholder ?? label, [label, props.placeholder]);

  return (
    <Root>
      {isShowLabel && <Label htmlFor={props.id}>{label}</Label>}
      <StyledInput
        {...props}
        onChange={change}
        ref={ref}
        placeholder={placeholder}
        data-testid={"input"}
      />
    </Root>
  );
});

export { Input };
export type { InputProps };
