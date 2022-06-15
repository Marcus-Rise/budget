import styled, { css } from "styled-components";
import { Loader } from "../loader";
import type { ButtonHTMLAttributes } from "react";

enum ButtonVariant {
  TEXT = "text",
  ICON = "icon",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: Color;
  loading?: boolean;
};

const Button = styled.button.attrs<ButtonProps, ButtonProps>((props) => {
  return {
    ...props,
    disabled: props.loading,
    children: props.loading ? (
      <Loader
        size={"1rem"}
        width={"0.1rem"}
        color={!props.variant ? props.theme.lightest : props.theme.primary}
      />
    ) : (
      props.children
    ),
  };
})`
  border: none;
  border-radius: 0.5rem;
  text-align: center;

  &:hover {
    opacity: 0.9;
    outline: none;
    cursor: pointer;
  }

  &:active,
  &:disabled {
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${(props) => {
    const color = props.color ?? props.theme.primary;

    switch (props.variant) {
      case ButtonVariant.TEXT: {
        return css`
          padding: 0.75rem 1rem;
          color: ${color};
          background-color: transparent;

          &:hover {
            background-color: ${color};
            color: ${(props) => props.theme.lightest};
            opacity: 0.4;
          }
        `;
      }
      case ButtonVariant.ICON: {
        return css`
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          background-color: transparent;
          fill: ${color};
        `;
      }
      default: {
        return css`
          padding: 0.75rem 1rem;
          background-color: ${color};
          color: ${(props) => props.theme.lightest};
        `;
      }
    }
  }}
`;

export { Button, ButtonVariant };
