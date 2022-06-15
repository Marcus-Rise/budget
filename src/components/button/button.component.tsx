import styled, { css, useTheme } from "styled-components";
import { Loader } from "../loader";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

enum ButtonVariant {
  TEXT = "text",
  ICON = "icon",
}

type ButtonStyledProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: Color;
};

const ButtonStyled = styled.button<ButtonStyledProps>`
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

type ButtonProps = ButtonStyledProps & {
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, ...props }, ref) => {
    const theme = useTheme();

    return (
      <ButtonStyled {...props} disabled={loading} ref={ref}>
        {loading ? (
          <Loader
            size={"1rem"}
            width={"0.1rem"}
            color={!props.variant ? theme.lightest : theme.primary}
          />
        ) : (
          children
        )}
      </ButtonStyled>
    );
  },
);

export { Button, ButtonVariant };
