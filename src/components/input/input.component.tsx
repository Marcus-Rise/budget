import styled, { css } from "styled-components";
import type { InputHTMLAttributes, ReactElement } from "react";
import { forwardRef, useMemo } from "react";

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;

  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.lightest};
  border: 0.14rem solid ${(props) => props.theme.neutralLighter};
  fill: ${(props) => props.theme.neutralLighter};
  transition: 0.4s;

  &:hover,
  &:focus-within {
    border-color: ${(props) => props.theme.primary};
    fill: ${(props) => props.theme.primary};
    transition: 0.4s;
  }
`;

const Meta = css`
  position: absolute;
  left: 1rem;
  font-size: 0.75rem;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    left: -0.2rem;
    width: calc(100% + 0.4rem);
    height: 1rem;
    background-color: ${(props) => props.theme.lightest};
    z-index: -1;
  }
`;

const Label = styled.label`
  top: -0.5rem;
  color: ${(props) => props.theme.primary};

  ${Meta}
`;

const InputError = styled.small`
  bottom: -0.5rem;
  color: ${(props) => props.theme.danger};

  ${Meta}
`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  startIcon?: ReactElement;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, startIcon, error, ...props }, ref) => {
    const isShowLabel = useMemo(() => {
      return !!label && (!!props.value || !!props.placeholder);
    }, [label, props.placeholder, props.value]);

    const placeholder = useMemo(() => props.placeholder ?? label, [label, props.placeholder]);

    return (
      <InputWrapper>
        {isShowLabel && <Label htmlFor={props.id}>{label}</Label>}
        {startIcon}
        <StyledInput {...props} ref={ref} placeholder={placeholder} data-testid={"input"} />
        {!!error && <InputError>{error}</InputError>}
      </InputWrapper>
    );
  },
);

export { Input };
export type { InputProps };
