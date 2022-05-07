import styled from "styled-components";
import type { InputHTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";

const InputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const StyledInput = styled.input`
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.lightest};
  border: 0.14rem solid ${(props) => props.theme.neutralLighter};
  transition: 0.4s;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus-within {
    border-color: ${(props) => props.theme.primary};
    transition: 0.4s;
  }
`;

const Label = styled.label`
  position: absolute;
  top: -0.4rem;
  left: 1rem;
  font-size: 0.75rem;
  z-index: 1;
  color: ${(props) => props.theme.primary};

  &::after {
    content: "";
    position: absolute;
    top: 45%;
    left: -0.2rem;
    width: calc(100% + 0.4rem);
    height: 0.14rem;
    background-color: ${(props) => props.theme.lightest};
    z-index: -1;
  }
`;

const InputError = styled.small`
  position: absolute;
  bottom: -0.3rem;
  left: 1rem;
  color: ${(props) => props.theme.danger};
  font-size: 0.75rem;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: -0.2rem;
    width: calc(100% + 0.4rem);
    height: 0.14rem;
    background-color: ${(props) => props.theme.lightest};
    z-index: -1;
  }
`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  const isShowLabel = useMemo(() => {
    return !!label && (!!props.value || !!props.placeholder);
  }, [label, props.placeholder, props.value]);

  const placeholder = useMemo(() => props.placeholder ?? label, [label, props.placeholder]);

  return (
    <InputWrapper>
      {isShowLabel && <Label htmlFor={props.id}>{label}</Label>}
      <StyledInput {...props} ref={ref} placeholder={placeholder} data-testid={"input"} />
      {!!error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
});

export { Input };
export type { InputProps };
